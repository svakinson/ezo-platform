'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthDebug from '@/components/AuthDebug' // დებაგერის იმპორტი

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconMail = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconLock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconEyeOff = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ FORM COMPONENT ============
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isRegistered = searchParams.get('registered') === 'true'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🔐 [LOGIN] დაიწყო შესვლის პროცესი...')
    console.log('📧 Email:', email)
    console.log('🔑 Password length:', password.length)

    try {
      console.log('📡 Supabase signInWithPassword გამოძახება...')
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error('❌ [LOGIN ERROR]:', signInError)
        console.error('Error details:', signInError.message, signInError.status)
        
        if (signInError.message.includes('Invalid login credentials')) {
          setError('არასწორი ელ-ფოსტა ან პაროლი')
        } else {
          setError(signInError.message)
        }
        return
      }

      console.log('✅ [LOGIN SUCCESS] მომხმარებელი წარმატებით შევიდა!')
      console.log('👤 User data:', data)
      console.log('User ID:', data.user?.id)
      console.log('Email:', data.user?.email)

      if (data.user) {
        console.log('📋 პროფილის მიღება ბაზიდან...')
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, subscription_status, subscription_end_date')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('❌ [PROFILE ERROR]:', profileError)
        } else {
          console.log('✅ [PROFILE SUCCESS]:', profile)
          console.log('Role:', profile?.role)
          console.log('Status:', profile?.subscription_status)
          console.log('End Date:', profile?.subscription_end_date)
        }

        // ჭკვიანი redirect
        console.log('🔄 Redirect ლოგიკის შემოწმება...')
        if (profile?.role === 'chairman') {
          console.log('➡️ გადასვლა: /dashboard (chairman)')
          router.push('/dashboard')
        } else if (profile?.role === 'admin') {
          console.log('➡️ გადასვლა: /admin/payments (admin)')
          router.push('/admin/payments')
        } else {
          console.log('➡️ გადასვლა: /pricing (user)')
          router.push('/pricing')
        }
      }
    } catch (err: any) {
      console.error('💥 [CATCH ERROR]:', err)
      console.error('Error stack:', err.stack)
      setError('შესვლის დროს მოხდა შეცდომა. სცადეთ თავიდან.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="lg:hidden mb-8">
        <Link href="/" className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <IconBuilding className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">EZO</span>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">შესვლა</h2>
        <p className="text-slate-600">
          არ გაქვს ანგარიში?{' '}
          <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
            დარეგისტრირდი
          </Link>
        </p>
      </div>

      {isRegistered && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
          <IconCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800">
            რეგისტრაცია წარმატებულია! გთხოვთ, შეხვიდეთ თქვენი მონაცემებით.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
          <IconAlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">ელ-ფოსტა</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <IconMail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="მაგ: giorgi@example.com"
              className="w-full pl-10 pr-4 py-3 bg-white !text-slate-900 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all [&:-webkit-autofill]:!text-slate-900 [&:-webkit-autofill]:!bg-white"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">პაროლი</label>
            <a href="#" className="text-sm text-emerald-600 hover:underline">დაგავიწყდა პაროლი?</a>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <IconLock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="შეიყვანე პაროლი"
              className="w-full pl-10 pr-10 py-3 bg-white !text-slate-900 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all [&:-webkit-autofill]:!text-slate-900 [&:-webkit-autofill]:!bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="remember" className="text-sm text-slate-600">
            დამიმახსოვრე ამ მოწყობილობაზე
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <IconLoader className="w-5 h-5" />
              <span>შესვლა...</span>
            </>
          ) : (
            <>
              <span>შესვლა</span>
              <IconArrowLeft className="w-5 h-5 rotate-180" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
          <IconArrowLeft className="w-4 h-4" />
          <span>მთავარ გვერდზე დაბრუნება</span>
        </Link>
      </div>
    </div>
  )
}

// ============ MAIN PAGE ============
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconBuilding className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EZO</span>
            </Link>
          </div>

          <div className="relative max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              კეთილი იყოს თქვენი დაბრუნება
            </h1>
            <p className="text-lg text-emerald-50 leading-relaxed mb-8">
              შედით თქვენს ანგარიშში და განაგრძეთ კორპუსის მართვა. EZO ყოველთვის აქ არის თქვენთვის.
            </p>

            <div className="space-y-4">
              {['უსაფრთხო შესვლა', 'მყისიერი წვდომა მონაცემებზე', '24/7 მხარდაჭერა', 'ყველა მოწყობილობაზე ხელმისაწვდომი'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <IconCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-emerald-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <p className="text-sm text-emerald-100">© 2026 EZO. ყველა უფლება დაცულია.</p>
          </div>
        </div>

        {/* Right side - Form wrapped in Suspense */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <Suspense fallback={<div className="text-slate-600">იტვირთება...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* Debug Component - მხოლოდ development-ში გამოჩნდება */}
      {process.env.NODE_ENV === 'development' && <AuthDebug />}
    </div>
  )
}