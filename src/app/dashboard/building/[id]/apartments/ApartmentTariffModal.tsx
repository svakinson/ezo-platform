'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

interface ApartmentTariffModalProps {
  apartment: any
  buildingId: string
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

interface ExpenseCategory {
  id: string
  name: string
  description: string
  icon: string
  calculation_method: string
  base_amount: number
  per_sqm_rate: number
  is_optional: boolean
  default_enabled: boolean
}

interface Subscription {
  category_id: string
  is_subscribed: boolean
  override_amount: number | null
  override_reason: string
}

export default function ApartmentTariffModal({
  apartment,
  buildingId,
  isOpen,
  onClose,
  onSave
}: ApartmentTariffModalProps) {
  const [loading, setLoading] = useState(false)
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    if (isOpen && apartment) {
      loadTariffs()
    }
  }, [isOpen, apartment])

  const loadTariffs = async () => {
    setLoading(true)
    try {
      // Load expense categories
      const { data: categories, error: catError } = await supabase
        .from('expense_categories')
        .select('*')
        .eq('building_id', buildingId)
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (catError) throw catError

      // Load existing subscriptions
      const { data: subs, error: subError } = await supabase
        .from('apartment_service_subscriptions')
        .select('*')
        .eq('apartment_id', apartment.id)

      if (subError) throw subError

      setExpenseCategories(categories || [])
      setSubscriptions(subs || [])
    } catch (error) {
      console.error('Error loading tariffs:', error)
      alert('ტარიფების ჩატვირთვის შეცდომა')
    } finally {
      setLoading(false)
    }
  }

  const updateSubscription = (categoryId: string, field: keyof Subscription, value: any) => {
    setSubscriptions(prev => {
      const existingIndex = prev.findIndex(s => s.category_id === categoryId)
      let newSub: Subscription = {
        category_id: categoryId,
        is_subscribed: true,
        override_amount: null,
        override_reason: ''
      }
      
      if (existingIndex >= 0) {
        newSub = { ...prev[existingIndex] }
      }
      
      (newSub as any)[field] = value
      
      if (field === 'is_subscribed' && value === false) {
        newSub.override_amount = null
      }
      
      if (existingIndex >= 0) {
        const newSubs = [...prev]
        newSubs[existingIndex] = newSub
        return newSubs
      } else {
        return [...prev, newSub]
      }
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Delete existing subscriptions
      await supabase
        .from('apartment_service_subscriptions')
        .delete()
        .eq('apartment_id', apartment.id)
      
      // Insert new subscriptions
      const payload = subscriptions.map(sub => ({
        apartment_id: apartment.id,
        category_id: sub.category_id,
        is_subscribed: sub.is_subscribed,
        override_amount: sub.override_amount,
        override_reason: sub.override_reason || null,
      }))

      if (payload.length > 0) {
        const { error } = await supabase
          .from('apartment_service_subscriptions')
          .insert(payload)
        if (error) throw error
      }

      onSave()
      onClose()
      alert('ტარიფები წარმატებით შეინახა!')
    } catch (error) {
      console.error('Error saving tariffs:', error)
      alert('ტარიფების შენახვის შეცდომა')
    } finally {
      setLoading(false)
    }
  }

  const getCalculationMethodText = (cat: ExpenseCategory) => {
    switch (cat.calculation_method) {
      case 'fixed':
        return `ფიქსირებული (${cat.base_amount}₾)`
      case 'per_sqm':
        return `კვადრატულობითი (${cat.per_sqm_rate}₾/მ²)`
      case 'equal_split':
        return 'თანაბარი გაყოფა'
      default:
        return cat.calculation_method
    }
  }

  const getSubscription = (categoryId: string): Subscription => {
    return subscriptions.find(s => s.category_id === categoryId) || {
      category_id: categoryId,
      is_subscribed: true,
      override_amount: null,
      override_reason: ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#020409]/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A1018]/98 border border-white/[0.10] rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.55)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0A1018]/98">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              ტარიფების მართვა: ბინა {apartment.apartment_number}
            </h2>
            <p className="text-sm text-slate-400 mt-1">აირჩიეთ რომელი სერვისი იქნება ჩართული ამ ბინისთვის</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <IconX className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>
          ) : expenseCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>ამ კორპუსში ხარჯების კატეგორიები ჯერ არ არის შექმნილი.</p>
            </div>
          ) : (
            expenseCategories.map((cat) => {
              const sub = getSubscription(cat.id)
              const isSubscribed = sub.is_subscribed

              return (
                <div 
                  key={cat.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    isSubscribed 
                      ? 'bg-emerald-500/5 border-emerald-500/20' 
                      : 'bg-slate-800/30 border-white/5 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        isSubscribed ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                      }`}>
                        {cat.icon || '💰'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{cat.name}</h4>
                          {cat.is_optional && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium">
                              ნებაყოფლობითი
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {cat.description || 'აღწერა არ არის'}
                        </p>
                        <div className="text-xs text-slate-500 mt-2 font-mono">
                          მეთოდი: {getCalculationMethodText(cat)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isSubscribed}
                          onChange={(e) => updateSubscription(cat.id, 'is_subscribed', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                      
                      {isSubscribed && (
                        <div className="w-full">
                          <input 
                            type="number"
                            placeholder="ინდივ. თანხა (₾)"
                            value={sub.override_amount || ''}
                            onChange={(e) => updateSubscription(cat.id, 'override_amount', e.target.value ? parseFloat(e.target.value) : null)}
                            className="w-full px-2 py-1.5 bg-[#111823] border border-white/10 rounded text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors text-right"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {!isSubscribed && (
                    <div className="mt-3 pt-3 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                      <input 
                        type="text"
                        placeholder="მიზეზი (მაგ: პირველი სართული, არ სჭირდება)"
                        value={sub.override_reason}
                        onChange={(e) => updateSubscription(cat.id, 'override_reason', e.target.value)}
                        className="w-full px-3 py-2 bg-[#111823] border border-rose-500/20 rounded-lg text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                      />
                    </div>
                  )}
                </div>
              )
            })
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