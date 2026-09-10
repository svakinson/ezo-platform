'use client'

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { PLANS } from '@/lib/plans'

// ============================================================
// BINO — Premium SaaS Landing Page
// ============================================================

const Icon = ({
  name,
  className = 'w-5 h-5',
}: {
  name: string
  className?: string
}) => {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  const paths: Record<string, ReactNode> = {
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
      </>
    ),
    wallet: (
      <>
        <path d="M21 12V7H5a2 2 0 1 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    chat: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 5-6" />
      </>
    ),
    phone: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    star: (
      <path
        fill="currentColor"
        stroke="none"
        d="m12 2 3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77l-6.18 3.23L7 14.13 2 9.26l6.91-1L12 2Z"
      />
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    zap: (
      <path
        fill="currentColor"
        stroke="none"
        d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"
      />
    ),
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
    lift: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
      </>
    ),
  }

  return <svg {...common}>{paths[name]}</svg>
}

function GlowOrb({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className}`}
    />
  )
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[13px] bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-500 shadow-[0_8px_30px_rgba(45,212,191,.25)]">
        <span className="absolute inset-[1px] rounded-[12px] bg-[#07120f]" />
        <Icon
          name="building"
          className="relative z-10 h-5 w-5 text-emerald-300 transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="leading-none">
        <span className={`block text-[20px] font-black tracking-[-.04em] ${dark ? 'text-white' : 'text-slate-950'}`}>
          Bino
        </span>
        <span className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-[.18em] ${dark ? 'text-white/45' : 'text-slate-400'}`}>
          ბინო
        </span>
      </span>
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    ['#features', 'შესაძლებლობები'],
    ['#how-it-works', 'როგორ მუშაობს'],
    ['#pricing', 'ტარიფები'],
    ['#faq', 'FAQ'],
  ]

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8 ${scrolled ? 'rounded-2xl border border-slate-200/60 bg-white/75 shadow-[0_16px_60px_rgba(15,23,42,.08)] backdrop-blur-2xl' : ''}`}>
        <div className="flex h-14 items-center justify-between">
          <Logo dark={!scrolled} />
          <div className="hidden items-center gap-8 lg:flex">
            {links.map(([href, label]) => (
              <a key={href} href={href} className={`text-sm font-semibold transition-colors ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-white/65 hover:text-white'}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/login" className={`px-4 py-2.5 text-sm font-bold transition-colors ${scrolled ? 'text-slate-700' : 'text-white/80'} hover:text-emerald-500`}>
              შესვლა
            </Link>
            <Link href="/register" className="group relative overflow-hidden rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-[#06110e] shadow-[0_8px_30px_rgba(52,211,153,.22)] transition-all hover:-translate-y-0.5 hover:bg-emerald-300">
              <span className="relative z-10">დაიწყე უფასოდ</span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>
          <button onClick={() => setOpen((v) => !v)} className={`rounded-xl p-2 lg:hidden ${scrolled ? 'text-slate-800' : 'text-white'}`} aria-label="მენიუ">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
        {open && (
          <div className="border-t border-slate-200/60 py-3 pb-4 lg:hidden">
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl py-3 text-center text-sm font-bold text-slate-700">შესვლა</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="rounded-xl bg-emerald-500 py-3 text-center text-sm font-bold text-white">დაიწყე უფასოდ</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function DashboardMockup() {
  const [activeNotification, setActiveNotification] = useState(0)
  
  const notifications = [
    { icon: 'check', title: 'გადახდა მიღებულია', subtitle: '+ ₾240 · ბინა 14', color: 'bg-emerald-500/20 text-emerald-300' },
    { icon: 'alert', title: 'დავალიანება', subtitle: '₾220 · ბინა 17', color: 'bg-rose-500/20 text-rose-300' },
    { icon: 'lift', title: 'ლიფტის მომსახურება', subtitle: '₾750 · ხარჯი', color: 'bg-blue-500/20 text-blue-300' },
    { icon: 'users', title: 'კონსიერჟის მომსახურება', subtitle: '₾1,000 · ამ თვეში', color: 'bg-purple-500/20 text-purple-300' },
    { icon: 'bell', title: 'ახალი შეტყობინება', subtitle: 'წყალი გაითიშება 14:00', color: 'bg-amber-500/20 text-amber-300' },
    { icon: 'wallet', title: 'ბიუჯეტი განახლდა', subtitle: '+ ₾5,420 · იანვარი', color: 'bg-cyan-500/20 text-cyan-300' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotification((prev) => (prev + 1) % notifications.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[650px] [perspective:1600px]">
      <div className="absolute -inset-10 rounded-[50%] bg-emerald-400/15 blur-[90px]" />
      <div className="relative rotate-[1.5deg] rounded-[26px] border border-white/15 bg-white/[.07] p-2 shadow-[0_40px_120px_rgba(0,0,0,.5)] backdrop-blur-xl transition-transform duration-700 hover:rotate-0">
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#f7faf9]">
          <div className="flex h-11 items-center gap-2 border-b border-slate-200 bg-white px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="ml-5 h-5 w-44 rounded-md bg-slate-100" />
            <div className="ml-auto h-7 w-7 rounded-full bg-emerald-100" />
          </div>
          <div className="grid min-h-[330px] grid-cols-[112px_1fr]">
            <aside className="hidden border-r border-slate-200 bg-[#f2f7f5] p-3 sm:block">
              <div className="mb-7 h-7 w-20 rounded bg-emerald-100" />
              {[['chart', 'დაფა'], ['wallet', 'ფინანსები'], ['wrench', 'შეკეთებები'], ['chat', 'კომუნიკაცია']].map(([i, t], n) => (
                <div key={t} className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[8px] font-bold ${n === 0 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400'}`}>
                  <Icon name={i as string} className="h-3 w-3" />
                  {t}
                </div>
              ))}
            </aside>
            <div className="p-4 sm:p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-bold text-slate-400">კორპუსის დაფა</p>
                  <h3 className="mt-1 text-lg font-black text-slate-900">ვაჟა-ფშაველას 42</h3>
                </div>
                <div className="rounded-lg bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-700">LIVE</div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[['შემოსავალი', '₾ 12,480', '+8.4%'], ['ხარჯები', '₾ 7,230', '-3.2%'], ['დავალიანება', '₾ 1,180', '12 ბინა']].map(([a, b, c], i) => (
                  <div key={a} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="text-[7px] font-bold text-slate-400">{a}</p>
                    <p className="mt-1 text-sm font-black text-slate-900">{b}</p>
                    <p className={`mt-1 text-[7px] font-bold ${i === 2 ? 'text-rose-500' : 'text-emerald-600'}`}>{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {notifications.map((notif, index) => {
        const isActive = index === activeNotification
        const IconComponent = Icon
        return (
          <div
            key={index}
            className={`absolute right-[-20px] top-24 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#101b18]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex transition-all duration-500 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <span className={`grid h-9 w-9 place-items-center rounded-xl ${notif.color}`}>
              <IconComponent name={notif.icon as string} className="w-4 h-4" />
            </span>
            <span>
              <b className="block text-xs text-white">{notif.title}</b>
              <small className="text-[10px] font-bold text-slate-300">{notif.subtitle}</small>
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06100d] pt-28 text-white">
      <GlowOrb className="-left-40 top-40 h-96 w-96 bg-emerald-400" />
      <GlowOrb className="right-0 top-20 h-[520px] w-[520px] bg-cyan-400" />
      <GlowOrb className="bottom-0 left-1/3 h-80 w-80 bg-violet-500" />
      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-300/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pt-20">
          <div className="max-w-2xl">
            {/* ⃝ ორი წარწერა ცალ-ცალკე ხაზზე, იდეალური დაშორებით */}
            <h1 className="mb-8">
              <div className="flex flex-col gap-5">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-.055em] text-white">
                  შენი კორპუსი.
                </span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-[-.055em] bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  სრული კონტროლი.
                </span>
              </div>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
              დარიცხვები, ხარჯები, შეკეთებები და გადაწყვეტილებები — ერთ ლამაზ, გამჭვირვალე სივრცეში. ნაკლები ქაოსი. მეტი სიმშვიდე.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-[#06110e] shadow-[0_15px_50px_rgba(52,211,153,.2)] transition-all hover:-translate-y-1 hover:bg-emerald-300">
                დაიწყე უფასოდ
                <span className="transition-transform group-hover:translate-x-1"><Icon name="arrow" className="h-4 w-4" /></span>
              </Link>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[.04] px-6 py-4 text-sm font-bold text-white/80 backdrop-blur-xl transition-all hover:bg-white/[.08] hover:text-white">
                ნახე შესაძლებლობები
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-white/40">
              <span className="flex items-center gap-2"><Icon name="check" className="h-3.5 w-3.5 text-emerald-300" /> 14-დღიანი ტესტი</span>
              <span className="flex items-center gap-2"><Icon name="check" className="h-3.5 w-3.5 text-emerald-300" /> ბარათის გარეშე</span>
              <span className="flex items-center gap-2"><Icon name="check" className="h-3.5 w-3.5 text-emerald-300" /> გაუქმება ნებისმიერ დროს</span>
            </div>
          </div>
          <DashboardMockup />
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-8">
          <a href="#features" className="flex flex-col items-center gap-2 group">
            <span className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1.5 group-hover:border-emerald-400/50 transition-colors">
              <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8f7] py-16 lg:py-24">
      <GlowOrb className="-right-32 top-0 h-80 w-80 bg-emerald-200" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-600">რატომ Bino?</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-.045em] text-slate-950">
              კორპუსის მართვა <br /><span className="text-slate-400">არ უნდა იყოს ქაოსი.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base leading-7 text-slate-500">
            Bino ცვლის დაუსრულებელ ჩატებს, Excel-ის ცხრილებს და გაურკვეველ ხარჯებს ერთ თანამედროვე სისტემად.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-50 text-rose-500"><Icon name="x" /></span>
                <b className="text-base text-slate-900">დღეს</b>
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-black text-rose-500">ქაოსი</span>
            </div>
            <ul className="space-y-3">
              {['ფინანსები Excel-ში ან ქაღალდზე', 'გადასახადების შეგროვება ხელით', 'ინფორმაცია იკარგება ჩატებში', 'შეკეთების მოთხოვნები იკარგება'].map((t) => (
                <li key={t} className="flex gap-3 text-sm font-medium text-slate-500">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-[#07140f] p-6 text-white shadow-[0_30px_80px_rgba(6,20,15,.16)]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300"><Icon name="check" /></span>
                <b className="text-base">Bino-სთან ერთად</b>
              </div>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-300/8 px-3 py-1 text-[10px] font-black text-emerald-300">კონტროლი</span>
            </div>
            <ul className="relative space-y-3">
              {['ფინანსური სურათი რეალურ დროში', 'ონლაინ გადახდები და შეხსენებები', 'ცენტრალიზებული განცხადებები', 'შეკეთებების სრული თრექინგი'].map((t) => (
                <li key={t} className="flex gap-3 text-sm font-semibold text-white/70">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><Icon name="check" className="h-3 w-3" /></span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ⃝ Features - ბარათები ერთმანეთზე დაწყობილი (stacked)
const features = [
  ['wallet', 'ფინანსური მართვა', 'სრული კონტროლი ბიუჯეტზე.', 'ავტომატური ინვოისები|ხარჯების კატეგორიზაცია|ბიუჯეტის დაგეგმვა|გადახდის ისტორია', 'emerald'],
  ['wrench', 'მოვლა და შეკეთებები', 'აკონტროლე პრობლემები თავიდან ბოლომდე.', 'ფოტო ატვირთვა|სტატუსის თრექინგი|კონტრაქტორები|ისტორიის ლოგი', 'blue'],
  ['chat', 'კომუნიკაციის აბი', 'ერთი არხი მეზობლებთან და განცხადებებთან.', 'განცხადებების დაფა|პირდაპირი მესიჯები|გამოკითხვები|SMS და Email', 'violet'],
  ['shield', 'უსაფრთხოება', 'როლებზე დაფუძნებული წვდომა და აუდიტი.', 'SSL დაშიფვრა|როლური წვდომა|აუდიტის ლოგი|GDPR', 'amber'],
  ['chart', 'ანალიტიკა', 'გაანალიზე ფინანსები ვიზუალური დაფებით.', 'ფინანსური დაფები|ტრენდების ანალიზი|PDF/Excel|შედარებითი ანალიზი', 'rose'],
  ['phone', 'მობილური აპი', 'ყველაფერი ჯიბეში ნებისმიერ დროს.', 'iOS და Android|Push შეტყობინებები|მობილური გადახდა|QR ვიზიტორებისთვის', 'cyan'],
]

const cardColors: Record<string, { bg: string; text: string; border: string; grad: string }> = {
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', grad: 'from-slate-900 to-emerald-950' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', grad: 'from-slate-900 to-blue-950' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', grad: 'from-slate-900 to-violet-950' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', grad: 'from-slate-900 to-amber-950' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', grad: 'from-slate-900 to-rose-950' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', grad: 'from-slate-900 to-cyan-950' },
}

function Features() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section id="features" className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-600">შესაძლებლობები</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em] text-slate-950">
            ერთი პლატფორმა. <span className="text-slate-400">ყველაფერი, რაც კორპუსს სჭირდება.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-7 text-slate-500">
            მძლავრი ინსტრუმენტები, რომლებიც რთულ ადმინისტრირებას მარტივ ყოველდღიურ პროცესად აქცევს.
          </p>
        </div>

        {/* ⃝ ბარათები ერთმანეთზე დაწყობილი - ყოველი მომდევნო ზემოდან ედება წინას */}
        <div className="hidden md:block relative h-[480px] max-w-4xl mx-auto">
          {features.map((feature, i) => {
            const [icon, title, desc, details, colorKey] = feature
            const colors = cardColors[colorKey as keyof typeof cardColors]
            const isActive = activeCard === i
            
            // ყოველი ბარათი ცენტრშია, დნავ გადაწეული მარცხნივ
            // ბოლო ბარათი ყველაზე წინ (z-index)
            const offset = (features.length - 1 - i) * 50
            
            return (
              <div
                key={i}
                className="absolute left-1/2 transition-all duration-500 ease-out"
                style={{
                  width: '320px',
                  height: '420px',
                  transform: `translateX(calc(-50% - ${offset}px))`,
                  zIndex: i,
                }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div 
                  className="relative w-full h-full [perspective:1000px] cursor-pointer"
                  style={{
                    transform: isActive ? 'translateY(-40px) scale(1.05)' : 'translateY(0) scale(1)',
                    transition: 'transform 0.5s ease-out',
                    zIndex: isActive ? 100 : i,
                  }}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isActive ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Front of Card */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                      <div className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 ${colors.text}`}>
                        <Icon name={icon as string} className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                      <p className="text-sm text-slate-400 mb-6">{desc}</p>
                      <div className="text-[11px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        გადაატრიალე <Icon name="arrow" className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${colors.grad} border ${colors.border} rounded-3xl p-8 flex flex-col justify-center shadow-2xl`}>
                      <h3 className={`text-xl font-bold ${colors.text} mb-6 text-center`}>{title}</h3>
                      <ul className="space-y-3">
                        {details.split('|').map((d, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                            <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                              <Icon name="check" className={`w-3 h-3 ${colors.text}`} />
                            </div>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* მობილურზე - ვერტიკალური სია */}
        <div className="md:hidden grid gap-4">
          {features.map((feature, i) => {
            const [icon, title, desc, details, colorKey] = feature
            const colors = cardColors[colorKey as keyof typeof cardColors]
            return (
              <div key={i} className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3 ${colors.text}`}>
                  <Icon name={icon as string} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-400 mb-3">{desc}</p>
                <div className="space-y-2">
                  {details.split('|').map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Icon name="check" className={`w-3 h-3 ${colors.text}`} />
                      {d}
                    </div>
                  ))}
                </div>
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
    ['01', 'დაარეგისტრირე კორპუსი', 'შექმენი შენობის პროფილი რამდენიმე მარტივი ნაბიჯით.', 'building'],
    ['02', 'მოიწვიე მაცხოვრებლები', 'გაუგზავნე მოწვევა ელფოსტით ან SMS-ით.', 'users'],
    ['03', 'მართე მარტივად', 'ფინანსები, პრობლემები და კომუნიკაცია ერთ სივრცეში.', 'chart'],
  ]

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#06100d] py-16 text-white lg:py-24">
      <GlowOrb className="left-1/3 top-1/3 h-96 w-96 bg-emerald-500" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-300">მარტივი დასაწყისი</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em]">ქაოსიდან <span className="text-emerald-300">კონტროლამდე.</span></h2>
        </div>
        <div className="relative mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map(([n, t, d, ic], i) => (
            <div key={n} className="group relative rounded-[28px] border border-white/10 bg-white/[.045] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[.07]">
              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-500 text-[#06100d] shadow-lg">
                  <Icon name={ic as string} />
                </span>
                <span className="text-4xl font-black tracking-[-.08em] text-white/[.08]">{n}</span>
              </div>
              <h3 className="text-lg font-black">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    ['ნინო კავთარაძე', 'ადმინისტრატორი', 'Bino-ს გამოყენების შემდეგ მაცხოვრებლებს აღარ სჭირდებათ სხვადასხვა ჩატში ინფორმაციის ძებნა. ყველაფერი ერთ ადგილას გვაქვს.', 'ნ'],
    ['გიორგი ბერიძე', 'მაცხოვრებელი', 'ბოლოს და ბოლოს გავიგე სად იხარჯება ჩვენი ყოველთვიური შენატანი. გამჭვირვალობა ყველაზე დიდი ღირებულებაა.', 'გ'],
    ['ლევან მაისურაძე', 'მმართველი', 'რამდენიმე კორპუსს ვმართავ Bino-ს საშუალებით. ყველაფერი ერთი დაფიდან და ანგარიშები ავტომატურად გენერირდება.', 'ლ'],
  ]

  return (
    <section className="bg-[#f5f8f7] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-10">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-600">რას ამბობენ მომხმარებლები</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em] text-slate-950">ნდობა, რომელიც <br /><span className="text-slate-400">ყოველდღე იზრდება.</span></h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex text-amber-400">★★★★★</span>
            <span className="text-xs font-black text-slate-600">4.9/5</span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map(([name, role, text, initial], i) => (
            <div key={i} className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex gap-1 text-amber-400">★★★★★</div>
              <p className="text-sm font-semibold leading-7 text-slate-700">"{text}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-black text-white">{initial}</div>
                <div>
                  <p className="text-sm font-black text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400">{role}</p>
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-600">ტარიფები</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em] text-slate-950">მარტივი ფასი. <br /><span className="text-slate-400">რეალური ღირებულება.</span></h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">აირჩიე შენს კორპუსზე მორგებული გეგმა ყოველგვარი დამალული ხარჯების გარეშე.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => {
            const isPro = plan.popular
            const price = billingCycle === 'yearly' ? Math.round(plan.price * 0.83) : plan.price

            return (
              <div key={plan.id} className={`relative flex flex-col rounded-[28px] p-6 ${isPro ? 'bg-[#07140f] text-white shadow-[0_30px_90px_rgba(6,20,15,.18)] ring-1 ring-emerald-400/30 lg:-translate-y-3' : 'border border-slate-200 bg-white text-slate-950 shadow-sm'}`}>
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                    <Icon name="star" className="w-3 h-3" />
                    რეკომენდებული
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black">{plan.nameGe}</h3>
                  <p className={`mt-2 text-sm ${isPro ? 'text-white/45' : 'text-slate-400'}`}>{plan.description}</p>
                </div>
                <div className="mb-6 flex items-end gap-1 border-b border-dashed border-current/10 pb-6">
                  <span className="text-4xl font-black tracking-[-.06em]">₾{price}</span>
                  <span className={`pb-1 text-sm ${isPro ? 'text-white/35' : 'text-slate-400'}`}>/თვე</span>
                </div>
                <ul className="mb-6 flex-1 space-y-2.5">
                  {plan.features.slice(0, 8).map((feature, i) => (
                    <li key={i} className={`flex gap-2.5 text-sm ${isPro ? 'text-white/65' : 'text-slate-600'}`}>
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/12 text-emerald-500">
                        {feature.included ? (
                          <Icon name="check" className="h-3 w-3" />
                        ) : (
                          <Icon name="x" className="h-3 w-3 text-slate-500" />
                        )}
                      </span>
                      <span className={!feature.included ? 'line-through opacity-60' : ''}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`rounded-2xl py-3 text-center text-sm font-black transition-all hover:-translate-y-0.5 ${isPro ? 'bg-emerald-400 text-[#06110e] hover:bg-emerald-300' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  არჩევა
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  const faqs = [
    ['რამდენი ხანი სჭირდება რეგისტრაციას?', 'კორპუსის რეგისტრაცია რამდენიმე წუთს იღებს. შეავსე მარტივი ფორმა და დაამატე ბინები.'],
    ['არის თუ არა Bino უსაფრთხო?', 'დიახ. პლატფორმა იყენებს დაშიფვრას, როლურ წვდომას და რეგულარულ ბექაფებს.'],
    ['შემიძლია გაუქმება ნებისმიერ დროს?', 'რა თქმა უნდა. არ არსებობს გრძელვადიანი კონტრაქტი.'],
    ['როგორ მუშაობს გადახდები?', 'მაცხოვრებლებს შეუძლიათ გადაიხადონ ბარათით ან ბანკის გადარიცხვით, ტრანზაქციები ავტომატურად აისახება.'],
  ]

  return (
    <section id="faq" className="bg-[#f5f8f7] py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-600">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em] text-slate-950">ხშირად დასმული <br /><span className="text-slate-400">კითხვები.</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <div key={q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left">
                <span className="font-black text-slate-900 text-sm sm:text-base">{q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-100 text-emerald-600 transition-transform ${open === i ? 'rotate-180' : ''}`}>
                  <Icon name={open === i ? 'minus' : 'plus'} className="h-4 w-4" />
                </span>
              </button>
              {open === i && <div className="px-5 pb-5 text-sm leading-7 text-slate-500">{a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[34px] bg-[#07140f] p-8 text-white shadow-[0_30px_100px_rgba(6,20,15,.15)] sm:p-12">
          <GlowOrb className="-right-20 -top-20 h-80 w-80 bg-emerald-400" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-emerald-300">დაგვიკავშირდით</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-.05em]">გინდა ნახო, როგორ იმუშავებს Bino შენს კორპუსში?</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">მოგვწერე ან დაგვირეკე — ჩვენი გუნდი დაგეხმარება პლატფორმის შერჩევასა და დაწყებაში.</p>
            </div>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@bino.ge" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4 font-bold text-white/75 transition hover:bg-white/[.09] hover:text-white">
                <Icon name="chat" className="text-emerald-300" /> info@bino.ge
              </a>
              <a href="tel:+995555123456" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4 font-bold text-white/75 transition hover:bg-white/[.09] hover:text-white">
                <Icon name="phone" className="text-emerald-300" /> +995 555 123 456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8 text-center text-[#04100c] sm:p-14 lg:p-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#06100d]/10">
              <Icon name="zap" className="h-7 w-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-.05em]">კორპუსის მართვის <br />ახალი სტანდარტი იწყება აქ.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base font-semibold leading-7 text-[#063a2c]/70">
              შეუერთდი ასობით კორპუსს, რომლებიც ყოველდღიურ მართვას უფრო მარტივად და გამჭვირვალედ აკეთებენ.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06100d] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1">
                დაიწყე უფასოდ
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-[#063a2c]/65">
              <span>✓ 14-დღიანი ტესტი</span>
              <span>✓ ბარათის გარეშე</span>
              <span>✓ გაუქმება ნებისმიერ დროს</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#06100d] pt-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/35">ციფრული პლატფორმა თანამედროვე საცხოვრებელი კორპუსების გამჭვირვალე და მარტივი მართვისთვის.</p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-white/50">პლატფორმა</h4>
            <div className="space-y-2 text-sm text-white/40">
              <a className="block hover:text-emerald-300" href="#features">შესაძლებლობები</a>
              <a className="block hover:text-emerald-300" href="#pricing">ტარიფები</a>
              <a className="block hover:text-emerald-300" href="#how-it-works">როგორ მუშაობს</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-white/50">კომპანია</h4>
            <div className="space-y-2 text-sm text-white/40">
              <a className="block hover:text-emerald-300" href="#">ჩვენ შესახებ</a>
              <a className="block hover:text-emerald-300" href="#">კარიერა</a>
              <a className="block hover:text-emerald-300" href="#contact">კონტაქტი</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-white/50">იურიდიული</h4>
            <div className="space-y-2 text-sm text-white/40">
              <a className="block hover:text-emerald-300" href="#">კონფიდენციალურობა</a>
              <a className="block hover:text-emerald-300" href="#">წესები და პირობები</a>
              <a className="block hover:text-emerald-300" href="#">GDPR</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/8 py-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Bino. ყველა უფლება დაცულია.</span>
          <span>🇬🇪 დამზადებულია საქართველოში</span>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth bg-white font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .text-balance { text-wrap: balance; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        .animate-float { animation: float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
    </main>
  )
}