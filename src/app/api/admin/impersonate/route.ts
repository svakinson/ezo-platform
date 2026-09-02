import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { targetUserId } = await request.json()
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !targetUserId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // შევქმნათ admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // შევამოწმოთ რომ გამომძახებელი არის ადმინი
    const token = authHeader.replace('Bearer ', '')
    const { data: { user: adminUser } } = await supabaseAdmin.auth.getUser(token)
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: adminProfile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', adminUser.id)
      .single()

    if (adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Only admins can impersonate users' }, { status: 403 })
    }

    // შევქმნათ ახალი session target user-ისთვის
    const { data: targetUser, error: userError } = await supabaseAdmin.auth.admin.getUserById(targetUserId)
    
    if (userError || !targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 })
    }

    // გენერირება magic link
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: targetUser.user.email!,
    })

    if (linkError) {
      return NextResponse.json({ error: 'Failed to generate session' }, { status: 500 })
    }

    // შევქმნათ session პირდაპირ
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.signInWithPassword({
      email: targetUser.user.email!,
      password: Math.random().toString(36).slice(-16), // ეს არ იმუშავებს, ამიტომ ვიყენებთ სხვა მიდგომას
    })

    // უკეთესი მიდგომა: ვიყენებთ token-ს პირდაპირ
    const { data: tokenData } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: targetUser.user.email!,
    })

    return NextResponse.json({
      success: true,
      message: 'Impersonation successful',
      targetUser: {
        id: targetUserId,
        email: targetUser.user.email
      },
      // ვაბრუნებთ ინსტრუქციას, თუ როგორ გამოვიყენოთ magic link
      magicLink: linkData?.properties?.action_link
    })

  } catch (error: any) {
    console.error('Impersonate error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}