'use client'

import { useEffect } from 'react'
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

// ============ TYPES ============
interface PlanInfo {
  name: string
  price: string
  buildings: number
  apartments: number
  popular?: boolean
}

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: 'basic' | 'pro' | 'enterprise'
  currentBuildings: number
  maxBuildings: number
}

// ============ HELPER FUNCTIONS ============
const getPlanInfo = (plan: 'basic' | 'pro' | 'enterprise'): PlanInfo => {
  const plans: Record<'basic' | 'pro' | 'enterprise', PlanInfo> = {
    basic: { name: 'Basic', price: '50', buildings: 1, apartments: 100 },
    pro: { name: 'Pro', price: '100', buildings: 3, apartments: 300, popular: true },
    enterprise: { name: 'Enterprise', price: '200', buildings: 999999, apartments: 999999 },
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

  const plans: Array<'basic' | 'pro' | 'enterprise'> = ['basic', 'pro', 'enterprise']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl">
        
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {plans.map((plan) => {
              const info = getPlanInfo(plan)
              const isCurrent = plan === currentPlan
              const isPopular = info.popular || false

              return (
                <div 
                  key={plan}
                  className={`relative rounded-xl p-4 sm:p-5 border transition-all ${
                    isCurrent 
                      ? 'bg-slate-800/50 border-white/20' 
                      : isPopular
                        ? 'bg-emerald-500/5 border-emerald-500/30'
                        : 'bg-slate-800/30 border-white/10'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                      <IconStar className="w-3 h-3" />
                      რეკომენდებული
                    </div>
                  )}

                  {isCurrent && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-600 text-white text-[10px] font-bold rounded-full">
                      მიმდინარე
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-base font-bold text-white mb-1">{info.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-black text-white">₾{info.price}</span>
                      <span className="text-slate-400 text-xs">/თვე</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4 text-xs">
                    <li className="flex items-center gap-2">
                      <IconCheck className={`w-3.5 h-3.5 ${
                        isCurrent ? 'text-slate-400' : isPopular ? 'text-emerald-400' : 'text-slate-400'
                      }`} />
                      <span className={isCurrent ? 'text-slate-400' : 'text-slate-300'}>
                        {formatBuildingLimit(info.buildings)} კორპუსი
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IconCheck className={`w-3.5 h-3.5 ${
                        isCurrent ? 'text-slate-400' : isPopular ? 'text-emerald-400' : 'text-slate-400'
                      }`} />
                      <span className={isCurrent ? 'text-slate-400' : 'text-slate-300'}>
                        {info.apartments >= 999999 ? '' : info.apartments} ბინა
                      </span>
                    </li>
                  </ul>

                  {isCurrent ? (
                    <div className="w-full py-2 text-center text-xs font-medium text-slate-400 bg-slate-700/50 rounded-lg">
                      მიმდინარე პაკეტი
                    </div>
                  ) : (
                    <Link 
                      href="/pricing"
                      onClick={onClose}
                      className={`block w-full py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                        isPopular
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      არჩევა
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}