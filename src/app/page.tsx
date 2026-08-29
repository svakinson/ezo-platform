"use client";

import { useState } from "react";
import { Inter, Noto_Sans_Georgian } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const georgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
});

const features = [
  {
    icon: "₾",
    title: "ფინანსური მართვა",
    text: "სრული კონტროლი შენატანებზე, ხარჯებსა და ბიუჯეტზე.",
    accent: "cyan",
    large: true,
  },
  {
    icon: "⌁",
    title: "მოვლის კონტროლი",
    text: "დაარეგისტრირე პრობლემა და აკონტროლე მისი მოგვარება რეალურ დროში.",
    accent: "purple",
  },
  {
    icon: "◆",
    title: "უსაფრთხოება",
    text: "შენი მონაცემები დაცულია თანამედროვე დაშიფვრის სტანდარტებით.",
    accent: "green",
  },
  {
    icon: "•••",
    title: "კომუნიკაცია",
    text: "პირდაპირი არხი მეზობლებთან და შენობის მენეჯმენტთან.",
    accent: "purple",
  },
  {
    icon: "▥",
    title: "ანალიტიკა",
    text: "დეტალური ანგარიშები, სტატისტიკა და ხარჯების ვიზუალიზაცია.",
    accent: "green",
    large: true,
  },
  {
    icon: "▯",
    title: "Mobile First",
    text: "EZO ხელმისაწვდომია ნებისმიერი მოწყობილობიდან, ნებისმიერ დროს.",
    accent: "cyan",
  },
];

const steps = [
  {
    number: "01",
    title: "დაარეგისტრირე კორპუსი",
    text: "შექმენი შენი შენობის პროფილი რამდენიმე მარტივი ნაბიჯით.",
  },
  {
    number: "02",
    title: "მოიწვიე მაცხოვრებლები",
    text: "გაუგზავნე მეზობლებს მოწვევა და შექმენი ციფრული საზოგადოება.",
  },
  {
    number: "03",
    title: "მართე მარტივად",
    text: "ფინანსები, პრობლემები და კომუნიკაცია ერთ სივრცეში.",
  },
];

function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <div className="relative h-10 w-10 shrink-0">
      <div className="absolute inset-0 rotate-45 rounded-[10px] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-[0_0_25px_rgba(34,211,238,0.3)]" />
      <div className="absolute left-[8px] top-[8px] h-5 w-5 rounded-sm border-[3px] border-white/90 border-b-0" />
      <div className="absolute bottom-[7px] left-[12px] h-3 w-4 border-l-[3px] border-r-[3px] border-t-[3px] border-white/70" />
    </div>
  );
}

function GlowOrb({
  className,
  color,
}: {
  className?: string;
  color: "cyan" | "purple" | "green";
}) {
  const colors = {
    cyan: "bg-cyan-400/20",
    purple: "bg-violet-500/20",
    green: "bg-emerald-400/15",
  };

  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${colors[color]} ${className ?? ""}`}
    />
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto h-[510px] w-full max-w-[640px] [perspective:1600px] sm:h-[570px]">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[90px]" />
      <div className="absolute right-0 top-1/3 h-[200px] w-[200px] rounded-full bg-cyan-400/10 blur-[80px]" />

      {/* Floating decorative shapes */}
      <div className="absolute left-[4%] top-[22%] h-12 w-12 rotate-12 rounded-xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.15)]" />
      <div className="absolute right-[2%] top-[8%] h-8 w-8 rotate-45 rounded-lg border border-violet-300/20 bg-violet-500/10" />
      <div className="absolute bottom-[10%] right-[10%] h-14 w-14 rounded-full border border-emerald-300/20 bg-emerald-400/5" />

      {/* Main dashboard */}
      <div className="absolute left-1/2 top-1/2 w-[94%] -translate-x-1/2 -translate-y-1/2 rotate-y-[-7deg] rotate-x-[4deg] transform rounded-[25px] border border-white/15 bg-[#0d1428]/95 p-2 shadow-[0_45px_100px_rgba(0,0,0,0.55),0_0_80px_rgba(99,102,241,0.16)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[19px] border border-white/[0.06] bg-[#10182c]">
          {/* Dashboard topbar */}
          <div className="flex h-12 items-center justify-between border-b border-white/[0.07] px-4">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="text-xs font-bold tracking-[0.12em] text-white">
                EZO
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-white/5" />
              <div className="h-6 w-16 rounded-full bg-white/5" />
            </div>
          </div>

          <div className="flex min-h-[390px]">
            {/* Sidebar */}
            <div className="hidden w-[110px] border-r border-white/[0.06] p-3 sm:block">
              <div className="mb-4 h-7 rounded-lg bg-cyan-400/10" />

              {["მთავარი", "ფინანსები", "ხარჯები", "მოვლა", "მეზობლები"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`mb-2 rounded-lg px-2 py-2 text-[7px] ${
                      index === 0
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "text-white/35"
                    }`}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 sm:p-5">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <div className="mb-1 text-[8px] text-white/35">
                    გამარჯობა, გიორგი
                  </div>
                  <div className="text-base font-bold text-white sm:text-lg">
                    სახლი #12
                  </div>
                  <div className="mt-1 text-[7px] text-white/30">
                    თბილისი, საქართველო
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[7px] text-white/45">
                  აგვისტო 2026
                </div>
              </div>

              {/* KPI cards */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                {[
                  ["12,540", "₾ ბალანსი", "text-cyan-300"],
                  ["2,840", "₾ შემოსავალი", "text-emerald-300"],
                  ["1,320", "₾ ხარჯები", "text-violet-300"],
                ].map(([value, label, color]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5"
                  >
                    <div className={`text-sm font-bold ${color}`}>{value}</div>
                    <div className="mt-1 text-[6px] text-white/30">{label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="mb-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[8px] font-medium text-white/70">
                    ფინანსური დინამიკა
                  </span>
                  <span className="text-[7px] text-emerald-400">
                    +18.4%
                  </span>
                </div>

                <div className="relative h-[125px] overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[1, 2, 3, 4].map((line) => (
                      <div
                        key={line}
                        className="border-t border-white/[0.045]"
                      />
                    ))}
                  </div>

                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartFill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                          stopOpacity=".28"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22d3ee"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 125 C45 115 55 90 95 100 S145 80 185 91 S225 62 265 72 S305 52 345 62 S390 38 420 45 S460 20 500 26 L500 150 L0 150Z"
                      fill="url(#chartFill)"
                    />

                    <path
                      d="M0 125 C45 115 55 90 95 100 S145 80 185 91 S225 62 265 72 S305 52 345 62 S390 38 420 45 S460 20 500 26"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <circle cx="420" cy="45" r="5" fill="#22d3ee" />
                    <circle
                      cx="420"
                      cy="45"
                      r="10"
                      fill="#22d3ee"
                      fillOpacity=".12"
                    />
                  </svg>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-1 text-[6px] text-white/20">
                    <span>იან</span>
                    <span>მარ</span>
                    <span>მაი</span>
                    <span>ივლ</span>
                    <span>აგვ</span>
                  </div>
                </div>
              </div>

              {/* Bottom cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[7px] text-white/40">
                      მიმდინარე ხარჯები
                    </span>
                    <span className="text-[7px] text-white/25">•••</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  </div>
                  <div className="mt-2 flex justify-between text-[6px]">
                    <span className="text-white/25">დახარჯული</span>
                    <span className="text-white/60">68%</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                  <div className="mb-2 text-[7px] text-white/40">
                    ღია მოთხოვნები
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className="text-xl font-bold text-white">04</span>
                    <span className="mb-1 text-[7px] text-amber-400">
                      მოსაგვარებელი
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard bottom glow */}
        <div className="absolute -bottom-3 left-[8%] right-[8%] h-5 rounded-full bg-violet-500/30 blur-2xl" />
      </div>

      {/* Payment notification */}
      <div className="absolute right-[-1%] top-[14%] z-20 flex animate-[float_5s_ease-in-out_infinite] items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0d211e]/90 px-3 py-2 shadow-[0_15px_35px_rgba(0,0,0,.3),0_0_30px_rgba(16,185,129,.12)] backdrop-blur-xl sm:right-[-3%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-sm">
          ✓
        </div>
        <div>
          <div className="text-[8px] font-semibold text-white">
            გადახდა მიღებულია
          </div>
          <div className="mt-0.5 text-[7px] text-emerald-400">+ 240 ₾</div>
        </div>
      </div>

      {/* Maintenance notification */}
      <div className="absolute bottom-[14%] left-[-1%] z-20 flex animate-[float_6s_ease-in-out_infinite] items-center gap-2 rounded-xl border border-violet-400/20 bg-[#17132c]/95 px-3 py-2 shadow-[0_15px_35px_rgba(0,0,0,.3),0_0_30px_rgba(139,92,246,.12)] backdrop-blur-xl sm:left-[-3%]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/10 text-sm">
          ⚒
        </div>
        <div>
          <div className="text-[8px] font-semibold text-white">
            ახალი მოთხოვნა
          </div>
          <div className="mt-0.5 text-[7px] text-white/35">
            ლიფტის ტექნიკური შემოწმება
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  accent,
  large,
}: {
  icon: string;
  title: string;
  text: string;
  accent: string;
  large?: boolean;
}) {
  const accentMap: Record<string, string> = {
    cyan: "from-cyan-400/20 to-cyan-400/0 text-cyan-300 border-cyan-400/10",
    purple:
      "from-violet-500/20 to-violet-500/0 text-violet-300 border-violet-400/10",
    green:
      "from-emerald-400/20 to-emerald-400/0 text-emerald-300 border-emerald-400/10",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(0,0,0,.25)] ${
        large ? "md:p-7" : ""
      }`}
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accentMap[accent].split(" ").slice(0, 2).join(" ")}`}
      />

      <div
        className={`relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br text-xl ${accentMap[accent]}`}
      >
        {icon}
      </div>

      <h3 className="relative text-lg font-bold tracking-[-0.02em] text-white">
        {title}
      </h3>

      <p className="relative mt-2 max-w-[340px] text-sm leading-6 text-white/40">
        {text}
      </p>

      <div className="mt-7 flex items-center gap-2 text-xs font-medium text-white/25 transition-colors group-hover:text-white/55">
        გაიგე მეტი
        <ArrowRight size={14} />
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className={`${inter.variable} ${georgian.variable} min-h-screen overflow-x-hidden bg-[#070a14] font-[var(--font-georgian),var(--font-inter),sans-serif] text-white selection:bg-cyan-400/30`}
    >
      {/* Global background */}
      <div className="fixed inset-0 -z-20 bg-[#070a14]" />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <GlowOrb
          color="purple"
          className="left-[10%] top-[10%] h-[500px] w-[500px]"
        />
        <GlowOrb
          color="cyan"
          className="right-[5%] top-[20%] h-[450px] w-[450px]"
        />
        <GlowOrb
          color="green"
          className="bottom-[10%] left-[40%] h-[400px] w-[400px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
      </div>

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.09] bg-[#0a1020]/75 px-4 py-3 shadow-[0_15px_50px_rgba(0,0,0,.2)] backdrop-blur-2xl sm:px-5">
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-xl font-black tracking-[-0.06em] text-white">
              EZO
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              ფუნქციები
            </a>
            <a
              href="#how"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              როგორ მუშაობს
            </a>
            <a
              href="#pricing"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              ტარიფები
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-xl px-4 py-2.5 text-sm text-white/60 transition-colors hover:text-white">
              შესვლა
            </button>

            <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(34,211,238,.18)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,.3)]">
              <span className="relative z-10">დაიწყე უფასოდ</span>
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] md:hidden"
            aria-label="მენიუ"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-[1.5px] w-5 bg-white transition-transform ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-white transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-white transition-transform ${
                  menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#0a1020]/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-1">
              {[
                ["#features", "ფუნქციები"],
                ["#how", "როგორ მუშაობს"],
                ["#pricing", "ტარიფები"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}

              <button className="mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-3 text-sm font-bold">
                დაიწყე უფასოდ
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:min-h-screen lg:px-10 lg:pb-12 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-2">
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2 text-xs text-white/55 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              ციფრული მენეჯერი საცხოვრებელი კორპუსებისთვის
            </div>

            <h1 className="max-w-[760px] text-[42px] font-black leading-[1.12] tracking-[-0.055em] text-white sm:text-6xl lg:text-[68px]">
              კორპუსების მართვა
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                ახალ დონეზე
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/45 sm:text-base sm:leading-8">
              EZO აერთიანებს შენატანებს, კომუნალურ გადახდებსა და ხარჯებს ერთ
              სივრცეში. გამჭვირვალე, ავტომატური და მარტივი მართვა
              მაცხოვრებლებისა და ადმინისტრაციისთვის.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="group relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 text-sm font-bold shadow-[0_0_35px_rgba(34,211,238,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_45px_rgba(139,92,246,.3)]">
                <span className="relative z-10">უფასო რეგისტრაცია</span>
                <ArrowRight />
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              <a
                href="#features"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/65 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                გაიგე მეტი
                <ArrowRight />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-[520px] grid-cols-3 gap-2 sm:gap-3">
              {[
                ["420+", "კორპუსი"],
                ["98%", "დროული გადახდა"],
                ["2M+", "₾ დამუშავებული"],
              ].map(([value, label], index) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3 py-4 backdrop-blur-md transition-all hover:border-white/[0.14] hover:bg-white/[0.04] sm:px-4"
                >
                  <div
                    className={`text-xl font-black tracking-tight sm:text-2xl ${
                      index === 0
                        ? "text-cyan-300"
                        : index === 1
                          ? "text-emerald-300"
                          : "text-violet-300"
                    }`}
                  >
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] text-white/30 sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DashboardMockup />
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070a14] to-transparent" />
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-white/[0.05] bg-white/[0.012] px-5 py-7">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-35 grayscale sm:justify-between">
          {["ORBI", "m²", "არქი", "Tbilisi", "GREEN", "CITY"].map(
            (brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="text-sm font-black tracking-[0.12em] text-white sm:text-base"
              >
                {brand}
              </div>
            ),
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                რატომ EZO?
              </div>

              <h2 className="max-w-xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                ყველაფერი, რაც კორპუსის
                <span className="text-white/35"> მართვას სჭირდება.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              ერთი პლატფორმა ყოველდღიური ოპერაციებისთვის — ფინანსებიდან
              კომუნიკაციამდე.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="relative overflow-hidden border-y border-white/[0.05] bg-[#090d19] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-violet-400">
              მარტივი დასაწყისი
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              როგორ მუშაობს <span className="text-violet-400">EZO?</span>
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/35">
              ციფრულ მართვაზე გადასვლა რამდენიმე წუთში შეგიძლია.
            </p>
          </div>

          <div className="relative grid gap-4 md:grid-cols-3 md:gap-0">
            {/* Connecting line */}
            <div className="absolute left-[16.66%] right-[16.66%] top-11 hidden border-t border-dashed border-white/10 md:block" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative flex flex-col items-center px-4 text-center"
              >
                <div
                  className={`relative z-10 mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-[28px] border text-xl font-black shadow-2xl transition-all duration-300 group-hover:-translate-y-1 ${
                    index === 0
                      ? "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 shadow-cyan-500/10"
                      : index === 1
                        ? "border-violet-400/20 bg-violet-400/[0.08] text-violet-300 shadow-violet-500/10"
                        : "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 shadow-emerald-500/10"
                  }`}
                >
                  {step.number}
                </div>

                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-[280px] text-sm leading-6 text-white/35">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mx-auto mt-20 max-w-4xl rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-7 sm:p-9">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-4 text-3xl leading-none text-cyan-400">
                  “
                </div>

                <p className="max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                  EZO-ს გამოყენების შემდეგ მაცხოვრებლებს აღარ სჭირდებათ
                  სხვადასხვა ჩატში ინფორმაციის ძებნა. ყველაფერი ერთ ადგილას
                  გვაქვს — გადახდები, ხარჯები და განცხადებები.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold">
                    ნ
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      ნინო კ.
                    </div>
                    <div className="text-xs text-white/30">
                      კორპუსის ადმინისტრატორი
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 text-sm text-amber-300">
                ★ ★ ★ ★ ★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / CTA */}
      <section id="pricing" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-cyan-300/20 bg-gradient-to-br from-cyan-500/80 via-blue-600/70 to-violet-600/90 p-[1px] shadow-[0_30px_100px_rgba(34,211,238,.12)]">
          <div className="relative overflow-hidden rounded-[31px] bg-gradient-to-br from-[#0a1d2b]/90 via-[#13152f]/90 to-[#291347]/90 px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
            {/* Decorative circles */}
            <div className="absolute -left-20 bottom-[-100px] h-72 w-72 rounded-full border border-white/10 bg-cyan-300/10 blur-sm" />
            <div className="absolute -right-16 top-[-120px] h-80 w-80 rounded-full bg-violet-400/10 blur-2xl" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                დაიწყე დღესვე
              </div>

              <h2 className="text-3xl font-black leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                მზად ხარ კორპუსის მართვა
                <br className="hidden sm:block" />
                <span className="text-white/55"> გაამარტივო?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს ყოველდღიური
                მართვისთვის.
              </p>

              <button className="group mt-9 inline-flex min-h-14 items-center gap-3 rounded-2xl bg-white px-7 text-sm font-black text-[#101326] shadow-[0_15px_40px_rgba(0,0,0,.25)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,.16)]">
                დაიწყე უფასოდ
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-5 pb-8 pt-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <LogoMark />
                <span className="text-xl font-black tracking-[-0.06em]">
                  EZO
                </span>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-white/30">
                ციფრული პლატფორმა თანამედროვე საცხოვრებელი კორპუსების
                გამჭვირვალე და მარტივი მართვისთვის.
              </p>

              <div className="mt-6 flex gap-2">
                {["f", "in", "◎"].map((social) => (
                  <button
                    key={social}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-xs font-bold text-white/70">
                პლატფორმა
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/30">
                <a href="#features" className="hover:text-white">
                  ფუნქციები
                </a>
                <a href="#how" className="hover:text-white">
                  როგორ მუშაობს
                </a>
                <a href="#pricing" className="hover:text-white">
                  ტარიფები
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 text-xs font-bold text-white/70">
                კომპანია
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/30">
                <a href="#" className="hover:text-white">
                  ჩვენ შესახებ
                </a>
                <a href="#" className="hover:text-white">
                  კონტაქტი
                </a>
                <a href="#" className="hover:text-white">
                  ბლოგი
                </a>
              </div>
            </div>

            <div>
              <div className="mb-4 text-xs font-bold text-white/70">
                იურიდიული
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/30">
                <a href="#" className="hover:text-white">
                  კონფიდენციალურობა
                </a>
                <a href="#" className="hover:text-white">
                  წესები და პირობები
                </a>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-white/20 sm:flex-row sm:items-center">
            <div>© 2026 EZO. ყველა უფლება დაცულია.</div>

            <div className="flex items-center gap-2">
              <span>ენა:</span>
              <button className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-white/50 hover:text-white">
                GE
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #070a14;
        }

        ::selection {
          background: rgba(34, 211, 238, 0.25);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}