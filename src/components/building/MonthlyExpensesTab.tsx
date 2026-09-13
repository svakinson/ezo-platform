'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ============ სრული სტრუქტურა: კატეგორიები და სერვისები ============
const FULL_TARIFF_STRUCTURE = [
  {
    id: 'admin',
    name: 'ადმინისტრაციული ხარჯები',
    icon: '👔',
    items: [
      { id: 'chairman_salary', name: 'თავმჯდომარის ანაზღაურება', defaultType: 'equal_split' },
      { id: 'accountant', name: 'ბუღალტრის მომსახურება', defaultType: 'equal_split' },
      { id: 'lawyer', name: 'იურისტის მომსახურება', defaultType: 'equal_split' },
      { id: 'office_supplies', name: 'ოფისის ხარჯები (კანცელარია)', defaultType: 'equal_split' },
      { id: 'communication', name: 'საკომუნიკაციო ხარჯები', defaultType: 'equal_split' },
      { id: 'bank_fees', name: 'საბანკო მომსახურება', defaultType: 'equal_split' },
      { id: 'building_insurance', name: 'კორპუსის დაზღვევა', defaultType: 'per_sqm' },
      { id: 'audit', name: 'ფინანსური აუდიტი', defaultType: 'equal_split' },
      { id: 'assembly_costs', name: 'საკრებულოს ხარჯები', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'utilities',
    name: 'კომუნალური მომსახურება',
    icon: '💡',
    items: [
      { id: 'elec_common', name: 'ელექტროენერგია (საერთო)', defaultType: 'equal_split' },
      { id: 'water_common', name: 'წყალი (საერთო)', defaultType: 'equal_split' },
      { id: 'gas_common', name: 'გაზი (საერთო)', defaultType: 'equal_split' },
      { id: 'trash_removal', name: 'ნაგვის გატანა', defaultType: 'equal_split' },
      { id: 'hot_water_recirc', name: 'ცხელი წყლის რეცირკულაცია', defaultType: 'equal_split' },
      { id: 'sewage', name: 'კანალიზაცია (საერთო)', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'maintenance',
    name: 'შენობის მოვლა-შენახვა',
    icon: '️',
    items: [
      { id: 'elevator_service', name: 'ლიფტის მომსახურება', defaultType: 'equal_split' },
      { id: 'elevator_electricity', name: 'ლიფტის ელექტროენერგია', defaultType: 'equal_split' },
      { id: 'elevator_repair', name: 'ლიფტის შეკეთება/მოდერნიზაცია', defaultType: 'equal_split' },
      { id: 'hallway_cleaning', name: 'სადარბაზოს დასუფთავება', defaultType: 'equal_split' },
      { id: 'elevator_cleaning', name: 'ლიფტის კაბინის დასუფთავება', defaultType: 'equal_split' },
      { id: 'yard_cleaning', name: 'ეზოს დასუფთავება', defaultType: 'equal_split' },
      { id: 'window_cleaning', name: 'ფანჯრების რეცხვა', defaultType: 'equal_split' },
      { id: 'floor_polishing', name: 'იატაკის პოლირება', defaultType: 'equal_split' },
      { id: 'container_cleaning', name: 'ნაგვის კონტეინერების რეცხვა', defaultType: 'equal_split' },
      { id: 'disinfection', name: 'დეზინფექცია/დეზინსექცია', defaultType: 'equal_split' },
      { id: 'snow_removal', name: 'თოვლის გაწმენდა', defaultType: 'equal_split' },
      { id: 'leaf_removal', name: 'ფოთლების გაწმენდა', defaultType: 'equal_split' },
      { id: 'repair_fund', name: 'სარემონტო ფონდი', defaultType: 'per_sqm' },
      { id: 'plumbing', name: 'სანტექნიკური მომსახურება', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'technical',
    name: 'ტექნიკური სისტემები',
    icon: '⚙️',
    items: [
      { id: 'fire_safety', name: 'სახანძრო სისტემის მომსახურება', defaultType: 'equal_split' },
      { id: 'fire_inspection', name: 'სახანძრო შემოწმება', defaultType: 'equal_split' },
      { id: 'domophone', name: 'დომოფონი/ინტერკომი', defaultType: 'equal_split' },
      { id: 'water_pumps', name: 'წყლის ტუმბოები', defaultType: 'equal_split' },
      { id: 'generator', name: 'გენერატორი', defaultType: 'equal_split' },
      { id: 'ventilation', name: 'ვენტილაცია', defaultType: 'equal_split' },
      { id: 'ac_common', name: 'კონდიცირება (საერთო)', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'security',
    name: 'უსაფრთხოება',
    icon: '🛡️',
    items: [
      { id: 'guard', name: 'დარაჯი / კონსიერჟი', defaultType: 'equal_split' },
      { id: 'cctv', name: 'ვიდეოკამერების მომსახურება', defaultType: 'equal_split' },
      { id: 'alarm', name: 'სასიგნალო სისტემა', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'yard_green',
    name: 'ეზო და მწვანე ზონა',
    icon: '🌳',
    items: [
      { id: 'green_maintenance', name: 'მწვანე ზონის მოვლა', defaultType: 'equal_split' },
      { id: 'tree_care', name: 'ხეების მოვლა/შეჭრა', defaultType: 'equal_split' },
      { id: 'flower_care', name: 'ყვავილების მოვლა', defaultType: 'equal_split' },
      { id: 'yard_lighting', name: 'ეზოს განათება', defaultType: 'equal_split' },
      { id: 'playground', name: 'საბავშვო მოედნის მოვლა', defaultType: 'equal_split' },
      { id: 'sports_area', name: 'სპორტული მოედნის მოვლა', defaultType: 'equal_split' },
      { id: 'fountain', name: 'ფანტანი/წყლის ელემენტი', defaultType: 'equal_split' },
      { id: 'outdoor_lighting_repair', name: 'გარე განათების შეკეთება', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'construction',
    name: 'მშენებლობა და რემონტი',
    icon: '️',
    items: [
      { id: 'roof_repair', name: 'სახურავის შეკეთება', defaultType: 'equal_split' },
      { id: 'facade_repair', name: 'ფასადის შეკეთება', defaultType: 'equal_split' },
      { id: 'hallway_repair', name: 'სადარბაზოს რემონტი', defaultType: 'equal_split' },
      { id: 'pipe_repair', name: 'მილგაყვანილობის შეკეთება', defaultType: 'equal_split' },
      { id: 'electrical_repair', name: 'ელექტროგაყვანილობის განახლება', defaultType: 'equal_split' },
      { id: 'stair_rail_repair', name: 'კიბის მოაჯირების შეკეთება', defaultType: 'equal_split' },
      { id: 'door_window_repair', name: 'კარი/ფანჯარის შეკეთება', defaultType: 'equal_split' },
      { id: 'hydro_insulation', name: 'ჰიდროიზოლაცია', defaultType: 'equal_split' },
      { id: 'seismic_reinforcement', name: 'სეისმომედეგობა', defaultType: 'equal_split' },
    ]
  },
  {
    id: 'parking',
    name: 'პარკინგი',
    icon: '🅿️',
    items: [
      { id: 'underground_parking', name: 'მიწისქვეშა პარკინგი', defaultType: 'fixed' },
      { id: 'outdoor_parking', name: 'ღია პარკინგი', defaultType: 'fixed' },
      { id: 'parking_lighting', name: 'პარკინგის განათება', defaultType: 'equal_split' },
      { id: 'parking_repair', name: 'პარკინგის შეკეთება', defaultType: 'equal_split' },
      { id: 'ev_charger', name: 'ელექტრომობილის დამტენი', defaultType: 'fixed' },
      { id: 'bike_storage', name: 'ველოსიპედების სადგომი', defaultType: 'fixed' },
    ]
  },
  {
    id: 'amenities',
    name: 'დამატებითი სერვისები',
    icon: '✨',
    items: [
      { id: 'pool', name: 'საცურაო აუზი', defaultType: 'equal_split' },
      { id: 'gym', name: 'სპორტდარბაზი', defaultType: 'equal_split' },
      { id: 'spa_sauna', name: 'სპა/საუნა', defaultType: 'equal_split' },
      { id: 'kids_room', name: 'საბავშვო ოთახი', defaultType: 'equal_split' },
      { id: 'coworking', name: 'კოვორკინგი', defaultType: 'equal_split' },
      { id: 'guest_room', name: 'სტუმრების ოთახი', defaultType: 'equal_split' },
      { id: 'storage', name: 'სათავსოები', defaultType: 'fixed' },
      { id: 'laundry', name: 'სარეცხი ოთახი', defaultType: 'equal_split' },
      { id: 'library', name: 'ბიბლიოთეკა', defaultType: 'equal_split' },
      { id: 'cinema', name: 'კინო თახი', defaultType: 'equal_split' },
    ]
  },
]

// ტარიფის ტიპები
const TARIFF_TYPES = [
  { id: 'equal_split', name: 'თანაბარი გაყოფა', symbol: '÷' },
  { id: 'per_sqm', name: 'კვადრატულობითი', symbol: '×' },
  { id: 'fixed', name: 'ფიქსირებული', symbol: '=' },
]

// Icons
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

interface MonthlyExpensesTabProps {
  buildingId: string
}

interface ExpenseItem {
  id: string
  name: string
  defaultType: string
  total_amount: string
  tariff_type: string
  rate_per_sqm: string
}

interface CategoryWithExpenses {
  id: string
  name: string
  icon: string
  isOpen: boolean
  items: ExpenseItem[]
}

export default function MonthlyExpensesTab({ buildingId }: MonthlyExpensesTabProps) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<CategoryWithExpenses[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadExpenses()
  }, [buildingId, selectedMonth, selectedYear])

  const loadExpenses = async () => {
    setLoading(true)
    try {
      // 1. ვიღებთ არსებულ ხარჯებს ამ თვისთვის
      const { data: expenses, error } = await supabase
        .from('monthly_expenses')
        .select('*')
        .eq('building_id', buildingId)
        .eq('month', selectedMonth)
        .eq('year', selectedYear)

      if (error) throw error

      // 2. ვაგებთ სტრუქტურას და ვავსებთ მონაცემებით
      const initialCategories: CategoryWithExpenses[] = FULL_TARIFF_STRUCTURE.map(cat => ({
        ...cat,
        isOpen: false,
        items: cat.items.map(item => {
          const existing = expenses?.find((e: any) => e.category_id === item.id)
          return {
            id: item.id,
            name: item.name,
            defaultType: item.defaultType,
            total_amount: existing?.total_amount ? String(existing.total_amount) : '0',
            tariff_type: existing?.tariff_type || item.defaultType,
            rate_per_sqm: existing?.rate_per_sqm ? String(existing.rate_per_sqm) : '0'
          }
        })
      }))

      setCategories(initialCategories)
      setHasChanges(false)
    } catch (error) {
      console.error('Error loading expenses:', error)
      alert('ხარჯების ჩატვირთვის შეცდომა')
    } finally {
      setLoading(false)
    }
  }

  const updateExpense = (catIndex: number, itemIndex: number, field: string, value: string) => {
    const newCategories = [...categories]
    ;(newCategories[catIndex].items[itemIndex] as any)[field] = value
    setCategories(newCategories)
    setHasChanges(true)
  }

  const toggleCategory = (catIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].isOpen = !newCategories[catIndex].isOpen
    setCategories(newCategories)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // 1. ვშლით ძველ ჩანაწერებს ამ თვისთვის
      const { error: deleteError } = await supabase
        .from('monthly_expenses')
        .delete()
        .eq('building_id', buildingId)
        .eq('month', selectedMonth)
        .eq('year', selectedYear)

      if (deleteError) throw deleteError

      // 2. ვაგროვებთ ახალ მონაცემებს
      const payload: any[] = []
      categories.forEach(cat => {
        cat.items.forEach(item => {
          const totalAmount = parseFloat(item.total_amount) || 0
          const ratePerSqm = parseFloat(item.rate_per_sqm) || 0
          
          // ვინახავთ მხოლოდ თუ არის რაიმე მნიშვნელობა
          if (totalAmount > 0 || ratePerSqm > 0) {
            payload.push({
              building_id: buildingId,
              month: selectedMonth,
              year: selectedYear,
              category_id: item.id,
              category_group: cat.name,
              service_name: item.name,
              total_amount: totalAmount,
              tariff_type: item.tariff_type,
              rate_per_sqm: ratePerSqm,
              notes: null
            })
          }
        })
      })

      // 3. ვინახავთ ახალ მონაცემებს
      if (payload.length > 0) {
        const { error: insertError } = await supabase
          .from('monthly_expenses')
          .insert(payload)
        if (insertError) throw insertError
      }

      alert('თვიური ხარჯები წარმატებით შეინახა!')
      setHasChanges(false)
      await loadExpenses() // გადავტვირთოთ მონაცემები
    } catch (error) {
      console.error('Error saving expenses:', error)
      alert('შენახვის შეცდომა: ' + (error as any).message)
    } finally {
      setSaving(false)
    }
  }

  // ჯამური თანხის გამოთვლა
  const totalMonthlyExpenses = categories.reduce((sum, cat) => {
    return sum + cat.items.reduce((catSum, item) => {
      return catSum + (parseFloat(item.total_amount) || 0)
    }, 0)
  }, 0)

  const filledItemsCount = categories.reduce((sum, cat) => {
    return sum + cat.items.filter(item => parseFloat(item.total_amount) > 0 || parseFloat(item.rate_per_sqm) > 0).length
  }, 0)

  const months = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header: Month/Year Selector */}
      <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">თვიური ხარჯები</h2>
            <p className="text-sm text-slate-400">
              მიუთითეთ თითოეული სერვისის საერთო თვიური ხარჯი
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              {months.map((month, idx) => (
                <option key={idx} value={idx + 1}>{month}</option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-24 px-4 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">სულ ხარჯი</div>
            <div className="text-2xl font-bold text-emerald-400">{totalMonthlyExpenses.toFixed(2)}₾</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-xs text-slate-400 mb-1">შევსებული სერვისები</div>
            <div className="text-2xl font-bold text-blue-400">{filledItemsCount}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400 mb-1">სტატუსი</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {hasChanges ? (
                <>
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
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

        {/* Save Button */}
        {hasChanges && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.22)] disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <IconLoader className="w-4 h-4 animate-spin" />}
              {saving ? 'ინახება...' : ' შენახვა'}
            </button>
          </div>
        )}
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((cat, catIndex) => (
          <div key={cat.id} className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/30">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(catIndex)}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-base font-bold text-white">{cat.name}</h3>
                <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                  {cat.items.filter(i => parseFloat(i.total_amount) > 0 || parseFloat(i.rate_per_sqm) > 0).length}/{cat.items.length} შევსებული
                </span>
              </div>
              <IconChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${cat.isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Items List */}
            {cat.isOpen && (
              <div className="p-4 space-y-3 border-t border-white/5">
                {cat.items.map((item, itemIndex) => {
                  const hasValue = parseFloat(item.total_amount) > 0 || parseFloat(item.rate_per_sqm) > 0
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg transition-all ${
                        hasValue
                          ? 'bg-emerald-500/5 border border-emerald-500/20'
                          : 'bg-slate-800/30 border border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${hasValue ? 'text-white' : 'text-slate-400'}`}>
                            {item.name}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Tariff Type */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">გაყოფის ტიპი</label>
                          <select
                            value={item.tariff_type}
                            onChange={(e) => updateExpense(catIndex, itemIndex, 'tariff_type', e.target.value)}
                            className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                          >
                            {TARIFF_TYPES.map(type => (
                              <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Total Amount or Rate */}
                        {item.tariff_type === 'per_sqm' ? (
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">ტარიფი (₾/მ²)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={item.rate_per_sqm}
                              onChange={(e) => updateExpense(catIndex, itemIndex, 'rate_per_sqm', e.target.value)}
                              className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                              placeholder="0.00"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">
                              {item.tariff_type === 'equal_split' ? 'საერთო ხარჯი ()' : 'თანხა (₾)'}
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              value={item.total_amount}
                              onChange={(e) => updateExpense(catIndex, itemIndex, 'total_amount', e.target.value)}
                              className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                              placeholder="0.00"
                            />
                          </div>
                        )}

                        {/* Formula Preview */}
                        <div className="flex items-end">
                          <div className="w-full bg-slate-900/50 rounded-lg p-2 text-[10px] text-slate-400">
                            {item.tariff_type === 'equal_split' && (
                              <span>{item.total_amount}₾ ÷ ბინები</span>
                            )}
                            {item.tariff_type === 'per_sqm' && (
                              <span>ფართი × {item.rate_per_sqm}</span>
                            )}
                            {item.tariff_type === 'fixed' && (
                              <span>ფიქსირებული: {item.total_amount}₾</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}