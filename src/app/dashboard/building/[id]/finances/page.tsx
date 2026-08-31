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

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconCalendar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

// ============ GENERATE MODAL ============
function GenerateModal({ isOpen, onClose, buildingId, onSuccess }: { 
  isOpen: boolean; 
  onClose: () => void; 
  buildingId: string;
  onSuccess: () => void;
}) {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [preview, setPreview] = useState<any>(null)

  useEffect(() => {
    if (isOpen) {
      const today = new Date()
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      setSelectedMonth(nextMonth.toISOString().slice(0, 7))
      setPreview(null)
    }
  }, [isOpen])

  const handlePreview = async () => {
    if (!selectedMonth) return
    setIsProcessing(true)

    try {
      const { data: settings } = await supabase
        .from('building_financial_settings')
        .select('*')
        .eq('building_id', buildingId)
        .single()

      const { data: apartments } = await supabase
        .from('apartments')
        .select('*')
        .eq('building_id', buildingId)

      const { data: assessments } = await supabase
        .from('special_assessments')
        .select('*')
        .eq('building_id', buildingId)
        .eq('is_active', true)

      let totalAmount = 0
      const breakdown = {
        residential: { count: 0, amount: 0 },
        commercial: { count: 0, amount: 0 },
        other: { count: 0, amount: 0 },
      }

      apartments?.forEach(apt => {
        let amount = 0
        const propertyType = apt.property_type || 'residential'

        if (apt.custom_monthly_fee) {
          amount = apt.custom_monthly_fee
        } else if (settings?.fee_calculation_method === 'per_sqm') {
          const rate = propertyType === 'commercial' 
            ? settings.commercial_rate_per_sqm 
            : settings.residential_rate_per_sqm
          amount = (apt.area_sqm || 0) * rate
        } else if (settings?.fee_calculation_method === 'per_apartment') {
          amount = settings.fixed_monthly_fee || 0
        }

        let specialAmount = 0
        assessments?.forEach(assessment => {
          if (assessment.calculation_method === 'per_unit') {
            specialAmount += assessment.amount_per_unit || 0
          } else if (assessment.calculation_method === 'per_sqm') {
            specialAmount += (apt.area_sqm || 0) * (assessment.amount_per_sqm || 0)
          } else if (assessment.calculation_method === 'fixed') {
            specialAmount += assessment.fixed_amount || 0
          }
        })

        amount += specialAmount
        totalAmount += amount

        if (propertyType === 'residential') {
          breakdown.residential.count++
          breakdown.residential.amount += amount
        } else if (propertyType === 'commercial') {
          breakdown.commercial.count++
          breakdown.commercial.amount += amount
        } else {
          breakdown.other.count++
          breakdown.other.amount += amount
        }
      })

      setPreview({
        totalApartments: apartments?.length || 0,
        totalAmount,
        breakdown,
        settings,
      })
    } catch (error) {
      console.error('Preview error:', error)
      alert('შეცდომა პრევიუს შექმნისას')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGenerate = async () => {
    if (!selectedMonth || !preview) return
    setIsProcessing(true)

    try {
      const { data: settings } = await supabase
        .from('building_financial_settings')
        .select('*')
        .eq('building_id', buildingId)
        .single()

      const { data: apartments } = await supabase
        .from('apartments')
        .select('*')
        .eq('building_id', buildingId)

      const { data: assessments } = await supabase
        .from('special_assessments')
        .select('*')
        .eq('building_id', buildingId)
        .eq('is_active', true)

      const feesToInsert = []
      const dueDate = new Date(selectedMonth + '-01')
      dueDate.setDate(settings?.payment_due_day || 15)

      for (const apt of apartments || []) {
        let baseAmount = 0
        let calculationMethod = settings?.fee_calculation_method || 'per_apartment'
        const propertyType = apt.property_type || 'residential'

        if (apt.custom_monthly_fee) {
          baseAmount = apt.custom_monthly_fee
          calculationMethod = 'custom'
        } else if (settings?.fee_calculation_method === 'per_sqm') {
          const rate = propertyType === 'commercial' 
            ? settings.commercial_rate_per_sqm 
            : settings.residential_rate_per_sqm
          baseAmount = (apt.area_sqm || 0) * rate
        } else if (settings?.fee_calculation_method === 'per_apartment') {
          baseAmount = settings.fixed_monthly_fee || 0
        }

        let specialAmount = 0
        for (const assessment of assessments || []) {
          if (assessment.calculation_method === 'per_unit') {
            specialAmount += assessment.amount_per_unit || 0
          } else if (assessment.calculation_method === 'per_sqm') {
            specialAmount += (apt.area_sqm || 0) * (assessment.amount_per_sqm || 0)
          } else if (assessment.calculation_method === 'fixed') {
            specialAmount += assessment.fixed_amount || 0
          }
        }

        feesToInsert.push({
          building_id: buildingId,
          apartment_id: apt.id,
          fee_month: selectedMonth + '-01',
          amount: baseAmount + specialAmount,
          base_amount: baseAmount,
          special_assessment_amount: specialAmount,
          due_date: dueDate.toISOString().slice(0, 10),
          grace_period_days: settings?.grace_period_days || 5,
          late_fee_amount: settings?.late_fee_amount || 0,
          late_fee_percentage: settings?.late_fee_percentage || 0,
          status: 'pending',
          calculation_method: calculationMethod,
          property_type: propertyType,
        })
      }

      if (feesToInsert.length > 0) {
        const { error } = await supabase.from('monthly_fees').insert(feesToInsert)
        if (error) throw error
      }

      alert(`წარმატებით შეიქმნა ${feesToInsert.length} ბინის გადასახადი ${selectedMonth}-ისთვის. ჯამური თანხა: ₾${preview.totalAmount.toLocaleString()}`)
      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Generate error:', error)
      alert('შეცდომა: ' + error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <IconCalendar className="w-6 h-6 text-emerald-400" />
            ყოველთვიური გადასახადების გენერაცია
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <IconX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">აირჩიეთ თვე</label>
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
          </div>

          <button 
            onClick={handlePreview}
            disabled={!selectedMonth || isProcessing}
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isProcessing ? 'ითვლის...' : 'პრევიუს ნახვა'}
          </button>

          {preview && (
            <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">ჯამური თანხა</div>
                <div className="text-4xl font-bold text-emerald-400">₾{preview.totalAmount.toLocaleString()}</div>
                <div className="text-sm text-slate-400 mt-2">{preview.totalApartments} ბინა</div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">საცხოვრებელი</div>
                  <div className="text-lg font-bold text-white">{preview.breakdown.residential.count}</div>
                  <div className="text-xs text-emerald-400">₾{preview.breakdown.residential.amount.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">სავაჭრო</div>
                  <div className="text-lg font-bold text-white">{preview.breakdown.commercial.count}</div>
                  <div className="text-xs text-blue-400">₾{preview.breakdown.commercial.amount.toLocaleString()}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">სხვა</div>
                  <div className="text-lg font-bold text-white">{preview.breakdown.other.count}</div>
                  <div className="text-xs text-slate-400">₾{preview.breakdown.other.amount.toLocaleString()}</div>
                </div>
              </div>

              {preview.settings && (
                <div className="text-xs text-slate-500 pt-4 border-t border-white/10">
                  <div>გამოთვლის მეთოდი: <span className="text-slate-300">{preview.settings.fee_calculation_method}</span></div>
                  {preview.settings.fee_calculation_method === 'per_sqm' && (
                    <>
                      <div>საცხოვრებელი ტარიფი: <span className="text-slate-300">₾{preview.settings.residential_rate_per_sqm}/მ²</span></div>
                      <div>სავაჭრო ტარიფი: <span className="text-slate-300">₾{preview.settings.commercial_rate_per_sqm}/მ²</span></div>
                    </>
                  )}
                  {preview.settings.fee_calculation_method === 'per_apartment' && (
                    <div>ფიქსირებული თანხა: <span className="text-slate-300">₾{preview.settings.fixed_monthly_fee}</span></div>
                  )}
                </div>
              )}
            </div>
          )}

          {preview && (
            <button 
              onClick={handleGenerate}
              disabled={isProcessing}
              className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <IconLoader className="w-5 h-5" />
                  გენერაცია...
                </>
              ) : (
                <>
                  <IconPlus className="w-5 h-5" />
                  გენერაცია {preview.totalApartments} ბინისთვის
                </>
              )}
            </button>
          )}
        </div>
      </div>
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
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    pendingPayments: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState<any[]>([])

  const loadData = async () => {
    if (!buildingId) return
    try {
      const { data: buildingData, error: buildingError } = await supabase
        .from('buildings')
        .select('*')
        .eq('id', buildingId)
        .single()
      
      if (buildingError) throw buildingError
      setBuilding(buildingData)

      const currentMonth = new Date().toISOString().slice(0, 7) + '-01'
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('building_id', buildingId)
        .gte('payment_date', currentMonth)
      
      const totalIncome = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount')
        .eq('building_id', buildingId)
        .gte('expense_date', currentMonth)
      
      const totalExpenses = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0

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

  useEffect(() => {
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">ფინანსები</h2>
          <p className="text-slate-400">
            {new Date().toLocaleDateString('ka-GE', { year: 'numeric', month: 'long' })}
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => setIsGenerateModalOpen(true)}
            className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconCalendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg">ყოველთვიური გენერაცია</div>
                <div className="text-sm text-slate-400">ინვოისების შექმნა</div>
              </div>
            </div>
          </button>

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
        </div>

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

        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-white mb-6">ხარჯები კატეგორიებით</h3>
          <div className="text-center py-12 text-slate-400">
            მონაცემები მალე დაემატება...
          </div>
        </div>
      </main>

      {/* Generate Modal */}
      <GenerateModal 
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        buildingId={buildingId}
        onSuccess={loadData}
      />
    </div>
  )
}