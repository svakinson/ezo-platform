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

  // მივიღოთ user-ის როლი და subscription
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, subscription_status, subscription_end_date')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    // პროფილი ვერ მოიძებნა → logout
    await supabase.auth.signOut()
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const path = request.nextUrl.pathname

  // ============================================
  // DASHBOARD - მხოლოდ chairman-ისთვის
  // ============================================
  if (path.startsWith('/dashboard')) {
    if (profile.role !== 'chairman') {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    // შევამოწმოთ subscription ვადა
    if (profile.subscription_status !== 'active') {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    if (profile.subscription_end_date) {
      const endDate = new Date(profile.subscription_end_date)
      const today = new Date()
      if (today > endDate) {
        // ვადა ამოიწურა → pricing-ზე
        return NextResponse.redirect(new URL('/pricing', request.url))
      }
    }
  }

  // ============================================
  // ADMIN PANEL - მხოლოდ admin-ისთვის
  // ============================================
  if (path.startsWith('/admin')) {
    if (profile.role !== 'admin') {
      const redirectPath = profile.role === 'chairman' ? '/dashboard' : '/pricing'
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  // ============================================
  // PAYMENT UPLOAD - მხოლოდ user-ისთვის (არა chairman)
  // ============================================
  if (path === '/payment') {
    if (profile.role === 'chairman') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // PRICING - chairman-ს არ სჭირდება
  // ============================================
  if (path === '/pricing' && profile.role === 'chairman') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/pricing',
    '/payment',
  ],
}