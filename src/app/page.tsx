'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
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
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA] relative overflow-x-hidden">
      
      {/* დეკორატიული ღრუბლები - დამალული მობილურზე */}
      <div className="hidden md:block absolute top-10 left-10 w-32 h-12 bg-white/70 rounded-full blur-xl animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="hidden md:block absolute top-32 right-20 w-40 h-14 bg-white/60 rounded-full blur-xl animate-[float_10s_ease-in-out_infinite] [animation-delay:2s]"></div>
      <div className="hidden md:block absolute bottom-60 left-1/4 w-36 h-12 bg-white/50 rounded-full blur-xl animate-[float_9s_ease-in-out_infinite] [animation-delay:4s]"></div>

      {/* Navigation */}
      <nav className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
              <span className="text-xl sm:text-2xl">🏘️</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">EZO</span>
          </div>
          {/* დესკტოპის ნავიგაცია */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-sm lg:text-base text-gray-700 font-medium hover:text-[#00BCD4] transition-colors">შესაძლებლობები</a>
            <a href="#how" className="text-sm lg:text-base text-gray-700 font-medium hover:text-[#00BCD4] transition-colors">როგორ მუშაობს</a>
            <a href="#pricing" className="text-sm lg:text-base text-gray-700 font-medium hover:text-[#00BCD4] transition-colors">ფასები</a>
            <Link href="/register" className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] text-white font-semibold text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:shadow-lg transition-all hover:scale-105">
              დაიწყე
            </Link>
          </div>
          {/* მობილური მენიუს ღილაკი */}
          <button className="md:hidden p-2 text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* მარცხენა მხარე - ტექსტი */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
              <span className="w-2 h-2 bg-[#00BCD4] rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">🏘️ კორპუსების მართვა</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              კორპუსების მართვა
              <span className="block bg-gradient-to-r from-[#00BCD4] to-[#0097A7] bg-clip-text text-transparent">
                მარტივად და ეფექტურად
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0">
              EZO აერთიანებს შენატანებს, კომუნალურ გადახდებს და ხარჯებს ერთ სივრცეში. 
              გამჭვირვალე, ავტომატური და მეგობრული პლატფორმა.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-center"
              >
                უფასო რეგისტრაცია →
              </Link>
              <a 
                href="#features" 
                className="bg-white/80 backdrop-blur-md text-gray-800 font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-white transition-all hover:scale-105 text-center"
              >
                გაიგე მეტი
              </a>
            </div>

            {/* სტატისტიკა */}
            <div className="flex gap-4 sm:gap-6 pt-4 sm:pt-6 justify-center lg:justify-start">
              <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg flex-1 max-w-[100px] sm:max-w-none">
                <div id="c1" className="text-2xl sm:text-3xl font-bold text-[#00BCD4]">0</div>
                <div className="text-xs sm:text-sm text-gray-600">კორპუსი</div>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg flex-1 max-w-[100px] sm:max-w-none">
                <div id="c2" className="text-2xl sm:text-3xl font-bold text-[#4CAF50]">0</div>
                <div className="text-xs sm:text-sm text-gray-600">გადახდა</div>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg flex-1 max-w-[100px] sm:max-w-none">
                <div id="c3" className="text-2xl sm:text-3xl font-bold text-[#FF9800]">0</div>
                <div className="text-xs sm:text-sm text-gray-600">ლარი</div>
              </div>
            </div>
          </div>

          {/* მარჯვენა მხარე - ილუსტრაცია - დამალული მობილურზე, ნაჩვენები დესკტოპზე */}
          <div className="hidden lg:block relative h-[500px]">
            
            {/* მთავარი შენობა */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-gradient-to-b from-[#B0BEC5] to-[#78909C] rounded-t-3xl shadow-2xl animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 h-12 bg-gradient-to-b from-[#00BCD4] to-[#0097A7] rounded-t-3xl shadow-lg"></div>
              <div className="grid grid-cols-4 gap-3 p-6 mt-8">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#FFF9C4] to-[#FFECB3] rounded-lg h-10 shadow-inner border-2 border-[#90A4AE]"></div>
                ))}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-[#8D6E63] to-[#5D4037] rounded-t-2xl shadow-lg"></div>
            </div>

            {/* მცურავი ელემენტები */}
            <div className="absolute top-10 right-10 bg-white rounded-2xl p-4 shadow-xl animate-[float_5s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#388E3C] rounded-xl flex items-center justify-center text-2xl">💰</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">18,420 ₾</div>
                  <div className="text-xs text-gray-600">თვის შეგროვება</div>
                </div>
              </div>
            </div>

            <div className="absolute top-20 left-5 bg-white rounded-2xl p-4 shadow-xl animate-[float_6s_ease-in-out_infinite] [animation-delay:1s]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-xl flex items-center justify-center text-2xl">📊</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">+12.4%</div>
                  <div className="text-xs text-gray-600">ზრდა</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 right-5 bg-white rounded-2xl p-4 shadow-xl animate-[float_7s_ease-in-out_infinite] [animation-delay:2s]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#9C27B0] to-[#7B1FA2] rounded-xl flex items-center justify-center text-2xl">💳</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">ონლაინ</div>
                  <div className="text-xs text-gray-600">გადახდა</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-10 bg-white rounded-2xl p-4 shadow-xl animate-[float_5.5s_ease-in-out_infinite] [animation-delay:1.5s]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-xl flex items-center justify-center text-2xl">🔧</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">3 შეკეთება</div>
                  <div className="text-xs text-gray-600">აქტიური</div>
                </div>
              </div>
            </div>
          </div>

          {/* მობილური ილუსტრაცია - მარტივი ვერსია */}
          <div className="lg:hidden flex justify-center items-center py-8">
            <div className="relative w-64 h-64 bg-gradient-to-b from-[#B0BEC5] to-[#78909C] rounded-3xl shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-72 h-10 bg-gradient-to-b from-[#00BCD4] to-[#0097A7] rounded-t-2xl"></div>
              <div className="grid grid-cols-3 gap-2 p-4 mt-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#FFF9C4] to-[#FFECB3] rounded h-8 shadow-inner"></div>
                ))}
              </div>
              {/* მცურავი იკონები მობილურზე */}
              <div className="absolute -right-2 top-10 bg-white rounded-xl p-2 shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="absolute -left-2 bottom-10 bg-white rounded-xl p-2 shadow-lg">
                <span className="text-2xl">🔧</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            რატომ <span className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] bg-clip-text text-transparent">EZO</span>?
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg">
            ყველაფერი რაც გჭირდება კორპუსის სამართავად
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                icon: '💰', 
                title: 'ფინანსური მართვა', 
                desc: 'გადასახადების, ხარჯების და ბიუჯეტის სრული კონტროლი',
                gradient: 'from-[#4CAF50] to-[#388E3C]'
              },
              { 
                icon: '', 
                title: 'შეკეთებები', 
                desc: 'პრობლემების შეტყობინება და მართვა რეალურ დროში',
                gradient: 'from-[#FF9800] to-[#F57C00]'
              },
              { 
                icon: '🔒', 
                title: 'უსაფრთხოება', 
                desc: 'მონაცემთა დაცვა საბანკო დონის სტანდარტებით',
                gradient: 'from-[#9C27B0] to-[#7B1FA2]'
              },
              { 
                icon: '💬', 
                title: 'კომუნიკაცია', 
                desc: 'მეზობლებთან და მმართველთან პირდაპირი კავშირი',
                gradient: 'from-[#2196F3] to-[#1976D2]'
              },
              { 
                icon: '', 
                title: 'ანგარიშები', 
                desc: 'დეტალური სტატისტიკა და ანალიტიკა',
                gradient: 'from-[#E91E63] to-[#C2185B]'
              },
              { 
                icon: '📱', 
                title: 'მობილური', 
                desc: 'წვდომა ნებისმიერი მოწყობილობიდან',
                gradient: 'from-[#00BCD4] to-[#0097A7]'
              }
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-[#00BCD4]/30">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${f.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg text-2xl sm:text-3xl transform hover:rotate-12 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{f.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="bg-gradient-to-r from-[#00BCD4] to-[#0097A7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              მზად ხარ დასაწყებად?
            </h2>
            <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
              შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-white text-[#00BCD4] font-bold text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-full shadow-xl hover:bg-gray-100 transition-all hover:scale-110 w-full sm:w-auto"
            >
              დაიწყე უფასოდ →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-lg border-t border-white/50 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-xl flex items-center justify-center">
              <span className="text-lg sm:text-xl">🏘️</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">EZO</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">© 2026 EZO. ყველა უფლება დაცულია.</p>
        </div>
      </footer>

      {/* ანიმაციები */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}