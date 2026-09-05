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

const IconBuilding = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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
  color: string
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
    basic: { name: 'Basic', price: '50', buildings: 1, apartments: 100, color: 'slate' },
    pro: { name: 'Pro', price: '100', buildings: 3, apartments: 300, color: 'emerald', popular: true },
    enterprise: { name: 'Enterprise', price: '200', buildings: 999999, apartments: 999999, color: 'purple' },
  }
  return plans[plan]
}

const formatBuildingLimit = (limit: number) => {
  return limit >= 999999 ? '∞' : limit.toString()
}

// ============ COMPONENT ============
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

  const currentPlanInfo = getPlanInfo(currentPlan)
  const plans: Array<'basic' | 'pro' | 'enterprise'> = ['basic', 'pro', 'enterprise']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <IconAlertCircle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">კორპუსის ლიმიტი ამოწურულია</h2>
                <p className="text-sm text-slate-400">
                  თქვენი მიმდინარე პაკეტი: <span className="font-semibold text-white">{currentPlanInfo.name}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Current Status */}
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <IconBuilding className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">დამატებული კორპუსები</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{currentBuildings}</span>
              <span className="text-slate-400">/</span>
              <span className="text-3xl font-bold text-amber-400">{formatBuildingLimit(maxBuildings)}</span>
              <span className="text-sm text-slate-400 ml-2">კორპუსი</span>
            </div>
            <div className="mt-3 text-sm text-slate-400">
              {currentPlanInfo.name} პაკეტში შესაძლებელია მხოლოდ <span className="font-semibold text-white">{formatBuildingLimit(maxBuildings)} კორპუსის</span> მართვა.
            </div>
          </div>

          {/* Plans Comparison */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">განაახლეთ პაკეტი მეტი კორპუსისთვის</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const info = getPlanInfo(plan)
                const isCurrent = plan === currentPlan
                const isPopular = info.popular || false

                return (
                  <div 
                    key={plan}
                    className={`relative rounded-2xl p-5 border transition-all ${
                      isCurrent 
                        ? 'bg-slate-800/50 border-white/20' 
                        : isPopular
                          ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50'
                          : 'bg-slate-800/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <IconStar className="w-3 h-3" />
                        რეკომენდებული
                      </div>
                    )}

                    {isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-600 text-white text-xs font-bold rounded-full">
                        მიმდინარე
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-1">{info.name}</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">₾{info.price}</span>
                        <span className="text-sm text-slate-400">/თვე</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2 text-sm">
                        <IconCheck className={`w-4 h-4 ${isCurrent ? 'text-slate-400' : isPopular ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className={isCurrent ? 'text-slate-400' : 'text-slate-300'}>
                          {formatBuildingLimit(info.buildings)} კორპუსი
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <IconCheck className={`w-4 h-4 ${isCurrent ? 'text-slate-400' : isPopular ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className={isCurrent ? 'text-slate-400' : 'text-slate-300'}>
                          {info.apartments >= 999999 ? '∞' : info.apartments} ბინა
                        </span>
                      </li>
                      {isPopular && (
                        <>
                          <li className="flex items-center gap-2 text-sm">
                            <IconCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-slate-300">პრიორიტეტული მხარდაჭერა</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <IconCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-slate-300">მოწინავე ანალიტიკა</span>
                          </li>
                        </>
                      )}
                    </ul>

                    {isCurrent ? (
                      <div className="w-full py-2.5 text-center text-sm font-medium text-slate-400 bg-slate-700/50 rounded-lg">
                        მიმდინარე პაკეტი
                      </div>
                    ) : (
                      <Link 
                        href="/pricing"
                        onClick={onClose}
                        className={`block w-full py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${
                          isPopular
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        განახლება
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <Link 
              href="/pricing"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all"
            >
              <span>განახლება Pro პაკეტზე</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 text-slate-400 hover:text-white font-medium rounded-xl transition-colors"
            >
              შესაძლოა მოგვიანებით
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}