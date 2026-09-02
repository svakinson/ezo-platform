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

const IconZap = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        setUserName(user.email?.split('@')[0] || 'მომხმარებელი')
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, subscription_status')
          .eq('id', user.id)
          .maybeSingle()

        if (profile) {
          setUserRole(profile.role)
          if (profile.role === 'chairman' && profile.subscription_status === 'active') {
            router.push('/dashboard')
          }
        }
      }

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">იტვირთება...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconBuilding className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">EZO Platform</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm text-slate-300">{userName}</span>
                </div>
                
                {userRole === 'user' && (
                  <Link href="/payment" className="text-sm text-slate-300 hover:text-white transition-colors">
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
              <>
                <Link href="/login" className="text-sm text-slate-300 hover:text-white transition-colors">
                  შესვლა
                </Link>
                <Link href="/register" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
                  რეგისტრაცია
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION: პრობლემის გადაჭრა და ღირებულება */}
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <IconZap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">კორპუსის მართვა ახალ დონეზე</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              დაივიწყეთ ქაღალდის ჟურნალები და <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">გაუგებრობები</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              EZO გთავაზობთ სრულად ავტომატიზირებულ, გამჭვირვალე და უსაფრთხო პლატფორმას თქვენი საცხოვრებელი კომპლექსის ეფექტური მართვისთვის. ყველაფერი ერთ სივრცეში.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#pricing" 
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                პაკეტის ნახვა
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all"
              >
                უფასო რეგისტრაცია
              </Link>
            </div>
          </div>
        </section>

        {/* 2. FEATURES SECTION: რატომ EZO? */}
        <section className="py-20 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">რატომ უნდა აირჩიოთ EZO?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                ჩვენი პლატფორმა შექმნილია სპეციალურად ქართული რეალობის გათვალისწინებით, რათა მაქსიმალურად გაგიმარტივოთ ყოველდღიური ოპერაციები.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: IconShield,
                  title: 'სრული ფინანსური კონტროლი',
                  desc: 'ყველა შემოსავალი და ხარჯი ფიქსირდება რეალურ დროში. ავტომატური ანგარიშგება და გადახდების გამჭვირვალე ისტორია.'
                },
                {
                  icon: IconUsers,
                  title: 'მარტივი კომუნიკაცია',
                  desc: 'პირდაპირი კავშირი თავმჯდომარესა და მაცხოვრებლებს შორის. შეტყობინებები, განცხადებები და ხმის მიცემა ერთ სივრცეში.'
                },
                {
                  icon: IconZap,
                  title: 'ავტომატიზებული პროცესები',
                  desc: 'დაივიწყეთ ხელით შევსება. ქვითრების ატვირთვა, ვადების კონტროლი და შეხსენებები სისტემას ავტომატურად მიჰყავს.'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS: 3 მარტივი ნაბიჯი */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">როგორ მუშაობს პლატფორმა?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                სრული ფუნქციონალით სარგებლობა მხოლოდ 3 მარტივ ნაბიჯშია შესაძლებელი.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              
              {[
                { step: '01', title: 'რეგისტრაცია', desc: 'შექმენით ანგარიში რამდენიმე წამში და მიიღეთ "მომხმარებლის" საწყისი სტატუსი.' },
                { step: '02', title: 'პაკეტის შერჩევა', desc: 'აირჩიეთ შესაფერისი გეგმა, გადაიხადეთ ბანკში ან ონლაინ და ატვირთეთ ქვითარი.' },
                { step: '03', title: 'მართვის დაწყება', desc: 'ადმინისტრატორის დამტკიცების შემდეგ, მიიღეთ "თავმჯდომარის" სტატუსი და სრული წვდომა.' }
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6 relative z-10">
                    <span className="text-3xl font-bold text-emerald-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PRICING SECTION: კონკრეტული შეთავაზება */}
        <section id="pricing" className="py-20 bg-slate-900/50 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">აირჩიეთ თქვენი პაკეტი</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                გამჭვირვალე ფასები, დამატებითი ხარჯების გარეშე. აირჩიეთ ის, რაც საუკეთესოდ შეესაბამება თქვენს კორპუსს.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
                >
                  {/* Popular Badge (optional, if you want to highlight one) */}
                  {plan.price === 50 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      ყველაზე პოპულარული
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">₾{plan.price}</span>
                      <span className="text-slate-400">/{plan.duration_days} დღე</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {Array.isArray(plan.features) && plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={user ? `/payment?plan_id=${plan.id}` : '/register'}
                    className="block w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-semibold rounded-xl transition-colors"
                  >
                    {user ? 'პაკეტის შეძენა' : 'უფასო რეგისტრაცია'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} EZO Platform. ყველა უფლება დაცულია.
        </div>
      </footer>
    </div>
  )
}