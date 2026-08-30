'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconStar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconSparkles = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
)

const IconZap = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconChart = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const IconShield = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconBell = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconRocket = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ STAT CARD ============
function StatCard({ icon: Icon, label, value, sublabel, gradient }: { 
  icon: any; 
  label: string; 
  value: string; 
  sublabel: string;
  gradient: string;
}) {
  return (
    <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-300 mb-1">{label}</div>
      <div className="text-xs text-slate-500">{sublabel}</div>
    </div>
  )
}

// ============ MAIN PAGE ============

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [buildings, setBuildings] = useState<any[]>([])
  const [buildingsLoading, setBuildingsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }
    checkSession()

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [router])

  useEffect(() => {
    const fetchBuildings = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('buildings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (data) {
          setBuildings(data)
        }
        setBuildingsLoading(false)
      }
    }
    if (user) fetchBuildings()
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'დილა მშვიდობისა'
    if (hour < 18) return 'დღე მშვიდობისა'
    return 'საღამო მშვიდობისა'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    )
  }

  const userName = user?.user_metadata?.full_name || 'მომხმარებელი'
  const userInitial = userName.charAt(0).toUpperCase()
  const hasBuilding = buildings.length > 0

  // Dynamic onboarding steps based on real data
  const onboardingSteps = [
    { title: 'ანგარიშის შექმნა', desc: 'რეგისტრაცია წარმატებით დასრულდა', done: true },
    { title: 'პაკეტის არჩევა', desc: 'აირჩიე შენთვის შესაფერისი გეგმა', done: true },
    { title: 'კორპუსის დამატება', desc: hasBuilding ? 'კორპუსი წარმატებით დაემატა' : 'დაამატე შენი კორპუსის ინფორმაცია', done: hasBuilding, link: hasBuilding ? undefined : '/dashboard/add-building' },
  ]
  
  const completedSteps = onboardingSteps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / onboardingSteps.length) * 100}%`

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <IconBuilding className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EZO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>
            
            <div className="hidden sm:block h-8 w-px bg-white/10"></div>
            
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{userName}</div>
                <div className="text-xs text-slate-400">{user?.email}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
                {userInitial}
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Welcome Banner */}
        <div className="mb-8 bg-slate-800/50 border border-white/10 rounded-3xl p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {userInitial}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                  <IconCheck className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-emerald-400 text-sm font-medium">{getGreeting()}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 text-sm">
                    {currentTime.toLocaleDateString('ka-GE', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">{userName}!</h1>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/dashboard/add-building"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                <IconBuilding className="w-5 h-5" />
                <span>კორპუსის დამატება</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={IconBuilding}
            label="კორპუსები"
            value={buildings.length.toString()}
            sublabel={hasBuilding ? "აქტიური კორპუსი" : "დაამატე პირველი კორპუსი"}
            gradient="from-emerald-500 to-teal-600"
          />
          <StatCard
            icon={IconChart}
            label="ბალანსი"
            value="₾0"
            sublabel="ამ თვის შემოსავალი"
            gradient="from-blue-500 to-cyan-600"
          />
          <StatCard
            icon={IconZap}
            label="აქტივობა"
            value={hasBuilding ? "აქტიური" : "0"}
            sublabel="ბოლო 30 დღე"
            gradient="from-amber-500 to-orange-600"
          />
          <StatCard
            icon={IconShield}
            label="უსაფრთხოება"
            value="100%"
            sublabel="ანგარიში დაცულია"
            gradient="from-purple-500 to-pink-600"
          />
        </div>

        {/* Onboarding Progress */}
        <div className="mb-8 bg-slate-800/50 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <IconSparkles className="w-5 h-5 text-emerald-400" />
                დაწყების გზამკვლევი
              </h2>
              <p className="text-slate-400 text-sm">შეავსე ეს ნაბიჯები სრული ფუნქციონალის მისაღებად</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{completedSteps}/{onboardingSteps.length}</div>
              <div className="text-xs text-slate-500">ნაბიჯი შესრულებული</div>
            </div>
          </div>

          <div className="space-y-3">
            {onboardingSteps.map((step, i) => (
              <div 
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  step.done 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : step.link 
                      ? 'bg-slate-900/50 border-white/10 hover:border-emerald-500/30 cursor-pointer group' 
                      : 'bg-slate-900/50 border-white/10 opacity-50'
                }`}
                onClick={() => step.link && router.push(step.link)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  step.done 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/10 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                }`}>
                  {step.done ? <IconCheck className="w-5 h-5" /> : <span className="font-bold">{i + 1}</span>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-0.5">{step.title}</div>
                  <div className="text-sm text-slate-400 truncate">{step.desc}</div>
                </div>

                {step.link && !step.done && (
                  <IconArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: progressWidth }} />
          </div>
        </div>

        {/* My Buildings Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
              ჩემი კორპუსები
            </h2>
            <Link 
              href="/dashboard/add-building"
              className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
            >
              <IconArrowRight className="w-4 h-4 rotate-[-90deg]" />
              ახლის დამატება
            </Link>
          </div>

          {buildingsLoading ? (
            <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 flex items-center justify-center">
              <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : buildings.length > 0 ? (
            <div className="space-y-4">
              {buildings.map((building) => (
                <div key={building.id} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <IconBuilding className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{building.name || building.street}</h3>
                        <p className="text-sm text-slate-400">{building.city}{building.district ? `, ${building.district}` : ''}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> {building.apartments_count} ბინა</span>
                          <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> {building.entrances_count} სადარბაზო</span>
                          {building.total_area && (
                            <span className="flex items-center gap-1"><IconCheck className="w-3 h-3 text-emerald-400" /> {building.total_area} მ²</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link 
                      href={`/dashboard/building/${building.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      მართვა
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-white/10 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
                <IconBuilding className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">კორპუსი ჯერ არ არის დამატებული</h3>
              <p className="text-sm text-slate-400 mb-4 max-w-sm">დაამატე შენი კორპუსის ინფორმაცია, რათა დაიწყო სრულფასოვანი მართვა.</p>
              <Link 
                href="/dashboard/add-building"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                <IconArrowRight className="w-4 h-4 rotate-[-90deg]" />
                კორპუსის დამატება
              </Link>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <IconBuilding className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">კორპუსის მართვა</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              დაამატე ბინები, მაცხოვრებლები და მართე ყოველდღიური ოპერაციები ერთი სივრციდან.
            </p>
          </div>

          <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <IconChart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">ფინანსები</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              აკონტროლე შემოსავლები, ხარჯები და გადახდები ერთ სივრცეში.
            </p>
          </div>

          <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <IconShield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white mb-2">ანალიტიკა</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              მიიღე დეტალური ანგარიშები და ინსაიტები შენი კორპუსის შესახებ.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <IconRocket className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">მზად ხარ დასაწყებად?</span>
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              აირჩიე პაკეტი და დაიწყე
            </h3>
            <p className="text-slate-400 mb-8">
              შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს ყოველდღიური მართვისთვის.
            </p>
            
            <Link 
              href="/dashboard/plans"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              <span>ნახე პაკეტები</span>
              <IconArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}