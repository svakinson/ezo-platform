'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconLogOut = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconSparkles = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
)

const IconBell = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconPlus = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconGift = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const IconEye = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconTrash = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconEdit = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconChart = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const IconShield = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconLayers = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

// ============ შიდა კომპონენტი ============
function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [viewAsUser, setViewAsUser] = useState<any>(null)
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
      
      const viewAsId = searchParams.get('view_as')

      if (viewAsId) {
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()

        if (adminProfile?.role !== 'admin') {
          router.replace('/dashboard')
          return
        }

        const { data: targetProfile } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, subscription_status, is_trial, trial_ends_at')
          .eq('id', viewAsId)
          .maybeSingle()

        if (targetProfile) {
          setViewAsUser(targetProfile)
        } else {
          router.replace('/dashboard')
          return
        }
      } else {
        const { data: myProfile } = await supabase
          .from('profiles')
          .select('id, email, full_name, role, subscription_status, is_trial, trial_ends_at')
          .eq('id', session.user.id)
          .maybeSingle()
        
        if (myProfile) {
          setUserProfile(myProfile)
        }
      }

      setLoading(false)
    }
    checkSession()

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [router, searchParams])

  useEffect(() => {
    const fetchBuildings = async () => {
      if (user) {
        const targetId = viewAsUser ? viewAsUser.id : user.id
        
        const { data } = await supabase
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
  }, [user, viewAsUser])

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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs w-full">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <IconBuilding className="w-5 h-5 text-emerald-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-slate-800 font-bold text-base mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-xs font-medium">მონაცემები ახლდება...</div>
        </div>
      </div>
    )
  }

  const userName = viewAsUser 
    ? (viewAsUser.full_name || viewAsUser.email) 
    : (userProfile?.full_name || user?.user_metadata?.full_name || 'მომხმარებელი')
    
  const userInitial = userName.charAt(0).toUpperCase()
  const hasBuilding = buildings.length > 0

  const isPaidOrTrial = userProfile?.subscription_status === 'active' || userProfile?.is_trial;

  const onboardingSteps = [
    { title: 'ანგარიშის შექმნა', desc: 'რეგისტრაცია წარმატებით დასრულდა', done: true },
    { title: 'პაკეტის არჩევა', desc: 'აირჩიე შენთვის შესაფერისი გეგმა', done: isPaidOrTrial, link: !isPaidOrTrial ? '/pricing' : undefined },
    { title: 'კორპუსის დამატება', desc: hasBuilding ? 'კორპუსი წარმატებით დაემატა' : 'დაამატე შენი კორპუსის ინფორმაცია', done: hasBuilding, link: hasBuilding ? undefined : '/dashboard/add-building' },
  ]
  
  const completedSteps = onboardingSteps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / onboardingSteps.length) * 100}%`

  const trialDaysLeft = userProfile?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(userProfile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* View As User Banner */}
      {viewAsUser && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <IconEye className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="truncate">
              რეჟიმი: <strong className="font-semibold text-slate-900">{viewAsUser.email}</strong> 
              <span className="hidden sm:inline opacity-40 mx-2">|</span>
              <span className="hidden sm:inline">როლი: {viewAsUser.role === 'chairman' ? 'თავმჯდომარე' : viewAsUser.role}</span>
            </span>
          </div>
          <Link 
            href="/admin/users" 
            className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0"
          >
            ← ადმინში დაბრუნება
          </Link>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all ${viewAsUser ? 'top-[41px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <IconBuilding className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">EZO</span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-1">Management</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              aria-label="შეტყობინებები"
              className="relative p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
            >
              <IconBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-3 pl-1">
              <div className="relative w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-slate-900/10 ring-2 ring-slate-100">
                {userInitial}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[140px]">{userName}</div>
                <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{viewAsUser ? viewAsUser.email : user?.email}</div>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-2.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2"
              title="გამოსვლა"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ⭐ STATS & PROFILE GRID ⭐ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: User Profile Status */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {getGreeting()}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {currentTime.toLocaleDateString('ka-GE', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 truncate mb-0.5">{userName}</h3>
              <p className="text-xs text-slate-400 truncate">{viewAsUser ? viewAsUser.email : user?.email}</p>
            </div>

            {userProfile?.is_trial && trialDaysLeft > 0 ? (
              <div className="mt-4 pt-3 border-t border-slate-100 bg-amber-50/50 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl border-amber-100/50">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
                  <IconGift className="w-3.5 h-3.5 text-amber-600" />
                  <span>Trial აქტიურია</span>
                </div>
                <div className="text-[11px] text-amber-700/80 mt-0.5">
                  დარჩენილია <strong className="text-amber-900">{trialDaysLeft} დღე</strong>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <IconCheck className="w-3.5 h-3.5" />
                <span>ავტორიზებული მომხმარებელი</span>
              </div>
            )}
          </div>

          {/* Card 2: Buildings Metric */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">კორპუსები</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <IconBuilding className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">{buildings.length}</div>
              {!viewAsUser ? (
                <Link 
                  href="/dashboard/add-building"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold group"
                >
                  <IconPlus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
                  <span>ახალი კორპუსი</span>
                </Link>
              ) : (
                <span className="text-xs text-slate-400">რეგისტრირებული</span>
              )}
            </div>
          </div>

          {/* Card 3: Balance Metric */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">ბალანსი</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <IconChart className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">₾0.00</div>
              <span className="text-xs text-slate-400">მიმდინარე თვის შემოსავალი</span>
            </div>
          </div>

          {/* Card 4: System Readiness */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">სისტემის სტატუსი</span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <IconShield className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">100%</div>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ყველა სერვისი აქტიურია
              </span>
            </div>
          </div>

        </div>

        {/* Onboarding Guide */}
        {completedSteps < onboardingSteps.length && !viewAsUser && (
          <div className="mb-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                    <IconSparkles className="w-4 h-4" />
                  </span>
                  <h2 className="text-lg font-bold text-white">დაწყების გზამკვლევი</h2>
                </div>
                <p className="text-slate-400 text-xs">შეავსეთ ნაბიჯები პლატფორმის სრულყოფილად გამოსაყენებლად</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-400">{completedSteps} / {onboardingSteps.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">შესრულებული</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 mb-4">
              {onboardingSteps.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => step.link && router.push(step.link)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    step.done 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                      : step.link 
                        ? 'bg-slate-800/80 border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800 cursor-pointer group' 
                        : 'bg-slate-800/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                    step.done 
                      ? 'bg-emerald-500 text-slate-900' 
                      : 'bg-slate-700 text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-colors'
                  }`}>
                    {step.done ? <IconCheck className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate mb-0.5">{step.title}</div>
                    <div className="text-[11px] text-slate-400 truncate">{step.desc}</div>
                  </div>
                  {step.link && !step.done && (
                    <IconArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden relative z-10">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" 
                style={{ width: progressWidth }} 
              />
            </div>
          </div>
        )}

        {/* Buildings Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <IconBuilding className="w-5 h-5 text-emerald-600" />
                ჩემი კორპუსები
              </h2>
              <p className="text-xs text-slate-400">მართეთ თქვენი უძრავი ქონების ობიექტები</p>
            </div>

            {!viewAsUser && (
              <Link 
                href="/dashboard/add-building" 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <IconPlus className="w-4 h-4" />
                <span>კორპუსის დამატება</span>
              </Link>
            )}
          </div>

          {buildingsLoading ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 flex flex-col items-center justify-center">
              <IconLoader className="w-8 h-8 text-emerald-600 mb-2" />
              <p className="text-xs text-slate-400 font-medium">კორპუსები იტვირთება...</p>
            </div>
          ) : buildings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {buildings.map((building) => (
                <div 
                  key={building.id} 
                  className="bg-white border border-slate-200/80 hover:border-emerald-500/40 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                        <IconBuilding className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        აქტიური
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-emerald-600 transition-colors" title={building.name || building.street}>
                      {building.name || building.street}
                    </h3>
                    
                    <p className="text-xs text-slate-400 mb-4 truncate">
                      {building.city}{building.district ? `, ${building.district}` : ''}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-5">
                      <div className="bg-slate-50 p-2 rounded-lg text-center">
                        <div className="text-xs font-bold text-slate-800">{building.apartments_count || 0}</div>
                        <div className="text-[10px] text-slate-400">ბინა</div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg text-center">
                        <div className="text-xs font-bold text-slate-800">{building.entrances_count || 0}</div>
                        <div className="text-[10px] text-slate-400">სადარბაზო</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    {!viewAsUser ? (
                      <div className="grid grid-cols-3 gap-1.5">
                        <Link 
                          href={`/dashboard/building/${building.id}`} 
                          className="col-span-3 text-center py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm mb-1"
                        >
                          მართვა
                        </Link>
                        <Link 
                          href={`/dashboard/building/${building.id}/edit`} 
                          className="col-span-2 text-center py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <IconEdit className="w-3.5 h-3.5" />
                          რედაქტირება
                        </Link>
                        <button 
                          onClick={() => handleDeleteBuilding(building.id)} 
                          className="col-span-1 text-center py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-lg transition-colors flex items-center justify-center"
                          title="წაშლა"
                        >
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-slate-400 py-1.5 bg-slate-50 rounded-lg">
                        მხოლოდ ნახვის რეჟიმი
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <IconBuilding className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">
                {viewAsUser ? 'მომხმარებელს კორპუსი არ აქვს' : 'კორპუსი ჯერ არ არის დამატებული'}
              </h3>
              <p className="text-xs text-slate-400 mb-4 max-w-sm">
                {viewAsUser 
                  ? 'ამ მომხმარებლის ანგარიშზე ჯერ არ ფიქსირდება აქტიური ობიექტები.' 
                  : 'დაამატეთ თქვენი პირველი კორპუსი, რათა დაიწყოთ მართვა და სერვისების გამოყენება.'}
              </p>
              {!viewAsUser && (
                <Link 
                  href="/dashboard/add-building" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-emerald-600/20"
                >
                  <IconPlus className="w-4 h-4" />
                  <span>დაამატე პირველი კორპუსი</span>
                </Link>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

// ============ მთავარი ექსპორტი Suspense-ით ============
export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs w-full">
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <IconBuilding className="w-5 h-5 text-emerald-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-slate-800 font-bold text-base mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-xs font-medium">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}