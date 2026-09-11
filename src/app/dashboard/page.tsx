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

const IconShield = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconTrash = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconLock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconCreditCard = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
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
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const [maxBuildingsCount, setMaxBuildingsCount] = useState<number>(1)
  const [maxApartmentsCount, setMaxApartmentsCount] = useState<number>(20)
  
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false)

  const [apartmentsCount, setApartmentsCount] = useState<Record<string, number>>({})
  const [collectedAmount, setCollectedAmount] = useState<Record<string, number>>({})
  const [debtAmount, setDebtAmount] = useState<Record<string, number>>({})
  const [activityLogs, setActivityLogs] = useState<any[]>([])

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      
      setUser(session.user)
      
      const viewAsId = searchParams.get('view_as')
      let profile: any = null

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
          profile = targetProfile
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
          profile = myProfile
          setUserProfile(myProfile)
        }
      }

      if (profile) {
        const planNameMap: Record<string, string> = {
          'basic': 'Basic',
          'pro': 'Pro',
          'enterprise': 'Enterprise',
          'trial': '14-დღიანი უფასო ტესტი'
        }
        const dbPlanName = planNameMap[profile.subscription_plan?.toLowerCase() || 'basic'] || 'Basic'

        const { data: planData } = await supabase
          .from('subscription_plans')
          .select('max_buildings_count, max_buildings')
          .eq('name', dbPlanName)
          .maybeSingle()

        setMaxBuildingsCount(planData?.max_buildings_count || 1)
        setMaxApartmentsCount(planData?.max_buildings || 20)
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
        
        if (data) setBuildings(data)
      }
    }
    if (user) fetchBuildings()
  }, [user, viewAsUser])

  useEffect(() => {
    const fetchRealData = async () => {
      if (buildings.length === 0) return

      const aptCounts: Record<string, number> = {}
      for (const building of buildings) {
        const { count } = await supabase
          .from('apartments')
          .select('*', { count: 'exact', head: true })
          .eq('building_id', building.id)
        aptCounts[building.id] = count || 0
      }
      setApartmentsCount(aptCounts)

      const collected: Record<string, number> = {}
      for (const building of buildings) {
        const { data: payments } = await supabase
          .from('payments')
          .select('amount')
          .eq('building_id', building.id)
        const total = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
        collected[building.id] = total
      }
      setCollectedAmount(collected)

      const debts: Record<string, number> = {}
      for (const building of buildings) {
        const { data: settings } = await supabase
          .from('building_settings')
          .select('monthly_fee')
          .eq('building_id', building.id)
          .maybeSingle()
        const monthlyFee = settings?.monthly_fee || 0
        const expectedTotal = (aptCounts[building.id] || 0) * monthlyFee
        debts[building.id] = Math.max(0, expectedTotal - (collected[building.id] || 0))
      }
      setDebtAmount(debts)

      const { data: logs } = await supabase
        .from('activity_logs')
        .select('*')
        .in('building_id', buildings.map(b => b.id))
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (logs) setActivityLogs(logs)
    }

    fetchRealData()
  }, [buildings])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDeleteBuilding = async (buildingId: string, buildingName: string) => {
    if (!confirm(`დარწმუნებული ხარ, რომ გსურს "${buildingName}" კორპუსის წაშლა?\n\nყველა მონაცემი (ბინები, გადახდები, აქტივობები) წაიშლება სამუდამოდ!`)) {
      return
    }

    try {
      await supabase.from('apartments').delete().eq('building_id', buildingId)
      await supabase.from('building_settings').delete().eq('building_id', buildingId)
      await supabase.from('building_utilities').delete().eq('building_id', buildingId)
      await supabase.from('building_contacts').delete().eq('building_id', buildingId)
      await supabase.from('buildings').delete().eq('id', buildingId)

      setBuildings(prev => prev.filter(b => b.id !== buildingId))
      if (selectedBuildingId === buildingId) setSelectedBuildingId('all')
      alert('კორპუსი წარმატებით წაიშალა!')
    } catch (error: any) {
      console.error('Delete error:', error)
      alert('შეცდომა კორპუსის წაშლისას: ' + (error.message || 'უცნობი შეცდომა'))
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
          <div className="text-white font-bold text-lg mb-1">BINO იტვირთება</div>
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
  const currentPlan = (userProfile?.subscription_plan || 'basic').toLowerCase()
  const isBuildingLimitReached = buildings.length >= maxBuildingsCount

  const getPlanInfo = () => {
    if (userProfile?.is_trial) {
      return { name: 'საცდელი', daysLeft: trialDaysLeft, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    }
    const plan = currentPlan
    if (plan === 'pro') return { name: 'Pro', daysLeft: null, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' }
    if (plan === 'enterprise') return { name: 'Enterprise', daysLeft: null, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
    return { name: 'Basic', daysLeft: null, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
  }
  const planInfo = getPlanInfo()

  const steps = [
    { id: 1, title: 'ანგარიშის შექმნა', desc: 'რეგისტრაცია წარმატებით დასრულდა', done: true, icon: IconCheck },
    {
      id: 2,
      title: 'პაკეტის არჩევა',
      desc: isPaidOrTrial ? (userProfile?.is_trial ? `14-დღიანი ტესტი აქტიურია • დარჩენილია ${trialDaysLeft} დღე` : 'პაკეტი აქტიურია') : 'აირჩიე შენთვის შესაფერისი გეგმა',
      done: isPaidOrTrial,
      link: !isPaidOrTrial ? '/pricing' : undefined,
      icon: IconGift,
    },
    { id: 3, title: 'კორპუსის დამატება', desc: hasBuilding ? `${buildings.length} კორპუსი დამატებულია` : 'დაგჭირდება დაახლოებით 3 წუთი', done: hasBuilding, link: hasBuilding ? undefined : '/dashboard/add-building', icon: IconBuilding },
  ]

  const completedSteps = steps.filter(s => s.done).length
  const progressWidth = `${(completedSteps / steps.length) * 100}%`

  const benefits = [
    { icon: IconUsers, title: 'ვინ არ იხდის', desc: 'რეალურ დროში ხედავ ვინ არის ვალში', gradient: 'from-rose-500/10 to-orange-500/10', border: 'border-rose-500/20', iconColor: 'text-rose-400' },
    { icon: IconFileText, title: 'ონლაინ შეგროვება', desc: 'ქვითრების ატვირთვის გარეშე', gradient: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', iconColor: 'text-blue-400' },
    { icon: IconHome, title: 'ყველაფერი ერთ ადგილას', desc: 'ბინები, გადახდები, ანგარიშები', gradient: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/20', iconColor: 'text-emerald-400' },
  ]

  const isAllSelected = selectedBuildingId === 'all'
  const totalStats = {
    collected: Object.values(collectedAmount).reduce((sum, val) => sum + val, 0),
    debt: Object.values(debtAmount).reduce((sum, val) => sum + val, 0),
    totalApartments: Object.values(apartmentsCount).reduce((sum, val) => sum + val, 0),
  }

  const selectedBuilding = buildings.find(b => b.id === selectedBuildingId)
  const buildingStats = {
    collected: collectedAmount[selectedBuildingId] || 0,
    debt: debtAmount[selectedBuildingId] || 0,
    apartments: apartmentsCount[selectedBuildingId] || 0,
  }

  const dropdownOptions = [
    { id: 'all', label: 'ყველა კორპუსი', icon: '' },
    ...buildings.map(b => ({ id: b.id, label: b.name || b.street || 'კორპუსი', icon: '🏢' })),
  ]
  const currentDropdownLabel = dropdownOptions.find(o => o.id === selectedBuildingId)?.label || 'კორპუსი'

  const formatActivity = (log: any) => log.description || `${log.action_type || 'action'} on ${log.entity_name || log.entity_type || 'element'}`
  const formatTimeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (minutes < 1) return 'ახლახან'
    if (minutes < 60) return `${minutes} წუთის წინ`
    if (hours < 24) return `${hours} საათის წინ`
    if (days < 7) return `${days} დღის წინ`
    return new Date(dateString).toLocaleDateString('ka-GE')
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

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

      {/* ⃝ ჰედერი - ერთი ხაზი: ლოგო | ბანერები | პროფილი */}
      <header className={`sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 ${viewAsUser ? 'top-[41px]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* მარცხნივ: ლოგო */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <IconBuilding className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">BINO</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">Management</span>
            </div>
          </Link>

          {/* ცენტრში: ორი ბანერი */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            
            {/* ბანერი 1: პაკეტის სტატუსი */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5">
              <IconGift className="w-4 h-4 text-emerald-400" />
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-300">თქვენი მიმდინარე პაკეტია:</span>
                <span className="text-emerald-400 font-bold">🎁 საცდელი</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">დარჩენილია:</span>
                <span className="text-amber-400 font-bold">6 დღე</span>
              </div>
            </div>

            {/* ბანერი 2: პაკეტების შეძენა */}
            <Link 
              href="/pricing"
              className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25"
            >
              <IconCreditCard className="w-3.5 h-3.5" />
              <span>პაკეტების შეძენა</span>
              <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* მარჯვნივ: პროფილი */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold flex items-center justify-center shadow-lg shadow-emerald-500/30 text-sm">
                {userInitial}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-white">{userName}</div>
              <div className="text-xs text-slate-400">{viewAsUser ? viewAsUser.email : user?.email}</div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" title="გამოსვლა">
              <IconLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* მობილურისთვის: ბანერები ქვემოთ */}
        <div className="lg:hidden border-t border-white/5 bg-slate-900/30 px-4 py-2.5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
              <IconGift className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="flex items-center gap-1.5 text-xs min-w-0">
                <span className="text-slate-300 whitespace-nowrap">პაკეტი:</span>
                <span className="text-emerald-400 font-bold whitespace-nowrap">🎁 საცდელი</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 font-bold whitespace-nowrap">6 დღე</span>
              </div>
            </div>
            <Link 
              href="/pricing"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/25"
            >
              <IconCreditCard className="w-3.5 h-3.5" />
              <span>პაკეტების შეძენა</span>
              <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        
        {!hasBuilding ? (
          <div className="space-y-6">
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
                      BINO-ში კეთილი იყოს თქვენი მობრძანება. მოდით დავიწყოთ თქვენი კორპუსის მართვა.
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

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                რას მიიღებ BINO-თი
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
          <div className="space-y-4 sm:space-y-6">
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              
              {/* 1. Building Selector */}
              <div className="relative col-span-2 lg:col-span-1">
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
                        კორპუსი {buildings.length}/{maxBuildingsCount >= 999 ? '∞' : maxBuildingsCount}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {currentDropdownLabel}
                      </div>
                    </div>
                  </div>
                  <IconChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute top-full left-0 right-0 sm:min-w-[280px] mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {dropdownOptions.map((option) => (
                          <div key={option.id} className="relative group">
                            <button
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
                                    {apartmentsCount[option.id] || 0} ბინა
                                  </div>
                                )}
                              </div>
                              {selectedBuildingId === option.id && (
                                <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                              )}
                            </button>
                            
                            {option.id !== 'all' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const building = buildings.find(b => b.id === option.id)
                                  if (building) {
                                    handleDeleteBuilding(building.id, building.name || building.street || 'კორპუსი')
                                    setIsDropdownOpen(false)
                                  }
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                title="კორპუსის წაშლა"
                              >
                                <IconTrash className="w-4 h-4 text-rose-400" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-white/10 p-2">
                        {isBuildingLimitReached ? (
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false)
                              setIsUpsellModalOpen(true)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-800 transition-all text-left group relative overflow-hidden cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                              <IconLock className="w-4 h-4 text-slate-400" />
                            </div>
                            <div className="relative flex-1">
                              <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                ახალი კორპუსის დამატება
                              </div>
                              <div className="text-[10px] text-slate-500">
                                საჭიროა პაკეტის განახლება ({buildings.length}/{maxBuildingsCount})
                              </div>
                            </div>
                            <span className="relative px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30">
                              Pro
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false)
                              router.push('/dashboard/add-building')
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
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 2. სატესტო ბანერი */}
              <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[80px] gap-2 group hover:border-slate-700 transition-colors">
                <IconLock className="w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">სატესტო</span>
              </div>

              {/* 3. სატესტო ბანერი */}
              <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[80px] gap-2 group hover:border-slate-700 transition-colors">
                <IconLock className="w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">სატესტო</span>
              </div>

              {/* 4. სატესტო ბანერი */}
              <div className="bg-slate-900/50 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[80px] gap-2 group hover:border-slate-700 transition-colors">
                <IconLock className="w-5 h-5 text-slate-600 group-hover:text-slate-500 transition-colors" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">სატესტო</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
                  {isAllSelected ? totalStats.totalApartments : buildingStats.apartments} ბინა
                </span>
              </div>

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
                  {isAllSelected ? `${buildings.length} კორპუსს` : `${buildingStats.apartments} ბინას`} აქვს ვალი
                </span>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">შეგროვების %</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <IconCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  {totalStats.debt > 0 ? Math.round((totalStats.collected / (totalStats.collected + totalStats.debt)) * 100) : 0}%
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${totalStats.debt > 0 ? Math.round((totalStats.collected / (totalStats.collected + totalStats.debt)) * 100) : 0}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-400">აქტივობები</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1">
                  {activityLogs.length}
                </div>
                <span className="text-[10px] sm:text-xs text-purple-400 font-semibold">ბოლო 7 დღე</span>
              </div>
            </div>

            {isAllSelected && buildings.length > 1 && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconBuilding className="w-5 h-5 text-emerald-400" />
                    ყველა კორპუსი
                  </h3>
                  <span className="text-xs text-slate-400">{buildings.length} კორპუსი</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {buildings.map((building) => (
                    <div
                      key={building.id}
                      className="relative group bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 rounded-xl p-4 transition-all"
                    >
                      <button
                        onClick={() => setSelectedBuildingId(building.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <IconBuilding className="w-5 h-5 text-emerald-400" />
                          </div>
                          <IconArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1 truncate">{building.name || building.street}</h4>
                        <p className="text-xs text-slate-400 mb-3">{building.city} • {apartmentsCount[building.id] || 0} ბინა</p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <div>
                            <div className="text-xs text-slate-400">შეგროვება</div>
                            <div className="text-sm font-bold text-emerald-400">₾{(collectedAmount[building.id] || 0).toLocaleString()}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-400">ვალი</div>
                            <div className="text-sm font-bold text-rose-400">₾{(debtAmount[building.id] || 0).toLocaleString()}</div>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteBuilding(building.id, building.name || building.street || 'კორპუსი')
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        title="კორპუსის წაშლა"
                      >
                        <IconTrash className="w-4 h-4 text-rose-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconAlertCircle className="w-5 h-5 text-rose-400" />
                    {isAllSelected ? 'ყველაზე დიდი მოვალეები' : 'მოვალეები'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {isAllSelected ? 'ყველა კორპუსი' : selectedBuilding?.name || selectedBuilding?.street}
                  </span>
                </div>

                {totalStats.debt === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <IconCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">არავინ არის ვალში!</h4>
                    <p className="text-sm text-slate-400">ჯერ არ არის გადახდები ან ყველა ბინამ გადაიხადა</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-center py-8 text-slate-400">
                      <p className="text-sm">მოვალეების სია მალე გამოჩნდება</p>
                      <p className="text-xs mt-2">საჭიროა გადახდების სისტემის ამოქმედება</p>
                    </div>
                  </div>
                )}

                <button className="w-full mt-4 py-2.5 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all">
                  ყველა მოვალის ნახვა →
                </button>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <IconClock className="w-5 h-5 text-blue-400" />
                    ბოლო აქტივობა
                  </h3>
                </div>

                {activityLogs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                      <IconClock className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-400">ჯერ არ არის აქტივობა</p>
                    <p className="text-xs text-slate-500 mt-2">დაიწყეთ კორპუსის მართვა</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <IconFileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-300 mb-0.5 break-words">
                            {formatActivity(log)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatTimeAgo(log.created_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

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

        <UpsellModal
          isOpen={isUpsellModalOpen}
          onClose={() => setIsUpsellModalOpen(false)}
          currentPlan={currentPlan}
          currentBuildings={buildings.length}
          maxBuildings={maxBuildingsCount}
        />

      </main>
    </div>
  )
}

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
          <div className="text-white font-bold text-lg mb-1">BINO იტვირთება</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ...</div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}