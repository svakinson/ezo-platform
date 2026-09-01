'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
  </svg>
)

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [plans, setPlans] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>('user')
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const init = async () => {
      // მივიღოთ current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        setUserName(user.email?.split('@')[0] || 'მომხმარებელი')
        
        // მივიღოთ user-ის როლი
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, subscription_status')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUserRole(profile.role)
          
          // თუ უკვე chairman-ია → dashboard-ზე
          if (profile.role === 'chairman' && profile.subscription_status === 'active') {
            router.push('/dashboard')
          }
        }
      }

      // მივიღოთ პაკეტები
      const { data } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      setPlans(data || [])
      setLoading(false)
    }

    init()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">იტვირთება...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconBuilding className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">EZO Platform</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              // მომხმარებელი დალოგინებულია
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm text-slate-300">{userName}</span>
                </div>
                
                {userRole === 'user' && (
                  <Link 
                    href="/payment" 
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    გადახდის ისტორია
                  </Link>
                )}
                
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    router.push('/')
                  }}
                  className="text-sm text-rose-400 hover:text-rose-300 transition-colors font-medium"
                >
                  გამოსვლა
                </button>
              </>
            ) : (
              // მომხმარებელი არ არის დალოგინებული
              <>
                <Link 
                  href="/login" 
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  შესვლა
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  რეგისტრაცია
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            აირჩიეთ თქვენი პაკეტი
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            კორპუსის სრული მართვა ერთ პლატფორმაზე
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">₾{plan.price}</span>
                  <span className="text-slate-400">/{plan.duration_days} დღე</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {Array.isArray(plan.features) && plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* განახლებული ლინკი, რომელიც გადასცემს plan_id-ს */}
              <Link
                href={user ? `/payment?plan_id=${plan.id}` : '/register'}
                className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-semibold rounded-lg transition-colors"
              >
                {user ? 'პაკეტის შეძენა' : 'რეგისტრაცია'}
              </Link>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">როგორ მუშაობს?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-emerald-400 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">რეგისტრაცია</h4>
                <p className="text-sm text-slate-400">შექმენით ანგარიში და მიიღეთ "მომხმარებლის" სტატუსი</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-emerald-400 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">გადახდა</h4>
                <p className="text-sm text-slate-400">ატვირთეთ გადახდის ქვითარი და დაველოდოთ დამტკიცებას</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span className="text-emerald-400 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">დაწყება</h4>
                <p className="text-sm text-slate-400">მიიღეთ "თავმჯდომარის" სტატუსი და დაიწყეთ მუშაობა</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}