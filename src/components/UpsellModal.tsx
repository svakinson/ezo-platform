'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

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

const IconXCircle = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
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

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  currentBuildings: number
  maxBuildings: number
}

export default function UpsellModal({ 
  isOpen, 
  onClose, 
  currentPlan, 
  currentBuildings,
  maxBuildings
}: UpsellModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const getIcon = (planId: string) => {
    if (planId === 'basic') return <IconBuilding className="w-8 h-8" />
    if (planId === 'pro') return <IconSparkles className="w-8 h-8" />
    return <IconCrown className="w-8 h-8" />
  }

  // ნორმალიზაცია: Trial-იც Basic-ად ითვლება ამ კონტექსტში
  const normalizeCurrentPlan = (plan: string) => {
    const p = plan.toLowerCase()
    if (p.includes('trial') || p.includes('უფასო') || p.includes('basic') || p.includes('საბაზისო')) return 'basic'
    if (p.includes('pro') || p.includes('სტანდარტ')) return 'pro'
    if (p.includes('enterprise') || p.includes('საწარმო')) return 'enterprise'
    return 'basic'
  }

  const currentPlanId = normalizeCurrentPlan(currentPlan)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-slate-950 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-slate-950/95 backdrop-blur-sm border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              აირჩიე შენთვის შესაფერისი პაკეტი
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              მიმდინარე პაკეტი: <span className="text-emerald-400 font-semibold capitalize">{currentPlan}</span> 
              {currentBuildings > 0 && ` (${currentBuildings}/${maxBuildings} კორპუსი)`}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {PLANS.map((plan) => {
              const isCurrent = currentPlanId === plan.id
              const isPopular = plan.popular

              return (
                <div 
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-slate-900 border-emerald-500/50 ring-1 ring-emerald-500/50' 
                      : isPopular 
                        ? 'bg-slate-900 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)]' 
                        : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isPopular && !isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
                      <IconStar className="w-3 h-3" />
                      რეკომენდებულია
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
                      მიმდინარე პაკეტი
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="p-6 text-center border-b border-white/10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                      isCurrent ? 'bg-blue-500/20 text-blue-400' : 
                      isPopular ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {getIcon(plan.id)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{plan.nameGe}</h3>
                    <p className="text-xs text-slate-400 mb-4 h-8">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-black text-white">₾{plan.price}</span>
                      <span className="text-sm text-slate-400">/{plan.period}</span>
                    </div>
                    
                    <div className="text-xs font-medium text-slate-300 bg-white/5 rounded-lg py-2 px-3 inline-block">
                      მაქს. {plan.maxBuildings} კორპუსი • {plan.maxApartments} ბინა
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 p-6 overflow-y-auto max-h-[400px] custom-scrollbar">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          {feature.included ? (
                            <IconCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-emerald-400' : 'text-slate-500'}`} />
                          ) : (
                            <IconXCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-600" />
                          )}
                          <span className={`${feature.included ? (feature.highlight ? 'text-white font-medium' : 'text-slate-300') : 'text-slate-600'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="p-6 pt-0 mt-auto">
                    {isCurrent ? (
                      <button 
                        disabled
                        className="w-full py-3.5 rounded-xl font-bold text-sm bg-slate-800 text-slate-400 cursor-not-allowed border border-white/5"
                      >
                        აქტიური პაკეტი
                      </button>
                    ) : (
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className={`block w-full py-3.5 text-center text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 ${
                          isPopular
                            ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    )}
                    
                    {!isCurrent && (
                      <p className="text-[10px] text-center text-slate-500 mt-3">
                        14-დღიანი უფასო ტესტი ყველა პაკეტზე
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
              გაქვს კითხვები?{' '}
              <Link href="/contact" onClick={onClose} className="text-emerald-400 hover:text-emerald-300 font-semibold underline">
                დაგვიკავშირდი
              </Link>
              {' '}პერსონალური შეთავაზებისთვის.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}