'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// ============ ICONS ============
const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconStar = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconBuilding = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconSparkles = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
  </svg>
)

const IconCrown = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20" />
    <path d="M5 20V10l7 6 7-6v10" />
    <path d="M12 10V4" />
    <path d="M8 4l4 6 4-6" />
  </svg>
)

const IconLoader = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ TYPES ============
interface DbPlan {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  max_buildings: number
  features: string[]
  is_active: boolean
}

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  currentBuildings: number
  maxBuildings: number
}

// ============ COMPONENT ============
export default function UpsellModal({ 
  isOpen, 
  onClose, 
  currentPlan, 
  currentBuildings,
  maxBuildings
}: UpsellModalProps) {
  const [plans, setPlans] = useState<DbPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      fetchPlans()
    } else {
      document.body.style.overflow = 'unset'
      setFlippedCards(new Set())
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const fetchPlans = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .neq('name', '14-დღიანი უფასო ტესტი') // Trial-ს არ ვაჩვენებთ აქ, რადგან უკვე აქვს ან გამოიყენა
      .order('price_monthly', { ascending: true })

    if (!error && data) {
      setPlans(data)
    }
    setLoading(false)
  }

  const handleCardClick = (planId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(planId)) {
        newSet.delete(planId)
      } else {
        newSet.add(planId)
      }
      return newSet
    })
  }

  const getIcon = (planName: string) => {
    const name = planName.toLowerCase()
    if (name.includes('basic') || name.includes('საბაზისო')) return <IconBuilding />
    if (name.includes('pro') || name.includes('სტანდარტი')) return <IconSparkles />
    return <IconCrown />
  }

  const getGradient = (planName: string) => {
    const name = planName.toLowerCase()
    if (name.includes('basic') || name.includes('საბაზისო')) return 'from-blue-500/20 to-cyan-500/20'
    if (name.includes('pro') || name.includes('სტანდარტი')) return 'from-emerald-500/20 to-teal-500/20'
    return 'from-purple-500/20 to-pink-500/20'
  }

  const getBorderColor = (planName: string) => {
    const name = planName.toLowerCase()
    if (name.includes('basic') || name.includes('საბაზისო')) return 'border-blue-500/30'
    if (name.includes('pro') || name.includes('სტანდარტი')) return 'border-emerald-500/40'
    return 'border-purple-500/40'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white px-2">
              განაახლე პაკეტი
            </h2>
            <p className="text-xs text-slate-400 px-2 mt-1">
              მიმდინარე ლიმიტი: {currentBuildings} / {maxBuildings >= 999999 ? '∞' : maxBuildings}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <IconLoader className="w-8 h-8 text-emerald-400 mb-4" />
              <p className="text-slate-400 text-sm">პაკეტების ჩატვირთვა...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {plans.map((plan) => {
                const isFlipped = flippedCards.has(plan.id)
                const isPopular = plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('სტანდარტი')

                return (
                  <div 
                    key={plan.id}
                    className="relative cursor-pointer group"
                    style={{ perspective: '1000px' }}
                    onClick={() => handleCardClick(plan.id)}
                  >
                    <div className="relative w-full" style={{ minHeight: '320px' }}>
                      <div 
                        className={`relative w-full h-full transition-transform duration-500 ${
                          isFlipped ? '[transform:rotateY(180deg)]' : ''
                        }`}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          minHeight: '320px'
                        }}
                      >
                        {/* Front */}
                        <div 
                          className={`absolute inset-0 rounded-xl p-5 sm:p-6 border bg-gradient-to-br ${getGradient(plan.name)} ${getBorderColor(plan.name)} flex flex-col items-center justify-center text-center`}
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          {isPopular && (
                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
                              <IconStar className="w-3 h-3" />
                              რეკომენდებული
                            </div>
                          )}

                          <div className="mb-3 text-white/80">
                            {getIcon(plan.name)}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mb-3">
                            <span className="text-3xl sm:text-4xl font-black text-white">₾{plan.price_monthly}</span>
                            <span className="text-slate-400 text-xs">/თვე</span>
                          </div>

                          <div className="text-xs sm:text-sm text-slate-300">
                            {plan.max_buildings >= 999999 ? 'განუსაზღვრელი კორპუსი' : `${plan.max_buildings} ბინამდე`}
                          </div>

                          <div className="absolute bottom-3 left-0 right-0 text-center">
                            <span className="text-[10px] sm:text-xs text-slate-400 group-hover:text-white transition-colors">დააწკაპუნე დეტალებისთვის →</span>
                          </div>
                        </div>

                        {/* Back */}
                        <div 
                          className="absolute inset-0 rounded-xl p-4 sm:p-5 border bg-slate-800 border-white/20 [transform:rotateY(180deg)] flex flex-col"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <h4 className="text-sm sm:text-base font-bold text-white mb-3 text-center">{plan.name} პაკეტი</h4>
                          
                          <ul className="space-y-1.5 sm:space-y-2 flex-1">
                            {Array.isArray(plan.features) && plan.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                                <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Link 
                            href="/pricing"
                            onClick={(e) => {
                              e.stopPropagation()
                              onClose()
                            }}
                            className={`block w-full py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold rounded-lg transition-all mt-3 ${
                              isPopular
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                          >
                            არჩევა
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}