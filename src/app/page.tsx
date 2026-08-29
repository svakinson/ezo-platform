'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // რიცხვების ანიმაცია
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
    <div className="min-h-screen bg-gradient-to-br from-[#A7F3D0] via-[#6EE7B7] to-[#34D399] relative overflow-hidden">
      
      {/* დეკორატიული ღრუბლები (CSS-ით) */}
      <div className="absolute top-10 left-20 w-32 h-12 bg-white/60 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-32 w-40 h-14 bg-white/50 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 left-1/3 w-36 h-12 bg-white/40 rounded-full blur-xl"></div>

      {/* Navigation */}
      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-full px-6 py-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🏘️</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">EZO</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors">შესაძლებლობები</a>
            <a href="#how" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors">როგორ მუშაობს</a>
            <a href="#pricing" className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors">ფასები</a>
            <Link href="/register" className="bg-gray-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-105">
              დაიწყე უფასოდ
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* მარცხენა მხარე */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">🏘️ კორპუსების მართვის პლატფორმა</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              კორპუსების მართვა
              <span className="block text-[#8B5CF6]">მარტივად და ეფექტურად</span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              EZO აერთიანებს შენატანებს, კომუნალურ გადახდებს და ხარჯებს ერთ სივრცეში. 
              გამჭვირვალე, ავტომატური და მეგობრული პლატფორმა.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/register" 
                className="bg-[#8B5CF6] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:bg-[#7C3AED] transition-all hover:scale-105 hover:shadow-2xl"
              >
                უფასო რეგისტრაცია →
              </Link>
              <a 
                href="#features" 
                className="bg-white/80 backdrop-blur-md text-gray-800 font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-white transition-all hover:scale-105"
              >
                გაიგე მეტი
              </a>
            </div>

            {/* სტატისტიკა */}
            <div className="flex gap-8 pt-6">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <div id="c1" className="text-3xl font-bold text-[#8B5CF6]">0</div>
                <div className="text-sm text-gray-600">კორპუსი</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <div id="c2" className="text-3xl font-bold text-[#10B981]">0</div>
                <div className="text-sm text-gray-600">დროული გადახდა</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                <div id="c3" className="text-3xl font-bold text-[#F59E0B]">0</div>
                <div className="text-sm text-gray-600">ლარი გავლილი</div>
              </div>
            </div>
          </div>

          {/* მარჯვენა მხარე - ილუსტრაცია (CSS-ით) */}
          <div className="relative">
            {/* მთავარი "შენობა" */}
            <div className="relative bg-gradient-to-b from-[#FDE68A] to-[#FBBF24] rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              {/* სახურავი */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-16 bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] rounded-t-3xl"></div>
              
              {/* შენობის სხეული */}
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/80 rounded-lg h-12 shadow-md"></div>
                  ))}
                </div>
                <div className="bg-white/60 rounded-xl p-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">ვაჟა-ფშაველას კორპუსი</span>
                    <span className="text-xs bg-[#10B981] text-white px-2 py-1 rounded-full">აქტიური</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">18 420 ₾</div>
                  <div className="text-xs text-gray-600">თვის შეგროვება</div>
                </div>
              </div>

              {/* დეკორატიული ელემენტები */}
              <div className="absolute -right-4 top-20 w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-3xl">✅</span>
              </div>
              <div className="absolute -left-4 bottom-20 w-14 h-14 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                <span className="text-2xl">💰</span>
              </div>
            </div>

            {/* Floating ბარათები */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                <div>
                  <div className="text-sm font-bold text-gray-900">+12.4%</div>
                  <div className="text-xs text-gray-600">ზრდა</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                <div>
                  <div className="text-sm font-bold text-gray-900">3 შეხსენება</div>
                  <div className="text-xs text-gray-600">გაიგზავნა</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section - Compact */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            რატომ <span className="text-[#8B5CF6]">EZO</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'ფინანსები', desc: 'სრული კონტროლი ხარჯებსა და შემოსავლებზე' },
              { icon: '🔧', title: 'შეკეთებები', desc: 'პრობლემების მართვა რეალურ დროში' },
              { icon: '🔒', title: 'უსაფრთხოება', desc: 'მონაცემთა დაცვა საბანკო დონეზე' }
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-3xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            მზად ხარ დასაწყებად?
          </h2>
          <p className="text-white/90 mb-8">
            შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-white text-[#8B5CF6] font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:bg-gray-100 transition-all hover:scale-105"
          >
            დაიწყე უფასოდ →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/60 backdrop-blur-lg border-t border-white/50 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🏘️</span>
            <span className="text-xl font-bold text-gray-900">EZO</span>
          </div>
          <p className="text-sm text-gray-600">© 2026 EZO. ყველა უფლება დაცულია.</p>
        </div>
      </footer>

      {/* ანიმაციები */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}