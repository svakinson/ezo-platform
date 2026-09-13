'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ============ სერვისების სია (მხოლოდ სახელები და იკონები) ============
const SERVICES_LIST = [
  {
    id: 'admin',
    name: 'ადმინისტრაციული ხარჯები',
    icon: '👔',
    items: [
      { id: 'chairman_salary', name: 'თავმჯდომარის ანაზღაურება' },
      { id: 'accountant', name: 'ბუღალტრის მომსახურება' },
      { id: 'lawyer', name: 'იურისტის მომსახურება' },
      { id: 'office_supplies', name: 'ოფისის ხარჯები (კანცელარია)' },
      { id: 'communication', name: 'საკომუნიკაციო ხარჯები' },
      { id: 'bank_fees', name: 'საბანკო მომსახურება' },
      { id: 'building_insurance', name: 'კორპუსის დაზღვევა' },
      { id: 'audit', name: 'ფინანსური აუდიტი' },
      { id: 'assembly_costs', name: 'საკრებულოს ხარჯები' },
    ]
  },
  {
    id: 'utilities',
    name: 'კომუნალური მომსახურება',
    icon: '💡',
    items: [
      { id: 'elec_common', name: 'ელექტროენერგია (საერთო)' },
      { id: 'water_common', name: 'წყალი (საერთო)' },
      { id: 'gas_common', name: 'გაზი (საერთო)' },
      { id: 'trash_removal', name: 'ნაგვის გატანა' },
      { id: 'hot_water_recirc', name: 'ცხელი წყლის რეცირკულაცია' },
      { id: 'sewage', name: 'კანალიზაცია (საერთო)' },
    ]
  },
  {
    id: 'maintenance',
    name: 'შენობის მოვლა-შენახვა',
    icon: '🛠️',
    items: [
      { id: 'elevator_service', name: 'ლიფტის მომსახურება' },
      { id: 'elevator_electricity', name: 'ლიფტის ელექტროენერგია' },
      { id: 'elevator_repair', name: 'ლიფტის შეკეთება/მოდერნიზაცია' },
      { id: 'hallway_cleaning', name: 'სადარბაზოს დასუფთავება' },
      { id: 'elevator_cleaning', name: 'ლიფტის კაბინის დასუფთავება' },
      { id: 'yard_cleaning', name: 'ეზოს დასუფთავება' },
      { id: 'window_cleaning', name: 'ფანჯრების რეცხვა' },
      { id: 'floor_polishing', name: 'იატაკის პოლირება' },
      { id: 'container_cleaning', name: 'ნაგვის კონტეინერების რეცხვა' },
      { id: 'disinfection', name: 'დეზინფექცია/დეზინსექცია' },
      { id: 'snow_removal', name: 'თოვლის გაწმენდა' },
      { id: 'leaf_removal', name: 'ფოთლების გაწმენდა' },
      { id: 'repair_fund', name: 'სარემონტო ფონდი' },
      { id: 'plumbing', name: 'სანტექნიკური მომსახურება' },
    ]
  },
  {
    id: 'technical',
    name: 'ტექნიკური სისტემები',
    icon: '⚙️',
    items: [
      { id: 'fire_safety', name: 'სახანძრო სისტემის მომსახურება' },
      { id: 'fire_inspection', name: 'სახანძრო შემოწმება' },
      { id: 'domophone', name: 'დომოფონი/ინტერკომი' },
      { id: 'water_pumps', name: 'წყლის ტუმბოები' },
      { id: 'generator', name: 'გენერატორი' },
      { id: 'ventilation', name: 'ვენტილაცია' },
      { id: 'ac_common', name: 'კონდიცირება (საერთო)' },
    ]
  },
  {
    id: 'security',
    name: 'უსაფრთხოება',
    icon: '🛡️',
    items: [
      { id: 'guard', name: 'დარაჯი / კონსიერჟი' },
      { id: 'cctv', name: 'ვიდეოკამერების მომსახურება' },
      { id: 'alarm', name: 'სასიგნალო სისტემა' },
    ]
  },
  {
    id: 'yard_green',
    name: 'ეზო და მწვანე ზონა',
    icon: '🌳',
    items: [
      { id: 'green_maintenance', name: 'მწვანე ზონის მოვლა' },
      { id: 'tree_care', name: 'ხეების მოვლა/შეჭრა' },
      { id: 'flower_care', name: 'ყვავილების მოვლა' },
      { id: 'yard_lighting', name: 'ეზოს განათება' },
      { id: 'playground', name: 'საბავშვო მოედნის მოვლა' },
      { id: 'sports_area', name: 'სპორტული მოედნის მოვლა' },
      { id: 'fountain', name: 'ფანტანი/წყლის ელემენტი' },
      { id: 'outdoor_lighting_repair', name: 'გარე განათების შეკეთება' },
    ]
  },
  {
    id: 'construction',
    name: 'მშენებლობა და რემონტი',
    icon: '🏗️',
    items: [
      { id: 'roof_repair', name: 'სახურავის შეკეთება' },
      { id: 'facade_repair', name: 'ფასადის შეკეთება' },
      { id: 'hallway_repair', name: 'სადარბაზოს რემონტი' },
      { id: 'pipe_repair', name: 'მილგაყვანილობის შეკეთება' },
      { id: 'electrical_repair', name: 'ელექტროგაყვანილობის განახლება' },
      { id: 'stair_rail_repair', name: 'კიბის მოაჯირების შეკეთება' },
      { id: 'door_window_repair', name: 'კარი/ფანჯარის შეკეთება' },
      { id: 'hydro_insulation', name: 'ჰიდროიზოლაცია' },
      { id: 'seismic_reinforcement', name: 'სეისმომედეგობა' },
    ]
  },
  {
    id: 'parking',
    name: 'პარკინგი',
    icon: '🅿️',
    items: [
      { id: 'underground_parking', name: 'მიწისქვეშა პარკინგი' },
      { id: 'outdoor_parking', name: 'ღია პარკინგი' },
      { id: 'parking_lighting', name: 'პარკინგის განათება' },
      { id: 'parking_repair', name: 'პარკინგის შეკეთება' },
      { id: 'ev_charger', name: 'ელექტრომობილის დამტენი' },
      { id: 'bike_storage', name: 'ველოსიპედების სადგომი' },
    ]
  },
  {
    id: 'amenities',
    name: 'დამატებითი სერვისები',
    icon: '✨',
    items: [
      { id: 'pool', name: 'საცურაო აუზი' },
      { id: 'gym', name: 'სპორტდარბაზი' },
      { id: 'spa_sauna', name: 'სპა/საუნა' },
      { id: 'kids_room', name: 'საბავშვო ოთახი' },
      { id: 'coworking', name: 'კოვორკინგი' },
      { id: 'guest_room', name: 'სტუმრების ოთახი' },
      { id: 'storage', name: 'სათავსოები' },
      { id: 'laundry', name: 'სარეცხი ოთახი' },
      { id: 'library', name: 'ბიბლიოთეკა' },
      { id: 'cinema', name: 'კინო ოთახი' },
    ]
  },
]

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconChevronDown = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconSearch = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const IconCopy = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const IconX = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconAlertTriangle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

interface MonthlyExpensesTabProps {
  buildingId: string
}

interface ExpenseItemState {
  id: string
  name: string
  total_amount: string
}

interface CategoryState {
  id: string
  name: string
  icon: string
  isOpen: boolean
  items: ExpenseItemState[]
}

interface ToastState {
  message: string
  type: 'success' | 'error'
}

export default function MonthlyExpensesTab({ buildingId }: MonthlyExpensesTabProps) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copying, setCopying] = useState(false)
  const [categories, setCategories] = useState<CategoryState[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [hasChanges, setHasChanges] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  useEffect(() => {
    loadExpenses()
  }, [buildingId, selectedMonth, selectedYear])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  const loadExpenses = async () => {
    setLoading(true)
    try {
      const { data: expenses, error } = await supabase
        .from('monthly_expenses')
        .select('*')
        .eq('building_id', buildingId)
        .eq('month', selectedMonth)
        .eq('year', selectedYear)

      if (error) throw error

      const initialCategories: CategoryState[] = SERVICES_LIST.map(cat => ({
        ...cat,
        isOpen: false,
        items: cat.items.map(item => {
          const existing = expenses?.find((e: any) => e.category_id === item.id)
          return {
            id: item.id,
            name: item.name,
            total_amount: existing?.total_amount ? String(existing.total_amount) : ''
          }
        })
      }))

      setCategories(initialCategories)
      setHasChanges(false)
    } catch (error) {
      console.error('Error loading expenses:', error)
      showToast('ხარჯების ჩატვირთვის შეცდომა', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateExpense = (catIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...categories]
    newCategories[catIndex].items[itemIndex].total_amount = value
    setCategories(newCategories)
    setHasChanges(true)
  }

  const clearExpense = (catIndex: number, itemIndex: number) => {
    updateExpense(catIndex, itemIndex, '')
  }

  const toggleCategory = (catIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].isOpen = !newCategories[catIndex].isOpen
    setCategories(newCategories)
  }

  const expandAll = () => setCategories(categories.map(c => ({ ...c, isOpen: true })))
  const collapseAll = () => setCategories(categories.map(c => ({ ...c, isOpen: false })))

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error: deleteError } = await supabase
        .from('monthly_expenses')
        .delete()
        .eq('building_id', buildingId)
        .eq('month', selectedMonth)
        .eq('year', selectedYear)

      if (deleteError) throw deleteError

      const payload: any[] = []
      categories.forEach(cat => {
        cat.items.forEach(item => {
          const totalAmount = parseFloat(item.total_amount)
          if (!isNaN(totalAmount) && totalAmount >= 0) {
            payload.push({
              building_id: buildingId,
              month: selectedMonth,
              year: selectedYear,
              category_id: item.id,
              category_group: cat.name,
              service_name: item.name,
              total_amount: totalAmount,
              notes: null
            })
          }
        })
      })

      if (payload.length > 0) {
        const { error: insertError } = await supabase
          .from('monthly_expenses')
          .insert(payload)
        if (insertError) throw insertError
      }

      showToast('თვიური ხარჯები შენახულია — თანხები ავტომატურად გადანაწილდება ბინებზე')
      setHasChanges(false)
      await loadExpenses()
    } catch (error) {
      console.error('Error saving expenses:', error)
      showToast('შენახვის შეცდომა: ' + (error as any).message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const copyPreviousMonth = async () => {
    setCopying(true)
    try {
      const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1
      const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear

      const { data: prevExpenses, error } = await supabase
        .from('monthly_expenses')
        .select('*')
        .eq('building_id', buildingId)
        .eq('month', prevMonth)
        .eq('year', prevYear)

      if (error) throw error

      if (!prevExpenses || prevExpenses.length === 0) {
        showToast('წინა თვის მონაცემები ვერ მოიძებნა', 'error')
        return
      }

      const newCategories = categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => {
          const prev = prevExpenses.find((e: any) => e.category_id === item.id)
          return prev ? { ...item, total_amount: String(prev.total_amount) } : item
        })
      }))

      setCategories(newCategories)
      setHasChanges(true)
      showToast(`${prevExpenses.length} პუნქტი დაკოპირდა წინა თვიდან — შეასწორეთ საჭიროებისამებრ და შეინახეთ`)
    } catch (error) {
      console.error('Error copying previous month:', error)
      showToast('კოპირების შეცდომა', 'error')
    } finally {
      setCopying(false)
    }
  }

  const totalMonthlyExpenses = categories.reduce((sum, cat) => {
    return sum + cat.items.reduce((catSum, item) => {
      const val = parseFloat(item.total_amount)
      return catSum + (isNaN(val) ? 0 : val)
    }, 0)
  }, 0)

  const filledItemsCount = categories.reduce((sum, cat) => {
    return sum + cat.items.filter(item => {
      const val = parseFloat(item.total_amount)
      return !isNaN(val) && val > 0
    }).length
  }, 0)

  const months = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ]

  const query = searchQuery.trim().toLowerCase()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <IconLoader className="w-8 h-8 text-emerald-400" />
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sticky action bar */}
      <div className="sticky top-0 z-30 -mx-1 px-1 pb-3 pt-1 bg-gradient-to-b from-[#0B121B] via-[#0B121B]/95 to-transparent backdrop-blur-md">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="მოძებნე სერვისი — მაგ. ლიფტი, დარაჯი, წყალი..."
              className="w-full pl-10 pr-9 py-3 bg-white/[0.04] border border-white/[0.09] rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyPreviousMonth}
              disabled={copying}
              className="flex items-center gap-2 px-4 py-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] rounded-xl text-sm font-semibold text-slate-200 transition-all disabled:opacity-50"
            >
              {copying ? <IconLoader className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
              <span className="hidden sm:inline">წინა თვის კოპირება</span>
              <span className="sm:hidden">კოპირება</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_12px_32px_rgba(16,185,129,0.20)] hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-none"
            >
              {saving ? <IconLoader className="w-4 h-4" /> : <IconCheck className="w-4 h-4" />}
              {saving ? 'ინახება...' : 'შენახვა'}
            </button>
          </div>
        </div>

        {hasChanges && (
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            შენახული არ არის ცვლილებები
          </div>
        )}
      </div>

      {/* Header: Month/Year + Summary */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.055] via-white/[0.028] to-emerald-500/[0.018] border border-white/[0.09] rounded-[28px] p-5 sm:p-7 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-emerald-400/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-20 w-52 h-52 rounded-full bg-cyan-400/[0.035] blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">თვიური ხარჯები</h2>
            <p className="text-sm text-slate-400 leading-6 max-w-3xl">
              მიუთითეთ თითოეული სერვისის <span className="text-emerald-300 font-semibold">ჯამური თვიური ხარჯი</span>. სისტემა ავტომატურად გაანაწილებს მას ბინებზე მათი ტარიფის მიხედვით.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2.5 bg-[#0D151F] border border-white/[0.09] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all"
            >
              {months.map((month, idx) => (
                <option key={idx} value={idx + 1}>{month}</option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-24 px-4 py-2.5 bg-[#0D151F] border border-white/[0.09] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all"
            />
          </div>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="relative overflow-hidden bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 mb-2 font-semibold">სულ ხარჯი</div>
            <div className="text-xl sm:text-[28px] font-bold text-emerald-300 tracking-tight">{totalMonthlyExpenses.toFixed(2)}₾</div>
          </div>
          <div className="relative overflow-hidden bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 mb-2 font-semibold">შევსებული სერვისები</div>
            <div className="text-xl sm:text-[28px] font-bold text-cyan-300 tracking-tight">{filledItemsCount}</div>
          </div>
          <div className="relative overflow-hidden bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] col-span-2 sm:col-span-1">
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-500 mb-2 font-semibold">სტატუსი</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {hasChanges ? (
                <>
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.65)]" />
                  <span className="text-amber-400">უნდა შეინახოს</span>
                </>
              ) : (
                <>
                  <IconCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">შენახულია</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex items-end justify-between px-1 pt-1">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold">ხარჯების კატეგორიები</p>
          <p className="text-xs text-slate-400 mt-1">გახსენით კატეგორია და შეიყვანეთ შესაბამისი თვის ხარჯი</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={expandAll} className="text-xs font-semibold text-slate-400 hover:text-emerald-300 transition-colors">
            ყველას გახსნა
          </button>
          <span className="text-slate-600">·</span>
          <button onClick={collapseAll} className="text-xs font-semibold text-slate-400 hover:text-emerald-300 transition-colors">
            ყველას ჩაკეცვა
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat, catIndex) => {
          const matchingItems = cat.items.filter(item => !query || item.name.toLowerCase().includes(query))
          if (query && matchingItems.length === 0) return null

          const isOpen = query ? true : cat.isOpen
          const catTotal = cat.items.reduce((s, it) => s + (parseFloat(it.total_amount) || 0), 0)
          const filledCount = cat.items.filter(it => parseFloat(it.total_amount) > 0).length

          return (
            <div key={cat.id} className="border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.018] shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
              <button
                onClick={() => toggleCategory(catIndex)}
                className="w-full flex items-center justify-between p-4 sm:p-4.5 bg-white/[0.035] hover:bg-white/[0.06] transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0">{cat.icon}</span>
                  <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-tight truncate">{cat.name}</h3>
                  <span className="hidden sm:inline-flex text-[11px] text-slate-400 bg-white/[0.055] border border-white/[0.06] px-2.5 py-1 rounded-full font-medium shrink-0">
                    {filledCount}/{cat.items.length} შევსებული
                  </span>
                  {catTotal > 0 && (
                    <span className="text-[11px] text-emerald-300 bg-emerald-400/[0.08] border border-emerald-400/20 px-2.5 py-1 rounded-full font-semibold shrink-0">
                      {catTotal.toFixed(0)}₾
                    </span>
                  )}
                </div>
                <IconChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-3.5 sm:p-4 space-y-2.5 border-t border-white/[0.06] bg-black/[0.06]">
                  {cat.items.map((item, itemIndex) => {
                    if (query && !item.name.toLowerCase().includes(query)) return null
                    const hasValue = parseFloat(item.total_amount) > 0

                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl border-l-[3px] transition-all duration-200 ${
                          hasValue
                            ? 'bg-gradient-to-r from-emerald-500/[0.07] to-teal-500/[0.025] border-l-emerald-400 border-y border-r border-emerald-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]'
                            : 'bg-white/[0.025] border-l-white/[0.09] border-y border-r border-white/[0.06]'
                        }`}
                      >
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${hasValue ? 'text-white' : 'text-slate-400'}`}>
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:w-64">
                          <div className="relative flex-1">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.total_amount}
                              onChange={(e) => updateExpense(catIndex, itemIndex, e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#0D151F] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all text-right pr-9 shadow-inner"
                              placeholder="0.00"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">₾</span>
                          </div>
                          {hasValue && (
                            <button
                              onClick={() => clearExpense(catIndex, itemIndex)}
                              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
                              title="გასუფთავება"
                            >
                              <IconX className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {query && categories.every(cat => cat.items.filter(item => item.name.toLowerCase().includes(query)).length === 0) && (
          <div className="text-center py-12 text-slate-500 text-sm">
            "{searchQuery}" — ვერაფერი მოიძებნა
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div
            className={`flex items-start gap-3 max-w-sm px-4 py-3.5 rounded-2xl border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
              toast.type === 'success'
                ? 'bg-emerald-500/[0.12] border-emerald-400/30 text-emerald-100'
                : 'bg-rose-500/[0.12] border-rose-400/30 text-rose-100'
            }`}
          >
            {toast.type === 'success' ? (
              <IconCheck className="w-4.5 h-4.5 shrink-0 mt-0.5 text-emerald-400" />
            ) : (
              <IconAlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-rose-400" />
            )}
            <span className="text-sm font-medium leading-snug">{toast.message}</span>
          </div>
        </div>
      )}

      <style>{`
        .ezo-expenses-scroll::-webkit-scrollbar { width: 6px; }
        .ezo-expenses-scroll::-webkit-scrollbar-track { background: transparent; }
        .ezo-expenses-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,.18); border-radius: 999px; }
        .ezo-expenses-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,.30); }
        select option { background: #0D151F; color: #fff; }
        @media (max-width: 640px) {
          input, select, button { min-height: 42px; }
        }
      `}</style>
    </div>
  )
}