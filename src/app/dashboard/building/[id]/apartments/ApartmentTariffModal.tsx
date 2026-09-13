'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// ============ მზა სტრუქტურა კატეგორიებისა და სუბკატეგორიებისთვის ============
const TARIFF_STRUCTURE = [
  {
    id: 'utilities',
    name: 'კომუნალური მომსახურება',
    icon: '💡',
    items: [
      { id: 'elec_common', name: 'ელექტროენერგია (საერთო)', defaultEnabled: true },
      { id: 'water_common', name: 'წყალი (საერთო)', defaultEnabled: true },
      { id: 'gas_common', name: 'გაზი (საერთო)', defaultEnabled: false },
      { id: 'trash', name: 'ნაგვის გატანა', defaultEnabled: true },
    ]
  },
  {
    id: 'maintenance',
    name: 'შენობის მოვლა-შენახვა',
    icon: '🛠️',
    items: [
      { id: 'elevator', name: 'ლიფტის მომსახურება', defaultEnabled: true },
      { id: 'cleaning', name: 'სადარბაზოს დასუფთავება', defaultEnabled: true },
      { id: 'repair_fund', name: 'სარემონტო ფონდი', defaultEnabled: true },
      { id: 'plumbing', name: 'სანტექნიკური მომსახურება', defaultEnabled: false },
    ]
  },
  {
    id: 'security',
    name: 'უსაფრთხოება',
    icon: '🛡️',
    items: [
      { id: 'guard', name: 'დარაჯი / კონსიერჟი', defaultEnabled: false },
      { id: 'cctv', name: 'ვიდეოკამერების მომსახურება', defaultEnabled: false },
      { id: 'alarm', name: 'სასიგნალო სისტემა', defaultEnabled: false },
    ]
  },
  {
    id: 'amenities',
    name: 'დამატებითი სერვისები',
    icon: '🏊',
    items: [
      { id: 'parking', name: 'პარკინგის მომსახურება', defaultEnabled: false },
      { id: 'pool', name: 'საცურაო აუზი', defaultEnabled: false },
      { id: 'gym', name: 'სპორტდარბაზი', defaultEnabled: false },
      { id: 'green_zone', name: 'მწვანე ზონის მოვლა', defaultEnabled: false },
    ]
  }
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
}

interface CategoryState {
  id: string
  name: string
  icon: string
  isOpen: boolean
  items: SubcategoryState[]
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

  // ინიციალიზაცია: ვქმნით მზა სტრუქტურას და ვამოწმებთ ბაზას
  useEffect(() => {
    if (isOpen && apartment) {
      loadTariffs()
    }
  }, [isOpen, apartment])

  const loadTariffs = async () => {
    setLoading(true)
    try {
      // 1. ვიღებთ ბაზიდან არსებულ მონაცემებს ამ ბინისთვის
      const { data: subs, error: subError } = await supabase
        .from('apartment_service_subscriptions')
        .select('*')
        .eq('apartment_id', apartment.id)

      if (subError) throw subError

      // 2. ვაგებთ მზა სტრუქტურას ბაზის მონაცემებზე დაყრდნობით
      const initialCategories: CategoryState[] = TARIFF_STRUCTURE.map(cat => ({
        ...cat,
        isOpen: true, // დიფოლტად გახსნილი
        items: cat.items.map(item => {
          // ვეძებთ, არის თუ არა ეს ელემენტი უკვე შენახული ბაზაში
          // შენიშვნა: ამ ეტაპზე category_id-დ ვიყენებთ item.id-ს (string-ს), 
          // რადგან ეს არის აპარტამენტის დონის კონფიგურაცია.
          const existing = subs?.find((s: any) => s.category_id === item.id || s.name === item.name)
          
          return {
            id: item.id,
            name: item.name,
            is_subscribed: existing ? existing.is_subscribed : item.defaultEnabled,
            override_amount: existing?.override_amount ? String(existing.override_amount) : ''
          }
        })
      }))

      setCategories(initialCategories)
    } catch (error) {
      console.error('Error loading tariffs:', error)
      // შეცდომის შემთხვევაშიც კი, ვაჩვენებთ დიფოლტ სტრუქტურას
      const defaultCategories: CategoryState[] = TARIFF_STRUCTURE.map(cat => ({
        ...cat,
        isOpen: true,
        items: cat.items.map(item => ({
          id: item.id,
          name: item.name,
          is_subscribed: item.defaultEnabled,
          override_amount: ''
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
    
    // თუ ითიშება, თანხაც გავასუფთაოთ
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

  const toggleCategoryOpen = (catIndex: number) => {
    const newCategories = [...categories]
    newCategories[catIndex].isOpen = !newCategories[catIndex].isOpen
    setCategories(newCategories)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // 1. ჯერ ვშლით ძველ ჩანაწერებს ამ ბინისთვის
      await supabase
        .from('apartment_service_subscriptions')
        .delete()
        .eq('apartment_id', apartment.id)
      
      // 2. ვაგროვებთ ახალ მონაცემებს
      const payload: any[] = []
      categories.forEach(cat => {
        cat.items.forEach(item => {
          payload.push({
            apartment_id: apartment.id,
            building_id: buildingId, // დამატებითი უსაფრთხოებისთვის
            category_id: item.id, // ვინახავთ იდენტიფიკატორს
            name: item.name, // სახელის შენახვა სიზუსტისთვის
            is_subscribed: item.is_subscribed,
            override_amount: item.override_amount ? parseFloat(item.override_amount) : null,
            override_reason: null
          })
        })
      })

      // 3. ვინახავთ ახალ მონაცემებს
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
      <div className="bg-[#0A1018]/98 border border-white/[0.10] rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.55)] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A1018]/98">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">⚙️</span>
              ტარიფების მართვა: ბინა {apartment.apartment_number}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              მონიშნეთ რომელი სერვისი ვრცელდება ამ ბინაზე და მიუთითეთ ინდივიდუალური თანხა (თუ საჭიროა)
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
              {categories.map((cat, catIndex) => (
                <div key={cat.id} className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/30">
                  {/* Category Header */}
                  <button 
                    onClick={() => toggleCategoryOpen(catIndex)}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <h3 className="text-base font-bold text-white">{cat.name}</h3>
                    </div>
                    <IconChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${cat.isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Subcategories List */}
                  {cat.isOpen && (
                    <div className="p-4 space-y-3 border-t border-white/5">
                      {cat.items.map((item, itemIndex) => (
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
                            <span className={`text-sm font-medium ${item.is_subscribed ? 'text-white' : 'text-slate-400'}`}>
                              {item.name}
                            </span>
                          </div>

                          {item.is_subscribed && (
                            <div className="flex items-center gap-2 sm:ml-4">
                              <span className="text-xs text-slate-400 whitespace-nowrap">თანხა (₾):</span>
                              <input 
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={item.override_amount}
                                onChange={(e) => updateAmount(catIndex, itemIndex, e.target.value)}
                                className="w-24 px-3 py-1.5 bg-[#111823] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors text-right"
                              />
                            </div>
                          )}
                        </div>
                      ))}
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