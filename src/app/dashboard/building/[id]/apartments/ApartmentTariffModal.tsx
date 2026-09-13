'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ============ სრული სტრუქტურა: ყველა კატეგორია და სუბკატეგორია ============
const FULL_TARIFF_STRUCTURE = [
  {
    id: 'admin',
    name: 'ადმინისტრაციული ხარჯები',
    icon: '👔',
    items: [
      { id: 'chairman_salary', name: 'თავმჯდომარის ანაზღაურება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 200 },
      { id: 'accountant', name: 'ბუღალტრის მომსახურება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 150 },
      { id: 'lawyer', name: 'იურისტის მომსახურება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'office_supplies', name: 'ოფისის ხარჯები (კანცელარია)', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'communication', name: 'საკომუნიკაციო ხარჯები (ტელეფონი, ინტერნეტი)', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'bank_fees', name: 'საბანკო მომსახურება (საკომისიოები)', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 20 },
      { id: 'building_insurance', name: 'კორპუსის დაზღვევა', defaultEnabled: false, defaultType: 'per_sqm', defaultAmount: 0.5 },
      { id: 'audit', name: 'ფინანსური აუდიტი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 500 },
      { id: 'assembly_costs', name: 'საკრებულოს ხარჯები', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 50 },
    ]
  },
  {
    id: 'utilities',
    name: 'კომუნალური მომსახურება',
    icon: '💡',
    items: [
      { id: 'elec_common', name: 'ელექტროენერგია (საერთო - კიბე, ეზო)', defaultEnabled: true, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'water_common', name: 'წყალი (საერთო - პოლივანი, ფანტანი)', defaultEnabled: true, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'gas_common', name: 'გაზი (საერთო)', defaultEnabled: false, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'trash_removal', name: 'ნაგვის გატანა', defaultEnabled: true, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'hot_water_recirc', name: 'ცხელი წყლის რეცირკულაცია', defaultEnabled: false, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'sewage', name: 'კანალიზაცია (საერთო)', defaultEnabled: true, defaultType: 'equal_split', defaultAmount: 0 },
    ]
  },
  {
    id: 'maintenance',
    name: 'შენობის მოვლა-შენახვა',
    icon: '🛠️',
    items: [
      { id: 'elevator_service', name: 'ლიფტის მომსახურება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 80 },
      { id: 'elevator_electricity', name: 'ლიფტის ელექტროენერგია', defaultEnabled: true, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'elevator_repair', name: 'ლიფტის შეკეთება/მოდერნიზაცია', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'hallway_cleaning', name: 'სადარბაზოს დასუფთავება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'elevator_cleaning', name: 'ლიფტის კაბინის დასუფთავება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'yard_cleaning', name: 'ეზოს დასუფთავება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 80 },
      { id: 'window_cleaning', name: 'ფანჯრების რეცხვა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 150 },
      { id: 'floor_polishing', name: 'იატაკის პოლირება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 200 },
      { id: 'container_cleaning', name: 'ნაგვის კონტეინერების რეცხვა', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'disinfection', name: 'დეზინფექცია/დეზინსექცია', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'snow_removal', name: 'თოვლის გაწმენდა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 150 },
      { id: 'leaf_removal', name: 'ფოთლების გაწმენდა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 80 },
      { id: 'repair_fund', name: 'სარემონტო ფონდი', defaultEnabled: true, defaultType: 'per_sqm', defaultAmount: 0.5 },
      { id: 'plumbing', name: 'სანტექნიკური მომსახურება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
    ]
  },
  {
    id: 'technical',
    name: 'ტექნიკური სისტემები',
    icon: '⚙️',
    items: [
      { id: 'fire_safety', name: 'სახანძრო სისტემის მომსახურება', defaultEnabled: true, defaultType: 'fixed', defaultAmount: 60 },
      { id: 'fire_inspection', name: 'სახანძრო შემოწმება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'domophone', name: 'დომოფონი/ინტერკომი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'water_pumps', name: 'წყლის ტუმბოები', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'generator', name: 'გენერატორი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'ventilation', name: 'ვენტილაცია', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'ac_common', name: 'კონდიცირება (საერთო)', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
    ]
  },
  {
    id: 'security',
    name: 'უსაფრთხოება',
    icon: '🛡️',
    items: [
      { id: 'guard', name: 'დარაჯი / კონსიერჟი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 800 },
      { id: 'cctv', name: 'ვიდეოკამერების მომსახურება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'alarm', name: 'სასიგნალო სისტემა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
    ]
  },
  {
    id: 'yard_green',
    name: 'ეზო და მწვანე ზონა',
    icon: '🌳',
    items: [
      { id: 'green_maintenance', name: 'მწვანე ზონის მოვლა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'tree_care', name: 'ხეების მოვლა/შეჭრა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 150 },
      { id: 'flower_care', name: 'ყვავილების მოვლა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 80 },
      { id: 'yard_lighting', name: 'ეზოს განათება', defaultEnabled: false, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'playground', name: 'საბავშვო მოედნის მოვლა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'sports_area', name: 'სპორტული მოედნის მოვლა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'fountain', name: 'ფანტანი/წყლის ელემენტი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'outdoor_lighting_repair', name: 'გარე განათების შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
    ]
  },
  {
    id: 'construction',
    name: 'მშენებლობა და რემონტი',
    icon: '🏗️',
    items: [
      { id: 'roof_repair', name: 'სახურავის შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'facade_repair', name: 'ფასადის შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'hallway_repair', name: 'სადარბაზოს რემონტი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'pipe_repair', name: 'მილგაყვანილობის შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'electrical_repair', name: 'ელექტროგაყვანილობის განახლება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'stair_rail_repair', name: 'კიბის მოაჯირების შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'door_window_repair', name: 'კარი/ფანჯარის შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'hydro_insulation', name: 'ჰიდროიზოლაცია', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'seismic_reinforcement', name: 'სეისმომედეგობა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
    ]
  },
  {
    id: 'parking',
    name: 'პარკინგი',
    icon: '🅿️',
    items: [
      { id: 'underground_parking', name: 'მიწისქვეშა პარკინგი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'outdoor_parking', name: 'ღია პარკინგი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'parking_lighting', name: 'პარკინგის განათება', defaultEnabled: false, defaultType: 'equal_split', defaultAmount: 0 },
      { id: 'parking_repair', name: 'პარკინგის შეკეთება', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 0 },
      { id: 'ev_charger', name: 'ელექტრომობილის დამტენი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 20 },
      { id: 'bike_storage', name: 'ველოსიპედების სადგომი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 10 },
    ]
  },
  {
    id: 'amenities',
    name: 'დამატებითი სერვისები',
    icon: '✨',
    items: [
      { id: 'pool', name: 'საცურაო აუზი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 100 },
      { id: 'gym', name: 'სპორტდარბაზი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 50 },
      { id: 'spa_sauna', name: 'სპა/საუნა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'kids_room', name: 'საბავშვო ოთახი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 30 },
      { id: 'coworking', name: 'კოვორკინგი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 40 },
      { id: 'guest_room', name: 'სტუმრების ოთახი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 20 },
      { id: 'storage', name: 'სათავსოები', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 15 },
      { id: 'laundry', name: 'სარეცხი ოთახი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 25 },
      { id: 'library', name: 'ბიბლიოთეკა', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 10 },
      { id: 'cinema', name: 'კინო ოთახი', defaultEnabled: false, defaultType: 'fixed', defaultAmount: 20 },
    ]
  },
]

// ტარიფის ტიპები
const TARIFF_TYPES = [
  { id: 'fixed', name: 'ფიქსირებული თანხა (₾)', description: 'ერთი თანხა ყველა ბინისთვის' },
  { id: 'per_sqm', name: 'კვადრატულობითი (₾/მ²)', description: 'ფართი × ტარიფი' },
  { id: 'per_person', name: 'სულზე (₾/ადამიანი)', description: 'მცხოვრებთა რაოდენობა × ტარიფი' },
  { id: 'equal_split', name: 'თანაბარი გაყოფა', description: 'საერთო ხარჯი ÷ ბინები' },
  { id: 'tiered', name: 'საფეხურიანი', description: 'სხვადასხვა ტარიფი სხვადასხვა ფართისთვის' },
  { id: 'combined', name: 'კომბინირებული', description: 'რამდენიმე მეთოდის კომბინაცია' },
]

// Icons
const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

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

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

interface ApartmentTariffModalProps {
  apartment: any
  buildingId: string
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

interface SubcategoryState {
  id: string
  name: string
  is_subscribed: boolean
  override_amount: string
  tariff_type: string
  isCustom?: boolean
}

interface CategoryState {
  id: string
  name: string
  icon: string
  isOpen: boolean
  items: SubcategoryState[]
  isCustom?: boolean
}

export default function ApartmentTariffModal({
  apartment,
  buildingId,
  isOpen,
  onClose,
  onSave
}: ApartmentTariffModalProps) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryState[]>([])
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddSubcategory, setShowAddSubcategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryIcon, setNewCategoryIcon] = useState('📦')
  const [newSubcategoryName, setNewSubcategoryName] = useState('')
  const [newSubcategoryType, setNewSubcategoryType] = useState('fixed')
  const [newSubcategoryAmount, setNewSubcategoryAmount] = useState('')

  useEffect(() => {
    if (isOpen && apartment) {
      loadTariffs()
    }
  }, [isOpen, apartment])

  const loadTariffs = async () => {
    setLoading(true)
    try {
      const { data: subs, error: subError } = await supabase
        .from('apartment_service_subscriptions')
        .select('*')
        .eq('apartment_id', apartment.id)

      if (subError) throw subError

      const initialCategories: CategoryState[] = FULL_TARIFF_STRUCTURE.map(cat => ({
        ...cat,
        isOpen: false,
        items: cat.items.map(item => {
          const existing = subs?.find((s: any) => s.category_id === item.id || s.name === item.name)
          
          return {
            id: item.id,
            name: item.name,
            is_subscribed: existing ? existing.is_subscribed : item.defaultEnabled,
            override_amount: existing?.override_amount ? String(existing.override_amount) : String(item.defaultAmount || ''),
            tariff_type: existing?.tariff_type || item.defaultType || 'fixed'
          }
        })
      }))

      setCategories(initialCategories)
    } catch (error) {
      console.error('Error loading tariffs:', error)
      const defaultCategories: CategoryState[] = FULL_TARIFF_STRUCTURE.map(cat => ({
        ...cat,
        isOpen: false,
        items: cat.items.map(item => ({
          id: item.id,
          name: item.name,
          is_subscribed: item.defaultEnabled,
          override_amount: String(item.defaultAmount || ''),
          tariff_type: item.defaultType || 'fixed'
        }))
      }))
      setCategories(defaultCategories)
    } finally {
      setLoading(false)
    }
  }

  const toggleSubcategory = (catIndex: number, itemIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].items[itemIndex].is_subscribed = 
      !newCategories[catIndex].items[itemIndex].is_subscribed
    
    if (!newCategories[catIndex].items[itemIndex].is_subscribed) {
      newCategories[catIndex].items[itemIndex].override_amount = ''
    }
    
    setCategories(newCategories)
  }

  const updateAmount = (catIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...categories]
    newCategories[catIndex].items[itemIndex].override_amount = value
    setCategories(newCategories)
  }

  const updateTariffType = (catIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...categories]
    newCategories[catIndex].items[itemIndex].tariff_type = value
    setCategories(newCategories)
  }

  const toggleCategoryOpen = (catIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].isOpen = !newCategories[catIndex].isOpen
    setCategories(newCategories)
  }

  const addNewCategory = () => {
    if (!newCategoryName.trim()) return
    
    const newCat: CategoryState = {
      id: `custom_${Date.now()}`,
      name: newCategoryName,
      icon: newCategoryIcon,
      isOpen: true,
      items: [],
      isCustom: true
    }
    
    setCategories([...categories, newCat])
    setNewCategoryName('')
    setNewCategoryIcon('📦')
    setShowAddCategory(false)
  }

  const deleteCategory = (catIndex: number) => {
    const newCategories = categories.filter((_, idx) => idx !== catIndex)
    setCategories(newCategories)
  }

  const addNewSubcategory = (catIndex: number) => {
    if (!newSubcategoryName.trim()) return
    
    const newSub: SubcategoryState = {
      id: `custom_sub_${Date.now()}`,
      name: newSubcategoryName,
      is_subscribed: false,
      override_amount: newSubcategoryAmount || '0',
      tariff_type: newSubcategoryType,
      isCustom: true
    }
    
    const newCategories = [...categories]
    newCategories[catIndex].items.push(newSub)
    setCategories(newCategories)
    
    setNewSubcategoryName('')
    setNewSubcategoryAmount('')
    setShowAddSubcategory(null)
  }

  const deleteSubcategory = (catIndex: number, itemIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].items.splice(itemIndex, 1)
    setCategories(newCategories)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await supabase
        .from('apartment_service_subscriptions')
        .delete()
        .eq('apartment_id', apartment.id)
      
      const payload: any[] = []
      categories.forEach(cat => {
        cat.items.forEach(item => {
          payload.push({
            apartment_id: apartment.id,
            building_id: buildingId,
            category_id: item.id,
            category_group: cat.name,
            name: item.name,
            is_subscribed: item.is_subscribed,
            override_amount: item.override_amount ? parseFloat(item.override_amount) : null,
            tariff_type: item.tariff_type,
            is_custom: item.isCustom || false,
            override_reason: null
          })
        })
      })

      if (payload.length > 0) {
        const { error } = await supabase
          .from('apartment_service_subscriptions')
          .insert(payload)
        if (error) throw error
      }

      onSave()
      onClose()
      alert('ბინის ტარიფები წარმატებით შეინახა!')
    } catch (error) {
      console.error('Error saving tariffs:', error)
      alert('შენახვის შეცდომა: ' + (error as any).message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#020409]/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A1018]/98 border border-white/[0.10] rounded-[24px] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.55)] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A1018]/98">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              ტარიფების მართვა: ბინა {apartment.apartment_number}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              მონიშნეთ რომელი სერვისი ვრცელდება ამ ბინაზე და მიუთითეთ ტარიფი
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <IconX className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add Category Button */}
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowAddCategory(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm font-medium"
                >
                  <IconPlus className="w-4 h-4" />
                  ახალი კატეგორია
                </button>
              </div>

              {/* Add Category Modal */}
              {showAddCategory && (
                <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-white mb-3">ახალი კატეგორიის დამატება</h4>
                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="კატეგორიის სახელი"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="იკონი (emoji)"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      className="w-24 px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setShowAddCategory(false)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
                    >
                      გაუქმება
                    </button>
                    <button 
                      onClick={addNewCategory}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium"
                    >
                      დამატება
                    </button>
                  </div>
                </div>
              )}

              {/* Categories List */}
              {categories.map((cat, catIndex) => (
                <div key={cat.id} className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/30">
                  {/* Category Header */}
                  <div className="flex items-center justify-between p-4 bg-slate-800/50">
                    <button 
                      onClick={() => toggleCategoryOpen(catIndex)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="text-base font-bold text-white flex-1">{cat.name}</h3>
                      <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                        {cat.items.filter(i => i.is_subscribed).length}/{cat.items.length} ჩართული
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setShowAddSubcategory(cat.id)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        title="სუბკატეგორიის დამატება"
                      >
                        <IconPlus className="w-4 h-4 text-emerald-400" />
                      </button>
                      {cat.isCustom && (
                        <button 
                          onClick={() => deleteCategory(catIndex)}
                          className="p-1.5 hover:bg-rose-500/20 rounded-lg transition-colors"
                          title="კატეგორიის წაშლა"
                        >
                          <IconTrash className="w-4 h-4 text-rose-400" />
                        </button>
                      )}
                      <IconChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${cat.isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Add Subcategory Modal */}
                  {showAddSubcategory === cat.id && (
                    <div className="bg-slate-800/30 border-t border-white/5 p-4">
                      <h5 className="text-xs font-bold text-white mb-2">ახალი სუბკატეგორიის დამატება</h5>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="სუბკატეგორიის სახელი"
                          value={newSubcategoryName}
                          onChange={(e) => setNewSubcategoryName(e.target.value)}
                          className="col-span-2 px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                        <select
                          value={newSubcategoryType}
                          onChange={(e) => setNewSubcategoryType(e.target.value)}
                          className="px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                        >
                          {TARIFF_TYPES.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="საწყისი თანხა"
                          value={newSubcategoryAmount}
                          onChange={(e) => setNewSubcategoryAmount(e.target.value)}
                          className="px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => setShowAddSubcategory(null)}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
                        >
                          გაუქმება
                        </button>
                        <button 
                          onClick={() => addNewSubcategory(catIndex)}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium"
                        >
                          დამატება
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Subcategories List */}
                  {cat.isOpen && (
                    <div className="p-4 space-y-3 border-t border-white/5">
                      {cat.items.length === 0 ? (
                        <p className="text-center text-slate-500 text-sm py-4">ამ კატეგორიაში ჯერ არ არის სუბკატეგორიები</p>
                      ) : (
                        cat.items.map((item, itemIndex) => (
                          <div 
                            key={item.id} 
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg transition-all ${
                              item.is_subscribed 
                                ? 'bg-emerald-500/5 border border-emerald-500/20' 
                                : 'bg-slate-800/30 border border-white/5 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={item.is_subscribed}
                                  onChange={() => toggleSubcategory(catIndex, itemIndex)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                              </label>
                              <div className="flex-1">
                                <span className={`text-sm font-medium ${item.is_subscribed ? 'text-white' : 'text-slate-400'}`}>
                                  {item.name}
                                </span>
                                {item.isCustom && (
                                  <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                                    Custom
                                  </span>
                                )}
                              </div>
                            </div>

                            {item.is_subscribed && (
                              <div className="flex items-center gap-2 sm:ml-4">
                                <select
                                  value={item.tariff_type}
                                  onChange={(e) => updateTariffType(catIndex, itemIndex, e.target.value)}
                                  className="px-2 py-1.5 bg-[#111823] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                                >
                                  {TARIFF_TYPES.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                  ))}
                                </select>
                                <input 
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  value={item.override_amount}
                                  onChange={(e) => updateAmount(catIndex, itemIndex, e.target.value)}
                                  className="w-24 px-3 py-1.5 bg-[#111823] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors text-right"
                                />
                                {item.isCustom && (
                                  <button 
                                    onClick={() => deleteSubcategory(catIndex, itemIndex)}
                                    className="p-1.5 hover:bg-rose-500/20 rounded-lg transition-colors"
                                    title="წაშლა"
                                  >
                                    <IconTrash className="w-3.5 h-3.5 text-rose-400" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#0A1018]/98">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 bg-[#111823] hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            გაუქმება
          </button>
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.22)] disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <IconLoader className="w-4 h-4 animate-spin" />}
            შენახვა
          </button>
        </div>
      </div>
    </div>
  )
}