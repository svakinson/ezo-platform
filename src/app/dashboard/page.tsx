'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import UpsellModal from '@/components/UpsellModal'

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

const IconShield = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconHome = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IconUsers = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconFileText = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const IconTrendingUp = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconSend = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const IconChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ============ ჰელპერ ფუნქციები ============
const getMaxBuildingsByPlan = (plan: 'basic' | 'pro' | 'enterprise'): number => {
  const limits = {
    basic: 1,
    pro: 3,
    enterprise: 999999,
  }
  return limits[plan] || 1
}

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
  
  // ⭐ ახალი: კორპუსის გადამრთველი და Upsell Modal
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false)

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
          .select('id, email, full_name, role, subscription_status, subscription_plan, is_trial, trial_ends_at')
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
          .select('id, email, full_name, role, subscription_status, subscription_plan, is_trial, trial_ends_at')
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

  const trialDaysLeft = userProfile?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(userProfile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  const isPaidOrTrial = userProfile?.subscription_status === 'active' || userProfile?.is_trial;

  // ⭐ ლიმიტის ლოგიკა
  const currentPlan = (userProfile?.subscription_plan as 'basic' | 'pro' | 'enterprise') || 'basic'
  const maxBuildings = getMaxBuildingsByPlan(currentPlan)
  const isBuildingLimitReached = buildings.length >= maxBuildings

  // ⭐ ნაბიჯების სია - დინამიური
  const steps = [
    {
      id: 1,
      title: 'ანგარიშის შექმნა',
      desc: 'რეგისტრაცია წარმატებით დასრულდა',
      done: true,
      icon: IconCheck,
    },
    {
      id: 2,
      title: 'პაკეტის არჩევა',
      desc: isPaidOrTrial 
        ? (userProfile?.is_trial 
            ? `14-დღიანი ტესტი აქტიურია • დარჩენილია ${trialDaysLeft} დღე`
            : 'პაკეტი აქტიურია')
        : 'აირჩიე შენთვის შესაფერისი გეგმა',
      done: isPaidOrTrial,
      link: !isPaidOrTrial ? '/pricing' : undefined,
      icon: IconGift,
    },
    {
      id: 3,
      title: 'კორპუსის დამატება',
      desc: hasBuilding ? `${buildings.length} კორპუსი დამატებულია` : 'დაგჭირდება დაახლოებით 3 წუთი',
      done: hasBuilding,
      link: hasBuilding ? undefined : '/dashboard/add-building',
      icon: IconBuilding,
    },
  ]

  const completedSteps = steps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / steps.length) * 100}%`

  // ⭐ სარგებლის ბარათები
  const benefits = [
    {
      icon: IconUsers,
      title: 'ვინ არ იხდის',
      desc: 'რეალურ დროში ხედავ ვინ არის ვალში',
      gradient: 'from-rose-500/10 to-orange-500/10',
      border: 'border-rose-500/20',
      iconColor: 'text-rose-400',
    },
    {
      icon: IconFileText,
      title: 'ონლაინ შეგროვება',
      desc: 'ქვითრების ატვირთვის გარეშე',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: IconHome,
      title: 'ყველაფერი ერთ ადგილას',
      desc: 'ბინები, გადახდები, ანგარიშები',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      border: 'border-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
  ]

  // ⭐ Mock Data - Active State-ისთვის (რამდენიმე კორპუსი)
  const mockBuildingsData = [
    {
      id: '1',
      name: 'ვაჟა-ფშაველას 42',
      city: 'თბილისი',
      apartments: 72,
      collected: 4500,
      debt: 1200,
      collectionRate: 78,
      openRequests: 3,
    },
    {
      id: '2',
      name: 'ჩავჩავაძის 15',
      city: 'თბილისი',
      apartments: 48,
      collected: 3200,
      debt: 800,
      collectionRate: 80,
      openRequests: 1,
    },
    {
      id: '3',
      name: 'რუსთაველის 28',
      city: 'თბილისი',
      apartments: 96,
      collected: 6800,
      debt: 2100,
      collectionRate: 76,
      openRequests: 5,
    },
  ]

  // ⭐ არჩეული კორპუსის მონაცემები
  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId)
  const isAllSelected = selectedBuildingId === 'all'

  // ჯამური სტატისტიკა (ყველა კორპუსისთვის)
  const totalStats = {
    collected: mockBuildingsData.reduce((sum, b) => sum + b.collected, 0),
    debt: mockBuildingsData.reduce((sum, b) => sum + b.debt, 0),
    collectionRate: Math.round(mockBuildingsData.reduce((sum, b) => sum + b.collectionRate, 0) / mockBuildingsData.length),
    openRequests: mockBuildingsData.reduce((sum, b) => sum + b.openRequests, 0),
    totalApartments: mockBuildingsData.reduce((sum, b) => sum + b.apartments, 0),
    paidApartments: Math.round(mockBuildingsData.reduce((sum, b) => sum + (b.apartments * b.collectionRate / 100), 0)),
  }

  // კონკრეტული კორპუსის სტატისტიკა
  const buildingStats = mockBuildingsData.find(b => b.id === selectedBuildingId) || mockBuildingsData[0]

  // ⭐ Dropdown-ისთვის Mock Data
  const dropdownOptions = [
    { id: 'all', label: 'ყველა კორპუსი', icon: '📊' },
    ...mockBuildingsData.map(b => ({
      id: b.id,
      label: b.name,
      icon: '🏢',
    })),
  ]

  const currentDropdownLabel = dropdownOptions.find(o => o.id === selectedBuildingId)?.label || 'კორპუსი'

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
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
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
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
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
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
        
        {!hasBuilding ? (
          /* ═══════════════════════════════════════════════════════
             EMPTY STATE - მომხმარებელს კორპუსი არ აქვს
             ═══════════════════════════════════════════════════════ */
          <div className="space-y-6">
            
            {/* სექცია 1: მისასალმებელი + პროგრესი */}
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">👋</span>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">
                        {getGreeting()}, {userName}!
                      </h1>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base">
                      EZO-ში კეთილი იყოს თქვენი მობრძანება. მოდით დავიწყოთ თქვენი კორპუსის მართვა.
                    </p>
                  </div>
                  
                  {userProfile?.is_trial && trialDaysLeft > 0 && (
                    <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 flex-shrink-0">
                      <IconClock className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-[10px] text-amber-300/70 uppercase tracking-wider font-semibold">Trial</div>
                        <div className="text-xs text-amber-300 font-bold">დარჩენილია {trialDaysLeft} დღე</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* პროგრეს ბარი */}
                <div className="bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/50"
                    style={{ width: progressWidth }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400">პროგრესი</span>
                  <span className="text-xs font-bold text-emerald-400">{completedSteps}/{steps.length} ნაბიჯი შესრულებული</span>
                </div>
              </div>
            </div>

            {/* სექცია 2: ნაბიჯების სია */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <IconSparkles className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">დაწყების ნაბიჯები</h2>
              </div>

              {steps.map((step, i) => {
                const isActive = !step.done && i === steps.findIndex(s => !s.done);
                const StepIcon = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                      step.done
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : isActive
                          ? 'bg-white/5 border-emerald-500/50 shadow-xl shadow-emerald-500/10'
                          : 'bg-slate-900/30 border-white/5 opacity-50'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
                    )}

                    <div className="relative z-10 p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          step.done
                            ? 'bg-emerald-500 text-slate-900'
                            : isActive
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                              : 'bg-white/5 text-slate-500'
                        }`}>
                          {step.done ? (
                            <IconCheck className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold ${
                              step.done ? 'text-emerald-300' : isActive ? 'text-white' : 'text-slate-500'
                            }`}>
                              {step.title}
                            </h3>
                            {isActive && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                აქტიური
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            step.done ? 'text-emerald-200/70' : isActive ? 'text-slate-300' : 'text-slate-500'
                          }`}>
                            {step.desc}
                          </p>

                          {isActive && step.link && (
                            <div className="mt-4">
                              <div className="mb-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                                  კორპუსის დამატების შემდეგ ნახავ:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                    <IconHome className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>ბინების სიას</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                    <IconUsers className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>გადახდების სტატუსს</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                    <IconFileText className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>ფინანსურ ანგარიშებს</span>
                                  </div>
                                </div>
                              </div>

                              <Link
                                href={step.link}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                              >
                                <span>დაიწყე დამატება</span>
                                <IconArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          )}

                          {step.done && step.link && (
                            <Link
                              href={step.link}
                              className="inline-flex items-center gap-1 mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                            >
                              ნახვა
                              <IconArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* სექცია 3: სარგებლის ბარათები */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                რას მიიღებ EZO-ით
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {benefits.map((benefit, i) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div
                      key={i}
                      className={`relative bg-gradient-to-br ${benefit.gradient} border ${benefit.border} rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-slate-900/50 ${benefit.iconColor} flex items-center justify-center mb-3`}>
                        <BenefitIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-xs text-slate-300">{benefit.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════
             ACTIVE STATE - კორპუსი დამატებულია
             ═══════════════════════════════════════════════════════ */
          <div className="space-y-4 sm:space-y-6">
            
            {/* ⭐ 4 ელემენტი ერთ ხაზზე (Dropdown + 3 ბანერი) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* 1. კორპუსის გადამრთველი (Dropdown) */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between gap-2 sm:gap-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <IconBuilding className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        კორპუსი {buildings.length}/{maxBuildings >= 999999 ? '∞' : maxBuildings}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {currentDropdownLabel}
                      </div>
                    </div>
                  </div>
                  <IconChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    
                    <div className="absolute top-full left-0 right-0 sm:min-w-[280px] mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {dropdownOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSelectedBuildingId(option.id)
                              setIsDropdownOpen(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                              selectedBuildingId === option.id
                                ? 'bg-emerald-500/10 border border-emerald-500/30'
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                          >
                            <span className="text-xl">{option.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-semibold truncate ${
                                selectedBuildingId === option.id ? 'text-emerald-300' : 'text-white'
                              }`}>
                                {option.label}
                              </div>
                              {option.id !== 'all' && (
                                <div className="text-xs text-slate-400">
                                  {mockBuildingsData.find(b => b.id === option.id)?.apartments} ბინა
                                </div>
                              )}
                            </div>
                            {selectedBuildingId === option.id && (
                              <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                      
                      <div className="border-t border-white/10 p-2">
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false)
                            if (isBuildingLimitReached) {
                              setIsUpsellModalOpen(true)
                            } else {
                              router.push('/dashboard/add-building')
                            }
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <IconPlus className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="text-sm font-semibold text-emerald-400">
                            ახალი კორპუსის დამატება
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 2. პაკეტის სტატუსი */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <IconShield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-emerald-200 mb-0.5 truncate">
                    {userProfile?.is_trial ? '🎁 საცდელი' : '✅ აქტიური'}
                  </div>
                  <div className="text-[10px] sm:text-xs text-emerald-300/70 truncate">
                    {userProfile?.is_trial ? (
                      <>{trialDaysLeft} დღე</>
                    ) : (
                      userProfile?.subscription_status === 'active' ? 'პროფესიონალური' : 'უფასო'
                    )}
                  </div>
                </div>
              </div>

              {/* 3. პაკეტის შეცვლა */}
              <Link 
                href="/pricing"
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-amber-500/40 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <IconGift className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-amber-200 mb-0.5 truncate">
                    პაკეტის შეცვლა
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-300/70 truncate">
                    ნახე გეგმები →
                  </div>
                </div>
              </Link>

              {/* 4. პარამეტრები */}
              <button className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-blue-500/40 transition-all group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs sm:text-sm font-bold text-blue-200 mb-0.5 truncate">
                    პარამეტრები
                  </div>
                  <div className="text-[10px] sm:text-xs text-blue-300/70 truncate">
                    კორპუსის მართვა
                  </div>
                </div>
              </button>
            </div>

            {/* ⭐ KPI Cards - ზედა რიგი */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* შეგროვებული */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">ამ თვის შეგროვება</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <IconTrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  ₾{isAllSelected ? totalStats.collected.toLocaleString() : buildingStats.collected.toLocaleString()}
                </div>
                <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {isAllSelected ? totalStats.paidApartments : Math.round(buildingStats.apartments * buildingStats.collectionRate / 100)}/{isAllSelected ? totalStats.totalApartments : buildingStats.apartments} ბინამ
                </span>
              </div>

              {/* დავალიანება */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">საერთო დავალიანება</span>
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                    <IconAlertCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  ₾{isAllSelected ? totalStats.debt.toLocaleString() : buildingStats.debt.toLocaleString()}
                </div>
                <span className="text-[10px] sm:text-xs text-rose-400 font-semibold">
                  {isAllSelected 
                    ? `${mockBuildingsData.length} კორპუსს`
                    : `${buildingStats.apartments - Math.round(buildingStats.apartments * buildingStats.collectionRate / 100)} ბინას`
                  } უჭირს
                </span>
              </div>

              {/* შეგროვების მაჩვენებელი */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">შეგროვების %</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <IconCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  {isAllSelected ? totalStats.collectionRate : buildingStats.collectionRate}%
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${isAllSelected ? totalStats.collectionRate : buildingStats.collectionRate}%` }}
                  />
                </div>
              </div>

              {/* ღია საჩივრები */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">ღია საჩივრები</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  {isAllSelected ? totalStats.openRequests : buildingStats.openRequests}
                </div>
                <span className="text-[10px] sm:text-xs text-purple-400 font-semibold">
                  მოითხოვს ყურადღებას
                </span>
              </div>
            </div>

            {/* ⭐ თუ "ყველა კორპუსი" არის არჩეული - კორპუსების ბარათები */}
            {isAllSelected && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconBuilding className="w-5 h-5 text-emerald-400" />
                    ყველა კორპუსი
                  </h3>
                  <span className="text-xs text-slate-400">{mockBuildingsData.length} კორპუსი</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {mockBuildingsData.map((building) => (
                    <button
                      key={building.id}
                      onClick={() => setSelectedBuildingId(building.id)}
                      className="text-left bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 rounded-xl p-4 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <IconBuilding className="w-5 h-5 text-emerald-400" />
                        </div>
                        <IconArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 truncate">{building.name}</h4>
                      <p className="text-xs text-slate-400 mb-3">{building.city} • {building.apartments} ბინა</p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div>
                          <div className="text-xs text-slate-400">შეგროვება</div>
                          <div className="text-sm font-bold text-emerald-400">₾{building.collected.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">ვალი</div>
                          <div className="text-sm font-bold text-rose-400">₾{building.debt.toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ⭐ შუა რიგი - 2 სვეტი */}
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* მარცხენა სვეტი - ტოპ მოვალეები */}
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconAlertCircle className="w-5 h-5 text-rose-400" />
                    {isAllSelected ? 'ყველაზე დიდი მოვალეები' : 'მოვალეები'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {isAllSelected ? 'ყველა კორპუსი' : mockBuildingsData.find(b => b.id === selectedBuildingId)?.name}
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, apartment: 'ბინა 15', owner: 'გიორგი მ.', amount: 450, days: 45 },
                    { id: 2, apartment: 'ბინა 23', owner: 'ნინო კ.', amount: 320, days: 30 },
                    { id: 3, apartment: 'ბინა 8', owner: 'ლევან ს.', amount: 280, days: 25 },
                    { id: 4, apartment: 'ბინა 41', owner: 'მარიამ ჯ.', amount: 150, days: 15 },
                  ].map((debtor) => (
                    <div 
                      key={debtor.id} 
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-white/5 hover:border-rose-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-rose-400">{debtor.apartment.split(' ')[1]}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate">{debtor.apartment}</div>
                          <div className="text-xs text-slate-400 truncate">{debtor.owner}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-rose-400">₾{debtor.amount}</div>
                        <div className="text-[10px] text-slate-500">{debtor.days} დღე</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all">
                  ყველა მოვალის ნახვა →
                </button>
              </div>

              {/* მარჯვენა სვეტი - ბოლო აქტივობა */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconClock className="w-5 h-5 text-blue-400" />
                    ბოლო აქტივობა
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, message: 'ბინა 12-მა გადაიხადა ₾50', time: '2 წუთის წინ', icon: IconCheck, color: 'text-emerald-400 bg-emerald-500/10' },
                    { id: 2, message: 'დაემატა ახალი ქვითარი', time: '1 საათის წინ', icon: IconFileText, color: 'text-blue-400 bg-blue-500/10' },
                    { id: 3, message: 'ბინა 34-მა გადაიხადა ₾45', time: '3 საათის წინ', icon: IconCheck, color: 'text-emerald-400 bg-emerald-500/10' },
                    { id: 4, message: 'ბინა 45-ს შეეცვალა მფლობელი', time: 'გუშინ', icon: IconUsers, color: 'text-purple-400 bg-purple-500/10' },
                    { id: 5, message: 'ბინა 7-მა გადაიხადა ₾60', time: '2 დღის წინ', icon: IconCheck, color: 'text-emerald-400 bg-emerald-500/10' },
                  ].map((activity) => {
                    const ActivityIcon = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                          <ActivityIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-300 mb-0.5 break-words">{activity.message}</div>
                          <div className="text-[10px] text-slate-500">{activity.time}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ⭐ სწრაფი მოქმედებები */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">სწრაფი მოქმედებები</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl transition-all group">
                  <IconPlus className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-white">ახალი გადახდა</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 rounded-xl transition-all group">
                  <IconSend className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-white">შეტყობინების გაგზავნა</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 rounded-xl transition-all group">
                  <IconFileText className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-white">თვის ანგარიში</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ⭐ Upsell Modal */}
        <UpsellModal
          isOpen={isUpsellModalOpen}
          onClose={() => setIsUpsellModalOpen(false)}
          currentPlan={currentPlan}
          currentBuildings={buildings.length}
          maxBuildings={maxBuildings}
        />

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