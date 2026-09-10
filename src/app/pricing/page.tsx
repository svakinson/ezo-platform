'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PLANS } from '@/lib/plans'
import Link from 'next/link'

// ======================================================
// ICONS
// ======================================================

const IconBuilding = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconCheck = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconX = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconArrowRight = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconShield = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconUsers = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconZap = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconLogOut = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconChevronDown = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconElectricity = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconWater = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
)

const IconConcierge = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconCopy = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const IconGift = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const IconSparkles = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17z" />
  </svg>
)

// ======================================================
// ANIMATED DASHBOARD MOCKUP
// ======================================================

function AnimatedDashboard() {
  const payments = [
    {
      id: 1,
      name: 'ბინა 12',
      type: 'დენი',
      amount: 45,
      status: 'paid',
      delay: 0,
    },
    {
      id: 2,
      name: 'ბინა 23',
      type: 'კონსიერჟი',
      amount: 80,
      status: 'paid',
      delay: 1500,
    },
    {
      id: 3,
      name: 'ბინა 34',
      type: 'წყალი',
      amount: 32,
      status: 'pending',
      delay: 3000,
    },
  ]

  const [totalCollected, setTotalCollected] = useState(0)
  const [visiblePayments, setVisiblePayments] = useState<number[]>([])

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []

    const runAnimation = () => {
      timers.forEach(clearTimeout)
      timers = []

      setVisiblePayments([])
      setTotalCollected(0)

      const startTimer = setTimeout(() => {
        payments.forEach((payment) => {
          const timer = setTimeout(() => {
            setVisiblePayments((prev) => [...prev, payment.id])

            if (payment.status === 'paid') {
              setTotalCollected((prev) => prev + payment.amount)
            }
          }, payment.delay)

          timers.push(timer)
        })
      }, 500)

      timers.push(startTimer)
    }

    runAnimation()

    const interval = setInterval(runAnimation, 8000)

    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-emerald-500/[0.06] blur-3xl rounded-full pointer-events-none" />

      <div className="relative rounded-[28px] border border-white/[0.09] bg-[#0b1018]/95 shadow-2xl shadow-black/30 overflow-hidden">
        {/* Browser top */}
        <div className="h-11 px-4 border-b border-white/[0.07] flex items-center gap-2 bg-white/[0.015]">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />

          <div className="ml-3 flex-1 max-w-[240px] h-6 rounded-md bg-white/[0.04] border border-white/[0.04] flex items-center px-3">
            <span className="text-[9px] text-slate-600">
              app.bino.ge/dashboard
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1">
                მიმდინარე თვე
              </div>
              <div className="text-sm font-semibold text-white">
                გადახდების მიმოხილვა
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400">
                Live
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <div className="text-[9px] text-slate-500 mb-1.5">
                ბინები
              </div>
              <div className="text-lg font-bold text-white">47</div>
            </div>

            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-3">
              <div className="text-[9px] text-slate-500 mb-1.5">
                შემოსული
              </div>
              <div className="text-lg font-bold text-emerald-400">
                ₾{totalCollected}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <div className="text-[9px] text-slate-500 mb-1.5">
                მოლოდინი
              </div>
              <div className="text-lg font-bold text-amber-400">
                12
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] uppercase tracking-[0.14em] text-slate-600">
              ბოლო ოპერაციები
            </span>
            <span className="text-[9px] text-slate-600">
              ამ თვეში
            </span>
          </div>

          <div className="space-y-2">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 border transition-all duration-500 ${
                  visiblePayments.includes(payment.id)
                    ? 'opacity-100 translate-x-0 border-white/[0.07] bg-white/[0.02]'
                    : 'opacity-0 -translate-x-3 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      payment.type === 'დენი'
                        ? 'bg-amber-500/10 text-amber-400'
                        : payment.type === 'წყალი'
                          ? 'bg-sky-500/10 text-sky-400'
                          : 'bg-purple-500/10 text-purple-400'
                    }`}
                  >
                    {payment.type === 'დენი' ? (
                      <IconElectricity className="w-3.5 h-3.5" />
                    ) : payment.type === 'წყალი' ? (
                      <IconWater className="w-3.5 h-3.5" />
                    ) : (
                      <IconConcierge className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-medium text-white">
                      {payment.name}
                    </div>
                    <div className="text-[9px] text-slate-600">
                      {payment.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      payment.status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {payment.status === 'paid' ? 'გადახდილი' : 'მოლოდინში'}
                  </span>

                  <span className="text-xs font-semibold text-white">
                    ₾{payment.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[9px] text-slate-600">
              მონაცემები ავტომატურად განახლდება
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-500">
                აქტიური
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ======================================================
// SECTION LABEL
// ======================================================

function SectionLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.025]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {children}
      </span>
    </div>
  )
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function PricingPage() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [billingCycle, setBillingCycle] = useState<
    'monthly' | 'yearly'
  >('monthly')
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied] = useState(false)

  // ====================================================
  // AUTH
  // ====================================================

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.referral_code) {
        setReferralCode(profile.referral_code)
      }

      setLoading(false)
    }

    init()
  }, [router])

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // ====================================================
  // COPY REFERRAL
  // ====================================================

  const copyReferralCode = async () => {
    if (!referralCode) return

    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      // ignore
    }
  }

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="absolute -inset-2 rounded-2xl border border-emerald-500/10 animate-pulse" />
          </div>

          <div className="text-xs text-slate-500">
            იტვირთება...
          </div>
        </div>
      </div>
    )
  }

  const userName =
    user?.email?.split('@')[0] || 'მომხმარებელი'

  // ====================================================
  // CONTENT
  // ====================================================

  const problems = [
    {
      number: '01',
      title: 'ვინ არ გადაიხადა?',
      desc: 'ხელით ცხრილები ან WhatsApp — ყოველ თვე თავიდან უნდა გაარკვიო ვინ არის ვალში.',
    },
    {
      number: '02',
      title: 'ქვითრები იკარგება',
      desc: 'ბანკის ქვითარი გამოგზავნილია, მაგრამ რამდენიმე დღის შემდეგ ჩატში მისი პოვნა რთულია.',
    },
    {
      number: '03',
      title: 'ინფორმაცია იკარგება',
      desc: 'თავმჯდომარის შეცვლისას ისტორია, ხარჯები და ვალდებულებები ხშირად თავიდან იწყება.',
    },
    {
      number: '04',
      title: 'შეკრებები უშედეგოა',
      desc: 'კითხვაზე „სად წავიდა ფული?“ ზუსტი პასუხის გაცემა რთულია.',
    },
  ]

  const solutions = [
    {
      number: '01',
      title: 'ბინების ციფრული რეესტრი',
      desc: 'ერთი შეხედვით ხედავ ვინ გადაიხადა და ვინ არის ვალში.',
    },
    {
      number: '02',
      title: 'ცენტრალიზებული არქივი',
      desc: 'ქვითრები და ფინანსური დოკუმენტები ერთ უსაფრთხო სივრცეში.',
    },
    {
      number: '03',
      title: 'მუდმივი ისტორია',
      desc: 'ახალი თავმჯდომარე სისტემაში შესვლისთანავე ხედავს სრულ სურათს.',
    },
    {
      number: '04',
      title: 'მზა ფინანსური ანგარიშები',
      desc: 'შეკრებაზე მიდიხარ კონკრეტული ციფრებით და არა ვარაუდებით.',
    },
  ]

  const features = [
    {
      icon: IconBuilding,
      number: '01',
      title: 'კორპუსის რეესტრი',
      desc: 'ბინები, მფლობელები და საკონტაქტო ინფორმაცია ერთ სივრცეში.',
    },
    {
      icon: IconZap,
      number: '02',
      title: 'გადახდების მართვა',
      desc: 'მარტივად აკონტროლებ ვინ გადაიხადა და ვინ დარჩა ვალში.',
    },
    {
      icon: IconShield,
      number: '03',
      title: 'ქვითრების არქივი',
      desc: 'ყველა მნიშვნელოვანი დოკუმენტი უსაფრთხოდ და ორგანიზებულად.',
    },
    {
      icon: IconUsers,
      number: '04',
      title: 'ფინანსური ანგარიშები',
      desc: 'შემოსავალი, ხარჯი და ბალანსი მკაფიო ანგარიშების ფორმატში.',
    },
  ]

  const faqs = [
    {
      q: 'რა მოხდება პაკეტის არჩევის შემდეგ?',
      a: 'მალევე მიიღებ თავმჯდომარის წვდომას და შეძლებ კორპუსის დამატებას.',
    },
    {
      q: 'ბარათი საჭიროა საცდელის დასაწყებად?',
      a: 'არა. 14 დღე სრულად უფასოა და საცდელი პერიოდის დასაწყებად ბარათი საჭირო არ არის.',
    },
    {
      q: '14 დღის შემდეგ რა ხდება?',
      a: 'თუ პაკეტს არ გააგრძელებ, წვდომა შეიზღუდება, ხოლო მონაცემები 30 დღის განმავლობაში შენარჩუნდება.',
    },
    {
      q: 'შემიძლია გავაუქმო?',
      a: 'დიახ. გამოწერის გაუქმება ნებისმიერ დროს შეგიძლია.',
    },
    {
      q: 'თუ ზუსტად არ ვიცი რამდენი ბინა მჭირდება?',
      a: 'არ არის პრობლემა. საჭიროების შემთხვევაში პაკეტის შეცვლა შეგიძლია.',
    },
    {
      q: 'სად ინახება ჩემი მონაცემები?',
      a: 'მონაცემები ინახება დაცულ Supabase ინფრასტრუქტურაზე SSL დაშიფვრით.',
    },
    {
      q: 'თუ არ გავაგრძელებ, შემიძლია მონაცემების გატანა?',
      a: 'დიახ. მონაცემების ექსპორტი ნებისმიერ დროს შეგიძლია.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'აირჩიე პაკეტი',
      desc: 'შეარჩიე გეგმა, რომელიც შენს კორპუსს შეესაბამება.',
    },
    {
      number: '02',
      title: 'დაიწყე 14-დღიანი ტესტი',
      desc: 'გამოსცადე პლატფორმა ბარათის დამატების გარეშე.',
    },
    {
      number: '03',
      title: 'მართე ყველაფერი ერთგან',
      desc: 'დაამატე ბინები და დაიწყე ყოველდღიური მართვა.',
    },
  ]

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-screen bg-[#070b10] text-slate-100 overflow-x-hidden">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.035] blur-[120px]" />
        <div className="absolute top-[30%] right-[-150px] w-[500px] h-[500px] rounded-full bg-teal-500/[0.025] blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[35%] w-[600px] h-[500px] rounded-full bg-emerald-500/[0.02] blur-[130px]" />
      </div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070b10]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[68px] flex items-center justify-between">

            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-emerald-500/[0.09] border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/[0.14] transition-colors">
                <IconBuilding className="w-[18px] h-[18px] text-emerald-400" />
              </div>

              <div>
                <div className="text-[17px] leading-none font-bold tracking-tight text-white">
                  Bino
                </div>
                <div className="hidden sm:block text-[9px] mt-1 text-slate-600 uppercase tracking-[0.14em]">
                  Building management
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">

              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/15 bg-amber-500/[0.04]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] text-amber-300">
                  პაკეტი არჩეული არ არის
                </span>
              </div>

              <div className="hidden sm:block h-7 w-px bg-white/[0.08]" />

              <div className="flex items-center gap-2.5">
                <div className="hidden md:block text-right">
                  <div className="text-xs font-medium text-white">
                    {userName}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    {user?.email}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-500/10">
                  {userName.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/[0.06] transition-all"
                  title="გამოსვლა"
                  aria-label="გამოსვლა"
                >
                  <IconLogOut className="w-[17px] h-[17px]" />
                </button>
              </div>

              <Link
                href="#pricing"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-500/10"
              >
                აირჩიე პაკეტი
                <IconArrowRight className="w-3.5 h-3.5" />
              </Link>

            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="relative pt-12 sm:pt-16 lg:pt-24 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">

              {/* TEXT */}

              <div>
                <SectionLabel>
                  კორპუსის მართვა ახალ დონეზე
                </SectionLabel>

                <h1 className="mt-6 text-[2.4rem] sm:text-5xl lg:text-[4rem] leading-[1.04] font-bold tracking-[-0.035em] text-white">
                  კორპუსის მართვა
                  <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                    ქაოსის გარეშე.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm sm:text-base lg:text-[17px] leading-7 text-slate-400">
                  ყველა ბინა, გადახდა, ქვითარი და ფინანსური ინფორმაცია
                  ერთ პლატფორმაში. ზუსტად იცი რა ხდება შენს კორპუსში —
                  ყოველგვარი ხელით ცხრილებისა და ქაოსის გარეშე.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/dashboard/add-building"
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-all shadow-xl shadow-emerald-500/10"
                  >
                    დაიწყე უფასოდ 14 დღით
                    <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <Link
                    href="#pricing"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/[0.1] bg-white/[0.025] hover:bg-white/[0.05] text-slate-300 hover:text-white text-sm font-medium transition-all"
                  >
                    პაკეტების ნახვა
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    14 დღე უფასოდ
                  </span>

                  <span className="flex items-center gap-1.5">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    ბარათი არ არის საჭირო
                  </span>

                  <span className="flex items-center gap-1.5">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                    გაუქმება ნებისმიერ დროს
                  </span>
                </div>
              </div>

              {/* MOCKUP */}

              <div>
                <AnimatedDashboard />
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            PROBLEM / SOLUTION
        ================================================== */}

        <section className="py-16 lg:py-24 border-y border-white/[0.06] bg-white/[0.012]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-2xl mb-12">
              <SectionLabel>
                რატომ Bino?
              </SectionLabel>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                ის, რაც დღეს რთულია,
                <span className="text-slate-500"> Bino-ში მარტივია.</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-7 text-slate-500">
                პლატფორმა შექმნილია რეალური კორპუსის ყოველდღიური
                პრობლემებისთვის.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

              {/* PROBLEMS */}

              <div className="rounded-2xl border border-white/[0.07] bg-[#0a0f16] overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/[0.08] border border-rose-500/10 flex items-center justify-center">
                    <IconX className="w-4 h-4 text-rose-400" />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      ძველი გზა
                    </div>
                    <div className="text-[10px] text-slate-600 mt-0.5">
                      ყოველდღიური ქაოსი
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-white/[0.05]">
                  {problems.map((problem) => (
                    <div
                      key={problem.number}
                      className="px-5 sm:px-6 py-5 flex gap-4 hover:bg-white/[0.015] transition-colors"
                    >
                      <span className="text-[10px] font-mono text-slate-700 pt-1">
                        {problem.number}
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {problem.title}
                        </h3>

                        <p className="mt-1.5 text-xs sm:text-sm leading-6 text-slate-500">
                          {problem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOLUTIONS */}

              <div className="rounded-2xl border border-emerald-500/[0.12] bg-emerald-500/[0.018] overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-emerald-500/[0.08] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/10 flex items-center justify-center">
                    <IconCheck className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      Bino
                    </div>
                    <div className="text-[10px] text-emerald-500/70 mt-0.5">
                      ციფრული მართვა
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-emerald-500/[0.06]">
                  {solutions.map((solution) => (
                    <div
                      key={solution.number}
                      className="px-5 sm:px-6 py-5 flex gap-4 hover:bg-emerald-500/[0.015] transition-colors"
                    >
                      <span className="text-[10px] font-mono text-emerald-500/40 pt-1">
                        {solution.number}
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {solution.title}
                        </h3>

                        <p className="mt-1.5 text-xs sm:text-sm leading-6 text-emerald-400/75">
                          {solution.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            PROCESS
        ================================================== */}

        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>
                მარტივი დასაწყისი
              </SectionLabel>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                დაიწყე რამდენიმე წუთში
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-500">
                რთული ინსტალაცია და ხანგრძლივი სწავლა არ დაგჭირდება.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative group rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 hover:border-emerald-500/20 hover:bg-white/[0.025] transition-all"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%+1px)] w-5 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}

                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400">
                        {step.number}
                      </span>
                    </div>

                    <IconArrowRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        <section className="py-16 lg:py-24 border-y border-white/[0.06] bg-white/[0.012]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <SectionLabel>
                  შესაძლებლობები
                </SectionLabel>

                <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  ყველაფერი ერთ სისტემაში.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-500">
                ყოველდღიური ადმინისტრირება უფრო სწრაფი, გამჭვირვალე
                და ორგანიზებული ხდება.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="group rounded-2xl border border-white/[0.07] bg-[#0a0f16] p-5 sm:p-6 hover:border-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-emerald-400" />
                    </div>

                    <span className="text-[9px] font-mono text-slate-700">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-sm font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-500">
                    {feature.desc}
                  </p>

                  <div className="mt-5 h-px bg-white/[0.05] group-hover:bg-emerald-500/20 transition-colors" />
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ==================================================
            PRICING
        ================================================== */}

        <section
          id="pricing"
          className="scroll-mt-20 py-16 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>
                ფასები
              </SectionLabel>

              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white">
                აირჩიე შენი პაკეტი
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-500">
                მარტივი და გამჭვირვალე ფასები. დამალული გადასახადების გარეშე.
              </p>

              {/* BILLING */}

              <div className="mt-8 inline-flex p-1 rounded-xl border border-white/[0.08] bg-white/[0.025]">

                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white/[0.08] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ყოველთვიური
                </button>

                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                    billingCycle === 'yearly'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ყოველწლიური

                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      billingCycle === 'yearly'
                        ? 'bg-white/15 text-white'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    -17%
                  </span>
                </button>

              </div>
            </div>

            {/* PRICING CARDS */}

            <div className="mt-12 grid lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto items-stretch">

              {PLANS.map((plan) => {
                const isPro = plan.popular

                const price =
                  billingCycle === 'yearly'
                    ? Math.round(plan.price * 0.83)
                    : plan.price

                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                      isPro
                        ? 'border border-emerald-500/35 bg-[#0c1414] shadow-2xl shadow-emerald-500/[0.06] lg:-translate-y-2'
                        : 'border border-white/[0.08] bg-[#0a0f16] hover:border-white/[0.14]'
                    }`}
                  >

                    {/* TOP ACCENT */}

                    {isPro && (
                      <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                    )}

                    <div className="p-6 sm:p-7 lg:p-8 flex flex-col flex-1">

                      {/* PLAN HEADER */}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {plan.nameGe}
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm text-slate-500">
                            {plan.description}
                          </p>
                        </div>

                        {isPro && (
                          <div className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15">
                            <IconSparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">
                              რეკომენდებული
                            </span>
                          </div>
                        )}
                      </div>

                      {/* PRICE */}

                      <div className="mt-7 pb-7 border-b border-white/[0.07]">
                        <div className="flex items-end gap-1">
                          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                            ₾{price}
                          </span>

                          <span className="pb-1.5 text-xs text-slate-600">
                            /თვე
                          </span>
                        </div>

                        {billingCycle === 'yearly' && (
                          <div className="mt-2 text-[10px] text-emerald-400">
                            დაზოგე ₾{plan.price - price} თვეში
                          </div>
                        )}

                        {billingCycle === 'monthly' && (
                          <div className="mt-2 text-[10px] text-slate-600">
                            ყოველთვიური გადახდა
                          </div>
                        )}
                      </div>

                      {/* FEATURES */}

                      <div className="pt-6 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-slate-600 mb-4">
                          პაკეტში შედის
                        </div>

                        <ul className="space-y-3">
                          {plan.features.slice(0, 8).map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5"
                            >
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  feature.included
                                    ? 'bg-emerald-500/[0.08]'
                                    : 'bg-white/[0.025]'
                                }`}
                              >
                                {feature.included ? (
                                  <IconCheck className="w-2.5 h-2.5 text-emerald-400" />
                                ) : (
                                  <IconX className="w-2.5 h-2.5 text-slate-700" />
                                )}
                              </div>

                              <span
                                className={`text-xs leading-5 ${
                                  feature.included
                                    ? 'text-slate-400'
                                    : 'text-slate-700'
                                }`}
                              >
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}

                      <div className="pt-7 mt-7 border-t border-white/[0.07]">
                        <Link
                          href="/dashboard"
                          className={`group w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isPro
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                              : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.06]'
                          }`}
                        >
                          {plan.cta}

                          <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                    </div>
                  </div>
                )
              })}

            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[10px] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3 h-3 text-emerald-500" />
                  14-დღიანი უფასო ტესტი
                </span>

                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3 h-3 text-emerald-500" />
                  ბარათის გარეშე
                </span>

                <span className="flex items-center gap-1.5">
                  <IconCheck className="w-3 h-3 text-emerald-500" />
                  ნებისმიერ დროს გაუქმება
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================
            COMPARISON
        ================================================== */}

        <section className="py-16 lg:py-24 border-y border-white/[0.06] bg-white/[0.012]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel>
                შედარება
              </SectionLabel>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                დეტალური შედარება
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                ნახე რომელი შესაძლებლობები შედის თითოეულ პაკეტში.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0a0f16]">

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px]">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                      <th className="text-left py-4 px-5 sm:px-6 text-[10px] uppercase tracking-[0.1em] text-slate-600 font-semibold">
                        ფუნქცია
                      </th>

                      {PLANS.map((plan) => (
                        <th
                          key={plan.id}
                          className="text-center py-4 px-5 text-xs font-semibold text-white"
                        >
                          {plan.nameGe}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {PLANS[0].features.map((feature, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/[0.045] last:border-0 hover:bg-white/[0.015] transition-colors"
                      >
                        <td className="py-3.5 px-5 sm:px-6 text-xs text-slate-400">
                          {feature.text}
                        </td>

                        {PLANS.map((plan) => {
                          const planFeature = plan.features.find(
                            (f) => f.text === feature.text
                          )

                          return (
                            <td
                              key={plan.id}
                              className="text-center py-3.5 px-5"
                            >
                              {planFeature?.included ? (
                                <div className="mx-auto w-6 h-6 rounded-full bg-emerald-500/[0.07] flex items-center justify-center">
                                  <IconCheck className="w-3 h-3 text-emerald-400" />
                                </div>
                              ) : (
                                <div className="mx-auto w-6 h-6 flex items-center justify-center">
                                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            REFERRAL
        ================================================== */}

        {referralCode && (
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-[#0d0b15]">

                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-500/[0.07] blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/[0.04] blur-3xl" />

                <div className="relative p-6 sm:p-8 lg:p-10">

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/[0.08] border border-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <IconGift className="w-5 h-5 text-purple-400" />
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-purple-400/70">
                        Referral პროგრამა
                      </div>

                      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                        მოიწვიე მეგობარი — მიიღე 1 თვე უფასო
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500">
                    გაუზიარე შენი კოდი მეგობარს. როცა ის პაკეტს შეიძენს,
                    ორივე მიიღებთ 1 თვე უფასო გამოყენებას.
                  </p>

                  <div className="mt-7 grid sm:grid-cols-[1fr_auto] gap-3">

                    <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3.5">
                      <div className="text-[9px] uppercase tracking-[0.1em] text-slate-600 mb-1">
                        შენი referral კოდი
                      </div>

                      <code className="text-base sm:text-lg font-mono font-semibold text-purple-300 tracking-wide">
                        {referralCode}
                      </code>
                    </div>

                    <button
                      onClick={copyReferralCode}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-semibold transition-colors"
                    >
                      <IconCopy className="w-4 h-4" />
                      {copied ? 'დაკოპირდა!' : 'კოდის კოპირება'}
                    </button>

                  </div>

                  <div className="mt-7 grid grid-cols-3 border-t border-white/[0.06] pt-6">

                    <div className="text-center">
                      <div className="text-xl font-bold text-white">
                        01
                      </div>
                      <div className="mt-1 text-[10px] text-slate-600">
                        გაუზიარე კოდი
                      </div>
                    </div>

                    <div className="text-center border-x border-white/[0.06]">
                      <div className="text-xl font-bold text-white">
                        02
                      </div>
                      <div className="mt-1 text-[10px] text-slate-600">
                        მეგობარი იხდის
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-400">
                        03
                      </div>
                      <div className="mt-1 text-[10px] text-slate-600">
                        იღებ 1 თვეს
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================================================
            FAQ
        ================================================== */}

        <section className="py-16 lg:py-24 border-y border-white/[0.06] bg-white/[0.012]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-10">
              <SectionLabel>
                დახმარება
              </SectionLabel>

              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                ხშირად დასმული კითხვები
              </h2>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i

                return (
                  <div
                    key={i}
                    className={`rounded-xl border overflow-hidden transition-all ${
                      isOpen
                        ? 'border-emerald-500/15 bg-emerald-500/[0.018]'
                        : 'border-white/[0.07] bg-[#0a0f16]'
                    }`}
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(isOpen ? null : i)
                      }
                      aria-expanded={isOpen}
                      className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-4 text-left"
                    >
                      <span className="text-sm font-medium text-slate-200">
                        {faq.q}
                      </span>

                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-emerald-500/[0.08] text-emerald-400'
                            : 'bg-white/[0.03] text-slate-600'
                        }`}
                      >
                        <IconChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-5 pr-14">
                          <p className="text-xs sm:text-sm leading-6 text-slate-500">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* ==================================================
            FINAL CTA
        ================================================== */}

        <section className="relative py-20 lg:py-28 overflow-hidden">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-emerald-500/[0.045] blur-[100px]" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/15 flex items-center justify-center">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
            </div>

            <h2 className="mt-7 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white">
              მზად ხარ უფრო მარტივი
              <span className="block text-emerald-400">
                კორპუსის მართვისთვის?
              </span>
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base leading-7 text-slate-500">
              დაიწყე 14-დღიანი უფასო ტესტი და ნახე რამდენად მარტივი
              შეიძლება გახდეს ყოველდღიური ადმინისტრირება.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

              <Link
                href="/dashboard/add-building"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold shadow-xl shadow-emerald-500/10 transition-all"
              >
                დაიწყე უფასოდ
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/[0.09] bg-white/[0.025] hover:bg-white/[0.05] text-slate-300 text-sm font-medium transition-all"
              >
                ნახე პაკეტები
              </Link>

            </div>

            <div className="mt-6 flex justify-center flex-wrap gap-x-5 gap-y-2 text-[10px] text-slate-700">
              <span>14 დღე უფასოდ</span>
              <span>•</span>
              <span>ბარათის გარეშე</span>
              <span>•</span>
              <span>გაუქმება ნებისმიერ დროს</span>
            </div>

          </div>
        </section>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-white/[0.06] bg-[#05080c]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/10 flex items-center justify-center">
                <IconBuilding className="w-3.5 h-3.5 text-emerald-500" />
              </div>

              <span className="text-sm font-bold text-white">
                Bino
              </span>
            </Link>

            <div className="text-[10px] text-slate-700 text-center">
              © {new Date().getFullYear()} Bino Platform. ყველა უფლება დაცულია.
            </div>

            <Link
              href="#pricing"
              className="text-[10px] text-slate-600 hover:text-emerald-400 transition-colors"
            >
              პაკეტები
            </Link>

          </div>

        </div>
      </footer>

    </div>
  )
}