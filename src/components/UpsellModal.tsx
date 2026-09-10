'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

// Icons...
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

const IconArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-slate-950 border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <IconX className="w-5 h-5" />
          </button>

          <div className="pr-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              აირჩიე შენი პაკეტი
            </h2>
            <p className="text-slate-400">
              მიმდინარე: <span className="text-emerald-400 font-semibold capitalize">{currentPlan}</span>
              <span className="mx-2 text-slate-600">•</span>
              <span className="text-slate-300">{currentBuildings}/{maxBuildings} კორპუსი</span>
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const isCurrent = currentPlanId === plan.id
              const isPopular = plan.popular && !isCurrent

              return (
                <div 
                  key={plan.id}
                  className={`relative rounded-2xl p-6 transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-slate-900 border-2 border-blue-500/50' 
                      : isPopular 
                        ? 'bg-gradient-to-b from-emerald-500/10 via-slate-900 to-slate-900 border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.15)] scale-105' 
                        : 'bg-slate-900/50 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                      <IconStar className="w-3 h-3" />
                      ყველაზე პოპულარული
                    </div>
                  )}
                  
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                      აქტიური პაკეტი
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.nameGe}</h3>
                    <p className="text-sm text-slate-400 mb-4 h-10">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1 mb-3">
                      <span className="text-4xl font-black text-white">₾{plan.price}</span>
                      <span className="text-sm text-slate-400">/თვე</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-slate-300">
                      <span className="font-semibold">{plan.maxBuildings}</span> კორპუსი
                      <span className="text-slate-600">•</span>
                      <span className="font-semibold">{plan.maxApartments}</span> ბინა
                    </div>
                  </div>

                  {/* Key Features - Top 5 */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        {feature.included ? (
                          <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-700 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isCurrent ? (
                    <button 
                      disabled
                      className="w-full py-3 rounded-xl font-bold text-sm bg-slate-800 text-slate-400 cursor-not-allowed border border-white/5"
                    >
                      აქტიური პაკეტი
                    </button>
                  ) : (
                    <>
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className={`block w-full py-3 text-center text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 ${
                          isPopular
                            ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25'
                            : 'bg-white text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className="block w-full mt-3 text-center text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        ყველა ფუნქციის ნახვა <IconArrowRight className="w-3 h-3" />
                      </Link>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-emerald-400 font-bold text-lg">14 დღე</div>
                <div className="text-xs text-slate-500">უფასო ტესტი</div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-lg">24/7</div>
                <div className="text-xs text-slate-500">მხარდაჭერა</div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-lg">SSL</div>
                <div className="text-xs text-slate-500">დაცვა</div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-lg">GDPR</div>
                <div className="text-xs text-slate-500">შესაბამისი</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}