'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

// ============ TYPES ============
interface PlanInfo {
  name: string
  price: string
  buildings: number
  apartments: number
  popular?: boolean
  features: string[]
  icon: 'building' | 'sparkles' | 'crown'
  gradient: string
  borderColor: string
}

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: 'basic' | 'pro' | 'enterprise' | 'trial'
  currentBuildings: number
  maxBuildings: number
}

// ============ HELPER FUNCTIONS ============
const getPlanInfo = (plan: 'basic' | 'pro' | 'enterprise'): PlanInfo => {
  const plans: Record<'basic' | 'pro' | 'enterprise', PlanInfo> = {
    basic: {
      name: 'Basic',
      price: '50',
      buildings: 1,
      apartments: 20,
      icon: 'building',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      features: [
        '1 კორპუსის მართვა',
        '20 ბინამდე',
        'ბინების სია',
        'მფლობელების მართვა',
        'გადახდების რეგისტრაცია',
        'ბაზისური ანგარიშები',
      ],
    },
    pro: {
      name: 'Pro',
      price: '100',
      buildings: 3,
      apartments: 300,
      popular: true,
      icon: 'sparkles',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/40',
      features: [
        '3 კორპუსის მართვა',
        '300 ბინამდე',
        'ყველა Basic ფუნქცია',
        'მოწინავე ანალიტიკა',
        'პრიორიტეტული მხარდაჭერა',
        'SMS შეტყობინებები',
        'ავტომატური ქვითრები',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      price: '200',
      buildings: 999999,
      apartments: 999999,
      icon: 'crown',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/40',
      features: [
        'განუსაზღვრელი კორპუსი',
        'განუსაზღვრელი ბინა',
        'ყველა Pro ფუნქცია',
        'API წვდომა',
        'პერსონალური მენეჯერი',
        'თეთრი ეტიკეტი',
        'SLA გარანტია',
      ],
    },
  }
  return plans[plan]
}

const formatBuildingLimit = (limit: number) => {
  return limit >= 999999 ? '' : limit.toString()
}

// ============ COMPONENT ============
export default function UpsellModal({ 
  isOpen, 
  onClose, 
  currentPlan, 
}: UpsellModalProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setFlippedCards(new Set())
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const plans: Array<'basic' | 'pro' | 'enterprise'> = ['basic', 'pro', 'enterprise']

  const handleCardClick = (plan: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(plan)) {
        newSet.delete(plan)
      } else {
        newSet.add(plan)
      }
      return newSet
    })
  }

  const getIcon = (iconType: 'building' | 'sparkles' | 'crown') => {
    switch (iconType) {
      case 'building': return <IconBuilding />
      case 'sparkles': return <IconSparkles />
      case 'crown': return <IconCrown />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white px-2">
            განაახლე პაკეტი
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const info = getPlanInfo(plan)
              const isFlipped = flippedCards.has(plan)
              const isPopular = info.popular || false

              return (
                <div 
                  key={plan}
                  className="relative h-64 cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleCardClick(plan)}
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-500 ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front */}
                    <div 
                      className={`absolute inset-0 rounded-xl p-5 border bg-gradient-to-br ${info.gradient} ${info.borderColor} flex flex-col items-center justify-center text-center`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {isPopular && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                          <IconStar className="w-3 h-3" />
                          რეკომენდებული
                        </div>
                      )}

                      <div className="mb-3 text-white/80">
                        {getIcon(info.icon)}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{info.name}</h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-black text-white">₾{info.price}</span>
                        <span className="text-slate-400 text-xs">/თვე</span>
                      </div>

                      <div className="text-xs text-slate-300">
                        {info.buildings >= 999999 ? 'განუსაზღვრელი' : `${info.buildings} კორპუსი`}
                      </div>

                      <div className="absolute bottom-3 left-0 right-0 text-center">
                        <span className="text-[10px] text-slate-400">დააწკაპუნე დეტალებისთვის →</span>
                      </div>
                    </div>

                    {/* Back */}
                    <div 
                      className="absolute inset-0 rounded-xl p-5 border bg-slate-800 border-white/20 [transform:rotateY(180deg)] flex flex-col"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <h4 className="text-sm font-bold text-white mb-3 text-center">{info.name} პაკეტი</h4>
                      
                      <ul className="space-y-1.5 flex-1 overflow-y-auto">
                        {info.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <IconCheck className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
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
                        className={`block w-full py-2 text-center text-xs font-semibold rounded-lg transition-all mt-3 ${
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
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}