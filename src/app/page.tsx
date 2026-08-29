'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const countUp = (el: HTMLElement | null, target: number, suffix: string, duration: number) => {
      if (!el) return
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

    setTimeout(() => {
      countUp(document.getElementById('c1'), 420, '+', 1500)
      countUp(document.getElementById('c2'), 98, '%', 1500)
      countUp(document.getElementById('c3'), 2, 'M+', 1500)
    }, 500)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden text-white">
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-[#00BCD4] rounded-full blur-[128px] opacity-20 animate-[pulse_8s_ease-in-out_infinite]"
          style={{ 
            top: '10%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-[#8B5CF6] rounded-full blur-[128px] opacity-20 animate-[pulse_10s_ease-in-out_infinite] [animation-delay:2s]"
          style={{ 
            bottom: '20%', 
            right: '10%',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 bg-[#10B981] rounded-full blur-[96px] opacity-15 animate-[pulse_12s_ease-in-out_infinite] [animation-delay:4s]"
          style={{ 
            top: '50%', 
            left: '50%',
            transform: `translate(-50%, -50%)`
          }}
        ></div>
      </div>

      {/* Mouse spotlight effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,188,212,0.15), transparent 40%)`
        }}
      ></div>

      {/* Navigation with glassmorphism */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? 'bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00BCD4] via-[#8B5CF6] to-[#10B981] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <span className="text-2xl sm:text-3xl">🏘️</span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] bg-clip-text text-transparent">
                EZO
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['შესაძლებლობები', 'როგორ მუშაობს', 'ფასები'].map((item) => (
                <a 
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#00BCD4]/50 transition-all hover:scale-105 transform"
              >
                დაიწყე
              </Link>
            </div>

            <button className="md:hidden p-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D elements */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-300">️ კორპუსების მართვის პლატფორმა</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-white mb-2">კორპუსების მართვა</span>
              <span className="block bg-gradient-to-r from-[#00BCD4] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]">
                ახალ დონეზე
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              EZO აერთიანებს შენატანებს, კომუნალურ გადახდებს და ხარჯებს ერთ სივრცეში. 
              გამჭვირვალე, ავტომატური და მეგობრული პლატფორმა თქვენი კორპუსისთვის.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/register" 
                className="group relative bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#00BCD4]/50 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">უფასო რეგისტრაცია →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#00BCD4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <a 
                href="#features" 
                className="bg-white/10 backdrop-blur-md text-white font-semibold text-lg px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
              >
                გაიგე მეტი
              </a>
            </div>

            {/* Stats with animations */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#00BCD4]/50 transition-colors group">
                <div id="c1" className="text-3xl sm:text-4xl font-bold text-[#00BCD4] group-hover:scale-110 transition-transform">0</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">კორპუსი</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#10B981]/50 transition-colors group">
                <div id="c2" className="text-3xl sm:text-4xl font-bold text-[#10B981] group-hover:scale-110 transition-transform">0</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">დროული გადახდა</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#8B5CF6]/50 transition-colors group">
                <div id="c3" className="text-3xl sm:text-4xl font-bold text-[#8B5CF6] group-hover:scale-110 transition-transform">0</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">ლარი გავლილი</div>
              </div>
            </div>
          </div>

          {/* Right content - Interactive 3D Dashboard */}
          <div className="relative hidden lg:block">
            <div 
              className="relative w-full h-[600px] [perspective:1000px]"
              style={{
                transform: `rotateX(${(mousePosition.y - window.innerHeight/2) * 0.01}deg) rotateY(${-(mousePosition.x - window.innerWidth/2) * 0.01}deg)`
              }}
            >
              {/* Main building card */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">ვაჟა-ფშაველას კორპუსი</h3>
                    <p className="text-sm text-gray-400">12 სადარბაზო · 96 ბინა</p>
                  </div>
                  <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-semibold rounded-full border border-[#10B981]/30">
                    აქტიური
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-1">თვის შეგროვება</p>
                  <p className="text-3xl font-bold text-white">18 420 ₾</p>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-6">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>გადახდილი</span>
                    <span>85%</span>
                  </div>
                </div>

                {/* User list */}
                <div className="space-y-3">
                  {[
                    { name: 'გიორგი ვაჩნაძე', apt: 'ბინა 14', status: 'გადახდილი', color: '#10B981' },
                    { name: 'ნინო ქავთარაძე', apt: 'ბინა 22', status: 'გადახდილი', color: '#10B981' },
                    { name: 'ლევან მაისურაძე', apt: 'ბინა 7', status: 'მოლოდინში', color: '#F59E0B' }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#00BCD4] to-[#8B5CF6] rounded-lg flex items-center justify-center text-xs font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.apt}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${user.color}20`, color: user.color }}>
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center text-xl">
                    💰
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">+12.4%</p>
                    <p className="text-xs text-gray-400">ზრდა</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-[float_7s_ease-in-out_infinite] [animation-delay:1s]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center text-xl">
                    🔧
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">3 აქტიური</p>
                    <p className="text-xs text-gray-400">შეკეთება</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-40 left-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl animate-[float_5s_ease-in-out_infinite] [animation-delay:2s]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center text-xl">
                    
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">100%</p>
                    <p className="text-xs text-gray-400">დაცული</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features with glass cards */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            რატომ <span className="bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] bg-clip-text text-transparent">EZO</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ყველაფერი რაც გჭირდება კორპუსის ეფექტურად სამართავად
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '💰', title: 'ფინანსური მართვა', desc: 'გადასახადების, ხარჯების და ბიუჯეტის სრული კონტროლი ერთ სივრცეში', gradient: 'from-[#10B981] to-[#059669]' },
            { icon: '', title: 'შეკეთებები', desc: 'პრობლემების შეტყობინება და მართვა რეალურ დროში', gradient: 'from-[#F59E0B] to-[#D97706]' },
            { icon: '', title: 'უსაფრთხოება', desc: 'მონაცემთა დაცვა საბანკო დონის სტანდარტებით', gradient: 'from-[#8B5CF6] to-[#7C3AED]' },
            { icon: '', title: 'კომუნიკაცია', desc: 'მეზობლებთან და მმართველთან პირდაპირი კავშირი', gradient: 'from-[#00BCD4] to-[#0891B2]' },
            { icon: '', title: 'ანგარიშები', desc: 'დეტალური სტატისტიკა და ანალიტიკა', gradient: 'from-[#EC4899] to-[#BE185D]' },
            { icon: '📱', title: 'მობილური', desc: 'წვდომა ნებისმიერი მოწყობილობიდან, ნებისმიერი ადგილიდან', gradient: 'from-[#6366F1] to-[#4F46E5]' }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-[#00BCD4]/20 to-[#8B5CF6]/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00BCD4]/10 to-[#8B5CF6]/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              მზად ხარ დასაწყებად?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-gradient-to-r from-[#00BCD4] to-[#8B5CF6] text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#00BCD4]/50 transition-all hover:scale-105 transform"
            >
              დაიწყე უფასოდ →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00BCD4] to-[#8B5CF6] rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏘️</span>
            </div>
            <span className="text-2xl font-bold text-white">EZO</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 EZO. ყველა უფლება დაცულია.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}