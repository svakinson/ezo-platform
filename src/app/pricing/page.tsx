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

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconZap = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconChevronDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconElectricity = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconWater = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
)

const IconConcierge = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

// ============ ANIMATED DASHBOARD MOCKUP ============
function AnimatedDashboard() {
  const [payments, setPayments] = useState([
    { id: 1, name: "ბინა 12", type: "დენი", amount: 45, status: "paid", delay: 0 },
    { id: 2, name: "ბინა 23", type: "კონსიერჟი", amount: 80, status: "paid", delay: 1500 },
    { id: 3, name: "ბინა 34", type: "წყალი", amount: 32, status: "pending", delay: 3000 },
  ])
  const [totalCollected, setTotalCollected] = useState(0)
  const [visiblePayments, setVisiblePayments] = useState<number[]>([])

  useEffect(() => {
    // ანიმაცია: გადახდები ერთმანეთის მიყოლებით ჩნდება
    payments.forEach((payment, index) => {
      setTimeout(() => {
        setVisiblePayments(prev => [...prev, payment.id])
        if (payment.status === 'paid') {
          setTotalCollected(prev => prev + payment.amount)
        }
      }, payment.delay)
    })

    // ციკლური განახლება
    const interval = setInterval(() => {
      setVisiblePayments([])
      setTotalCollected(0)
      setTimeout(() => {
        payments.forEach((payment, index) => {
          setTimeout(() => {
            setVisiblePayments(prev => [...prev, payment.id])
            if (payment.status === 'paid') {
              setTotalCollected(prev => prev + payment.amount)
            }
          }, payment.delay)
        })
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
      {/* Window Controls */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs text-slate-500 font-medium">EZO Dashboard — რეალურ დროში</span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
          <div className="text-xs text-slate-400 mb-1">სულ ბინები</div>
          <div className="text-xl font-bold text-white">47</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-emerald-500/20">
          <div className="text-xs text-slate-400 mb-1">შემოსული</div>
          <div className="text-xl font-bold text-emerald-400">₾{totalCollected}</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5">
          <div className="text-xs text-slate-400 mb-1">ლოდინში</div>
          <div className="text-xl font-bold text-amber-400">12</div>
        </div>
      </div>

      {/* Animated Payments List */}
      <div className="space-y-2">
        <div className="text-xs text-slate-500 mb-2 font-medium">ბოლო გადახდები:</div>
        {payments.map((payment) => (
          <div
            key={payment.id}
            className={`flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2.5 border transition-all duration-500 ${
              visiblePayments.includes(payment.id)
                ? 'opacity-100 translate-x-0 border-white/10'
                : 'opacity-0 -translate-x-4 border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded flex items-center justify-center ${
                payment.type === 'დენი' ? 'bg-amber-500/20' :
                payment.type === 'წყალი' ? 'bg-blue-500/20' :
                'bg-purple-500/20'
              }`}>
                {payment.type === 'დენი' ? <IconElectricity className="w-3.5 h-3.5 text-amber-400" /> :
                 payment.type === 'წყალი' ? <IconWater className="w-3.5 h-3.5 text-blue-400" /> :
                 <IconConcierge className="w-3.5 h-3.5 text-purple-400" />}
              </div>
              <div>
                <div className="text-xs font-medium text-white">{payment.name}</div>
                <div className="text-[10px] text-slate-500">{payment.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                payment.status === 'paid' 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {payment.status === 'paid' ? '✓' : '⏳'}
              </span>
              <span className="text-xs font-semibold text-white">₾{payment.amount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Indicator */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-slate-500">რეალურ დროში განახლება</span>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
      setLoading(false)
    }
    init()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const userName = user?.email?.split('@')[0] || 'მომხმარებელი'

  const problems = [
    {
      title: "ვინმემ არ გადაიხადა? ვერ გაიგებ ვინ.",
      desc: "ხელით ცხრილები ან საერთოდ არაფერი — ყოველ თვე თავიდან უნდა გამოარკვიო ვინ არის ვალში."
    },
    {
      title: "ქვითრები WhatsApp-ში იკარგება.",
      desc: "ბანკის ქვითარი გამოგზავნილია, მაგრამ ერთი კვირის შემდეგ ვეღარ პოულობ ჩატის ისტორიაში."
    },
    {
      title: "თავმჯდომარე იცვლება — ყველა ინფორმაცია იკარგება.",
      desc: "ახალ თავმჯდომარეს არაფერი გადაეცემა. ისტორია, ვალები, ხარჯები — ყველაფერი თავიდან."
    },
    {
      title: "შეკრებები უშედეგოა, რადგან არ არის მონაცემები.",
      desc: "კითხვას სვამენ 'სად წავიდა ფული?' და კონკრეტული პასუხი არავის აქვს."
    }
  ]

  const solutions = [
    {
      problem: "ვინმემ არ გადაიხადა?",
      solution: "ბინების რეესტრი რეალურ დროში",
      practical: "ერთი შეხედვით ხედავ ვინ არის ვალში და რამდენი"
    },
    {
      problem: "ქვითრები იკარგება",
      solution: "ცენტრალიზებული არქივი",
      practical: "ყველა ქვითარი ერთ ადგილას, ძებნა წამებში"
    },
    {
      problem: "ინფორმაცია იკარგება თავმჯდომარის შეცვლისას",
      solution: "მუდმივი არქივი",
      practical: "ახალი თავმჯდომარე ერთ წუთში ხედავს მთელ ისტორიას"
    },
    {
      problem: "შეკრებები უშედეგოა",
      solution: "მზა ფინანსური ანგარიშები",
      practical: "შეკრებაზე მიდიხარ ციფრებით, არა ვარაუდებით"
    }
  ]

  const features = [
    {
      icon: IconBuilding,
      title: "კორპუსის რეესტრი",
      desc: "ბინები, მფლობელები, საკონტაქტო ინფორმაცია ერთ ადგილას",
      detail: "დაამატებ ბინებს — სისტემა ავტომატურად ააწყობს რეესტრს"
    },
    {
      icon: IconZap,
      title: "გადახდების მართვა",
      desc: "ავტომატურად ხედავ ვინ გადაიხადა, ვინ არა, რამდენი ვალია",
      detail: "პირველი გადახდის ჩანაწერი — 5 წუთში მზადია"
    },
    {
      icon: IconShield,
      title: "ქვითრების არქივი",
      desc: "ატვირთე ქვითარი, იპოვე წამებში, ვეღარასდროს დაკარგო",
      detail: "ყველა ქვითარი ციფრულად, ძიება წამებში"
    },
    {
      icon: IconUsers,
      title: "ფინანსური ანგარიშები",
      desc: "შემოსავალი, ხარჯი, ბალანსი — მზა, საჩვენებელი ფორმატში",
      detail: "შეკრებაზე მიდიხარ მზა ანგარიშით"
    }
  ]

  const faqs = [
    {
      q: "რა მოხდება პაკეტის არჩევის შემდეგ?",
      a: "მალევე მიიღებ თავმჯდომარის წვდომას და შეძლებ კორპუსის დამატებას."
    },
    {
      q: "ბარათი საჭიროა საცდელის დასაწყებად?",
      a: "არა. 14 დღე სრულად უფასოა, ბარათის გარეშე."
    },
    {
      q: "14 დღის შემდეგ რა ხდება?",
      a: "თუ პაკეტს არ გააგრძელებ, წვდომა შეიზღუდება, მონაცემები 30 დღე შენარჩუნდება."
    },
    {
      q: "შემიძლია გავაუქმო?",
      a: "დიახ, ნებისმიერ დროს."
    },
    {
      q: "თუ ჯერ ზუსტად არ ვიცი რამდენი ბინაა/ადმინისტრატორი მჭირდება?",
      a: "შეგიძლია ნებისმიერ დროს განაახლო."
    },
    {
      q: "სად ინახება ჩემი მონაცემები?",
      a: "დაცულ Supabase სერვერებზე, SSL დაშიფვრით."
    },
    {
      q: "თუ არ გავაგრძელებ, შემიძლია მონაცემების გატანა?",
      a: "დიახ, ნებისმიერ დროს შეგიძლია მონაცემების ექსპორტი."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-slate-950/90 border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconBuilding className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold text-white">EZO</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status Badge - Mobile Hidden */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium text-amber-300">პაკეტი არჩეული არ არის</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-white">{userName}</div>
                <div className="text-xs text-slate-400">{user?.email}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-400 hover:text-rose-400 transition-colors"
                title="გამოსვლა"
              >
                <IconLogOut className="w-5 h-5" />
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="#pricing"
              className="px-3 sm:px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              <span className="hidden sm:inline">აირჩიე პაკეტი</span>
              <span className="sm:hidden">პაკეტი</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ===== HERO SECTION — SPLIT LAYOUT ===== */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* LEFT: Text Content */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-300">კორპუსის მართვა ახალ დონეზე</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  თქვენს კორპუსში 47 ბინაა. 12-მა არ გადაიხადა კომუნალური.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    თქვენ არ იცით — ვის რა ვალი აქვს.
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                  EZO აგროვებს ყველა ბინის, გადახდისა და ქვითრის ინფორმაციას ერთ ადგილას — 
                  რომ თავმჯდომარემ იცოდეს ზუსტად რა ხდება, ყოველგვარი ქაოსის გარეშე.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="#pricing"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group text-base"
                  >
                    დაიწყე უფასოდ 14 დღით
                    <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-500">
                    ბარათი არ საჭიროა · გააუქმე ნებისმიერ დროს
                  </p>
                </div>
              </div>

              {/* RIGHT: Animated Dashboard */}
              <div className="order-1 lg:order-2">
                <AnimatedDashboard />
              </div>

            </div>
          </div>
        </section>

        {/* ===== PROBLEM SECTION ===== */}
        <section className="py-16 lg:py-20 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">ეს ნაცნობია?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                თუ თქვენ ხართ კორპუსის თავმჯდომარე ან წარმომადგენელი, ეს ალბათ ნაცნობია:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {problems.map((problem, i) => (
                <div key={i} className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-5 lg:p-6 hover:border-rose-500/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                      <IconX className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-bold text-white mb-2">{problem.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{problem.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SOLUTION SECTION ===== */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">EZO ამას ასე აგვარებს</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
                თითოეულ პრობლემას — კონკრეტული გადაწყვეტა
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {solutions.map((item, i) => (
                <div key={i} className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-5 lg:p-6 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <IconCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-1">პრობლემა: {item.problem}</div>
                      <h3 className="text-base lg:text-lg font-bold text-white mb-2">{item.solution}</h3>
                      <p className="text-emerald-400 text-sm font-medium">
                        პრაქტიკულად: {item.practical}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS SECTION ===== */}
        <section className="py-16 lg:py-20 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">რა ხდება პაკეტის არჩევის შემდეგ?</h2>
              <p className="text-slate-400 text-sm sm:text-base">3 მარტივი ნაბიჯი</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "აირჩიე პაკეტი",
                  desc: "14 დღით სრულად უფასოდ, ბარათის გარეშე."
                },
                {
                  step: "02",
                  title: "ავტომატურად ეხსნება წვდომა",
                  desc: "რამდენიმე წამში მიიღებ სრულ ფუნქციონალს — არანაირი ლოდინი."
                },
                {
                  step: "03",
                  title: "დაამატე კორპუსი",
                  desc: "შეიყვანე ბინები, მაცხოვრებლები — 5 წუთში მზად ხარ."
                }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400">{item.step}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">ყველაფერი, რაც გჭირდება</h2>
              <p className="text-slate-400 text-sm sm:text-base">ერთ სისტემაში:</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-5 lg:p-6 hover:border-emerald-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{feature.desc}</p>
                  <p className="text-emerald-400 text-xs font-medium">{feature.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TRUST SECTION ===== */}
        <section className="py-12 lg:py-16 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-4 sm:mb-6">
              <IconShield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-emerald-300">უსაფრთხო და დაცული</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              მონაცემები დაცულია SSL დაშიფვრით
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              ინახება უსაფრთხო Supabase სერვერებზე. შენი ფინანსური ინფორმაცია დაცულია.
            </p>
          </div>
        </section>

        {/* ===== PRICING SECTION ===== */}
        <section id="pricing" className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">აირჩიე პაკეტი</h2>
              <p className="text-slate-400 text-sm sm:text-base">გამჭვირვალე ფასები, დამატებითი ხარჯების გარეშე</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-emerald-500/50 transition-all">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">ბაზის პაკეტი</h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-white">₾50</span>
                    <span className="text-slate-400 text-sm">/ 30 დღე</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "კორპუსის რეესტრი (უსაზღვრო ბინა)",
                    "გადახდების მართვა",
                    "ქვითრების არქივი (10GB)",
                    "ფინანსური ანგარიშები",
                    "1 ადმინისტრატორი"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  {[
                    "ავტომატური შეხსენებები",
                    "მრავალადმინისტრატორიანი წვდომა"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-50">
                      <IconX className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-500 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/payment"
                  className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-semibold rounded-xl transition-colors"
                >
                  დაიწყე უფასო საცდელი
                </Link>
              </div>

              {/* Premium Plan */}
              <div className="bg-slate-800/50 border-2 border-emerald-500/50 rounded-2xl p-6 lg:p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  რეკომენდებული
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">პრემიუმ პაკეტი</h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-white">₾100</span>
                    <span className="text-slate-400 text-sm">/ 30 დღე</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "ყველაფერი ბაზისიდან",
                    "ავტომატური შეხსენებები",
                    "ულიმიტო არქივი",
                    "5 ადმინისტრატორი",
                    "პრიორიტეტული მხარდაჭერა"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/payment"
                  className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-semibold rounded-xl transition-colors"
                >
                  დაიწყე უფასო საცდელი
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-xs sm:text-sm text-slate-400">
                 14 დღე სრულად უფასო · ბარათი არ საჭიროა · გააუქმე ნებისმიერ დროს
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className="py-16 lg:py-20 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">ხშირად დასმული კითხვები</h2>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-white text-sm sm:text-base pr-4">{faq.q}</span>
                    <IconChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 sm:px-6 pb-4">
                      <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              მზად ხარ კორპუსის ეფექტური მართვისთვის?
            </h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">
              14 დღე სრულად უფასო — ბარათის გარეშე.
            </p>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all text-base sm:text-lg group"
            >
              დაიწყე უფასოდ
              <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 bg-slate-950 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} EZO Platform. ყველა უფლება დაცულია.
        </div>
      </footer>
    </div>
  )
}