'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconCreditCard = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const IconTrendingUp = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconUserPlus = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)

const IconActivity = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconAlertCircle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

// ============ STAT CARD ============
function StatCard({ icon: Icon, label, value, change, gradient, link }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  change?: string;
  gradient: string;
  link?: string;
}) {
  const content = (
    <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  )

  if (link) {
    return <Link href={link}>{content}</Link>
  }
  return content
}

// ============ MAIN PAGE ============
export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    newUsersThisMonth: 0,
  })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentPayments, setRecentPayments] = useState<any[]>([])
  const [statusBreakdown, setStatusBreakdown] = useState({
    active: 0,
    inactive: 0,
    grace_period: 0,
    expired: 0,
  })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setUser(user)
      await fetchStats()
      await fetchRecentUsers()
      await fetchRecentPayments()
      await fetchStatusBreakdown()
      setLoading(false)
    }
    init()
  }, [router])

  const fetchStats = async () => {
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    const { count: activeSubscriptions } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('subscription_status', 'active')

    const { data: thisMonthUsers } = await supabase
      .from('profiles')
      .select('id')
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

    setStats({
      totalUsers: totalUsers || 0,
      activeSubscriptions: activeSubscriptions || 0,
      totalRevenue: 0,
      newUsersThisMonth: thisMonthUsers?.length || 0,
    })
  }

  const fetchRecentUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, subscription_status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    setRecentUsers(data || [])
  }

  const fetchRecentPayments = async () => {
    const { data } = await supabase
      .from('payment_requests')
      .select('id, user_id, amount, status, created_at, profiles!inner(email, full_name)')
      .order('created_at', { ascending: false })
      .limit(5)

    setRecentPayments(data || [])
  }

  const fetchStatusBreakdown = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')

    const breakdown = { active: 0, inactive: 0, grace_period: 0, expired: 0 }
    data?.forEach((p: any) => {
      if (breakdown[p.subscription_status as keyof typeof breakdown] !== undefined) {
        breakdown[p.subscription_status as keyof typeof breakdown]++
      }
    })

    setStatusBreakdown(breakdown)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <IconLoader className="w-10 h-10 text-emerald-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconShield className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">ადმინ პანელი</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/users" className="text-sm text-slate-400 hover:text-white transition-colors">
              მომხმარებლები
            </Link>
            <Link href="/admin/payments" className="text-sm text-slate-400 hover:text-white transition-colors">
              გადახდები
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            კეთილი იყოს თქვენი დაბრუნება, {user?.email?.split('@')[0]}!
          </h2>
          <p className="text-slate-400">
            აქ არის თქვენი პლატფორმის მიმოხილვა
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={IconUsers}
            label="სულ მომხმარებელი"
            value={stats.totalUsers}
            change={`+${stats.newUsersThisMonth} ამ თვეში`}
            gradient="from-emerald-500 to-teal-600"
            link="/admin/users"
          />
          <StatCard
            icon={IconCheck}
            label="აქტიური გამოწერა"
            value={stats.activeSubscriptions}
            gradient="from-blue-500 to-cyan-600"
            link="/admin/users"
          />
          <StatCard
            icon={IconCreditCard}
            label="შემოსავალი"
            value={`₾${stats.totalRevenue.toLocaleString()}`}
            gradient="from-purple-500 to-pink-600"
            link="/admin/payments"
          />
          <StatCard
            icon={IconTrendingUp}
            label="ზრდის ტენდენცია"
            value="+12%"
            change="ბოლო 30 დღე"
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <IconActivity className="w-5 h-5 text-emerald-400" />
            სწრაფი მოქმედებები
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/users"
              className="group bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-emerald-500/50 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                <IconUserPlus className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">მომხმარებლები</div>
                <div className="text-xs text-slate-400">მართვა და რედაქტირება</div>
              </div>
              <IconArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/payments"
              className="group bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <IconCreditCard className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">გადახდები</div>
                <div className="text-xs text-slate-400">გადახდების მართვა</div>
              </div>
              <IconArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/admin/users"
              className="group bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <IconUsers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">როლების მართვა</div>
                <div className="text-xs text-slate-400">ადმინი/თავმჯდომარე</div>
              </div>
              <IconArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/pricing"
              className="group bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-amber-500/50 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                <IconTrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">პაკეტები</div>
                <div className="text-xs text-slate-400">ფასების ნახვა</div>
              </div>
              <IconArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <IconUserPlus className="w-5 h-5 text-emerald-400" />
                ბოლო რეგისტრაციები
              </h3>
              <Link href="/admin/users" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                ყველას ნახვა
                <IconArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {(user.full_name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{user.full_name || 'უცნობი'}</div>
                      <div className="text-xs text-slate-400 truncate">{user.email}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                        user.role === 'chairman' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {user.role === 'admin' ? 'ადმინი' : user.role === 'chairman' ? 'თავმჯდომარე' : 'მომხმარებელი'}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(user.created_at).toLocaleDateString('ka-GE', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  ბოლო რეგისტრაციები ვერ მოიძებნა
                </div>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <IconCreditCard className="w-5 h-5 text-blue-400" />
                ბოლო გადახდები
              </h3>
              <Link href="/admin/payments" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                ყველას ნახვა
                <IconArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      ₾
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">
                        {payment.profiles?.full_name || payment.profiles?.email || 'უცნობი'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(payment.created_at).toLocaleDateString('ka-GE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-white text-sm">₾{payment.amount}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        payment.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                        payment.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {payment.status === 'approved' ? 'დამტკიცებული' :
                         payment.status === 'pending' ? 'ლოდინში' :
                         payment.status === 'rejected' ? 'უარყოფილი' : payment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  ბოლო გადახდები ვერ მოიძებნა
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="mt-6 bg-slate-800/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <IconActivity className="w-5 h-5 text-purple-400" />
            გამოწერის სტატუსების მიმოხილვა
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-sm text-slate-400">აქტიური</span>
              </div>
              <div className="text-2xl font-bold text-white">{statusBreakdown.active}</div>
              <div className="text-xs text-slate-500 mt-1">
                {stats.totalUsers > 0 ? Math.round((statusBreakdown.active / stats.totalUsers) * 100) : 0}% სულ რაოდენობიდან
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-sm text-slate-400">არააქტიური</span>
              </div>
              <div className="text-2xl font-bold text-white">{statusBreakdown.inactive}</div>
              <div className="text-xs text-slate-500 mt-1">
                {stats.totalUsers > 0 ? Math.round((statusBreakdown.inactive / stats.totalUsers) * 100) : 0}% სულ რაოდენობიდან
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-sm text-slate-400">შეღავათი</span>
              </div>
              <div className="text-2xl font-bold text-white">{statusBreakdown.grace_period}</div>
              <div className="text-xs text-slate-500 mt-1">
                {stats.totalUsers > 0 ? Math.round((statusBreakdown.grace_period / stats.totalUsers) * 100) : 0}% სულ რაოდენობიდან
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-4 border border-rose-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <span className="text-sm text-slate-400">ვადაგასული</span>
              </div>
              <div className="text-2xl font-bold text-white">{statusBreakdown.expired}</div>
              <div className="text-xs text-slate-500 mt-1">
                {stats.totalUsers > 0 ? Math.round((statusBreakdown.expired / stats.totalUsers) * 100) : 0}% სულ რაოდენობიდან
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}