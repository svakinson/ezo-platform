'use client'

import { useEffect, useState } from 'react'
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
        <span
          className={`block text-[20px] font-black tracking-[-.04em] ${
            dark ? 'text-white' : 'text-slate-950'
          }`}
        >
          Bino
        </span>

        <span
          className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-[.18em] ${
            dark ? 'text-white/45' : 'text-slate-400'
          }`}
        >
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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled
            ? 'rounded-2xl border border-slate-200/60 bg-white/75 shadow-[0_16px_60px_rgba(15,23,42,.08)] backdrop-blur-2xl'
            : ''
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <Logo dark={!scrolled} />

          <div className="hidden items-center gap-8 lg:flex">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={`text-sm font-semibold transition-colors ${
                  scrolled
                    ? 'text-slate-600 hover:text-emerald-600'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                scrolled ? 'text-slate-700' : 'text-white/80'
              } hover:text-emerald-500`}
            >
              შესვლა
            </Link>

            <Link
              href="/register"
              className="group relative overflow-hidden rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-[#06110e] shadow-[0_8px_30px_rgba(52,211,153,.22)] transition-all hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <span className="relative z-10">დაიწყე უფასოდ</span>

              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`rounded-xl p-2 lg:hidden ${
              scrolled ? 'text-slate-800' : 'text-white'
            }`}
            aria-label="მენიუ"
          >
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200/60 py-3 pb-4 lg:hidden">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {label}
              </a>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
              <Link
                href="/login"
                className="rounded-xl py-3 text-center text-sm font-bold text-slate-700"
              >
                შესვლა
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-emerald-500 py-3 text-center text-sm font-bold text-white"
              >
                დაიწყე უფასოდ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function DashboardMockup() {
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

              {[
                ['chart', 'დაფა'],
                ['wallet', 'ფინანსები'],
                ['wrench', 'შეკეთებები'],
                ['chat', 'კომუნიკაცია'],
              ].map(([i, t], n) => (
                <div
                  key={t}
                  className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[8px] font-bold ${
                    n === 0
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon name={i} className="h-3 w-3" />
                  {t}
                </div>
              ))}
            </aside>

            <div className="p-4 sm:p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-bold text-slate-400">
                    კორპუსის დაფა
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    ვაჟა-ფშაველას 42
                  </h3>
                </div>

                <div className="rounded-lg bg-emerald-50 px-2 py-1 text-[8px] font-bold text-emerald-700">
                  LIVE
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ['შემოსავალი', '₾ 12,480', '+8.4%'],
                  ['ხარჯები', '₾ 7,230', '-3.2%'],
                  ['დავალიანება', '₾ 1,180', '12 ბინა'],
                ].map(([a, b, c], i) => (
                  <div
                    key={a}
                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <p className="text-[7px] font-bold text-slate-400">
                      {a}
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {b}
                    </p>

                    <p
                      className={`mt-1 text-[7px] font-bold ${
                        i === 2 ? 'text-rose-500' : 'text-emerald-600'
                      }`}
                    >
                      {c}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-[1.25fr_.75fr] gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex justify-between">
                    <span className="text-[8px] font-black text-slate-700">
                      ხარჯების დინამიკა
                    </span>

                    <span className="text-[7px] text-slate-400">2026</span>
                  </div>

                  <div className="mt-4 flex h-24 items-end gap-1.5">
                    {[35, 48, 42, 67, 53, 75, 62, 88, 70, 94, 82, 100].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-teal-300"
                          style={{
                            height: `${h}%`,
                            opacity: 0.35 + i / 25,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[8px] font-black text-slate-700">
                    გადახდები
                  </span>

                  <div className="mx-auto mt-4 h-24 w-24 rounded-full border-[12px] border-emerald-400/25 border-r-teal-400 border-t-emerald-500" />

                  <p className="-mt-14 text-center text-sm font-black text-slate-900">
                    86%
                  </p>

                  <p className="mt-10 text-center text-[7px] text-slate-400">
                    შეგროვებულია
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-5 top-16 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#101b18]/85 px-4 py-3 shadow-2xl backdrop-blur-xl animate-float sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <Icon name="check" />
        </span>

        <span>
          <b className="block text-xs text-white">გადახდა მიღებულია</b>

          <small className="text-[10px] font-bold text-emerald-300">
            + ₾240 · ბინა 14
          </small>
        </span>
      </div>

      <div className="absolute -right-7 bottom-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#101b18]/85 px-4 py-3 shadow-2xl backdrop-blur-xl animate-float2 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-400/15 text-purple-300">
          <Icon name="bell" />
        </span>

        <span>
          <b className="block text-xs text-white">ახალი შეტყობინება</b>

          <small className="text-[10px] font-bold text-purple-300">
            წყალი გაითიშება 14:00
          </small>
        </span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[900px] overflow-hidden bg-[#06100d] pt-28 text-white lg:min-h-screen">
      <GlowOrb className="-left-40 top-40 h-96 w-96 bg-emerald-400" />
      <GlowOrb className="right-0 top-20 h-[520px] w-[520px] bg-cyan-400" />
      <GlowOrb className="bottom-0 left-1/3 h-80 w-80 bg-violet-500" />

      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-300/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 pb-24 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-[11px] font-bold text-emerald-200 shadow-[0_0_30px_rgba(52,211,153,.08)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              საცხოვრებელი კორპუსის მართვა 2.0
            </div>

            <h1 className="text-balance text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[78px]">
              შენი კორპუსი.
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                სრული კონტროლი.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
              დარიცხვები, ხარჯები, შეკეთებები და გადაწყვეტილებები — ერთ ლამაზ,
              გამჭვირვალე სივრცეში. ნაკლები ქაოსი. მეტი სიმშვიდე.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-[#06110e] shadow-[0_15px_50px_rgba(52,211,153,.2)] transition-all hover:-translate-y-1 hover:bg-emerald-300"
              >
                დაიწყე უფასოდ

                <span className="transition-transform group-hover:translate-x-1">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[.04] px-6 py-4 text-sm font-bold text-white/80 backdrop-blur-xl transition-all hover:bg-white/[.08] hover:text-white"
              >
                ნახე შესაძლებლობები
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-white/40">
              <span className="flex items-center gap-2">
                <Icon
                  name="check"
                  className="h-3.5 w-3.5 text-emerald-300"
                />
                14-დღიანი ტესტი
              </span>

              <span className="flex items-center gap-2">
                <Icon
                  name="check"
                  className="h-3.5 w-3.5 text-emerald-300"
                />
                ბარათის გარეშე
              </span>

              <span className="flex items-center gap-2">
                <Icon
                  name="check"
                  className="h-3.5 w-3.5 text-emerald-300"
                />
                გაუქმება ნებისმიერ დროს
              </span>
            </div>
          </div>

          <DashboardMockup />
        </div>

        <div className="grid border-t border-white/10 py-7 sm:grid-cols-3">
          <div className="border-white/10 px-4 py-2 sm:border-r">
            <p className="text-2xl font-black">420+</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/35">
              კორპუსი
            </p>
          </div>

          <div className="border-white/10 px-4 py-2 sm:border-r">
            <p className="text-2xl font-black">70%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/35">
              ნაკლები ადმინისტრაციული დრო
            </p>
          </div>

          <div className="px-4 py-2">
            <p className="text-2xl font-black">24/7</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/35">
              წვდომა პლატფორმაზე
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8f7] py-24 lg:py-32">
      <GlowOrb className="-right-32 top-0 h-80 w-80 bg-emerald-200" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-600">
              რატომ Bino?
            </p>

            <h2 className="text-4xl font-black tracking-[-.045em] text-slate-950 sm:text-5xl">
              კორპუსის მართვა
              <br />
              <span className="text-slate-400">არ უნდა იყოს ქაოსი.</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-slate-500">
            Bino ცვლის დაუსრულებელ ჩატებს, Excel-ის ცხრილებს და გაურკვეველ
            ხარჯებს ერთ თანამედროვე სისტემად, სადაც ყველას ზუსტად ის
            ინფორმაცია აქვს, რაც სჭირდება.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-500">
                  <Icon name="x" />
                </span>

                <b className="text-lg text-slate-900">დღეს</b>
              </div>

              <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-black text-rose-500">
                ქაოსი
              </span>
            </div>

            <ul className="space-y-4">
              {[
                'ფინანსები Excel-ში ან ქაღალდზე',
                'გადასახადების შეგროვება ხელით',
                'ინფორმაცია იკარგება ჩატებში',
                'შეკეთების მოთხოვნები იკარგება',
                'მაცხოვრებლებს არ აქვთ ხარჯების სრული სურათი',
                'ანგარიშების მომზადება საათებს მოითხოვს',
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-3 text-sm font-medium text-slate-500"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#07140f] p-7 text-white shadow-[0_30px_80px_rgba(6,20,15,.16)]">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative mb-7 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/12 text-emerald-300">
                  <Icon name="check" />
                </span>

                <b className="text-lg">Bino-სთან ერთად</b>
              </div>

              <span className="rounded-full border border-emerald-300/15 bg-emerald-300/8 px-3 py-1 text-[10px] font-black text-emerald-300">
                კონტროლი
              </span>
            </div>

            <ul className="relative space-y-4">
              {[
                'ფინანსური სურათი რეალურ დროში',
                'ონლაინ გადახდები და შეხსენებები',
                'ცენტრალიზებული განცხადებები',
                'შეკეთებების სრული თრექინგი',
                'გამჭვირვალე ხარჯები ყველასთვის',
                'ანგარიში ერთი დაწკაპუნებით',
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-3 text-sm font-semibold text-white/70"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  [
    'wallet',
    'ფინანსური მართვა',
    'სრული კონტროლი შენატანებზე, ხარჯებსა და ბიუჯეტზე.',
    'ავტომატური ინვოისები|ხარჯების კატეგორიზაცია|ბიუჯეტის დაგეგმვა|გადახდის ისტორია',
    'emerald',
  ],
  [
    'wrench',
    'მოვლა და შეკეთებები',
    'დაარეგისტრირე პრობლემა და აკონტროლე მისი მოგვარება თავიდან ბოლომდე.',
    'ფოტო ატვირთვა|სტატუსის თრექინგი|კონტრაქტორები|ისტორიის ლოგი',
    'blue',
  ],
  [
    'chat',
    'კომუნიკაციის ჰაბი',
    'ერთი არხი მეზობლებთან, განცხადებებთან, გამოკითხვებთან და შეტყობინებებთან.',
    'განცხადებების დაფა|პირდაპირი მესიჯები|გამოკითხვები|SMS და Email',
    'violet',
  ],
  [
    'shield',
    'უსაფრთხოება',
    'როლებზე დაფუძნებული წვდომა, დაშიფვრა და აუდიტის ლოგი.',
    'SSL დაშიფვრა|როლური წვდომა|აუდიტის ლოგი|GDPR',
    'amber',
  ],
  [
    'chart',
    'ანალიტიკა',
    'გაანალიზე ფინანსები და ხარჯები ვიზუალური დაფებითა და ანგარიშებით.',
    'ფინანსური დაფები|ტრენდების ანალიზი|PDF/Excel|შედარებითი ანალიზი',
    'rose',
  ],
  [
    'phone',
    'მობილური აპი',
    'ყველაფერი ჯიბეში — გადახდები, შეტყობინებები და მოთხოვნები ნებისმიერ დროს.',
    'iOS და Android|Push შეტყობინებები|მობილური გადახდა|QR ვიზიტორებისთვის',
    'cyan',
  ],
]

const glowClasses: Record<string, string> = {
  emerald: 'bg-emerald-400',
  blue: 'bg-blue-400',
  violet: 'bg-violet-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  cyan: 'bg-cyan-400',
}

function Features() {
  return (
    <section
      id="features"
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-600">
            შესაძლებლობები
          </p>

          <h2 className="text-4xl font-black tracking-[-.05em] text-slate-950 sm:text-5xl">
            ერთი პლატფორმა.
            <br />
            <span className="text-slate-400">
              ყველაფერი, რაც კორპუსს სჭირდება.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500">
            მძლავრი ინსტრუმენტები, რომლებიც რთულ ადმინისტრირებას მარტივ
            ყოველდღიურ პროცესად აქცევს.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(
            ([icon, title, desc, details, color], i) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_25px_70px_rgba(15,23,42,.09)] ${
                  i === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-20 ${glowClasses[color]}`}
                />

                <div className="relative">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon name={icon} />
                  </div>

                  <h3 className="text-xl font-black text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                    {desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {details.split('|').map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    [
      '01',
      'დაარეგისტრირე კორპუსი',
      'შექმენი შენობის პროფილი რამდენიმე მარტივი ნაბიჯით და დაამატე ბინები.',
      'building',
    ],
    [
      '02',
      'მოიწვიე მაცხოვრებლები',
      'გაუგზავნე მოწვევა ელფოსტით ან SMS-ით და შექმენი ციფრული საზოგადოება.',
      'users',
    ],
    [
      '03',
      'მართე მარტივად',
      'ფინანსები, პრობლემები და კომუნიკაცია ერთ სივრცეში — სრული კონტროლით.',
      'chart',
    ],
  ]

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#06100d] py-24 text-white lg:py-32"
    >
      <GlowOrb className="left-1/3 top-1/3 h-96 w-96 bg-emerald-500" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-300">
            მარტივი დასაწყისი
          </p>

          <h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl">
            ქაოსიდან{' '}
            <span className="text-emerald-300">კონტროლამდე.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-white/45">
            ციფრულ მართვაზე გადასვლა რამდენიმე წუთში შეგიძლია.
          </p>
        </div>

        <div className="relative mt-14 grid gap-4 lg:grid-cols-3">
          {steps.map(([n, t, d, ic], i) => (
            <div
              key={n}
              className="group relative rounded-[28px] border border-white/10 bg-white/[.045] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/25 hover:bg-white/[.07]"
            >
              <div className="mb-9 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-500 text-[#06100d] shadow-lg">
                  <Icon name={ic} />
                </span>

                <span className="text-5xl font-black tracking-[-.08em] text-white/[.08]">
                  {n}
                </span>
              </div>

              <h3 className="text-xl font-black">{t}</h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {d}
              </p>

              {i < 2 && (
                <div className="absolute -right-4 top-14 z-10 hidden h-8 w-8 place-items-center rounded-full border border-white/10 bg-[#06100d] text-emerald-300 lg:grid">
                  <Icon name="arrow" className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    [
      'ნინო კავთარაძე',
      'კორპუსის ადმინისტრატორი',
      'Bino-ს გამოყენების შემდეგ მაცხოვრებლებს აღარ სჭირდებათ სხვადასხვა ჩატში ინფორმაციის ძებნა. ყველაფერი ერთ ადგილას გვაქვს.',
      'ნ',
    ],
    [
      'გიორგი ბერიძე',
      'მაცხოვრებელი',
      'ბოლოს და ბოლოს გავიგე სად იხარჯება ჩვენი ყოველთვიური შენატანი. გამჭვირვალობა ყველაზე დიდი ღირებულებაა.',
      'გ',
    ],
    [
      'ლევან მაისურაძე',
      'ქონების მმართველი',
      'რამდენიმე კორპუსს ვმართავ Bino-ს საშუალებით. ყველაფერი ერთი დაფიდან და ანგარიშები ავტომატურად გენერირდება.',
      'ლ',
    ],
  ]

  return (
    <section className="bg-[#f5f8f7] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-600">
              რას ამბობენ მომხმარებლები
            </p>

            <h2 className="text-4xl font-black tracking-[-.05em] text-slate-950 sm:text-5xl">
              ნდობა, რომელიც
              <br />
              ყოველდღე <span className="text-slate-400">იზრდება.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex text-amber-400">★★★★★</span>

            <span className="text-xs font-black text-slate-600">
              4.9/5
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map(([name, role, text, initial]) => (
            <div
              key={name}
              className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex gap-1 text-amber-400">
                ★★★★★
              </div>

              <p className="text-base font-semibold leading-7 text-slate-700">
                “{text}”
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-black text-white">
                  {initial}
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    {name}
                  </p>

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

// ============ განახლებული Pricing კომპონენტი ============
function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-600">
            ტარიფები
          </p>

          <h2 className="text-4xl font-black tracking-[-.05em] text-slate-950 sm:text-5xl">
            მარტივი ფასი.
            <br />
            <span className="text-slate-400">
              რეალური ღირებულება.
            </span>
          </h2>

          <p className="mt-5 text-base text-slate-500">
            აირჩიე შენს კორპუსზე მორგებული გეგმა ყოველგვარი დამალული
            ხარჯების გარეშე.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ყოველთვიური
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ყოველწლიური
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">-17%</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => {
            const isPro = plan.popular
            const price = billingCycle === 'yearly' ? Math.round(plan.price * 0.83) : plan.price

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[28px] p-7 transition-all ${
                  isPro
                    ? 'bg-[#07140f] text-white shadow-[0_30px_90px_rgba(6,20,15,.18)] ring-1 ring-emerald-400/30 lg:-translate-y-3'
                    : 'border border-slate-200 bg-white text-slate-950 shadow-sm hover:shadow-md'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                    <Icon name="star" className="w-3 h-3" />
                    რეკომენდებული
                  </div>
                )}

                <div className="mb-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black">{plan.nameGe}</h3>
                  </div>

                  <p
                    className={`mt-2 text-sm ${
                      isPro
                        ? 'text-white/45'
                        : 'text-slate-400'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-7 flex items-end gap-1 border-b border-dashed border-current/10 pb-7">
                  <span className="text-5xl font-black tracking-[-.06em]">
                    ₾{price}
                  </span>

                  <span
                    className={`pb-1 text-sm ${
                      isPro
                        ? 'text-white/35'
                        : 'text-slate-400'
                    }`}
                  >
                    /თვე
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.slice(0, 8).map((feature, i) => (
                    <li
                      key={i}
                      className={`flex gap-2.5 text-sm ${
                        isPro
                          ? 'text-white/65'
                          : 'text-slate-600'
                      }`}
                    >
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

                <Link
                  href="/register"
                  className={`rounded-2xl py-3.5 text-center text-sm font-black transition-all hover:-translate-y-0.5 ${
                    isPro
                      ? 'bg-emerald-400 text-[#06110e] hover:bg-emerald-300'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  არჩევა
                </Link>
                
                {isPro && (
                  <p className="text-center text-xs text-slate-400 mt-3">
                    14-დღიანი უფასო ტესტი ხელმისაწვდომია
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          გაქვს სპეციფიკური მოთხოვნა?{' '}
          <a
            href="#contact"
            className="font-bold text-emerald-600 hover:underline"
          >
            დაგვიკავშირდი
          </a>
          .
        </p>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)

  const faqs = [
    [
      'რამდენი ხანი სჭირდება რეგისტრაციას?',
      'კორპუსის რეგისტრაცია რამდენიმე წუთს იღებს. შეავსე მარტივი ფორმა, დაამატე ბინები და მოიწვიე მაცხოვრებლები.',
    ],
    [
      'არის თუ არა Bino უსაფრთხო?',
      'დიახ. პლატფორმა იყენებს დაშიფვრას, როლურ წვდომას და რეგულარულ ბექაფებს.',
    ],
    [
      'შემიძლია გაუქმება ნებისმიერ დროს?',
      'რა თქმა უნდა. არ არსებობს გრძელვადიანი კონტრაქტი და გამოწერის გაუქმება ნებისმიერ დროს შეგიძლია.',
    ],
    [
      'როგორ მუშაობს გადახდები?',
      'მაცხოვრებლებს შეუძლიათ გადაიხადონ ბარათით, ბანკის გადარიცხვით ან მობილური ბანკინგით, ხოლო ტრანზაქციები სისტემაში აისახება.',
    ],
    [
      'არის თუ არა მობილური აპლიკაცია?',
      'დიახ. Bino ხელმისაწვდომია iOS და Android-ზე გადახდების, განცხადებებისა და მოთხოვნების სამართავად.',
    ],
    [
      'რა ხდება ჩემს მონაცემებთან?',
      'მონაცემები ინახება დაცულ ღრუბლოვან ინფრასტრუქტურაში და დაცულია მკაცრი კონფიდენციალურობის წესებით.',
    ],
  ]

  return (
    <section
      id="faq"
      className="bg-[#f5f8f7] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-600">
            FAQ
          </p>

          <h2 className="text-4xl font-black tracking-[-.05em] text-slate-950 sm:text-5xl">
            ხშირად დასმული
            <br />
            <span className="text-slate-400">კითხვები.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map(([q, a], i) => (
            <div
              key={q}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
              >
                <span className="font-black text-slate-900">
                  {q}
                </span>

                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-100 text-emerald-600 transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                >
                  <Icon
                    name={open === i ? 'minus' : 'plus'}
                    className="h-4 w-4"
                  />
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-6 text-sm leading-7 text-slate-500 sm:px-6">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[34px] bg-[#07140f] p-8 text-white shadow-[0_30px_100px_rgba(6,20,15,.15)] sm:p-12 lg:p-16">
          <GlowOrb className="-right-20 -top-20 h-80 w-80 bg-emerald-400" />
          <GlowOrb className="-bottom-32 left-20 h-64 w-64 bg-cyan-400" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-emerald-300">
                დაგვიკავშირდით
              </p>

              <h2 className="max-w-2xl text-4xl font-black tracking-[-.05em] sm:text-5xl">
                გინდა ნახო, როგორ იმუშავებს Bino შენს კორპუსში?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/45">
                მოგვწერე ან დაგვირეკე — ჩვენი გუნდი დაგეხმარება
                პლატფორმის შერჩევასა და დაწყებაში.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@bino.ge"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4 font-bold text-white/75 transition hover:bg-white/[.09] hover:text-white"
              >
                <Icon
                  name="chat"
                  className="text-emerald-300"
                />
                info@bino.ge
              </a>

              <a
                href="tel:+995555123456"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] px-5 py-4 font-bold text-white/75 transition hover:bg-white/[.09] hover:text-white"
              >
                <Icon
                  name="phone"
                  className="text-emerald-300"
                />
                +995 555 123 456
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
    <section className="relative overflow-hidden bg-white pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-8 text-center text-[#04100c] sm:p-14 lg:p-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#06100d]/10">
              <Icon name="zap" className="h-7 w-7" />
            </div>

            <h2 className="text-4xl font-black tracking-[-.05em] sm:text-5xl lg:text-6xl">
              კორპუსის მართვის
              <br />
              ახალი სტანდარტი იწყება აქ.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-[#063a2c]/70">
              შეუერთდი ასობით კორპუსს, რომლებიც ყოველდღიურ მართვას უფრო
              მარტივად და გამჭვირვალედ აკეთებენ.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06100d] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1"
              >
                დაიწყე უფასოდ
                <Icon name="arrow" className="h-4 w-4" />
              </Link>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl border border-[#06100d]/15 bg-white/20 px-7 py-4 text-sm font-black backdrop-blur hover:bg-white/30"
              >
                დემოს დაჯავშნა
              </a>
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
    <footer className="bg-[#06100d] pt-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/35">
              ციფრული პლატფორმა თანამედროვე საცხოვრებელი კორპუსების
              გამჭვირვალე და მარტივი მართვისთვის.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-white/50">
              პლატფორმა
            </h4>

            <div className="space-y-3 text-sm text-white/40">
              <a
                className="block hover:text-emerald-300"
                href="#features"
              >
                შესაძლებლობები
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#pricing"
              >
                ტარიფები
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#how-it-works"
              >
                როგორ მუშაობს
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#contact"
              >
                კონტაქტი
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-white/50">
              კომპანია
            </h4>

            <div className="space-y-3 text-sm text-white/40">
              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                ჩვენ შესახებ
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                ბლოგი
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                კარიერა
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#contact"
              >
                დაგვიკავშირდი
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-wider text-white/50">
              იურიდიული
            </h4>

            <div className="space-y-3 text-sm text-white/40">
              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                კონფიდენციალურობა
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                წესები და პირობები
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                Cookie პოლიტიკა
              </a>

              <a
                className="block hover:text-emerald-300"
                href="#"
              >
                GDPR
              </a>
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
        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        .text-balance {
          text-wrap: balance;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translateY(-4px);
          }

          50% {
            transform: translateY(7px);
          }
        }

        .animate-float {
          animation: float 4.5s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
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