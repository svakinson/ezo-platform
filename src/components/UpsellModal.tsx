'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

// ============ ICONS ============
const IconX = ({ className = "w-4 h-4" }: { className?: string }) => (
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

const IconStar = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconArrowRight = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  const normalizeCurrentPlan = (plan: string) => {
    const p = plan.toLowerCase()
    if (p.includes('trial') || p.includes('უფასო') || p.includes('basic')) return 'basic'
    if (p.includes('pro') || p.includes('სტანდარტ')) return 'pro'
    if (p.includes('enterprise')) return 'enterprise'
    return 'basic'
  }

  const currentPlanId = normalizeCurrentPlan(currentPlan)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Container - უფრო კომპაქტური (max-w-4xl) */}
      <div className="relative bg-slate-950 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="relative p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <IconX className="w-4 h-4" />
          </button>

          <div className="pr-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              აირჩიე შენი პაკეტი
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              მიმდინარე: <span className="text-emerald-400 font-semibold capitalize">{currentPlan}</span>
              <span className="mx-1.5 text-slate-600">•</span>
              <span className="text-slate-300">{currentBuildings}/{maxBuildings} კორპუსი</span>
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {PLANS.map((plan) => {
              const isCurrent = currentPlanId === plan.id
              const isPopular = plan.popular && !isCurrent

              return (
                <div 
                  key={plan.id}
                  className={`relative rounded-xl p-4 sm:p-5 transition-all duration-300 flex flex-col ${
                    isCurrent 
                      ? 'bg-slate-900 border-2 border-blue-500/50' 
                      : isPopular 
                        ? 'bg-gradient-to-b from-emerald-500/10 via-slate-900 to-slate-900 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                        : 'bg-slate-900/50 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                      <IconStar />
                      რეკომენდებული
                    </div>
                  )}
                  
                  {isCurrent && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg whitespace-nowrap">
                      აქტიური პაკეტი
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">{plan.nameGe}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mb-3 h-8 leading-tight">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">₾{plan.price}</span>
                      <span className="text-xs text-slate-400">/თვე</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-md text-[10px] sm:text-xs text-slate-300">
                      <span className="font-semibold">{plan.maxBuildings}</span> კორპუსი
                      <span className="text-slate-600">•</span>
                      <span className="font-semibold">{plan.maxApartments}</span> ბინა
                    </div>
                  </div>

                  {/* Key Features - Compact List */}
                  <ul className="space-y-2 mb-4 flex-grow">
                    {plan.features.slice(0, 6).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        {feature.included ? (
                          <IconCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-700 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-slate-300 leading-tight' : 'text-slate-600 leading-tight'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isCurrent ? (
                    <button 
                      disabled
                      className="w-full py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-slate-800 text-slate-400 cursor-not-allowed border border-white/5 mt-auto"
                    >
                      აქტიური პაკეტი
                    </button>
                  ) : (
                    <div className="mt-auto space-y-2">
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className={`block w-full py-2.5 text-center text-xs sm:text-sm font-bold rounded-lg transition-all hover:-translate-y-0.5 ${
                          isPopular
                            ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className="block w-full text-center text-[10px] sm:text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        ყველა ფუნქციის ნახვა <IconArrowRight />
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* ⭐ Trust Badges ბლოკი სრულად ამოღებულია */}
        </div>
      </div>
    </div>
  )
}