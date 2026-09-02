'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation' // დამატებულია useSearchParams
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

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconEdit = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

// ⭐ ახალი იკონი View As User ბანერისთვის ⭐
const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
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
  const searchParams = useSearchParams() // ⭐ წაიკითხე URL პარამეტრები
  
  const [user, setUser] = useState<any>(null)
  const [viewAsUser, setViewAsUser] = useState<any>(null) // ⭐ ვის ხედავს ადმინი
  const [loading, setLoading] = useState(true)
  const [buildings, setBuildings] = useState<any[]>([])
  const [buildingsLoading, setBuildingsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      
      setUser(session.user)
      
      // ⭐ View As User ლოგიკა ⭐
      const viewAsId = searchParams.get('view_as')
      if (viewAsId) {
        // შევამოწმოთ არის თუ არა მიმდინარე მომხმარებელი ადმინი
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()

        if (adminProfile?.role !== 'admin') {
          // თუ ადმინი არ არის, წავშალოთ პარამეტრი და გავაგრძელოთ ჩვეულებრივად
          router.replace('/dashboard')
          return
        }

        // მივიღოთ იმ მომხმარებლის ინფო, ვისაც ვუყურებთ
        const { data: targetProfile } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, subscription_status')
          .eq('id', viewAsId)
          .maybeSingle()

        if (targetProfile) {
          setViewAsUser(targetProfile)
        } else {
          // თუ მომხმარებელი არ მოიძებნა, დავბრუნდეთ ჩვეულებრივ Dashboard-ზე
          router.replace('/dashboard')
          return
        }
      }

      setLoading(false)
    }
    checkSession()

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [router, searchParams]) // ⭐ დამატებულია searchParams

  useEffect(() => {
    const fetchBuildings = async () => {
      if (user) {
        // ⭐ თუ viewAsUser არსებობს, მისი ID გამოვიყენოთ, თუ არა - მიმდინარე მომხმარებლის
        const targetId = viewAsUser ? viewAsUser.id : user.id
        
        const { data, error } = await supabase
          .from('buildings')
          .select('*')
          .eq('user_id', targetId)
          .order('created_at', { ascending: false })
        
        if (data) {
          setBuildings(data)
        }
        setBuildingsLoading(false)
      }
    }
    if (user) fetchBuildings()
  }, [user, viewAsUser]) // ⭐ დამატებულია viewAsUser

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDeleteBuilding = async (id: string) => {
    if (confirm('დარწმუნებული ხარ, რომ გსურს ამ კორპუსის წაშლა? ეს მოქმედება შეუქცევადია.')) {
      const { error } = await supabase.from('buildings').delete().eq('id', id)
      if (error) {
        alert('შეცდომა წაშლისას: ' + error.message)
      } else {
        setBuildings(prev => prev.filter(b => b.id !== id))
      }
    }
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

  // ⭐ სახელის და ინიციალის განსაზღვრა View As User რეჟიმისთვის
  const userName = viewAsUser 
    ? (viewAsUser.full_name || viewAsUser.email) 
    : (user?.user_metadata?.full_name || 'მომხმარებელი')
    
  const userInitial = userName.charAt(0).toUpperCase()
  const hasBuilding = buildings.length > 0

  const onboardingSteps = [
    { title: 'ანგარიშის შექმნა', desc: 'რეგისტრაცია წარმატებით დასრულდა', done: true },
    { title: 'პაკეტის არჩევა', desc: 'აირჩიე შენთვის შესაფერისი გეგმა', done: true },
    { title: 'კორპუსის დამატება', desc: hasBuilding ? 'კორპუსი წარმატებით დაემატა' : 'დაამატე შენი კორპუსის ინფორმაცია', done: hasBuilding, link: hasBuilding ? undefined : '/dashboard/add-building' },
  ]
  
  const completedSteps = onboardingSteps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / onboardingSteps.length) * 100}%`

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* ⭐ VIEW AS USER BANNER ⭐ */}
      {viewAsUser && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 text-amber-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm max-w-4xl">
            <IconEye className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="truncate">
              თქვენ ხედავთ ინტერფეისს როგორც: <strong className="text-white">{viewAsUser.email}</strong> 
              <span className="text-amber-400/70 mx-2">|</span>
              როლი: {viewAsUser.role === 'chairman' ? 'თავმჯდომარე' : viewAsUser.role}
            </span>
          </div>
          <Link 
            href="/admin/users" 
            className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0"
          >
            ← ადმინ პანელში დაბრუნება
          </Link>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 bg-slate-900 border-b border-white/10 ${viewAsUser ? 'top-[50px]' : ''}`}>
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
                <div className="text-xs text-slate-400">{viewAsUser ? viewAsUser.email : user?.email}</div>
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
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {viewAsUser ? `${userName}-ის პანელი` : `${userName}!`}
                </h1>
                <p className="text-slate-400 text-sm">{viewAsUser ? viewAsUser.email : user?.email}</p>
              </div>
            </div>

            {/* ⭐ დამალე "კორპუსის დამატება" ღილაკი, თუ სხვის ანგარიშს უყურებ (Read-Only) ⭐ */}
            {!viewAsUser && (
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
            )}
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
        {completedSteps < onboardingSteps.length && !viewAsUser && (
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

            <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: progressWidth }} />
            </div>
          </div>
        )}

        {/* My Buildings Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
              ჩემი კორპუსები
            </h2>
            {!viewAsUser && (
              <Link 
                href="/dashboard/add-building"
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              >
                <IconArrowRight className="w-4 h-4 rotate-[-90deg]" />
                ახლის დამატება
              </Link>
            )}
          </div>

          {buildingsLoading ? (
            <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-12 flex items-center justify-center">
              <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : buildings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {buildings.map((building) => (
                <div key={building.id} className="group bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <IconBuilding className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-white text-sm mb-1 truncate" title={building.name || building.street}>
                    {building.name || building.street}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mb-3 truncate">
                    {building.city}{building.district ? `, ${building.district}` : ''}
                  </p>

                  <div className="space-y-1 mb-4 flex-grow">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <IconCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{building.apartments_count || 0} ბინა</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <IconCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{building.entrances_count || 0} სადარბაზო</span>
                    </div>
                    {building.total_area && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <IconCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{building.total_area} მ²</span>
                      </div>
                    )}
                  </div>

                  {/* ⭐ Action Buttons: Read-Only if viewing as user ⭐ */}
                  <div className="flex flex-col gap-1.5 pt-3 border-t border-white/10 mt-auto">
                    {!viewAsUser ? (
                      <>
                        <Link 
                          href={`/dashboard/building/${building.id}/edit`}
                          className="w-full px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <IconEdit className="w-3 h-3" />
                          რედაქტირება
                        </Link>
                        <Link 
                          href={`/dashboard/building/${building.id}`}
                          className="w-full px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <IconBuilding className="w-3 h-3" />
                          მართვა
                        </Link>
                        <button 
                          onClick={() => handleDeleteBuilding(building.id)}
                          className="w-full px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <IconTrash className="w-3 h-3" />
                          წაშლა
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-xs text-slate-500 py-1.5 bg-slate-900/50 rounded-lg border border-white/5">
                        მხოლოდ ნახვის რეჟიმი
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-white/10 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
                <IconBuilding className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {viewAsUser ? 'ამ მომხმარებელს კორპუსი არ აქვს' : 'კორპუსი ჯერ არ არის დამატებული'}
              </h3>
              <p className="text-sm text-slate-400 mb-4 max-w-sm">
                {viewAsUser ? 'ეს მომხმარებელი ჯერ არ არის დაკავშირებული არცერთ კორპუსთან.' : 'დაამატე შენი კორპუსის ინფორმაცია, რათა დაიწყო სრულფასოვანი მართვა.'}
              </p>
              {!viewAsUser && (
                <Link 
                  href="/dashboard/add-building"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
                >
                  <IconArrowRight className="w-4 h-4 rotate-[-90deg]" />
                  კორპუსის დამატება
                </Link>
              )}
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
        {!viewAsUser && (
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
        )}
      </main>
    </div>
  )
}