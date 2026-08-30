'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconWallet = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

const IconWrench = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const IconChat = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconChart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
)

const IconPhone = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconMinus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconMenu = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconX = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconStar = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// ============ COMPONENTS ============

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <IconBuilding className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-slate-900">EZO</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">შესაძლებლობები</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">როგორ მუშაობს</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">ტარიფები</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">FAQ</a>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* შესწორებულია: ახლა ეს არის ლინკი /login-ზე */}
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors">
              შესვლა
            </Link>
            <Link href="/register" className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30">
              დაიწყე უფასოდ
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
            {isOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200/60">
            <div className="flex flex-col gap-1">
              <a href="#features" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">შესაძლებლობები</a>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">როგორ მუშაობს</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">ტარიფები</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">FAQ</a>
              <div className="pt-3 mt-2 border-t border-slate-200/60 flex flex-col gap-2">
                {/* შესწორებულია: აქაც ლინკია /login-ზე */}
                <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-left">
                  შესვლა
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="px-4 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg text-center">
                  დაიწყე უფასოდ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-700">ახალი თაობის პლატფორმა კორპუსებისთვის</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              კორპუსების მართვა
              <span className="block text-emerald-600">მარტივად და გამჭვირვალედ</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              EZO აერთიანებს ფინანსებს, კომუნიკაციას და მოვლას ერთ სივრცეში. 
              დაივიწყეთ ქაოსი — მიიღეთ სრული კონტროლი თქვენს კორპუსზე.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5">
                დაიწყე უფასოდ
                <IconArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 transition-all">
                როგორ მუშაობს
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">ნ</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">გ</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">ლ</div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => <IconStar key={i} className="w-3.5 h-3.5" />)}
                  </div>
                  <p className="text-xs text-slate-600">420+ კორპუსი გვენდობა</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <IconCheck className="w-4 h-4 text-emerald-600" />
                  <span>უფასო ტესტი</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconCheck className="w-4 h-4 text-emerald-600" />
                  <span>ბარათის გარეშე</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/60 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs text-slate-400 ml-2">ezo.ge/dashboard</span>
                </div>
                <div className="text-xs font-medium text-slate-500">ვაჟა-ფშაველას 42</div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200/50">
                  <div className="text-xs text-emerald-700 font-medium mb-1">ბალანსი</div>
                  <div className="text-lg lg:text-xl font-bold text-emerald-900">₾12,540</div>
                  <div className="text-xs text-emerald-600 mt-1">+12% ამ თვეში</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200/50">
                  <div className="text-xs text-blue-700 font-medium mb-1">შემოსავალი</div>
                  <div className="text-lg lg:text-xl font-bold text-blue-900">₾8,420</div>
                  <div className="text-xs text-blue-600 mt-1">96 ბინა</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 border border-amber-200/50">
                  <div className="text-xs text-amber-700 font-medium mb-1">ხარჯები</div>
                  <div className="text-lg lg:text-xl font-bold text-amber-900">₾3,240</div>
                  <div className="text-xs text-amber-600 mt-1">4 კატეგორია</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-slate-700">ფინანსური დინამიკა</div>
                  <div className="text-xs text-emerald-600 font-medium">+18.4%</div>
                </div>
                <div className="h-32 flex items-end gap-1.5">
                  {[40, 55, 45, 65, 50, 75, 60, 85, 70, 90, 80, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>იან</span><span>მარ</span><span>მაი</span><span>ივლ</span><span>სექ</span><span>ნოე</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-700 mb-2">ბოლო ტრანზაქციები</div>
                {[
                  { name: 'გიორგი ვაჩნაძე', apt: 'ბინა 14', amount: '₾180', status: 'success' },
                  { name: 'ნინო ქავთარაძე', apt: 'ბინა 22', amount: '₾180', status: 'success' },
                  { name: 'ლევან მაისურაძე', apt: 'ბინა 7', amount: '₾180', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-700">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.apt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{item.amount}</span>
                      <span className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl border border-slate-100 p-3 flex items-center gap-2.5 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <IconCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">გადახდა მიღებულია</div>
                <div className="text-xs text-emerald-600 font-medium">+ 240 ₾</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl border border-slate-100 p-3 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <IconWrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">3 ახალი მოთხოვნა</div>
                <div className="text-xs text-slate-500">მოლოდინში</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">რატომ EZO?</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            კორპუსის მართვა აღარასდროს იქნება ქაოსური
          </h2>
          <p className="text-lg text-slate-600">
            ჩვენ ვხედავთ პრობლემებს, რომლებიც ყოველდღიურად აწუხებს კორპუსებს — და ვქმნით მათთვის გამოსავალს.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-rose-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                <IconX className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">დღეს</h3>
            </div>
            <ul className="space-y-4">
              {[
                'ფინანსური ჩანაწერები Excel-ში ან ქაღალდზე',
                'გადასახადების შეგროვება ხელით',
                'მნიშვნელოვანი ინფორმაცია იკარგება ჩატებში',
                'შეკეთებების მოთხოვნები პასუხის გარეშე',
                'მაცხოვრებლები არ იციან სად იხარჯება ფული',
                'ანგარიშების მომზადება საათებს მოითხოვს'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  </div>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-emerald-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <IconCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">EZO-სთან ერთად</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'ავტომატური ფინანსური ანგარიშები რეალურ დროში',
                  'ონლაინ გადახდები და ავტომატური შეხსენებები',
                  'ცენტრალიზებული შეტყობინებები და განცხადებები',
                  'შეკეთებების სრული თრექინგი სტატუსებით',
                  'სრული გამჭვირვალობა ყველა ხარჯზე',
                  'ერთი დაწკაპუნებით ანგარიშების გენერირება'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: IconWallet,
      title: 'ფინანსური მართვა',
      description: 'სრული კონტროლი შენატანებზე, ხარჯებსა და ბიუჯეტზე. ავტომატური გადახდები, ქვითრები და ყოველთვიური ანგარიშები.',
      color: 'emerald',
      details: ['ავტომატური ინვოისები', 'ხარჯების კატეგორიზაცია', 'ბიუჯეტის დაგეგმვა', 'გადახდის ისტორია']
    },
    {
      icon: IconWrench,
      title: 'მოვლა და შეკეთებები',
      description: 'დაარეგისტრირე პრობლემა, მიანიჭე პრიორიტეტი და აკონტროლე მისი მოგვარება დასაწყისიდან დასასრულამდე.',
      color: 'blue',
      details: ['ფოტო ატვირთვა', 'სტატუსის თრექინგი', 'კონტრაქტორების მართვა', 'ისტორიის ლოგი']
    },
    {
      icon: IconChat,
      title: 'კომუნიკაციის ჰაბი',
      description: 'პირდაპირი არხი მეზობლებთან და შენობის მენეჯმენტთან. განცხადებები, გამოკითხვები და საგანგებო შეტყობინებები.',
      color: 'purple',
      details: ['განცხადებების დაფა', 'პირდაპირი მესიჯები', 'გამოკითხვები', 'SMS და Email']
    },
    {
      icon: IconShield,
      title: 'უსაფრთხოება და კონფიდენციალურობა',
      description: 'შენი მონაცემები დაცულია თანამედროვე დაშიფვრის სტანდარტებით. როლზე დაფუძნებული წვდომა და აუდიტის ლოგი.',
      color: 'amber',
      details: ['SSL დაშიფვრა', 'როლური წვდომა', 'აუდიტის ლოგი', 'GDPR შესაბამისობა']
    },
    {
      icon: IconChart,
      title: 'ანალიტიკა და ანგარიშები',
      description: 'დეტალური ანგარიშები, სტატისტიკა და ხარჯების ვიზუალიზაცია. მიიღე ინსაითები და მიიღე სწორი გადაწყვეტილებები.',
      color: 'rose',
      details: ['ფინანსური დაფები', 'ტრენდების ანალიზი', 'ექსპორტი PDF/Excel', 'შედარებითი ანალიზი']
    },
    {
      icon: IconPhone,
      title: 'მობილური აპლიკაცია',
      description: 'EZO ხელმისაწვდომია ნებისმიერი მოწყობილობიდან, ნებისმიერ დროს. Push შეტყობინებები და მობილური გადახდები.',
      color: 'teal',
      details: ['iOS და Android', 'Push შეტყობინებები', 'მობილური გადახდა', 'QR ვიზიტორებისთვის']
    }
  ]

  const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-cyan-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-pink-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', gradient: 'from-amber-500 to-orange-600' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', gradient: 'from-rose-500 to-pink-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', gradient: 'from-teal-500 to-cyan-600' }
  }

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">შესაძლებლობები</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            ყველაფერი, რაც კორპუსს სჭირდება
          </h2>
          <p className="text-lg text-slate-600">
            ერთი პლატფორმა ყოველდღიური ოპერაციებისთვის — ფინანსებიდან კომუნიკაციამდე.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color]
            const Icon = feature.icon
            return (
              <div key={i} className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-200/60 hover:border-slate-300 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-5">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <IconCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'დაარეგისტრირე კორპუსი',
      description: 'შექმენი შენი შენობის პროფილი რამდენიმე მარტივი ნაბიჯით. დაამატე მისამართი, ბინების რაოდენობა და საერთო სივრცეები.',
      icon: IconBuilding
    },
    {
      number: '02',
      title: 'მოიწვიე მაცხოვრებლები',
      description: 'გაუგზავნე მეზობლებს მოწვევა ელფოსტით ან SMS-ით. შექმენი ციფრული საზოგადოება წუთებში.',
      icon: IconChat
    },
    {
      number: '03',
      title: 'მართე მარტივად',
      description: 'ფინანსები, პრობლემები და კომუნიკაცია ერთ სივრცეში. მიიღე სრული კონტროლი და გამჭვირვალობა.',
      icon: IconChart
    }
  ]

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">მარტივი დასაწყისი</div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            როგორ მუშაობს EZO?
          </h2>
          <p className="text-lg text-slate-300">
            ციფრულ მართვაზე გადასვლა რამდენიმე წუთში შეგიძლია.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-emerald-500/30 transition-all hover:bg-white/10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-400">{step.number}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    {
      name: 'ნინო კავთარაძე',
      role: 'კორპუსის ადმინისტრატორი',
      building: 'ვაჟა-ფშაველას 42',
      content: 'EZO-ს გამოყენების შემდეგ მაცხოვრებლებს აღარ სჭირდებათ სხვადასხვა ჩატში ინფორმაციის ძებნა. ყველაფერი ერთ ადგილას გვაქვს — გადახდები, ხარჯები და განცხადებები. დროის 70% დავზოგეთ.',
      rating: 5
    },
    {
      name: 'გიორგი ბერიძე',
      role: 'მაცხოვრებელი',
      building: 'საბურთალო, ქუჩა 15',
      content: 'ბოლოს და ბოლოს გავიგე სად იხარჯება ჩვენი ყოველთვიური შენატანი. გამჭვირვალობა არის ყველაზე დიდი ღირებულება. აპლიკაცია ძალიან მარტივი და ინტუიციურია.',
      rating: 5
    },
    {
      name: 'ლევან მაისურაძე',
      role: 'ქონების მმართველი',
      building: '5 კორპუსი',
      content: '5 კორპუსს ვმართავ EZO-ს საშუალებით. ყველაფერი ერთი დაფიდან. ანგარიშები ავტომატურად გენერირდება და მაცხოვრებლები უკმაყოფილოები არიან სერვისით.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">რას ამბობენ მომხმარებლები</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            420+ კორპუსი უკვე გვენდობა
          </h2>
          <p className="text-lg text-slate-600">
            ნახე რას ფიქრობენ ჩვენს პლატფორმაზე ადმინისტრატორები და მაცხოვრებლები.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200/60 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <IconStar key={j} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                  <div className="text-xs text-emerald-600">{testimonial.building}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'სტარტერი',
      description: 'მცირე კორპუსებისთვის',
      price: '0',
      period: 'სამუდამოდ უფასო',
      features: [
        '10 ბინამდე',
        'ფინანსური თრექინგი',
        'განცხადებების დაფა',
        'შეკეთებების მოთხოვნები',
        'Email მხარდაჭერა'
      ],
      cta: 'დაიწყე უფასოდ',
      popular: false
    },
    {
      name: 'პროფესიონალი',
      description: 'საშუალო და დიდი კორპუსებისთვის',
      price: '49',
      period: 'თვეში',
      features: [
        '100 ბინამდე',
        'ყველა სტარტერის ფუნქცია',
        'ავტომატური გადახდები',
        'SMS შეტყობინებები',
        'ანალიტიკა და ანგარიშები',
        'მობილური აპლიკაცია',
        'პრიორიტეტული მხარდაჭერა'
      ],
      cta: '14 დღიანი უფასო ტესტი',
      popular: true
    },
    {
      name: 'საწარმო',
      description: 'მრავალკორპუსიანი მმართველებისთვის',
      price: '149',
      period: 'თვეში',
      features: [
        'უსაზღვრო ბინები',
        'ყველა პროფესიონალის ფუნქცია',
        'მრავალკორპუსიანი მართვა',
        'API წვდომა',
        'თეთრი ეტიკეტი',
        'პერსონალური მენეჯერი',
        'SLA გარანტია'
      ],
      cta: 'დაგვიკავშირდი',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">ტარიფები</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            მარტივი და გამჭვირვალე ფასები
          </h2>
          <p className="text-lg text-slate-600">
            აირჩიე შენს კორპუსზე მორგებული გეგმა. ყოველთვის შეგიძლია განახლება ან გაუქმება.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl p-6 lg:p-8 ${plan.popular ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl shadow-emerald-600/30 scale-105' : 'bg-white border border-slate-200/60'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-400 text-slate-900 text-xs font-bold rounded-full">
                  ყველაზე პოპულარული
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-emerald-100' : 'text-slate-600'}`}>{plan.description}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>₾{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-emerald-100' : 'text-slate-500'}`}>/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <IconCheck className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-emerald-200' : 'text-emerald-600'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-emerald-50' : 'text-slate-700'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? 'bg-white text-emerald-700 hover:bg-emerald-50' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            გაქვს კითხვები? <a href="#contact" className="text-emerald-600 font-semibold hover:underline">დაგვიკავშირდი</a> პერსონალური შეთავაზებისთვის.
          </p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'რამდენი ხანი სჭირდება რეგისტრაციას?',
      answer: 'კორპუსის რეგისტრაცია სულ რამდენიმე წუთს იღებს. შეავსე მარტივი ფორმა, დაამატე ბინები და მოიწვიე მაცხოვრებლები. პირველი ანგარიში შეგიძლია იმავე დღეს ნახო.'
    },
    {
      question: 'არის თუ არა EZO უსაფრთხო?',
      answer: 'დიახ. ჩვენ ვიყენებთ საბანკო დონის SSL დაშიფვრას, როლურ წვდომას და რეგულარულ ბექაფებს. თქვენი მონაცემები დაცულია და არასდროს გაზიარდება მესამე პირებთან.'
    },
    {
      question: 'შემიძლია გაუქმება ნებისმიერ დროს?',
      answer: 'რა თქმა უნდა. არ არსებობს გრძელვადიანი კონტრაქტი. შეგიძლია გააუქმო გამოწერა ნებისმიერ დროს და შენი მონაცემები ექსპორტზე გაიტანო ნებისმიერ ფორმატში.'
    },
    {
      question: 'როგორ მუშაობს გადახდები?',
      answer: 'EZO ინტეგრირებულია ქართულ ბანკებთან (TBC, Bank of Georgia). მაცხოვრებლებს შეუძლიათ გადაიხადონ ბარათით, ბანკის გადარიცხვით ან მობილური ბანკინგით. ყველა ტრანზაქცია ავტომატურად ირიცხება სისტემაში.'
    },
    {
      question: 'არის თუ არა მობილური აპლიკაცია?',
      answer: 'დიახ, EZO ხელმისაწვდომია iOS და Android-ზე. მობილური აპლიკაციით შეგიძლია გადაიხადო, ნახო განცხადებები, შეიტანო შეკეთების მოთხოვნა და მიიღო push შეტყობინებები.'
    },
    {
      question: 'რა ხდება ჩემს მონაცემებთან?',
      answer: 'თქვენი მონაცემები ინახება დაცულ ღრუბლოვან სერვერებზე საქართველოში. ჩვენ ვიცავთ GDPR სტანდარტებს და გვაქვს მკაცრი კონფიდენციალურობის პოლიტიკა.'
    }
  ]

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">FAQ</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            ხშირად დასმული კითხვები
          </h2>
          <p className="text-lg text-slate-600">
            ვერ პოულობ პასუხს? <a href="#contact" className="text-emerald-600 font-semibold hover:underline">დაგვიკავშირდი</a>
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 lg:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  {openIndex === i ? <IconMinus className="w-4 h-4 text-emerald-600" /> : <IconPlus className="w-4 h-4 text-emerald-600" />}
                </div>
              </button>
              {openIndex === i && (
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-8 lg:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              მზად ხარ კორპუსის მართვა გაამარტივო?
            </h2>
            <p className="text-lg lg:text-xl text-emerald-50 mb-8 leading-relaxed">
              შეუერთდი 420+ კორპუსს, რომლებიც უკვე იყენებენ EZO-ს ყოველდღიური მართვისთვის. დაიწყე უფასოდ დღესვე.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                დაიწყე უფასოდ
                <IconArrowRight className="w-4 h-4" />
              </Link>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                დემოს დაჯავშნა
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4" />
                <span>უფასო 14-დღიანი ტესტი</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4" />
                <span>ბარათის გარეშე</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck className="w-4 h-4" />
                <span>გაუქმება ნებისმიერ დროს</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <IconBuilding className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EZO</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              ციფრული პლატფორმა თანამედროვე საცხოვრებელი კორპუსების გამჭვირვალე და მარტივი მართვისთვის.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-xs font-bold">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">პლატფორმა</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">შესაძლებლობები</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">ტარიფები</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">როგორ მუშაობს</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">მობილური აპი</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">კომპანია</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ჩვენ შესახებ</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">ბლოგი</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">კარიერა</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">კონტაქტი</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">იურიდიული</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">კონფიდენციალურობა</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">წესები და პირობები</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie პოლიტიკა</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 EZO. ყველა უფლება დაცულია.</p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>🇬🇪 დამზადებულია საქართველოში</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============ MAIN PAGE ============
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}