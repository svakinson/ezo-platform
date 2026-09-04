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
    if (confirm('დარწმუნებული ხარ, რომ გსურს ამ კორპუსის წაშლა?')) {
      const { error } = await supabase.from('buildings').delete().eq('id', id)
      if (error) {
        alert('შეცდომა: ' + error.message)
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-xs w-full shadow-2xl">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
            <div className="relative w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
            <IconBuilding className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-white font-bold text-lg mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-sm">მონაცემები ახლდება...</div>
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
    { title: 'ანგარიშის შექმნა', desc: 'რეგისტრაცია დასრულდა', done: true },
    { title: 'პაკეტის არჩევა', desc: 'აირჩიე გეგმა', done: isPaidOrTrial, link: !isPaidOrTrial ? '/pricing' : undefined },
    { title: 'კორპუსის დამატება', desc: hasBuilding ? 'დაემატა' : 'დაამატე კორპუსი', done: hasBuilding, link: hasBuilding ? undefined : '/dashboard/add-building' },
  ]
  
  const completedSteps = onboardingSteps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / onboardingSteps.length) * 100}%`

  const trialDaysLeft = userProfile?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(userProfile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* View As Banner */}
      {viewAsUser && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-md px-4 py-2.5 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <IconEye className="w-4 h-4 text-amber-400" />
            <span className="truncate text-amber-200">
              <strong>{viewAsUser.email}</strong>
              <span className="hidden sm:inline text-amber-400/70 mx-2">•</span>
              <span className="hidden sm:inline">{viewAsUser.role === 'chairman' ? 'თავმჯდომარე' : viewAsUser.role}</span>
            </span>
          </div>
          <Link href="/admin/users" className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg font-medium transition-colors border border-amber-500/30">
            ← დაბრუნება
          </Link>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 ${viewAsUser ? 'top-[41px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <IconBuilding className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">EZO</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">Management</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="sm:hidden flex items-center gap-2">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  {userInitial}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse"></span>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                <IconLogOut className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  {userInitial}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse"></span>
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-white">{userName}</div>
                <div className="text-xs text-slate-400">{viewAsUser ? viewAsUser.email : user?.email}</div>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                <IconLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          
          {/* Card 1: User Profile */}
          <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {getGreeting()}
                </span>
                <span className="text-[11px] text-slate-400">
                  {currentTime.toLocaleDateString('ka-GE', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <h3 className="text-base font-bold text-white truncate mb-0.5">{userName}</h3>
              <p className="text-xs text-slate-400 truncate mb-4">{viewAsUser ? viewAsUser.email : user?.email}</p>

              {userProfile?.is_trial && trialDaysLeft > 0 ? (
                <div className="pt-3 border-t border-white/10 bg-amber-500/10 -mx-5 -mb-5 p-3 px-5 rounded-b-2xl border-t-amber-500/20">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                    <IconGift className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trial აქტიურია</span>
                  </div>
                  <div className="text-[11px] text-amber-200/80 mt-0.5">
                    დარჩენილია <strong className="text-amber-300">{trialDaysLeft} დღე</strong>
                  </div>
                </div>
              ) : (
                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <IconCheck className="w-3.5 h-3.5" />
                  <span>დადასტურებული</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Buildings */}
          <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">კორპუსები</span>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <IconBuilding className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1">{buildings.length}</div>
              {!viewAsUser ? (
                <Link href="/dashboard/add-building" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>ახალი</span>
                </Link>
              ) : (
                <span className="text-xs text-slate-400">აქტიური</span>
              )}
            </div>
          </div>

          {/* Card 3: Balance */}
          <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">ბალანსი</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <IconChart className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1">₾0</div>
              <span className="text-xs text-slate-400">ამ თვის შემოსავალი</span>
            </div>
          </div>

          {/* Card 4: Status */}
          <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">სტატუსი</span>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <IconShield className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                აქტიურია
              </span>
            </div>
          </div>

        </div>

        {/* Onboarding Guide */}
        {completedSteps < onboardingSteps.length && !viewAsUser && (
          <div className="mb-6 sm:mb-8 relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <IconSparkles className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-base sm:text-lg font-bold text-white">დაწყების გზამკვლევი</h2>
                  </div>
                  <p className="text-slate-400 text-xs">შეავსეთ ნაბიჯები სრული ფუნქციონალისთვის</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-400">{completedSteps}/{onboardingSteps.length}</div>
                  <div className="text-[10px] text-slate-400">შესრულებული</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {onboardingSteps.map((step, i) => (
                  <div 
                    key={i} 
                    onClick={() => step.link && router.push(step.link)}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      step.done 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : step.link 
                          ? 'bg-slate-800/50 border-white/10 hover:border-emerald-500/30 cursor-pointer hover:bg-slate-800' 
                          : 'bg-slate-800/30 border-white/5 opacity-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                      step.done ? 'bg-emerald-500 text-slate-900' : 'bg-white/10 text-slate-400'
                    }`}>
                      {step.done ? <IconCheck className="w-4 h-4" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate mb-0.5">{step.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/50" style={{ width: progressWidth }} />
              </div>
            </div>
          </div>
        )}

        {/* Buildings Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <IconBuilding className="w-5 h-5 text-emerald-400" />
                ჩემი კორპუსები
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">მართეთ თქვენი ობიექტები</p>
            </div>
            {!viewAsUser && (
              <Link href="/dashboard/add-building" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95">
                <IconPlus className="w-4 h-4" />
                <span>კორპუსის დამატება</span>
              </Link>
            )}
          </div>

          {buildingsLoading ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center">
              <IconLoader className="w-8 h-8 text-emerald-400 mb-2" />
              <p className="text-xs text-slate-400">იტვირთება...</p>
            </div>
          ) : buildings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {buildings.map((building) => (
                <div key={building.id} className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-emerald-500/20 border border-white/10 group-hover:border-emerald-500/30 text-slate-400 group-hover:text-emerald-400 flex items-center justify-center transition-all">
                        <IconBuilding className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">აქტიური</span>
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1 truncate group-hover:text-emerald-300 transition-colors">
                      {building.name || building.street}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 truncate">
                      {building.city}{building.district ? `, ${building.district}` : ''}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-slate-800/50 p-2 rounded-lg text-center border border-white/5">
                        <div className="text-xs font-bold text-white">{building.apartments_count || 0}</div>
                        <div className="text-[10px] text-slate-400">ბინა</div>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded-lg text-center border border-white/5">
                        <div className="text-xs font-bold text-white">{building.entrances_count || 0}</div>
                        <div className="text-[10px] text-slate-400">სადარბაზო</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      {!viewAsUser ? (
                        <div className="grid grid-cols-3 gap-1.5">
                          <Link href={`/dashboard/building/${building.id}`} className="col-span-3 text-center py-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-semibold rounded-xl transition-all mb-1">
                            მართვა
                          </Link>
                          <Link href={`/dashboard/building/${building.id}/edit`} className="col-span-2 text-center py-1.5 bg-slate-800/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 text-xs font-medium rounded-lg transition-colors border border-white/5">
                            რედაქტირება
                          </Link>
                          <button onClick={() => handleDeleteBuilding(building.id)} className="col-span-1 text-center py-1.5 bg-slate-800/50 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-medium rounded-lg transition-colors border border-white/5">
                            <IconTrash className="w-3.5 h-3.5 mx-auto" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-xs text-slate-400 py-1.5 bg-slate-800/30 rounded-lg border border-white/5">მხოლოდ ნახვა</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-dashed border-white/10 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-white/10 flex items-center justify-center text-slate-400 mb-4 mx-auto">
                  <IconBuilding className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">
                  {viewAsUser ? 'კორპუსი არ არის' : 'დაამატეთ პირველი კორპუსი'}
                </h3>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  {viewAsUser ? 'ამ მომხმარებელს ჯერ არ აქვს კორპუსები.' : 'დაიწყეთ მართვა პირველი ბიექტის დამატებით.'}
                </p>
                {!viewAsUser && (
                  <Link href="/dashboard/add-building" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25">
                    <IconPlus className="w-4 h-4" />
                    <span>დამატება</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

// ============ მთავარი ექსპორტი ============
export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-xs w-full shadow-2xl">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
            <div className="relative w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
            <IconBuilding className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-white font-bold text-lg mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}