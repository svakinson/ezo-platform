import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { targetUserId } = await req.json()

    if (!targetUserId) {
      throw new Error('targetUserId is required')
    }

    // შევქმნათ Supabase კლიენტი Service Role Key-ით
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // შევამოწმოთ რომ გამომძახებელი არის ადმინი
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const clientSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: authHeader } }
      }
    )

    const { data: { user: adminUser }, error: adminError } = await clientSupabase.auth.getUser()
    
    if (adminError || !adminUser) {
      throw new Error('Invalid admin session')
    }

    const { data: adminProfile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', adminUser.id)
      .single()

    if (adminProfile?.role !== 'admin') {
      throw new Error('Only admins can impersonate users')
    }

    // შევქმნათ session target user-ისთვის
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.getUserById(targetUserId)
    
    if (sessionError) {
      throw new Error('Failed to get target user')
    }

    // შევქმნათ JWT token target user-ისთვის
    const { data: jwtData, error: jwtError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: sessionData.user.email,
      options: {
        redirectTo: `${req.headers.get('Origin')}/dashboard`
      }
    })

    if (jwtError) {
      throw new Error('Failed to generate session')
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Impersonation session created',
        targetUser: {
          id: targetUserId,
          email: sessionData.user.email
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})