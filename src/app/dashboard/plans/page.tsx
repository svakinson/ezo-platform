'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconStar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconSparkles = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" />
  </svg>
)

const IconZap = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconCrown = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>
)

// ============ PLANS DATA ============
const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    subtitle: 'საცდელი პაკეტი',
    price: '19',
    period: 'თვეში',
    trial: '1 თვე უფასო',
    apartments: '20-მდე ბინა',
    buildings: '1 კორპუსი',
    icon: IconSparkles,
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    glowColor: 'shadow-slate-500/50',
    popular: false,
    features: [
      { text: 'შემოსავლების და ხარჯების თრექინგი', included: true },
      { text: 'ძირითადი ანგარიშები (PDF)', included: true },
      { text: 'ხელით გადახდების ჩაწერა', included: true },
      { text: 'მაცხოვრებლების ბაზა (20-მდე)', included: true },
      { text: 'განცხადებების დაფა', included: true },
      { text: 'Email შეტყობინებები', included: true },
      { text: 'ონლაინ გადახდები', included: false },
      { text: 'SMS შეტყობინებები', included: false },
      { text: 'მოვლის თრექინგი', included: false },
      { text: 'მობილური აპლიკაცია', included: false },
      { text: 'Excel ექსპორტი', included: false },
    ],
    cta: 'დაიწყე უფასოდ',
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    subtitle: 'ყველაზე პოპულარული',
    price: '49',
    period: 'თვეში',
    trial: '14 დღე უფასო',
    apartments: '50-მდე ბინა',
    buildings: '1 კორპუსი',
    icon: IconZap,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'shadow-emerald-500/50',
    popular: true,
    features: [
      { text: 'ყველაფერი Starter-ში', included: true },
      { text: 'ონლაინ გადახდები (ბარათი, ბანკი)', included: true },
      { text: 'ავტომატური ინვოისები', included: true },
      { text: 'ავტომატური შეხსენებები', included: true },
      { text: 'SMS შეტყობინებები (100/თვე)', included: true },
      { text: 'მოვლის თრექინგი + ფოტოები', included: true },
      { text: 'ფინანსური დაფები', included: true },
      { text: 'ბიუჯეტის დაგეგმვა', included: true },
      { text: 'Excel ექსპორტი', included: true },
      { text: 'მობილური აპლიკაცია (iOS/Android)', included: true },
      { text: 'დოკუმენტების მართვა', included: true },
      { text: 'პრიორიტეტული მხარდაჭერა', included: true },
    ],
    cta: 'აირჩიე Professional',
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    subtitle: 'დიდი კორპუსებისთვის',
    price: '99',
    period: 'თვეში',
    trial: '14 დღე უფასო',
    apartments: '50+ ბინა (უსაზღვრო)',
    buildings: 'უსაზღვრო კორპუსი',
    icon: IconCrown,
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    glowColor: 'shadow-purple-500/50',
    popular: false,
    features: [
      { text: 'ყველაფერი Professional-ში', included: true },
      { text: 'მრავალკორპუსიანი მართვა', included: true },
      { text: 'ერთი დაფიდან ყველა კორპუსი', included: true },
      { text: 'API წვდომა', included: true },
      { text: 'Webhook მხარდაჭერა', included: true },
      { text: 'AI დაფუძნებული ინსაიტები', included: true },
      { text: 'პროგნოზირება და ბენჩმარკინგი', included: true },
      { text: 'Custom ანგარიშები', included: true },
      { text: 'როლების მართვა', included: true },
      { text: 'აუდიტის ლოგი', included: true },
      { text: '99.9% uptime SLA', included: true },
      { text: '24/7 პრიორიტეტული მხარდაჭერა', included: true },
      { text: 'პერსონალური მენეჯერი', included: true },
      { text: 'ონბორდინგი და ტრენინგი', included: true },
    ],
    cta: 'დაგვიკავშირდი',
  },
]

// ============ COMPONENTS ============

function FloatingOrb({ className, color }: { className?: string; color: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`} style={{ background: color }} />
  )
}

function PlanCard({ plan, onSelect }: { plan: typeof plans[0]; onSelect: (id: string) => void }) {
  const Icon = plan.icon

  return (
    <div className={`relative group transition-all duration-500 ${plan.popular ? 'md:-translate-y-4' : ''}`}>
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${plan.popular ? 'opacity-30' : ''}`} />
      
      {/* FIXED: Removed overflow-hidden from main card */}
      <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl border-2 transition-all duration-500 ${
        plan.popular 
          ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/20' 
          : 'border-white/20 shadow-xl hover:shadow-2xl'
      }`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient}`} style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 right-0 z-10">
            <div className={`relative overflow-hidden bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-bl-2xl text-sm font-bold shadow-lg flex items-center gap-2`}>
              <IconStar className="w-4 h-4 animate-pulse" />
              ყველაზე პოპულარული
            </div>
          </div>
        )}

        {/* FIXED: Added pt-10 to give space for badge */}
        <div className="relative p-8 pt-10">
          {/* Icon */}
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg ${plan.glowColor} group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-8 h-8 text-white" />
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
          </div>

          {/* Plan Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight leading-tight">{plan.name}</h3>
            <p className="text-sm text-slate-600 leading-snug">{plan.subtitle}</p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent leading-none">₾{plan.price}</span>
              <span className="text-slate-500 text-lg">/{plan.period}</span>
            </div>
            <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
              plan.popular 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}>
              <span className="animate-pulse"></span>
              {plan.trial}
            </div>
          </div>

          {/* Limits */}
          <div className="space-y-3 mb-6 pb-6 border-b border-slate-200/60">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <IconBuilding className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-slate-700 font-semibold leading-snug">{plan.apartments}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-slate-700 font-semibold leading-snug">{plan.buildings}</span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 group/item">
                {feature.included ? (
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5 shadow-sm group-hover/item:scale-110 transition-transform`}>
                    <IconCheck className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center mt-0.5">
                    <IconX className="w-3 h-3 text-slate-400" />
                  </div>
                )}
                <span className={`text-sm leading-relaxed ${feature.included ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => onSelect(plan.id)}
            className={`relative w-full py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 group-hover:shadow-xl ${
              plan.popular
                ? `bg-gradient-to-r ${plan.gradient} shadow-lg ${plan.glowColor} hover:shadow-2xl hover:scale-105`
                : `bg-gradient-to-r ${plan.gradient} shadow-md hover:shadow-xl hover:scale-105`
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {plan.cta}
              <IconArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ MAIN PAGE ============

export default function PlansPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId)
    setTimeout(() => {
      alert(`${planId.toUpperCase()} პაკეტი არჩეულია! მომდევნო ეტაპზე დაგემატება კორპუსის მონაცემების შეყვანის ფორმა.`)
      setSelectedPlan(null)
    }, 800)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <IconBuilding className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <FloatingOrb className="w-96 h-96 top-0 left-0" color="#10b981" />
        <FloatingOrb className="w-96 h-96 top-1/2 right-0" color="#8b5cf6" />
        <FloatingOrb className="w-96 h-96 bottom-0 left-1/2" color="#06b6d4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* FIXED: Changed h-16 to min-h-16 and added py-3 */}
      <header className="relative z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <IconBuilding className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white leading-tight">EZO</span>
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/20"></div>
            <Link 
              href="/dashboard" 
              className="hidden sm:flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <IconArrowLeft className="w-4 h-4" />
              <span className="leading-snug">უკან დაბრუნება</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-white leading-snug">
                {user?.user_metadata?.full_name || 'მომხმარებელი'}
              </div>
              <div className="text-xs text-white/50 leading-snug">{user?.email}</div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline leading-snug">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section - FIXED: Added py-6 and proper line-height */}
        <div className="text-center max-w-3xl mx-auto mb-16 py-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-6">
            <IconSparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90 leading-snug">აირჩიე შენი პაკეტი</span>
          </div>
          
          {/* FIXED: Added leading-[1.2] and py-2 */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-[1.2] py-2">
            გქონდეს სრული კონტროლი
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent py-1">
              შენს კორპუსზე
            </span>
          </h1>
          
          <p className="text-lg text-white/70 leading-relaxed">
            აირჩიე პაკეტი, რომელიც საუკეთესოდ შეესაბამება შენს კორპუსს. 
            ყველა პაკეტი მოიცავს უფასო საცდელ პერიოდს.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12 leading-[1.3] py-2">
            დეტალური შედარება
          </h2>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-white/90 font-semibold leading-snug">ფუნქცია</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="p-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-sm font-bold leading-snug`}>
                          {plan.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'ბინების რაოდენობა', values: ['20-მდე', '50-მდე', 'უსაზღვრო'] },
                    { feature: 'კორპუსები', values: ['1', '1', 'უსაზღვრო'] },
                    { feature: 'ონლაინ გადახდები', values: [false, true, true] },
                    { feature: 'SMS შეტყობინებები', values: [false, '100/თვე', 'უსაზღვრო'] },
                    { feature: 'მოვლის თრექინგი', values: [false, true, true] },
                    { feature: 'მობილური აპი', values: [false, true, true] },
                    { feature: 'Excel ექსპორტი', values: [false, true, true] },
                    { feature: 'API წვდომა', values: [false, false, true] },
                    { feature: 'მრავალკორპუსიანი', values: [false, false, true] },
                    { feature: 'AI ინსაიტები', values: [false, false, true] },
                    { feature: '24/7 მხარდაჭერა', values: [false, false, true] },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6 text-white/90 font-medium leading-snug">{row.feature}</td>
                      {row.values.map((val, j) => (
                        <td key={j} className="p-6 text-center">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <div className="inline-flex w-8 h-8 rounded-full bg-emerald-500/20 items-center justify-center">
                                <IconCheck className="w-5 h-5 text-emerald-400" />
                              </div>
                            ) : (
                              <div className="inline-flex w-8 h-8 rounded-full bg-white/5 items-center justify-center">
                                <IconX className="w-5 h-5 text-white/30" />
                              </div>
                            )
                          ) : (
                            <span className="text-white/90 font-medium leading-snug">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12 leading-[1.3] py-2">
            ხშირად დასმული კითხვები
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: 'შემიძლია პაკეტის შეცვლა?',
                answer: 'დიახ, ნებისმიერ დროს შეგიძლია განაახლო ან შეცვალო შენი პაკეტი. ცვლილება მომდევნო გადახდის პერიოდიდან ამოქმედდება.'
              },
              {
                question: 'რა ხდება საცდელი პერიოდის შემდეგ?',
                answer: 'საცდელი პერიოდის დასრულებამდე მიიღებ შეხსენებას. თუ არ აირჩევ გადახდილ პაკეტს, ანგარიში ავტომატურად გადავა Starter პაკეტზე.'
              },
              {
                question: 'არის თუ არა ბარათის მონაცემები საჭირო?',
                answer: 'არა, საცდელი პერიოდისთვის ბარათის მონაცემები არ არის საჭირო. მხოლოდ გადახდილი პაკეტის არჩევისას დაგჭირდება გადახდის მეთოდი.'
              },
              {
                question: 'შემიძლია გაუქმება?',
                answer: 'რა თქმა უნდა. შეგიძლია გააუქმო გამოწერა ნებისმიერ დროს და შენი მონაცემები ექსპორტზე გაიტანო.'
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors group">
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2 leading-[1.3]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {faq.question}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed pl-10">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4 leading-[1.3] py-2">
              გაქვს კითხვები?
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              ჩვენი გუნდი მზადაა დაგეხმაროს საუკეთესო პაკეტის არჩევაში.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@ezo.ge" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-all hover:scale-105 leading-snug"
              >
                📧 info@ezo.ge
              </a>
              <a 
                href="tel:+995555123456" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all leading-snug"
              >
                📞 +995 555 123 456
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}