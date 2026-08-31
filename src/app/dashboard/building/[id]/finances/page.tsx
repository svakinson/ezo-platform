'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconTrendingUp = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconTrendingDown = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
)

const IconWallet = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

const IconAlertCircle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ STAT CARD ============
function StatCard({ icon: Icon, label, value, sublabel, gradient, trend }: { 
  icon: any; 
  label: string; 
  value: string;
  sublabel: string;
  gradient: string;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400'
          }`}>
            {trend === 'up' && <IconTrendingUp className="w-3 h-3" />}
            {trend === 'down' && <IconTrendingDown className="w-3 h-3" />}
            {trend === 'up' ? '+12%' : trend === 'down' ? '-5%' : '0%'}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
      {sublabel && <div className="text-xs text-slate-500 mt-1">{sublabel}</div>}
    </div>
  )
}

// ============ MAIN PAGE ============

export default function FinancesPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    pendingPayments: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return
      try {
        // Load building
        const { data: buildingData, error: buildingError } = await supabase
          .from('buildings')
          .select('*')
          .eq('id', buildingId)
          .single()
        
        if (buildingError) throw buildingError
        setBuilding(buildingData)

        // Load current month's income (payments)
        const currentMonth = new Date().toISOString().slice(0, 7) + '-01'
        const { data: payments } = await supabase
          .from('payments')
          .select('amount')
          .eq('building_id', buildingId)
          .gte('payment_date', currentMonth)
        
        const totalIncome = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

        // Load current month's expenses
        const { data: expenses } = await supabase
          .from('expenses')
          .select('amount')
          .eq('building_id', buildingId)
          .gte('expense_date', currentMonth)
        
        const totalExpenses = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0

        // Load pending monthly fees
        const { data: pendingFees } = await supabase
          .from('monthly_fees')
          .select('amount')
          .eq('building_id', buildingId)
          .eq('status', 'pending')
        
        const pendingPayments = pendingFees?.reduce((sum, f) => sum + (f.amount || 0), 0) || 0

        setStats({
          totalIncome,
          totalExpenses,
          balance: totalIncome - totalExpenses,
          pendingPayments,
        })

        // Load recent transactions (mix of payments and expenses)
        const { data: recentPayments } = await supabase
          .from('payments')
          .select('*, apartment_id')
          .eq('building_id', buildingId)
          .order('payment_date', { ascending: false })
          .limit(5)

        const { data: recentExpenses } = await supabase
          .from('expenses')
          .select('*, category_id')
          .eq('building_id', buildingId)
          .order('expense_date', { ascending: false })
          .limit(5)

        const transactions = [
          ...(recentPayments || []).map(p => ({ ...p, type: 'income' })),
          ...(recentExpenses || []).map(e => ({ ...e, type: 'expense' })),
        ].sort((a, b) => {
          const dateA = a.type === 'income' ? a.payment_date : a.expense_date
          const dateB = b.type === 'income' ? b.payment_date : b.expense_date
          return new Date(dateB).getTime() - new Date(dateA).getTime()
        }).slice(0, 10)

        setRecentTransactions(transactions)

      } catch (error) {
        console.error('Error loading data:', error)
        alert('მონაცემების ჩატვირთვის შეცდომა')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [buildingId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">ფინანსები იტვირთება...</div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">კორპუსი ვერ მოიძებნა</div>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">← Dashboard-ზე დაბრუნება</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/building/${buildingId}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <IconArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
            </Link>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold text-white">{building.name || building.street}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
              <IconPlus className="w-4 h-4" />
              გადახდა
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors">
              <IconPlus className="w-4 h-4" />
              ხარჯი
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">ფინანსები</h2>
          <p className="text-slate-400">
            {new Date().toLocaleDateString('ka-GE', { year: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={IconTrendingUp}
            label="შემოსავალი"
            value={`₾${stats.totalIncome.toLocaleString()}`}
            sublabel="ამ თვეში"
            gradient="from-emerald-500 to-teal-600"
            trend="up"
          />
          <StatCard
            icon={IconTrendingDown}
            label="ხარჯები"
            value={`₾${stats.totalExpenses.toLocaleString()}`}
            sublabel="ამ თვეში"
            gradient="from-rose-500 to-pink-600"
            trend="down"
          />
          <StatCard
            icon={IconWallet}
            label="ბალანსი"
            value={`₾${stats.balance.toLocaleString()}`}
            sublabel={stats.balance >= 0 ? 'პოზიტიური' : 'ნეგატიური'}
            gradient="from-blue-500 to-cyan-600"
            trend={stats.balance >= 0 ? 'up' : 'down'}
          />
          <StatCard
            icon={IconAlertCircle}
            label="გადაუხდელი"
            value={`₾${stats.pendingPayments.toLocaleString()}`}
            sublabel="მოლოდინში"
            gradient="from-amber-500 to-orange-600"
            trend="neutral"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 text-left group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">გადახდის დამატება</div>
                <div className="text-sm text-slate-400">ხელით ჩაწერა</div>
              </div>
            </div>
          </button>

          <button className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-rose-500/50 transition-all duration-300 text-left group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">ხარჯის დამატება</div>
                <div className="text-sm text-slate-400">კატეგორიით</div>
              </div>
            </div>
          </button>

          <button className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 text-left group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconTrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">ყოველთვიური გენერაცია</div>
                <div className="text-sm text-slate-400">ინვოისები</div>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">ბოლო ტრანზაქციები</h3>
            <Link href={`/dashboard/building/${buildingId}/finances/transactions`} className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
              ყველას ნახვა →
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                <IconWallet className="w-8 h-8 text-slate-400" />
              </div>
              <h4 className="font-bold text-white text-lg mb-2">ტრანზაქციები არ არის</h4>
              <p className="text-sm text-slate-400 mb-6">დაამატე პირველი გადახდა ან ხარჯი</p>
              <div className="flex gap-3 justify-center">
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
                  + გადახდა
                </button>
                <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors">
                  + ხარჯი
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => {
                const isIncome = transaction.type === 'income'
                const date = isIncome ? transaction.payment_date : transaction.expense_date
                const description = isIncome 
                  ? `გადახდა - ${transaction.payer_name}`
                  : transaction.description
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isIncome ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                      }`}>
                        {isIncome ? (
                          <IconTrendingUp className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <IconTrendingDown className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{description}</div>
                        <div className="text-xs text-slate-400">
                          {new Date(date).toLocaleDateString('ka-GE', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${
                      isIncome ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isIncome ? '+' : '-'}₾{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Expense Categories Breakdown */}
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-6">ხარჯები კატეგორიებით</h3>
          <div className="text-center py-12 text-slate-400">
            მონაცემები მალე დაემატება...
          </div>
        </div>
      </main>
    </div>
  )
}