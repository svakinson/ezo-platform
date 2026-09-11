'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import UpsellModal from '@/components/UpsellModal'

// ============================================================
// ICONS
// ============================================================

const IconBuilding = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
)

const IconLogOut = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconArrowUpRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const IconSparkles = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
)

const IconCheck = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconPlus = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconGift = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const IconEye = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconClock = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconHome = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IconUsers = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconFileText = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
)

const IconTrendingUp = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconAlertCircle = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconSend = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const IconChevronDown = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconShield = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconTrash = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconLock = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconBell = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconWallet = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H5a3 3 0 0 1 0-6h14v4" />
    <path d="M5 7h15a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4" />
    <path d="M16 13h.01" />
  </svg>
)

const IconPercent = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

// ============================================================
// DASHBOARD
// ============================================================

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

  // ============================================================
  // EXISTING AUTH / DATA LOGIC — UNCHANGED
  // ============================================================

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

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
          .select(
            'id, email, full_name, role, subscription_status, subscription_plan, is_trial, trial_ends_at'
          )
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
          .select(
            'id, email, full_name, role, subscription_status, subscription_plan, is_trial, trial_ends_at'
          )
          .eq('id', session.user.id)
          .maybeSingle()

        if (myProfile) {
          profile = myProfile
          setUserProfile(myProfile)
        }
      }

      if (profile) {
        const planNameMap: Record<string, string> = {
          basic: 'Basic',
          pro: 'Pro',
          enterprise: 'Enterprise',
          trial: '14-დღიანი უფასო ტესტი',
        }

        const dbPlanName =
          planNameMap[profile.subscription_plan?.toLowerCase() || 'basic'] ||
          'Basic'

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

        const total =
          payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

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
        const expectedTotal =
          (aptCounts[building.id] || 0) * monthlyFee

        debts[building.id] = Math.max(
          0,
          expectedTotal - (collected[building.id] || 0)
        )
      }

      setDebtAmount(debts)

      const { data: logs } = await supabase
        .from('activity_logs')
        .select('*')
        .in(
          'building_id',
          buildings.map((b) => b.id)
        )
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

  const handleDeleteBuilding = async (
    buildingId: string,
    buildingName: string
  ) => {
    if (
      !confirm(
        `დარწმუნებული ხარ, რომ გსურს "${buildingName}" კორპუსის წაშლა?\n\nყველა მონაცემი (ბინები, გადახდები, აქტივობები) წაიშლება სამუდამოდ!`
      )
    ) {
      return
    }

    try {
      await supabase
        .from('apartments')
        .delete()
        .eq('building_id', buildingId)

      await supabase
        .from('building_settings')
        .delete()
        .eq('building_id', buildingId)

      await supabase
        .from('building_utilities')
        .delete()
        .eq('building_id', buildingId)

      await supabase
        .from('building_contacts')
        .delete()
        .eq('building_id', buildingId)

      await supabase
        .from('buildings')
        .delete()
        .eq('id', buildingId)

      setBuildings((prev) =>
        prev.filter((b) => b.id !== buildingId)
      )

      if (selectedBuildingId === buildingId) {
        setSelectedBuildingId('all')
      }

      alert('კორპუსი წარმატებით წაიშალა!')
    } catch (error: any) {
      console.error('Delete error:', error)

      alert(
        'შეცდომა კორპუსის წაშლისას: ' +
          (error.message || 'უცნობი შეცდომა')
      )
    }
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()

    if (hour < 12) return 'დილა მშვიდობისა'
    if (hour < 18) return 'დღე მშვიდობისა'

    return 'საღამო მშვიდობისა'
  }

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="relative w-full max-w-sm rounded-[28px] border border-white/[0.08] bg-white/[0.035] backdrop-blur-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 animate-pulse" />

              <div className="absolute inset-[5px] rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <IconBuilding className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold tracking-tight">
              BINO
            </div>

            <div className="text-sm text-slate-500 mt-1">
              თქვენი სამუშაო სივრცე იტვირთება
            </div>
          </div>

          <div className="mt-6 h-1 rounded-full bg-white/[0.05] overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  // ============================================================
  // DERIVED DATA
  // ============================================================

  const userName = viewAsUser
    ? viewAsUser.full_name || viewAsUser.email
    : userProfile?.full_name ||
      user?.user_metadata?.full_name ||
      'მომხმარებელი'

  const userInitial = userName.charAt(0).toUpperCase()

  const hasBuilding = buildings.length > 0

  const trialDaysLeft = userProfile?.trial_ends_at
    ? Math.max(
        0,
        Math.ceil(
          (new Date(userProfile.trial_ends_at).getTime() -
            new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0

  const isPaidOrTrial =
    userProfile?.subscription_status === 'active' ||
    userProfile?.is_trial

  const currentPlan = (
    userProfile?.subscription_plan || 'basic'
  ).toLowerCase()

  const isBuildingLimitReached =
    buildings.length >= maxBuildingsCount

  const getPlanInfo = () => {
    if (userProfile?.is_trial) {
      return {
        name: 'საცდელი',
        daysLeft: trialDaysLeft,
        color: 'text-emerald-300',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
      }
    }

    if (currentPlan === 'pro') {
      return {
        name: 'Pro',
        daysLeft: null,
        color: 'text-violet-300',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20',
      }
    }

    if (currentPlan === 'enterprise') {
      return {
        name: 'Enterprise',
        daysLeft: null,
        color: 'text-amber-300',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
      }
    }

    return {
      name: 'Basic',
      daysLeft: null,
      color: 'text-blue-300',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    }
  }

  const planInfo = getPlanInfo()

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
        ? userProfile?.is_trial
          ? `14-დღიანი ტესტი აქტიურია • დარჩენილია ${trialDaysLeft} დღე`
          : 'პაკეტი აქტიურია'
        : 'აირჩიე შენთვის შესაფერისი გეგმა',
      done: isPaidOrTrial,
      link: !isPaidOrTrial ? '/pricing' : undefined,
      icon: IconGift,
    },
    {
      id: 3,
      title: 'კორპუსის დამატება',
      desc: hasBuilding
        ? `${buildings.length} კორპუსი დამატებულია`
        : 'დაგჭირდება დაახლოებით 3 წუთი',
      done: hasBuilding,
      link: hasBuilding
        ? undefined
        : '/dashboard/add-building',
      icon: IconBuilding,
    },
  ]

  const completedSteps = steps.filter((s) => s.done).length
  const progressWidth = `${(completedSteps / steps.length) * 100}%`

  const benefits = [
    {
      icon: IconUsers,
      title: 'ვინ არ იხდის',
      desc: 'რეალურ დროში ხედავ ვინ არის ვალში',
      accent: 'rose',
    },
    {
      icon: IconFileText,
      title: 'ონლაინ შეგროვება',
      desc: 'ქვითრების ატვირთვის გარეშე',
      accent: 'blue',
    },
    {
      icon: IconHome,
      title: 'ყველაფერი ერთ ადგილას',
      desc: 'ბინები, გადახდები, ანგარიშები',
      accent: 'emerald',
    },
  ]

  const isAllSelected = selectedBuildingId === 'all'

  const totalStats = {
    collected: Object.values(collectedAmount).reduce(
      (sum, val) => sum + val,
      0
    ),
    debt: Object.values(debtAmount).reduce(
      (sum, val) => sum + val,
      0
    ),
    totalApartments: Object.values(apartmentsCount).reduce(
      (sum, val) => sum + val,
      0
    ),
  }

  const selectedBuilding = buildings.find(
    (b) => b.id === selectedBuildingId
  )

  const buildingStats = {
    collected: collectedAmount[selectedBuildingId] || 0,
    debt: debtAmount[selectedBuildingId] || 0,
    apartments: apartmentsCount[selectedBuildingId] || 0,
  }

  const collectionRate =
    totalStats.debt > 0
      ? Math.round(
          (totalStats.collected /
            (totalStats.collected + totalStats.debt)) *
            100
        )
      : 0

  const dropdownOptions = [
    {
      id: 'all',
      label: 'ყველა კორპუსი',
      icon: '',
    },
    ...buildings.map((b) => ({
      id: b.id,
      label: b.name || b.street || 'კორპუსი',
      icon: '🏢',
    })),
  ]

  const currentDropdownLabel =
    dropdownOptions.find((o) => o.id === selectedBuildingId)
      ?.label || 'კორპუსი'

  const formatActivity = (log: any) =>
    log.description ||
    `${log.action_type || 'action'} on ${
      log.entity_name || log.entity_type || 'element'
    }`

  const formatTimeAgo = (dateString: string) => {
    const diff =
      new Date().getTime() - new Date(dateString).getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'ახლახან'
    if (minutes < 60) return `${minutes} წუთის წინ`
    if (hours < 24) return `${hours} საათის წინ`
    if (days < 7) return `${days} დღის წინ`

    return new Date(dateString).toLocaleDateString('ka-GE')
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-screen bg-[#07090d] text-white relative overflow-x-hidden selection:bg-emerald-500/30">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[280px] left-[8%] w-[650px] h-[650px] rounded-full bg-emerald-500/[0.055] blur-[130px]" />
        <div className="absolute top-[30%] -right-[300px] w-[650px] h-[650px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />
        <div className="absolute bottom-[-250px] left-[35%] w-[600px] h-[600px] rounded-full bg-violet-500/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ======================================================
          ADMIN VIEW AS BAR
      ====================================================== */}

      {viewAsUser && (
        <div className="sticky top-0 z-[70] border-b border-amber-400/20 bg-[#18130a]/90 backdrop-blur-xl">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                <IconEye className="w-3.5 h-3.5 text-amber-300" />
              </div>

              <span className="text-xs text-amber-100 truncate">
                <span className="font-semibold">
                  {viewAsUser.email}
                </span>

                <span className="hidden sm:inline text-amber-400/40 mx-2">
                  /
                </span>

                <span className="hidden sm:inline text-amber-300/70">
                  {viewAsUser.role === 'chairman'
                    ? 'თავმჯდომარე'
                    : viewAsUser.role}
                </span>
              </span>

              <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-amber-300/60 border border-amber-400/10 rounded-full px-2 py-0.5">
                Admin preview
              </span>
            </div>

            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-white transition-colors"
            >
              დაბრუნება
              <IconArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header
        className={`sticky z-50 ${
          viewAsUser ? 'top-10' : 'top-0'
        } border-b border-white/[0.055] bg-[#07090d]/80 backdrop-blur-2xl`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500" />

              <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                <IconBuilding className="w-[18px] h-[18px] text-white" />
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="text-[17px] font-black tracking-[-0.03em]">
                BINO
              </div>

              <div className="text-[9px] text-slate-500 font-medium -mt-0.5 tracking-[0.12em] uppercase">
                Management
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Plan badge */}
            <Link
              href="/pricing"
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border ${planInfo.border} ${planInfo.bg} hover:bg-white/[0.06] transition-colors`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full bg-current ${planInfo.color}`}
              />

              <span className="text-xs font-semibold text-slate-300">
                {planInfo.name}
              </span>

              {planInfo.daysLeft !== null && (
                <span className="text-[10px] text-slate-500">
                  {planInfo.daysLeft} დღე
                </span>
              )}
            </Link>

            <div className="h-7 w-px bg-white/[0.06] hidden sm:block" />

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400/90 to-teal-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/10">
                  {userInitial}
                </div>

                <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#07090d]" />
              </div>

              <div className="hidden lg:block max-w-[170px]">
                <div className="text-xs font-semibold text-white truncate">
                  {userName}
                </div>

                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {viewAsUser
                    ? viewAsUser.email
                    : user?.email}
                </div>
              </div>

              <button
                onClick={handleLogout}
                aria-label="გამოსვლა"
                title="გამოსვლა"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition-all"
              >
                <IconLogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ====================================================
            PLAN STATUS
        ==================================================== */}

        <section className="relative overflow-hidden rounded-[24px] border border-white/[0.075] bg-white/[0.025] backdrop-blur-xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.055] via-transparent to-cyan-500/[0.025]" />

          <div className="absolute -right-24 -top-28 w-72 h-72 rounded-full bg-emerald-500/[0.08] blur-[80px]" />

          <div className="relative px-5 sm:px-6 lg:px-7 py-4.5 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/15 flex items-center justify-center flex-shrink-0">
                <IconGift className="w-[18px] h-[18px] text-emerald-300" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-500">
                    მიმდინარე პაკეტი
                  </span>

                  <span className="text-xs text-slate-700">
                    /
                  </span>

                  <span
                    className={`text-sm font-bold ${planInfo.color}`}
                  >
                    {planInfo.name}
                  </span>

                  {userProfile?.is_trial && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/15 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                      Trial
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  {planInfo.daysLeft !== null
                    ? `პაკეტის ამოწურვამდე დარჩენილია ${planInfo.daysLeft} დღე`
                    : 'პაკეტი აქტიურია და სრულად ხელმისაწვდომია'}
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#080a0e] px-4 py-2.5 text-xs font-bold hover:bg-emerald-300 transition-all shadow-lg shadow-black/20"
            >
              პაკეტის მართვა
              <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {!hasBuilding ? (
          // =====================================================
          // EMPTY / ONBOARDING STATE
          // =====================================================
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.045] via-transparent to-cyan-500/[0.025]" />

              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/[0.06] blur-[100px]" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300 mb-5">
                    <IconSparkles className="w-3.5 h-3.5" />
                    სწრაფი დაწყება
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-[40px] leading-[1.08] tracking-[-0.04em] font-black text-white">
                    {getGreeting()},{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                      {userName}
                    </span>
                  </h1>

                  <p className="mt-4 text-sm sm:text-base leading-7 text-slate-400 max-w-2xl">
                    BINO-ში კეთილი იყოს თქვენი მობრძანება.
                    რამდენიმე მარტივი ნაბიჯი დაგრჩა, რომ
                    თქვენი კორპუსის მართვა ერთ სივრცეში გადაიტანო.
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-8 max-w-3xl">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-slate-500">
                      Setup progress
                    </span>

                    <span className="text-xs font-bold text-emerald-300">
                      {completedSteps}/{steps.length}
                    </span>
                  </div>

                  <div className="h-1.5 rounded-full bg-white/[0.055] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                      style={{ width: progressWidth }}
                    />
                  </div>
                </div>

                {/* Trial */}
                {userProfile?.is_trial && trialDaysLeft > 0 && (
                  <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] px-3.5 py-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
                      <IconClock className="w-4 h-4 text-amber-300" />
                    </div>

                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-amber-300/60">
                        Free trial
                      </div>

                      <div className="text-xs font-semibold text-amber-200">
                        დარჩენილია {trialDaysLeft} დღე
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Setup steps */}
            <section>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-400 font-bold mb-1.5">
                    Get started
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                    დაიწყე BINO-ს გამოყენება
                  </h2>
                </div>

                <span className="hidden sm:block text-xs text-slate-600">
                  დაახლოებით 3 წუთი
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-3">
                {steps.map((step, index) => {
                  const isActive =
                    !step.done &&
                    index ===
                      steps.findIndex((s) => !s.done)

                  const StepIcon = step.icon

                  return (
                    <div
                      key={step.id}
                      className={`relative overflow-hidden rounded-[22px] border transition-all duration-300 ${
                        step.done
                          ? 'border-emerald-400/15 bg-emerald-400/[0.035]'
                          : isActive
                          ? 'border-emerald-400/30 bg-white/[0.04] shadow-[0_20px_60px_rgba(16,185,129,0.08)]'
                          : 'border-white/[0.055] bg-white/[0.018] opacity-50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                      )}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                              step.done
                                ? 'bg-emerald-400 text-[#06100b]'
                                : isActive
                                ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                                : 'bg-white/[0.05] text-slate-500'
                            }`}
                          >
                            {step.done ? (
                              <IconCheck className="w-5 h-5" />
                            ) : (
                              <StepIcon className="w-5 h-5" />
                            )}
                          </div>

                          <span className="text-[10px] font-mono text-slate-600">
                            0{step.id}
                          </span>
                        </div>

                        <div className="mt-5">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`font-bold ${
                                step.done
                                  ? 'text-emerald-200'
                                  : isActive
                                  ? 'text-white'
                                  : 'text-slate-500'
                              }`}
                            >
                              {step.title}
                            </h3>

                            {isActive && (
                              <span className="rounded-full bg-emerald-400/10 border border-emerald-400/15 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold text-emerald-300">
                                ახლა
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-xs leading-5 mt-2 ${
                              step.done
                                ? 'text-emerald-100/50'
                                : isActive
                                ? 'text-slate-400'
                                : 'text-slate-600'
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>

                        {isActive && step.link && (
                          <div className="mt-5 pt-4 border-t border-white/[0.06]">
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="rounded-lg bg-white/[0.025] border border-white/[0.04] p-2">
                                <IconHome className="w-3.5 h-3.5 text-emerald-300 mb-1.5" />
                                <span className="text-[9px] text-slate-500">
                                  ბინები
                                </span>
                              </div>

                              <div className="rounded-lg bg-white/[0.025] border border-white/[0.04] p-2">
                                <IconUsers className="w-3.5 h-3.5 text-cyan-300 mb-1.5" />
                                <span className="text-[9px] text-slate-500">
                                  გადახდები
                                </span>
                              </div>

                              <div className="rounded-lg bg-white/[0.025] border border-white/[0.04] p-2">
                                <IconFileText className="w-3.5 h-3.5 text-violet-300 mb-1.5" />
                                <span className="text-[9px] text-slate-500">
                                  ანგარიშები
                                </span>
                              </div>
                            </div>

                            <Link
                              href={step.link}
                              className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 text-[#06100b] py-3 text-xs font-black hover:bg-emerald-300 transition-all"
                            >
                              დაიწყე დამატება
                              <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-600 font-bold mb-3">
                BINO-ს მთავარი ღირებულება
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon

                  const styles: Record<
                    string,
                    {
                      border: string
                      bg: string
                      icon: string
                    }
                  > = {
                    rose: {
                      border: 'border-rose-400/10',
                      bg: 'from-rose-500/[0.045] to-orange-500/[0.015]',
                      icon: 'text-rose-300 bg-rose-400/10',
                    },
                    blue: {
                      border: 'border-blue-400/10',
                      bg: 'from-blue-500/[0.045] to-cyan-500/[0.015]',
                      icon: 'text-blue-300 bg-blue-400/10',
                    },
                    emerald: {
                      border: 'border-emerald-400/10',
                      bg: 'from-emerald-500/[0.045] to-teal-500/[0.015]',
                      icon: 'text-emerald-300 bg-emerald-400/10',
                    },
                  }

                  const style = styles[benefit.accent]

                  return (
                    <div
                      key={index}
                      className={`rounded-[20px] border ${style.border} bg-gradient-to-br ${style.bg} p-5 hover:-translate-y-0.5 transition-transform`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${style.icon} flex items-center justify-center mb-4`}
                      >
                        <BenefitIcon className="w-4 h-4" />
                      </div>

                      <h3 className="text-sm font-bold text-white">
                        {benefit.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1.5 leading-5">
                        {benefit.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        ) : (
          // =====================================================
          // MAIN DASHBOARD
          // =====================================================
          <div className="space-y-5">
            {/* ==================================================
                TOP CONTROL BAR
            ================================================== */}

            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-400 font-bold mb-1.5">
                  Overview
                </div>

                <h1 className="text-xl sm:text-2xl font-black tracking-[-0.035em]">
                  {getGreeting()}, {userName}
                </h1>

                <p className="text-xs text-slate-600 mt-1">
                  თქვენი კორპუსების მიმდინარე მდგომარეობა
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Building selector */}
                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={() =>
                      setIsDropdownOpen(!isDropdownOpen)
                    }
                    aria-expanded={isDropdownOpen}
                    className="w-full sm:min-w-[260px] flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] hover:bg-white/[0.05] px-3.5 py-2.5 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/10 flex items-center justify-center flex-shrink-0">
                      <IconBuilding className="w-4 h-4 text-emerald-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">
                        კორპუსი
                      </div>

                      <div className="text-xs font-bold text-white truncate">
                        {currentDropdownLabel}
                      </div>
                    </div>

                    <IconChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() =>
                          setIsDropdownOpen(false)
                        }
                      />

                      <div className="absolute right-0 top-full mt-2 w-full sm:w-[300px] rounded-2xl border border-white/[0.09] bg-[#11151b]/[0.98] backdrop-blur-2xl shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                          <div className="px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-slate-600 font-bold">
                            თქვენი კორპუსები
                          </div>

                          {dropdownOptions.map((option) => (
                            <div
                              key={option.id}
                              className="relative group"
                            >
                              <button
                                onClick={() => {
                                  setSelectedBuildingId(
                                    option.id
                                  )
                                  setIsDropdownOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                                  selectedBuildingId ===
                                  option.id
                                    ? 'bg-emerald-400/[0.08] border border-emerald-400/10'
                                    : 'border border-transparent hover:bg-white/[0.04]'
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    selectedBuildingId ===
                                    option.id
                                      ? 'bg-emerald-400/10'
                                      : 'bg-white/[0.04]'
                                  }`}
                                >
                                  {option.id === 'all' ? (
                                    <IconBuilding
                                      className={`w-4 h-4 ${
                                        selectedBuildingId ===
                                        option.id
                                          ? 'text-emerald-300'
                                          : 'text-slate-500'
                                      }`}
                                    />
                                  ) : (
                                    <span className="text-sm">
                                      🏢
                                    </span>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`text-xs font-semibold truncate ${
                                      selectedBuildingId ===
                                      option.id
                                        ? 'text-emerald-200'
                                        : 'text-slate-300'
                                    }`}
                                  >
                                    {option.label}
                                  </div>

                                  {option.id !== 'all' && (
                                    <div className="text-[10px] text-slate-600 mt-0.5">
                                      {apartmentsCount[
                                        option.id
                                      ] || 0}{' '}
                                      ბინა
                                    </div>
                                  )}
                                </div>

                                {selectedBuildingId ===
                                  option.id && (
                                  <IconCheck className="w-4 h-4 text-emerald-300" />
                                )}
                              </button>

                              {option.id !== 'all' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()

                                    const building =
                                      buildings.find(
                                        (b) =>
                                          b.id === option.id
                                      )

                                    if (building) {
                                      handleDeleteBuilding(
                                        building.id,
                                        building.name ||
                                          building.street ||
                                          'კორპუსი'
                                      )

                                      setIsDropdownOpen(false)
                                    }
                                  }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                  title="კორპუსის წაშლა"
                                >
                                  <IconTrash className="w-3.5 h-3.5 text-rose-300" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-white/[0.06] p-2">
                          {isBuildingLimitReached ? (
                            <button
                              onClick={() => {
                                setIsDropdownOpen(false)
                                setIsUpsellModalOpen(true)
                              }}
                              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 bg-violet-500/[0.06] border border-violet-400/10 hover:bg-violet-500/[0.1] transition-all text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-violet-400/10 flex items-center justify-center">
                                <IconLock className="w-4 h-4 text-violet-300" />
                              </div>

                              <div className="flex-1">
                                <div className="text-xs font-bold text-slate-300">
                                  ახალი კორპუსის დამატება
                                </div>

                                <div className="text-[9px] text-slate-600 mt-0.5">
                                  ლიმიტი ამოიწურა · განაახლე პაკეტი
                                </div>
                              </div>

                              <span className="text-[9px] font-black text-violet-300 bg-violet-400/10 border border-violet-400/10 rounded-full px-2 py-1">
                                PRO
                              </span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setIsDropdownOpen(false)
                                router.push(
                                  '/dashboard/add-building'
                                )
                              }}
                              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/[0.04] transition-all text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                                <IconPlus className="w-4 h-4 text-emerald-300" />
                              </div>

                              <span className="text-xs font-bold text-emerald-300">
                                ახალი კორპუსის დამატება
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]" />

                  <span className="text-[10px] text-slate-500 font-semibold">
                    LIVE DATA
                  </span>
                </div>
              </div>
            </section>

            {/* ==================================================
                KPI GRID
            ================================================== */}

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {/* Collected */}
              <div className="group relative overflow-hidden rounded-[20px] border border-emerald-400/10 bg-gradient-to-br from-emerald-500/[0.055] to-transparent p-4 sm:p-5">
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-emerald-400/[0.08] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                      ამ თვის შეგროვება
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                      <IconWallet className="w-4 h-4 text-emerald-300" />
                    </div>
                  </div>

                  <div className="mt-5 text-2xl sm:text-3xl font-black tracking-[-0.04em] text-white">
                    ₾
                    {(
                      isAllSelected
                        ? totalStats.collected
                        : buildingStats.collected
                    ).toLocaleString()}
                  </div>

                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[10px] text-emerald-300 font-semibold">
                      {isAllSelected
                        ? totalStats.totalApartments
                        : buildingStats.apartments}{' '}
                      ბინა
                    </span>
                  </div>
                </div>
              </div>

              {/* Debt */}
              <div className="group relative overflow-hidden rounded-[20px] border border-rose-400/10 bg-gradient-to-br from-rose-500/[0.045] to-transparent p-4 sm:p-5">
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-rose-400/[0.06] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                      საერთო დავალიანება
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-rose-400/10 flex items-center justify-center">
                      <IconAlertCircle className="w-4 h-4 text-rose-300" />
                    </div>
                  </div>

                  <div className="mt-5 text-2xl sm:text-3xl font-black tracking-[-0.04em] text-white">
                    ₾
                    {(
                      isAllSelected
                        ? totalStats.debt
                        : buildingStats.debt
                    ).toLocaleString()}
                  </div>

                  <div className="mt-2 text-[10px] text-rose-300 font-semibold">
                    {isAllSelected
                      ? `${buildings.length} კორპუსი`
                      : `${buildingStats.apartments} ბინა`}
                  </div>
                </div>
              </div>

              {/* Collection rate */}
              <div className="group relative overflow-hidden rounded-[20px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.045] to-transparent p-4 sm:p-5">
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-cyan-400/[0.06] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                      შეგროვების % 
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                      <IconPercent className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>

                  <div className="mt-5 text-2xl sm:text-3xl font-black tracking-[-0.04em] text-white">
                    {collectionRate}%
                  </div>

                  <div className="mt-3 h-1.5 bg-white/[0.055] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700"
                      style={{ width: `${collectionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="group relative overflow-hidden rounded-[20px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.045] to-transparent p-4 sm:p-5">
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-violet-400/[0.06] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">
                      აქტივობები
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-violet-400/10 flex items-center justify-center">
                      <IconBell className="w-4 h-4 text-violet-300" />
                    </div>
                  </div>

                  <div className="mt-5 text-2xl sm:text-3xl font-black tracking-[-0.04em] text-white">
                    {activityLogs.length}
                  </div>

                  <div className="mt-2 text-[10px] text-violet-300 font-semibold">
                    ბოლო 7 დღე
                  </div>
                </div>
              </div>
            </section>

            {/* ==================================================
                BUILDINGS
            ================================================== */}

            {isAllSelected && buildings.length > 1 && (
              <section className="rounded-[22px] border border-white/[0.065] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.055] flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">
                      თქვენი კორპუსები
                    </h2>

                    <p className="text-[10px] text-slate-600 mt-1">
                      სწრაფად გადადი კონკრეტულ სამუშაო სივრცეში
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-600 font-semibold">
                    {buildings.length} კორპუსი
                  </span>
                </div>

                <div className="p-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {buildings.map((building) => (
                    <div
                      key={building.id}
                      className="group relative rounded-[18px] border border-white/[0.055] bg-white/[0.018] hover:bg-white/[0.035] hover:border-emerald-400/15 transition-all"
                    >
                      <button
                        onClick={() =>
                          setSelectedBuildingId(building.id)
                        }
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/10 flex items-center justify-center">
                            <IconBuilding className="w-5 h-5 text-emerald-300" />
                          </div>

                          <div className="w-8 h-8 rounded-lg bg-white/[0.035] flex items-center justify-center group-hover:bg-emerald-400/10 transition-colors">
                            <IconArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-300 transition-colors" />
                          </div>
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-white truncate pr-6">
                          {building.name ||
                            building.street}
                        </h3>

                        <p className="text-[10px] text-slate-600 mt-1">
                          {building.city || '—'}{' '}
                          <span className="mx-1 text-slate-700">
                            •
                          </span>
                          {apartmentsCount[building.id] ||
                            0}{' '}
                          ბინა
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/[0.05]">
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">
                              შეგროვება
                            </div>

                            <div className="text-xs font-bold text-emerald-300 mt-1">
                              ₾
                              {(
                                collectedAmount[
                                  building.id
                                ] || 0
                              ).toLocaleString()}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[9px] uppercase tracking-wider text-slate-600 font-bold">
                              ვალი
                            </div>

                            <div className="text-xs font-bold text-rose-300 mt-1">
                              ₾
                              {(
                                debtAmount[
                                  building.id
                                ] || 0
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()

                          handleDeleteBuilding(
                            building.id,
                            building.name ||
                              building.street ||
                              'კორპუსი'
                          )
                        }}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all hover:bg-rose-500/20"
                        title="კორპუსის წაშლა"
                      >
                        <IconTrash className="w-3.5 h-3.5 text-rose-300" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="grid lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.8fr)] gap-4">
              {/* Debts */}
              <section className="rounded-[22px] border border-white/[0.065] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.055] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-400/10 flex items-center justify-center">
                      <IconAlertCircle className="w-4 h-4 text-rose-300" />
                    </div>

                    <div>
                      <h2 className="text-sm font-bold">
                        {isAllSelected
                          ? 'მოვალეები'
                          : 'კორპუსის მოვალეები'}
                      </h2>

                      <p className="text-[10px] text-slate-600 mt-0.5">
                        {isAllSelected
                          ? 'ყველა კორპუსი'
                          : selectedBuilding?.name ||
                            selectedBuilding?.street ||
                            'არჩეული კორპუსი'}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:block text-[10px] text-slate-600">
                    ფინანსური კონტროლი
                  </span>
                </div>

                {totalStats.debt === 0 ? (
                  <div className="px-5 py-14 text-center">
                    <div className="relative mx-auto w-14 h-14">
                      <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 blur-xl" />

                      <div className="relative w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/10 flex items-center justify-center">
                        <IconCheck className="w-6 h-6 text-emerald-300" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-sm font-bold text-white">
                      არავინ არის ვალში
                    </h3>

                    <p className="text-xs text-slate-600 mt-1.5">
                      ყველა გადახდა წესრიგშია ან ჯერ არ არის
                      დარეგისტრირებული
                    </p>
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <div className="w-12 h-12 rounded-xl bg-rose-400/10 border border-rose-400/10 flex items-center justify-center mx-auto">
                      <IconAlertCircle className="w-5 h-5 text-rose-300" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold">
                      მოვალეების სია მალე გამოჩნდება
                    </h3>

                    <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto">
                      საჭიროა გადახდების სისტემის სრული
                      ამოქმედება კონკრეტული ბინების მიხედვით.
                    </p>
                  </div>
                )}

                <div className="px-5 pb-5">
                  <button className="w-full rounded-xl border border-white/[0.055] bg-white/[0.018] hover:bg-white/[0.04] py-2.5 text-xs font-semibold text-slate-500 hover:text-white transition-all">
                    ყველა მოვალის ნახვა
                    <span className="ml-1.5">→</span>
                  </button>
                </div>
              </section>

              {/* Activity */}
              <section className="rounded-[22px] border border-white/[0.065] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.055] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <IconClock className="w-4 h-4 text-cyan-300" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold">
                      ბოლო აქტივობა
                    </h2>

                    <p className="text-[10px] text-slate-600 mt-0.5">
                      უახლესი ცვლილებები
                    </p>
                  </div>
                </div>

                {activityLogs.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.035] border border-white/[0.05] flex items-center justify-center mx-auto">
                      <IconClock className="w-5 h-5 text-slate-600" />
                    </div>

                    <p className="text-xs font-semibold text-slate-500 mt-4">
                      ჯერ არ არის აქტივობა
                    </p>

                    <p className="text-[10px] text-slate-700 mt-1">
                      დაიწყეთ კორპუსის მართვა
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-1">
                    {activityLogs.slice(0, 6).map((log) => (
                      <div
                        key={log.id}
                        className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/[0.025] transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/10 flex items-center justify-center flex-shrink-0">
                          <IconFileText className="w-3.5 h-3.5 text-cyan-300" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] leading-5 text-slate-400 break-words">
                            {formatActivity(log)}
                          </div>

                          <div className="text-[9px] text-slate-700 mt-0.5">
                            {formatTimeAgo(log.created_at)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <section className="rounded-[22px] border border-white/[0.065] bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.055] flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold">
                    სწრაფი მოქმედებები
                  </h2>

                  <p className="text-[10px] text-slate-600 mt-1">
                    ყველაზე ხშირად გამოყენებული მოქმედებები
                  </p>
                </div>

                <IconSparkles className="w-4 h-4 text-slate-700" />
              </div>

              <div className="p-4 grid sm:grid-cols-3 gap-3">
                <button className="group relative overflow-hidden rounded-[16px] border border-emerald-400/10 bg-emerald-400/[0.035] hover:bg-emerald-400/[0.07] hover:border-emerald-400/20 p-4 text-left transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                      <IconPlus className="w-4 h-4 text-emerald-300" />
                    </div>

                    <IconArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-300 transition-colors" />
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-bold text-white">
                      ახალი გადახდა
                    </div>

                    <div className="text-[10px] text-slate-600 mt-1">
                      დაამატე ახალი ტრანზაქცია
                    </div>
                  </div>
                </button>

                <button className="group relative overflow-hidden rounded-[16px] border border-cyan-400/10 bg-cyan-400/[0.025] hover:bg-cyan-400/[0.055] hover:border-cyan-400/20 p-4 text-left transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                      <IconSend className="w-4 h-4 text-cyan-300" />
                    </div>

                    <IconArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-cyan-300 transition-colors" />
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-bold text-white">
                      შეტყობინების გაგზავნა
                    </div>

                    <div className="text-[10px] text-slate-600 mt-1">
                      აცნობე ინფორმაცია მცხოვრებლებს
                    </div>
                  </div>
                </button>

                <button className="group relative overflow-hidden rounded-[16px] border border-violet-400/10 bg-violet-400/[0.025] hover:bg-violet-400/[0.055] hover:border-violet-400/20 p-4 text-left transition-all">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-violet-400/10 flex items-center justify-center">
                      <IconFileText className="w-4 h-4 text-violet-300" />
                    </div>

                    <IconArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-violet-300 transition-colors" />
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-bold text-white">
                      თვის ანგარიში
                    </div>

                    <div className="text-[10px] text-slate-600 mt-1">
                      ნახე ფინანსური შეჯამება
                    </div>
                  </div>
                </button>
              </div>
            </section>

            {/* ==================================================
                SUBTLE FOOTER STATUS
            ================================================== */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-4">
              <div className="flex items-center gap-2 text-[10px] text-slate-700">
                <IconShield className="w-3.5 h-3.5 text-emerald-400/50" />
                მონაცემები დაცულია
              </div>

              <div className="text-[10px] text-slate-700">
                BINO Management
              </div>
            </div>
          </div>
        )}

        {/* ======================================================
            UPSELL
        ====================================================== */}

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

// ============================================================
// PAGE
// ============================================================

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090d] flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-[28px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-8 text-center">
            <div className="relative w-14 h-14 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-pulse" />

              <div className="absolute inset-[4px] rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <IconBuilding className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="text-white font-bold mt-5">
              BINO იტვირთება
            </div>

            <div className="text-slate-600 text-xs mt-1.5">
              გთხოვთ მოიცადოთ...
            </div>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}