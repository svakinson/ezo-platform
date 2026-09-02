import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // თუ არ არის ავტორიზებული → login-ზე
  if (!user) {
    const path = request.nextUrl.pathname
    if (path.startsWith('/dashboard') || path.startsWith('/admin') || path.startsWith('/payment')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  // მივიღოთ user-ის პროფილი Trial-ის ველებთან ერთად
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, subscription_status, subscription_end_date, is_trial, trial_ends_at, has_used_trial')
    .eq('id', user.id)
    .maybeSingle()

  const userRole = profile?.role || 'user'
  const subStatus = profile?.subscription_status || 'inactive'
  const subEndDate = profile?.subscription_end_date
  const isTrial = profile?.is_trial || false
  const trialEndsAt = profile?.trial_ends_at
  const hasUsedTrial = profile?.has_used_trial || false

  const path = request.nextUrl.pathname

  // ============================================
  // TRIAL EXPIRATION CHECK (ავტომატური ვადის გასვლა)
  // ============================================
  if (isTrial && trialEndsAt) {
    const trialEnd = new Date(trialEndsAt)
    const today = new Date()
    
    // თუ ვადა გასულია და ჯერ არ გადაუხდია (არ არის active)
    if (today > trialEnd && subStatus !== 'active') {
      // განვაახლოთ პროფილი: დავასრულოთ trial და გავხადოთ expired
      await supabase
        .from('profiles')
        .update({
          is_trial: false,
          has_used_trial: true,
          subscription_status: 'expired',
          role: userRole === 'chairman' ? 'user' : userRole,
        })
        .eq('id', user.id)
      
      return NextResponse.redirect(new URL('/pricing', request.url))
    }
  }

  // ============================================
  // DASHBOARD - chairman ან აქტიური trial
  // ============================================
  if (path.startsWith('/dashboard')) {
    const isOnValidTrial = isTrial && subStatus !== 'expired' && trialEndsAt && new Date(trialEndsAt) > new Date()
    
    if (userRole !== 'chairman' && !isOnValidTrial) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    // თუ აქვს active სტატუსი, შევამოწმოთ ვადა
    if (subStatus === 'active' && subEndDate) {
      const endDate = new Date(subEndDate)
      const today = new Date()
      if (today > endDate) {
        return NextResponse.redirect(new URL('/pricing', request.url))
      }
    }
  }

  // ============================================
  // ADMIN PANEL - მხოლოდ admin-ისთვის
  // ============================================
  if (path.startsWith('/admin')) {
    if (userRole !== 'admin') {
      const redirectPath = userRole === 'chairman' ? '/dashboard' : '/pricing'
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  // ============================================
  // PAYMENT - თავისუფალია upgrade-ისთვის, მაგრამ active paid chairman-ს არ სჭირდება
  // ============================================
  if (path === '/payment') {
    // თუ უკვე აქვს აქტიური გადახდილი პაკეტი და არ არის trial-ში, გადაიყვანე dashboard-ზე
    if (userRole === 'chairman' && subStatus === 'active' && !isTrial) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // PRICING - active paid chairman-ს არ სჭირდება
  // ============================================
  if (path === '/pricing' && userRole === 'chairman' && subStatus === 'active' && !isTrial) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/admin',
    '/pricing',
    '/payment',
  ],
}