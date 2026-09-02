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

  // მივიღოთ user-ის როლი (გამოვიყენოთ maybeSingle შეცდომის თავიდან ასაცილებლად)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, subscription_status, subscription_end_date')
    .eq('id', user.id)
    .maybeSingle()

  // ნაგულისხმევი მნიშვნელობები, თუ პროფილი ჯერ არ არსებობს (მაგ. ძველი ანგარიში)
  const userRole = profile?.role || 'user'
  const subStatus = profile?.subscription_status || 'inactive'
  const subEndDate = profile?.subscription_end_date

  const path = request.nextUrl.pathname

  // ============================================
  // DASHBOARD - მხოლოდ chairman-ისთვის
  // ============================================
  if (path.startsWith('/dashboard')) {
    if (userRole !== 'chairman') {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    if (subStatus !== 'active') {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    if (subEndDate) {
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
  // PAYMENT UPLOAD - მხოლოდ user-ისთვის (არა chairman)
  // ============================================
  if (path === '/payment') {
    if (userRole === 'chairman') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // PRICING - chairman-ს არ სჭირდება
  // ============================================
  if (path === '/pricing' && userRole === 'chairman') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/admin', // დამატებულია უსაფრთხოებისთვის, რათა ზუსტად /admin-იც დაიჭიროს
    '/pricing',
    '/payment',
  ],
}