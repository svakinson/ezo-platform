'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconGift = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
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

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
      <div className="min-h-screen bg-slate-950 ezo-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ...</div>
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
    <div className="min-h-screen bg-slate-950 ezo-dashboard relative overflow-hidden">
      <div className="ezo-orb ezo-orb-one" />
      <div className="ezo-orb ezo-orb-two" />
      <div className="ezo-grid" />
      <style jsx global>{`
        .ezo-dashboard {
          color-scheme: dark;
          background:
            radial-gradient(circle at 12% 8%, rgba(16,185,129,.10), transparent 26%),
            radial-gradient(circle at 88% 16%, rgba(59,130,246,.08), transparent 25%),
            #070a12;
        }
        .ezo-header {
          background: rgba(7,10,18,.72);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 1px 0 rgba(255,255,255,.04), 0 12px 40px rgba(0,0,0,.18);
        }
        .ezo-card, .ezo-building-card, .ezo-empty {
          box-shadow: 0 18px 60px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.035);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .ezo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 70px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.05);
        }
        .ezo-building-card {
          position: relative;
          overflow: hidden;
        }
        .ezo-building-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(16,185,129,.06), transparent 45%, rgba(34,211,238,.035));
          opacity: 0;
          transition: opacity .25s ease;
        }
        .ezo-building-card:hover::before { opacity: 1; }
        .ezo-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          pointer-events: none;
          opacity: .28;
        }
        .ezo-orb-one {
          width: 280px; height: 280px; left: -160px; top: 280px;
          background: rgba(16,185,129,.18);
        }
        .ezo-orb-two {
          width: 340px; height: 340px; right: -180px; top: 520px;
          background: rgba(99,102,241,.14);
        }
        .ezo-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .18;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ezo-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        }
      `}</style>
      {/* View As User Banner */}
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

      <header className={`sticky top-0 z-40 ezo-header border-b border-white/10 ${viewAsUser ? 'top-[50px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,.25)] group-hover:scale-105 transition-transform">
              <IconBuilding className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">EZO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </button>
            
            <div className="hidden sm:block h-8 w-px bg-white/10"></div>
            
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{userName}</div>
                <div className="text-xs text-slate-400">{viewAsUser ? viewAsUser.email : user?.email}</div>
              </div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
                {userInitial}
                {/* Notification dot */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 relative z-10">
        
        {/* ⭐ 4 COMPACT BLOCKS ⭐ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Block 1: User Profile + Trial Info */}
          <div className="ezo-card bg-slate-900/55 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                  {userInitial}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                  <IconCheck className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-emerald-400 font-medium mb-0.5">{getGreeting()}</div>
                <div className="text-[10px] text-slate-500">
                  {currentTime.toLocaleDateString('ka-GE', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-bold text-white mb-0.5">{userName}!</h3>
              <p className="text-xs text-slate-400 truncate">{viewAsUser ? viewAsUser.email : user?.email}</p>
            </div>
            {userProfile?.is_trial && trialDaysLeft > 0 && (
              <div className="mt-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300">
                  <IconGift className="w-3 h-3 flex-shrink-0" />
                  <span className="font-medium">უფასო საცდელი პერიოდი</span>
                </div>
                <div className="text-[10px] text-amber-200/70 mt-0.5">
                  დარჩენილია: <span className="font-semibold text-amber-300">{trialDaysLeft} დღე</span> სრული წვდომით.
                </div>
              </div>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400">
              <IconCheck className="w-3 h-3" />
              <span>დადასტურებული ანგარიში</span>
            </div>
          </div>

          {/* Block 2: Buildings */}
          <div className="ezo-card bg-slate-900/55 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/10">
              <IconBuilding className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{buildings.length}</div>
            <div className="text-xs text-slate-300 mb-1.5">კორპუსები</div>
            {!viewAsUser && (
              <Link 
                href="/dashboard/add-building"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <IconPlus className="w-3 h-3" />
                დაამატე კორპუსი
              </Link>
            )}
          </div>

          {/* Block 3: Balance */}
          <div className="ezo-card bg-slate-900/55 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
              <IconChart className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">₾0</div>
            <div className="text-xs text-slate-300 mb-1.5">ბალანსი</div>
            <div className="text-[10px] text-slate-500">ამ თვის შემოსავალი</div>
          </div>

          {/* Block 4: Test/Placeholder */}
          <div className="ezo-card bg-slate-900/55 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/10">
              <IconShield className="w-4 h-4 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">100%</div>
            <div className="text-xs text-slate-300 mb-1.5">მზაობა</div>
            <div className="text-[10px] text-slate-500">ანგარიში აქტიურია</div>
          </div>

        </div>

        {/* Onboarding Steps */}
        {completedSteps < onboardingSteps.length && !viewAsUser && (
          <div className="ezo-card mb-7 bg-slate-900/55 border border-white/10 rounded-2xl p-6 lg:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <IconSparkles className="w-4 h-4 text-emerald-400" />
                  დაწყების გზამკვლევი
                </h2>
                <p className="text-slate-400 text-xs">შეავსე ეს ნაბიჯები სრული ფუნქციონალის მისაღებად</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{completedSteps}/{onboardingSteps.length}</div>
                <div className="text-[10px] text-slate-500">ნაბიჯი შესრულებული</div>
              </div>
            </div>
            <div className="space-y-2">
              {onboardingSteps.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${step.done ? 'bg-emerald-500/10 border-emerald-500/30' : step.link ? 'bg-slate-900/50 border-white/10 hover:border-emerald-500/30 cursor-pointer group' : 'bg-slate-900/50 border-white/10 opacity-50'}`} onClick={() => step.link && router.push(step.link)}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'}`}>
                    {step.done ? <IconCheck className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                    <div className="text-xs text-slate-400 truncate">{step.desc}</div>
                  </div>
                  {step.link && !step.done && <IconArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />}
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: progressWidth }} />
            </div>
          </div>
        )}

        {/* Buildings List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <IconBuilding className="w-4 h-4 text-emerald-400" />
              ჩემი კორპუსები
            </h2>
            {!viewAsUser && (
              <Link href="/dashboard/add-building" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors">
                <IconArrowRight className="w-3 h-3 rotate-[-90deg]" />
                ახლის დამატება
              </Link>
            )}
          </div>

          {buildingsLoading ? (
            <div className="bg-slate-800/50 border border-white/10 rounded-xl p-12 flex items-center justify-center">
              <IconLoader className="w-6 h-6 text-emerald-400 animate-spin" />
            </div>
          ) : buildings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {buildings.map((building) => (
                <div key={building.id} className="group ezo-building-card bg-slate-900/60 border border-white/10 rounded-2xl p-4 hover:border-emerald-400/40 hover:bg-slate-900/80 transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                      <IconBuilding className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-xs mb-1 truncate" title={building.name || building.street}>{building.name || building.street}</h3>
                  <p className="text-[10px] text-slate-400 mb-2 truncate">{building.city}{building.district ? `, ${building.district}` : ''}</p>
                  <div className="space-y-0.5 mb-3 flex-grow">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400"><IconCheck className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" /><span className="truncate">{building.apartments_count || 0} ბინა</span></div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400"><IconCheck className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" /><span className="truncate">{building.entrances_count || 0} სადარბაზო</span></div>
                  </div>
                  <div className="flex flex-col gap-1 pt-2 border-t border-white/10 mt-auto">
                    {!viewAsUser ? (
                      <>
                        <Link href={`/dashboard/building/${building.id}/edit`} className="w-full px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-[10px] font-medium rounded transition-colors text-center">რედაქტირება</Link>
                        <Link href={`/dashboard/building/${building.id}`} className="w-full px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[10px] font-medium rounded transition-colors text-center">მართვა</Link>
                        <button onClick={() => handleDeleteBuilding(building.id)} className="w-full px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-[10px] font-medium rounded transition-colors text-center">წაშლა</button>
                      </>
                    ) : (
                      <div className="text-center text-[10px] text-slate-500 py-1 bg-slate-900/50 rounded border border-white/5">მხოლოდ ნახვა</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ezo-empty bg-slate-900/45 border border-white/10 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3"><IconBuilding className="w-6 h-6 text-slate-400" /></div>
              <h3 className="font-bold text-white text-sm mb-1">{viewAsUser ? 'ამ მომხმარებელს კორპუსი არ აქვს' : 'კორპუსი ჯერ არ არის დამატებული'}</h3>
              <p className="text-xs text-slate-400 mb-3 max-w-xs">{viewAsUser ? 'ეს მომხმარებელი ჯერ არ არის დაკავშირებული არცერთ კორპუსთან.' : 'დაამატე შენი კორპუსის ინფორმაცია, რათა დაიწყო სრულფასოვანი მართვა.'}</p>
              {!viewAsUser && (
                <Link href="/dashboard/add-building" className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all">
                  <IconArrowRight className="w-3 h-3 rotate-[-90deg]" />კორპუსის დამატება
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
      <div className="min-h-screen bg-slate-950 ezo-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">EZO იტვირთება</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}