'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconSparkles = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
)

const IconBell = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconGift = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconEdit = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconChart = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const IconShield = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

// ============ Structural corner marks — a drafting/registration-mark motif reused ============
// wherever a surface stands in for a "sheet" (logo mark, stamp tiles, building tiles).
const CornerMarks = ({ active = false }: { active?: boolean }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t transition-colors duration-300 ${active ? 'border-[var(--brass)]' : 'border-[var(--line)]'}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t transition-colors duration-300 ${active ? 'border-[var(--brass)]' : 'border-[var(--line)]'}`} />
    <span className={`pointer-events-none absolute left-0 bottom-0 h-2.5 w-2.5 border-l border-b transition-colors duration-300 ${active ? 'border-[var(--brass)]' : 'border-[var(--line)]'}`} />
    <span className={`pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-r border-b transition-colors duration-300 ${active ? 'border-[var(--brass)]' : 'border-[var(--line)]'}`} />
  </>
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

  const themeStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    :root {
      --ink-950:#0B0F1A;
      --ink-900:#121826;
      --ink-800:#19212F;
      --line:#2B364C;
      --paper:#EAE3D3;
      --muted:#8992A6;
      --brass:#C79A4B;
      --brass-soft: rgba(199,154,75,0.12);
      --sage:#84A488;
      --brick:#BC6659;
    }
    .ezo-body { font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
    .ezo-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
    .ezo-mono { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace; }
    .ezo-grid {
      background-image:
        linear-gradient(rgba(234,227,211,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(234,227,211,0.035) 1px, transparent 1px);
      background-size: 28px 28px;
    }
  `

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--ink-950)] ezo-grid ezo-body flex items-center justify-center">
        <style jsx global>{themeStyle}</style>
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-4 border border-[var(--line)]">
            <CornerMarks active />
            <IconLoader className="w-5 h-5 text-[var(--brass)] absolute inset-0 m-auto" />
          </div>
          <div className="text-[var(--paper)] ezo-display font-semibold mb-1">EZO იტვირთება</div>
          <div className="text-[var(--muted)] text-sm">გთხოვთ მოიცადოთ...</div>
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
    <div className="min-h-screen bg-[var(--ink-950)] ezo-grid ezo-body">
      <style jsx global>{themeStyle}</style>

      {/* View As User Banner — styled as a redline / revision note */}
      {viewAsUser && (
        <div className="bg-[var(--brass-soft)] border-b border-dashed border-[var(--brass)]/50 text-[var(--paper)] px-4 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm max-w-4xl">
            <IconEye className="w-4 h-4 text-[var(--brass)] flex-shrink-0" />
            <span className="truncate text-[var(--paper)]/90">
              თქვენ ხედავთ ინტერფეისს როგორც: <strong className="text-[var(--paper)]">{viewAsUser.email}</strong>
              <span className="text-[var(--brass)]/60 mx-2">/</span>
              როლი: {viewAsUser.role === 'chairman' ? 'თავმჯდომარე' : viewAsUser.role}
            </span>
          </div>
          <Link 
            href="/admin/users" 
            className="text-xs border border-[var(--brass)]/50 hover:bg-[var(--brass)] hover:text-[var(--ink-950)] text-[var(--brass)] px-4 py-2 font-medium transition-colors flex items-center gap-2 flex-shrink-0"
          >
            ← ადმინ პანელში დაბრუნება
          </Link>
        </div>
      )}

      <header className={`sticky top-0 z-40 bg-[var(--ink-950)]/95 backdrop-blur-sm border-b border-[var(--line)] ${viewAsUser ? 'top-[50px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 border border-[var(--line)] bg-[var(--ink-900)] flex items-center justify-center group-hover:border-[var(--brass)] transition-colors">
              <CornerMarks />
              <IconBuilding className="w-4 h-4 text-[var(--brass)]" />
            </div>
            <span className="text-xl font-semibold text-[var(--paper)] ezo-display tracking-tight">EZO</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[var(--muted)] hover:text-[var(--paper)] transition-colors">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--brass)] rounded-full"></span>
            </button>
            
            <div className="hidden sm:block h-8 w-px bg-[var(--line)]"></div>
            
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-[var(--paper)]">{userName}</div>
                <div className="text-xs text-[var(--muted)] ezo-mono">{viewAsUser ? viewAsUser.email : user?.email}</div>
              </div>
              <div className="relative w-10 h-10 border border-[var(--line)] bg-[var(--ink-900)] flex items-center justify-center text-[var(--brass)] font-semibold ezo-display">
                <CornerMarks />
                {userInitial}
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--brick)] transition-colors"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Title block strip */}
        <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[var(--line)]">
          <div>
            <div className="text-xs text-[var(--muted)] ezo-mono mb-1">{getGreeting()} · {currentTime.toLocaleDateString('ka-GE', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
            <h1 className="text-2xl font-semibold text-[var(--paper)] ezo-display">{userName}</h1>
          </div>
          {userProfile?.is_trial && trialDaysLeft > 0 && (
            <div className="hidden sm:flex items-center gap-2 border border-[var(--brass)]/40 bg-[var(--brass-soft)] px-3 py-1.5">
              <IconGift className="w-3.5 h-3.5 text-[var(--brass)]" />
              <span className="text-xs text-[var(--paper)]">საცდელი — <span className="ezo-mono text-[var(--brass)]">{trialDaysLeft} დღე</span> დარჩენილია</span>
            </div>
          )}
        </div>

        {/* ⭐ Schedule strip — one bordered instrument panel, divided by hairlines ⭐ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[var(--line)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--line)] bg-[var(--ink-900)] mb-8">

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--muted)]">ანგარიშის სტატუსი</span>
              <IconCheck className="w-3.5 h-3.5 text-[var(--sage)]" />
            </div>
            <div className="text-sm text-[var(--paper)] font-medium mb-1">დადასტურებული</div>
            <div className="text-xs text-[var(--muted)] truncate ezo-mono">{viewAsUser ? viewAsUser.email : user?.email}</div>
          </div>

          <div className="p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--muted)]">კორპუსები</span>
              <IconBuilding className="w-3.5 h-3.5 text-[var(--muted)]" />
            </div>
            <div className="text-3xl text-[var(--paper)] ezo-mono tabular-nums mb-1">{buildings.length}</div>
            {!viewAsUser ? (
              <Link 
                href="/dashboard/add-building"
                className="inline-flex items-center gap-1 text-xs text-[var(--brass)] hover:opacity-80 transition-opacity mt-auto"
              >
                <IconPlus className="w-3 h-3" />
                დაამატე კორპუსი
              </Link>
            ) : <div className="mt-auto" />}
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--muted)]">ბალანსი</span>
              <IconChart className="w-3.5 h-3.5 text-[var(--muted)]" />
            </div>
            <div className="text-3xl text-[var(--paper)] ezo-mono tabular-nums mb-1">₾0</div>
            <div className="text-xs text-[var(--muted)]">ამ თვის შემოსავალი</div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--muted)]">მზაობა</span>
              <IconShield className="w-3.5 h-3.5 text-[var(--muted)]" />
            </div>
            <div className="text-3xl text-[var(--paper)] ezo-mono tabular-nums mb-1">100%</div>
            <div className="text-xs text-[var(--muted)]">ანგარიში აქტიურია</div>
          </div>

        </div>

        {/* Onboarding — a punch list, since the content genuinely is a sequence */}
        {completedSteps < onboardingSteps.length && !viewAsUser && (
          <div className="mb-8 border border-[var(--line)] bg-[var(--ink-900)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-[var(--paper)] ezo-display flex items-center gap-2">
                  <IconSparkles className="w-4 h-4 text-[var(--brass)]" />
                  დაწყების გზამკვლევი
                </h2>
                <p className="text-[var(--muted)] text-xs mt-1">შეავსე ეს ნაბიჯები სრული ფუნქციონალის მისაღებად</p>
              </div>
              <div className="text-right ezo-mono">
                <div className="text-lg text-[var(--paper)]">{completedSteps}/{onboardingSteps.length}</div>
              </div>
            </div>
            <div className="space-y-2">
              {onboardingSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 border transition-all ${step.done ? 'bg-[var(--sage)]/5 border-[var(--sage)]/30' : step.link ? 'bg-[var(--ink-800)] border-[var(--line)] hover:border-[var(--brass)]/50 cursor-pointer group' : 'bg-[var(--ink-800)] border-[var(--line)] opacity-50'}`}
                  onClick={() => step.link && router.push(step.link)}
                >
                  <div className={`w-7 h-7 border flex items-center justify-center flex-shrink-0 ezo-mono text-xs ${step.done ? 'border-[var(--sage)] text-[var(--sage)]' : 'border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--brass)] group-hover:text-[var(--brass)]'}`}>
                    {step.done ? <IconCheck className="w-3.5 h-3.5" /> : String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--paper)] mb-0.5">{step.title}</div>
                    <div className="text-xs text-[var(--muted)] truncate">{step.desc}</div>
                  </div>
                  {step.link && !step.done && <IconArrowRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--brass)] group-hover:translate-x-1 transition-all flex-shrink-0" />}
                </div>
              ))}
            </div>
            <div className="mt-5 h-1 bg-[var(--ink-800)] overflow-hidden">
              <div className="h-full bg-[var(--brass)] transition-all duration-700" style={{ width: progressWidth }} />
            </div>
          </div>
        )}

        {/* Buildings List — plan tiles with registration corners */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--paper)] ezo-display flex items-center gap-2">
              <IconBuilding className="w-4 h-4 text-[var(--brass)]" />
              ჩემი კორპუსები
            </h2>
            {!viewAsUser && (
              <Link href="/dashboard/add-building" className="text-xs text-[var(--brass)] hover:opacity-80 font-medium flex items-center gap-1 transition-opacity">
                ახლის დამატება
                <IconPlus className="w-3 h-3" />
              </Link>
            )}
          </div>

          {buildingsLoading ? (
            <div className="border border-[var(--line)] bg-[var(--ink-900)] p-12 flex items-center justify-center">
              <IconLoader className="w-5 h-5 text-[var(--brass)] animate-spin" />
            </div>
          ) : buildings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {buildings.map((building) => (
                <div key={building.id} className="group relative bg-[var(--ink-900)] border border-[var(--line)] hover:border-[var(--brass)]/60 transition-all flex flex-col">
                  <CornerMarks />
                  <div className="p-4 border-b border-[var(--line)] flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[var(--paper)] text-sm truncate ezo-display" title={building.name || building.street}>{building.name || building.street}</h3>
                      <p className="text-xs text-[var(--muted)] truncate mt-0.5">{building.city}{building.district ? `, ${building.district}` : ''}</p>
                    </div>
                    <IconBuilding className="w-4 h-4 text-[var(--muted)] flex-shrink-0 ml-2" />
                  </div>
                  <div className="p-4 flex-grow grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-lg text-[var(--paper)] ezo-mono tabular-nums">{building.apartments_count || 0}</div>
                      <div className="text-[10px] text-[var(--muted)]">ბინა</div>
                    </div>
                    <div>
                      <div className="text-lg text-[var(--paper)] ezo-mono tabular-nums">{building.entrances_count || 0}</div>
                      <div className="text-[10px] text-[var(--muted)]">სადარბაზო</div>
                    </div>
                  </div>
                  <div className="flex items-stretch border-t border-[var(--line)]">
                    {!viewAsUser ? (
                      <>
                        <Link href={`/dashboard/building/${building.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-[var(--muted)] hover:text-[var(--paper)] hover:bg-[var(--ink-800)] text-xs font-medium transition-colors border-r border-[var(--line)]">
                          <IconEdit className="w-3 h-3" />
                          რედაქტირება
                        </Link>
                        <Link href={`/dashboard/building/${building.id}`} className="flex-1 flex items-center justify-center px-2 py-2.5 text-[var(--brass)] hover:bg-[var(--brass-soft)] text-xs font-medium transition-colors border-r border-[var(--line)]">
                          მართვა
                        </Link>
                        <button onClick={() => handleDeleteBuilding(building.id)} className="flex items-center justify-center px-2.5 py-2.5 text-[var(--muted)] hover:text-[var(--brick)] hover:bg-[var(--brick)]/10 transition-colors">
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center text-[10px] text-[var(--muted)] py-2.5">მხოლოდ ნახვა</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative border border-dashed border-[var(--line)] p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border border-[var(--line)] flex items-center justify-center mb-4"><IconBuilding className="w-5 h-5 text-[var(--muted)]" /></div>
              <h3 className="font-semibold text-[var(--paper)] text-sm mb-1 ezo-display">{viewAsUser ? 'ამ მომხმარებელს კორპუსი არ აქვს' : 'კორპუსი ჯერ არ არის დამატებული'}</h3>
              <p className="text-xs text-[var(--muted)] mb-4 max-w-xs">{viewAsUser ? 'ეს მომხმარებელი ჯერ არ არის დაკავშირებული არცერთ კორპუსთან.' : 'დაამატე შენი კორპუსის ინფორმაცია, რათა დაიწყო სრულფასოვანი მართვა.'}</p>
              {!viewAsUser && (
                <Link href="/dashboard/add-building" className="inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--brass)] text-[var(--brass)] text-xs font-medium hover:bg-[var(--brass)] hover:text-[var(--ink-950)] transition-colors">
                  <IconPlus className="w-3.5 h-3.5" />
                  კორპუსის დამატება
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
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border border-[#2B364C] flex items-center justify-center">
            <IconLoader className="w-5 h-5 text-[#C79A4B]" />
          </div>
          <div className="text-[#EAE3D3] font-semibold mb-1">EZO იტვირთება</div>
          <div className="text-[#8992A6] text-sm">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}