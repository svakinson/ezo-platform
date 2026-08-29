'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const dashRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth) * 100
      const py = (e.clientY / window.innerHeight) * 100
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', px + '%')
        spotlightRef.current.style.setProperty('--my', py + '%')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!sceneRef.current || !dashRef.current) return

    // Dashboard tilt effect
    const handleSceneMouseMove = (e: MouseEvent) => {
      const rect = sceneRef.current!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      dashRef.current!.style.transform = `translate(-50%,-50%) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`
    }

    const handleSceneMouseLeave = () => {
      if (dashRef.current) {
        dashRef.current.style.transform = 'translate(-50%,-50%) rotateX(0deg) rotateY(0deg)'
      }
    }

    sceneRef.current.addEventListener('mousemove', handleSceneMouseMove)
    sceneRef.current.addEventListener('mouseleave', handleSceneMouseLeave)

    return () => {
      sceneRef.current?.removeEventListener('mousemove', handleSceneMouseMove)
      sceneRef.current?.removeEventListener('mouseleave', handleSceneMouseLeave)
    }
  }, [])

  // Count up animation
  useEffect(() => {
    if (!mounted) return

    const countUp = (el: HTMLElement, target: number, suffix: string, duration: number) => {
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target) + suffix
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const c1 = document.getElementById('c1')
    const c2 = document.getElementById('c2')
    const c3 = document.getElementById('c3')
    
    if (c1) countUp(c1, 420, '+', 1400)
    if (c2) countUp(c2, 98, '%', 1400)
    if (c3) countUp(c3, 2, 'M+', 1400)
  }, [mounted])

  // Scroll reveal
  useEffect(() => {
    if (!mounted) return

    const cards = document.querySelectorAll('.card')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 60)
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    cards.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background */}
      <div className="aurora">
        <i className="a1"></i>
        <i className="a2"></i>
        <i className="a3"></i>
      </div>
      <div className="spotlight" ref={spotlightRef}></div>
      <div className="grain"></div>

      {/* Header */}
      <header className="relative z-20 sticky top-0 backdrop-blur-[0px] max-w-[1280px] mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-['Instrument_Sans'] font-bold text-[20px] tracking-[-0.01em]">
          <div className="w-[26px] h-[26px] rounded-lg bg-gradient-to-br from-[#7C6CFF] to-[#4FE0C8] shadow-[0_0_18px_rgba(124,108,255,0.5)]"></div>
          <div className="flex flex-col leading-[1]">
            <span className="font-bold text-[19px]">EZO</span>
            <span className="font-['Inter'] font-medium text-[10px] tracking-[0.16em] uppercase text-[#5C6079] mt-0.5">ეზო</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-[13.5px] text-[#9498B3]">
          <a href="#features" className="text-[#9498B3] no-underline transition-colors hover:text-[#F5F5FA]">შესაძლებლობები</a>
          <a href="#how" className="text-[#9498B3] no-underline transition-colors hover:text-[#F5F5FA]">როგორ მუშაობს</a>
          <a href="#pricing" className="text-[#9498B3] no-underline transition-colors hover:text-[#F5F5FA]">ფასები</a>
          <a href="#contact" className="text-[#9498B3] no-underline transition-colors hover:text-[#F5F5FA]">კონტაქტი</a>
        </nav>
        <Link href="/register" className="bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.11)] text-[#F5F5FA] font-semibold text-[13px] px-4 py-2 rounded-[10px] no-underline backdrop-blur-[14px] transition-transform shadow-[0_10px_24px_rgba(124,108,255,0.25)] hover:-translate-y-0.5">
          დაიწყე უფასოდ
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-8 pt-[60px] pb-[30px] grid lg:grid-cols-[1fr_0.96fr] gap-11 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.02em] text-[#9498B3] bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] px-2 py-1.5 pl-2 rounded-[100px] backdrop-blur-[10px] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3EE08C] shadow-[0_0_8px_#3EE08C]"></span>
            EZO — თქვენი ეზოს ციფრული მენეჯერი
          </div>
          <h1 className="font-['Instrument_Sans'] font-bold text-[56px] leading-[1.05] tracking-[-0.02em] mb-5">
            თქვენი ეზო.<br />
            <span className="bg-gradient-to-r from-[#4FE0C8] via-[#7C6CFF] to-[#FF7A8A] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shine_6s_linear_infinite]">
              სრული კონტროლი.
            </span>
          </h1>
          <p className="text-[16.5px] leading-[1.7] text-[#9498B3] max-w-[470px] mb-8">
            EZO აერთიანებს კორპუსის შენატანებს, კომუნალურ გადახდებს და ხარჯებს ერთ სივრცეში — რომ ყოველი ლარი გამჭვირვალედ იყოს დათვლილი, ავტომატურად.
          </p>
          <div className="flex gap-3 mb-11">
            <Link href="/register" className="relative overflow-hidden bg-[#F5F5FA] text-[#07070C] font-semibold text-[14.5px] px-6 py-3.5 rounded-[11px] no-underline transition-transform hover:-translate-y-0.5">
              დაიწყეთ უფასოდ
            </Link>
            <a href="#demo" className="border border-[rgba(255,255,255,0.11)] text-[#F5F5FA] font-semibold text-[14.5px] px-6 py-3.5 rounded-[11px] no-underline backdrop-blur-[10px] bg-[rgba(255,255,255,0.055)] transition-transform hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.11)]">
              იხილეთ დემო
            </a>
          </div>
          <div className="flex gap-9">
            <div className="border-l border-[rgba(255,255,255,0.07)] pl-3.5">
              <b id="c1" className="font-['Instrument_Sans'] text-[24px] font-bold block">0</b>
              <span className="text-[12px] text-[#5C6079]">მართული კორპუსი</span>
            </div>
            <div className="border-l border-[rgba(255,255,255,0.07)] pl-3.5">
              <b id="c2" className="font-['Instrument_Sans'] text-[24px] font-bold block">0</b>
              <span className="text-[12px] text-[#5C6079]">დროული გადახდა</span>
            </div>
            <div className="border-l border-[rgba(255,255,255,0.07)] pl-3.5">
              <b id="c3" className="font-['Instrument_Sans'] text-[24px] font-bold block">0</b>
              <span className="text-[12px] text-[#5C6079]">ლარი გატარებული</span>
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        <div ref={sceneRef} className="relative h-[560px] [perspective:1400px]">
          <div className="absolute top-1/2 left-1/2 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,108,255,0.16),transparent_65%)] blur-[10px]"></div>

          {/* 3D Cube */}
          <div className="absolute top-[-2%] left-[40%] animate-[bob_5.5s_ease-in-out_infinite] [perspective:900px]">
            <div className="w-[76px] h-[76px] relative [transform-style:preserve-3d] animate-[spinCube_14s_linear_infinite]">
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(124,108,255,0.35)] to-[rgba(79,224,200,0.18)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:translateZ(38px)]"></div>
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(124,108,255,0.35)] to-[rgba(79,224,200,0.18)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:translateZ(-38px)_rotateY(180deg)]"></div>
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(124,108,255,0.35)] to-[rgba(79,224,200,0.18)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:rotateY(90deg)_translateZ(38px)]"></div>
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(124,108,255,0.35)] to-[rgba(79,224,200,0.18)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:rotateY(-90deg)_translateZ(38px)]"></div>
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(255,255,255,0.28)] to-[rgba(124,108,255,0.12)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:rotateX(90deg)_translateZ(38px)]"></div>
              <div className="absolute inset-0 w-[76px] h-[76px] bg-gradient-to-br from-[rgba(124,108,255,0.35)] to-[rgba(79,224,200,0.18)] border border-[rgba(255,255,255,0.22)] backdrop-blur-[6px] shadow-[inset_0_0_24px_rgba(255,255,255,0.06)] [transform:rotateX(-90deg)_translateZ(38px)]"></div>
            </div>
          </div>

          {/* 3D Coin */}
          <div className="absolute bottom-[2%] right-[20%] animate-[bob_5.5s_ease-in-out_infinite] [animation-delay:0.6s] [perspective:800px]">
            <div className="w-[64px] h-[64px] relative [transform-style:preserve-3d] animate-[spinCoin_5s_linear_infinite]">
              <div className="absolute inset-0 rounded-full [backface-visibility:hidden] flex items-center justify-center font-['Instrument_Sans'] font-bold text-[22px] text-[#07070C] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.35),0_14px_26px_rgba(0,0,0,0.4)] bg-[radial-gradient(circle_at_35%_30%,#fff,var(--accent-2)_70%)]">
                ₾
              </div>
              <div className="absolute inset-0 rounded-full [backface-visibility:hidden] flex items-center justify-center font-['Instrument_Sans'] font-bold text-[22px] text-[#07070C] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.35),0_14px_26px_rgba(0,0,0,0.4)] bg-[radial-gradient(circle_at_35%_30%,#fff,var(--accent)_70%)] [transform:rotateY(180deg)]">
                ✓
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-[6%] left-[-2%] flex items-center gap-2.5 bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.11)] rounded-[15px] px-4 py-3 backdrop-blur-[18px] shadow-[0_18px_34px_rgba(0,0,0,0.45)] animate-[orbit_7s_ease-in-out_infinite] [animation-delay:0.1s]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#3EE08C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <div className="text-[12.5px] font-semibold">98% გადახდილია</div>
              <div className="text-[10.5px] text-[#5C6079]">ივნისის შენატანი</div>
            </div>
          </div>

          <div className="absolute top-[8%] right-[-4%] flex items-center gap-2.5 bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.11)] rounded-[15px] px-4 py-3 backdrop-blur-[18px] shadow-[0_18px_34px_rgba(0,0,0,0.45)] animate-[orbit_7s_ease-in-out_infinite] [animation-delay:1.4s]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <div>
              <div className="text-[12.5px] font-semibold">+12.4%</div>
              <div className="text-[10.5px] text-[#5C6079]">ზრდა ამ თვეში</div>
            </div>
          </div>

          <div className="absolute bottom-[6%] left-[0%] flex items-center gap-2.5 bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.11)] rounded-[15px] px-4 py-3 backdrop-blur-[18px] shadow-[0_18px_34px_rgba(0,0,0,0.45)] animate-[orbit_7s_ease-in-out_infinite] [animation-delay:0.8s]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFC155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div>
              <div className="text-[12.5px] font-semibold">3 შეხსენება</div>
              <div className="text-[10.5px] text-[#5C6079]">ავტომატურად გაიგზავნა</div>
            </div>
          </div>

          {/* Dashboard */}
          <div ref={dashRef} className="absolute top-1/2 left-1/2 w-[420px] bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.11)] rounded-[22px] p-6 backdrop-blur-[24px] shadow-[0_50px_90px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] [transform-style:preserve-3d] -translate-x-1/2 -translate-y-1/2 transition-transform duration-[0.15s] ease-out">
            <div className="flex items-center justify-between mb-4.5">
              <div className="font-['Instrument_Sans'] font-semibold text-[15px]">
                ვაჟა-ფშაველას კორპუსი
                <span className="block font-['Inter'] font-normal text-[12px] text-[#5C6079] mt-0.5">12 სადარბაზო · 96 ბინა</span>
              </div>
              <div className="text-[11px] font-semibold px-2.5 py-1 rounded-[100px] bg-[rgba(62,224,140,0.14)] text-[#3EE08C] border border-[rgba(62,224,140,0.25)]">აქტიური</div>
            </div>
            <div className="flex items-end justify-between mb-5">
              <div className="stat">
                <span className="text-[12px] text-[#5C6079]">თვის შეგროვება</span>
                <b className="font-['Instrument_Sans'] text-[32px] font-bold tracking-[-0.01em] block">18 420 ₾</b>
              </div>
              <div className="text-[12px] font-semibold text-[#3EE08C] flex items-center gap-1">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                8.2%
              </div>
            </div>
            <div className="flex items-end gap-1.75 h-14 mb-5">
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '38%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '52%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '44%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '66%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '58%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-gradient-to-b from-[#4FE0C8] to-[#7C6CFF]" style={{height: '88%'}}></div>
            </div>
            <div className="h-px bg-[rgba(255,255,255,0.07)] my-4"></div>
            <div className="flex items-center gap-2.5 py-2">
              <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[11.5px] font-bold font-['Instrument_Sans'] bg-[rgba(124,108,255,0.18)] text-[#C3B8FF]">გვ</div>
              <div>
                <div className="text-[13.5px] font-semibold">გიორგი ვაჩნაძე</div>
                <div className="text-[11.5px] text-[#5C6079]">ბინა 14</div>
              </div>
              <div className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-[100px] bg-[rgba(62,224,140,0.14)] text-[#3EE08C] border border-[rgba(62,224,140,0.25)]">გადახდილი</div>
            </div>
            <div className="flex items-center gap-2.5 py-2">
              <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[11.5px] font-bold font-['Instrument_Sans'] bg-[rgba(79,224,200,0.18)] text-[#9BEBDB]">ნქ</div>
              <div>
                <div className="text-[13.5px] font-semibold">ნინო ქავთარაძე</div>
                <div className="text-[11.5px] text-[#5C6079]">ბინა 22</div>
              </div>
              <div className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-[100px] bg-[rgba(62,224,140,0.14)] text-[#3EE08C] border border-[rgba(62,224,140,0.25)]">გადახდილი</div>
            </div>
            <div className="flex items-center gap-2.5 py-2">
              <div className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center text-[11.5px] font-bold font-['Instrument_Sans'] bg-[rgba(255,193,85,0.18)] text-[#FFD48A]">ლმ</div>
              <div>
                <div className="text-[13.5px] font-semibold">ლევან მაისურაძე</div>
                <div className="text-[11.5px] text-[#5C6079]">ბინა 7</div>
              </div>
              <div className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-[100px] bg-[rgba(255,193,85,0.14)] text-[#FFC155] border border-[rgba(255,193,85,0.25)]">მოლოდინში</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="max-w-[1280px] mx-auto px-8 my-[30px]">
        <p className="text-center text-[12px] tracking-[0.12em] uppercase text-[#5C6079] mb-4.5">ენდობა 420+ საცხოვრებელი კომპლექსი</p>
        <div className="overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex gap-16 w-max animate-[scroll_26s_linear_infinite]">
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">VAKE TOWERS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">SABURTALO PARK</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">DIGOMI HEIGHTS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">MTATSMINDA VIEW</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">ISANI RESIDENCE</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">VARKETILI BLOCK B</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">NUTSUBIDZE HILLS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">CHUGURETI LOFTS</span>
            {/* Duplicate for seamless loop */}
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">VAKE TOWERS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">SABURTALO PARK</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">DIGOMI HEIGHTS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">MTATSMINDA VIEW</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">ISANI RESIDENCE</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">VARKETILI BLOCK B</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">NUTSUBIDZE HILLS</span>
            <span className="font-['Instrument_Sans'] font-semibold text-[19px] text-[#5C6079] whitespace-nowrap opacity-60">CHUGURETI LOFTS</span>
          </div>
        </div>
      </div>

      {/* Bento Features */}
      <section id="features" className="max-w-[1280px] mx-auto px-8 my-[90px]">
        <div className="max-w-[560px] mb-10">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.02em] text-[#9498B3] bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] px-2 py-1.5 pl-2 rounded-[100px] backdrop-blur-[10px] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3EE08C] shadow-[0_0_8px_#3EE08C]"></span>
            რატომ EZO
          </div>
          <h2 className="font-['Instrument_Sans'] font-bold text-[34px] leading-[1.18] tracking-[-0.01em] mb-3.5">
            ყველაფერი, რაც კორპუსს სჭირდება, ერთ სისტემაში
          </h2>
          <p className="text-[#9498B3] text-[15.5px] leading-[1.65]">
            ფინანსებიდან შეხსენებამდე — EZO ავტომატიზირებს რუტინას, რომ თქვენ დრო დაზოგოთ და მეზობლებმა ბოლომდე ენდონ პროცესს.
          </p>
        </div>

        <div className="grid grid-cols-4 grid-rows-[150px] gap-4">
          {/* Card A - Large */}
          <div className="card col-span-2 row-span-2 bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 backdrop-blur-[12px] relative overflow-hidden opacity-0 translate-y-6 transition-all duration-[0.6s]">
            <div className="w-9.5 h-9.5 rounded-[10px] bg-[rgba(255,255,255,0.10)] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h4 className="font-['Instrument_Sans'] font-semibold text-[16px] mb-2">ცოცხალი ანალიტიკა ყველა კორპუსზე</h4>
            <p className="text-[13.5px] text-[#9498B3] leading-[1.55]">ხარჯი, შემოსავალი და დავალიანება — რეალურ დროში, ყოველი სადარბაზოსთვის ცალკე.</p>
            <div className="flex items-end gap-2 h-20 mt-5.5">
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '30%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '48%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '40%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '62%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '54%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-gradient-to-b from-[#4FE0C8] to-[#7C6CFF]" style={{height: '84%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-[rgba(255,255,255,0.10)]" style={{height: '70%'}}></div>
              <div className="flex-1 rounded-t-[5px] bg-gradient-to-b from-[#4FE0C8] to-[#7C6CFF]" style={{height: '92%'}}></div>
            </div>
          </div>

          {/* Card B */}
          <div className="card bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 backdrop-blur-[12px] relative overflow-hidden opacity-0 translate-y-6 transition-all duration-[0.6s]">
            <div className="w-9.5 h-9.5 rounded-[10px] bg-[rgba(255,255,255,0.10)] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <h4 className="font-['Instrument_Sans'] font-semibold text-[16px] mb-2">მრავალკორპუსიანი მართვა</h4>
            <p className="text-[13.5px] text-[#9498B3] leading-[1.55]">ცალკე ბალანსი და ისტორია თითო კორპუსზე.</p>
          </div>

          {/* Card C */}
          <div className="card bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 backdrop-blur-[12px] relative overflow-hidden opacity-0 translate-y-6 transition-all duration-[0.6s]">
            <div className="w-9.5 h-9.5 rounded-[10px] bg-[rgba(255,255,255,0.10)] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 className="font-['Instrument_Sans'] font-semibold text-[16px] mb-2">დაცული გადახდები</h4>
            <p className="text-[13.5px] text-[#9498B3] leading-[1.55]">საბანკო დონის დაშიფვრა, ყოველ ტრანზაქციაზე.</p>
          </div>

          {/* Card D */}
          <div className="card bg-[rgba(255,255,255,0.055)] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 backdrop-blur-[12px] relative overflow-hidden opacity-0 translate-y-6 transition-all duration-[0.6s]">
            <div className="w-9.5 h-9.5 rounded-[10px] bg-[rgba(255,255,255,0.10)] flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <rect x="1" y="4" width="22" height="16" rx="3"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <h4 className="font-['Instrument_Sans'] font-semibold text-[16px] mb-2">ავტომატური შენატანები</h4>
            <p className="text-[13.5px] text-[#9498B3] leading-[1.55]">მაცხოვრებელი იხდის ონლაინ, ვადის მიხედვით.</p>
          </div>

          {/* Card E - Wide */}
          <div className="card card-e col-span-4 flex items-center justify-between gap-5 bg-gradient-to-br from-[rgba(124,108,255,0.10)] to-[rgba(79,224,200,0.08)] border border-[rgba(124,108,255,0.2)] opacity-0 translate-y-6 transition-all duration-[0.6s]">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-[rgba(255,255,255,0.10)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#4FE0C8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div>
                <h4 className="mb-1 text-[17px]">ჭკვიანი შეხსენებები</h4>
                <p className="m-0 text-[13.5px] text-[#9498B3] leading-[1.55]">დავალიანება ავტომატურად ეცნობება მაცხოვრებელს, ჩუმად და დროულად.</p>
              </div>
            </div>
            <div className="font-['Instrument_Sans'] font-bold text-[26px] text-[#4FE0C8] whitespace-nowrap">0 გამოტოვებული გადახდა</div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-[1280px] mx-auto px-8 mb-[100px]">
        <div className="bg-gradient-to-br from-[rgba(124,108,255,0.18)] to-[rgba(79,224,200,0.10)] border border-[rgba(124,108,255,0.25)] rounded-[26px] py-14 px-12 flex items-center justify-between gap-6 backdrop-blur-[14px]">
          <div>
            <h3 className="font-['Instrument_Sans'] font-bold text-[28px] tracking-[-0.01em] mb-2">მზად ხართ კორპუსის მართვა გაამარტივოთ?</h3>
            <p className="text-[#9498B3] text-[14.5px]">დაარეგისტრირეთ თქვენი კორპუსი 2 წუთში — უფასოდ, ბარათის გარეშე.</p>
          </div>
          <Link href="/register" className="relative overflow-hidden bg-[#F5F5FA] text-[#07070C] font-semibold text-[14.5px] px-6 py-3.5 rounded-[11px] no-underline transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            დაიწყეთ უფასოდ →
          </Link>
        </div>
      </section>

      {/* Add custom keyframes */}
      <style jsx global>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        @keyframes bob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes spinCube {
          from {
            transform: rotateX(-18deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-18deg) rotateY(360deg);
          }
        }
        @keyframes spinCoin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        @keyframes orbit {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(1deg);
          }
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .card.in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}