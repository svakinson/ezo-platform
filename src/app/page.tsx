import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pastel-gradient overflow-hidden relative">
      
      {/* ===== მცურავი ფონის ელემენტები (3D ეფექტები) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* ღრუბლები */}
        <div className="absolute top-20 left-10 animate-cloud opacity-60">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <path d="M20 50C20 50 15 50 15 45C15 40 20 40 20 40C20 30 30 25 40 30C45 20 65 20 70 30C80 25 90 30 90 40C95 40 100 40 100 45C100 50 95 50 95 50H20Z" fill="white" stroke="#10b981" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 animate-cloud opacity-50" style={{animationDelay: '2s'}}>
          <svg width="100" height="70" viewBox="0 0 120 80" fill="none">
            <path d="M20 50C20 50 15 50 15 45C15 40 20 40 20 40C20 30 30 25 40 30C45 20 65 20 70 30C80 25 90 30 90 40C95 40 100 40 100 45C100 50 95 50 95 50H20Z" fill="white" stroke="#10b981" strokeWidth="2"/>
          </svg>
        </div>

        {/* მცურავი ბარათები */}
        <div className="absolute top-32 right-1/4 animate-float opacity-30">
          <div className="w-24 h-16 bg-white/60 rounded-xl border border-white/80 shadow-lg"></div>
        </div>
        <div className="absolute bottom-32 left-1/3 animate-float-delayed opacity-30">
          <div className="w-20 h-14 bg-white/60 rounded-xl border border-white/80 shadow-lg"></div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏘️</span>
              <h1 className="text-2xl font-bold text-emerald-700">EZO</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">ფუნქციები</a>
              <a href="#stats" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">სტატისტიკა</a>
              <Link href="/register" className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg">
                რეგისტრაცია
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO სექცია ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          {/* EZO ლოგო */}
          <div className="animate-scale-in">
            <h1 className="text-7xl md:text-9xl font-black text-white text-glow mb-6 tracking-tight drop-shadow-lg">
              EZO
            </h1>
          </div>

          {/* 3D შენობების კომპოზიცია */}
          <div className="relative h-64 md:h-80 mb-8 perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center transform-3d">
              
              {/* ცენტრალური შენობა */}
              <div className="animate-float relative z-20">
                <svg width="180" height="220" viewBox="0 0 180 220" className="drop-shadow-2xl">
                  <rect x="40" y="40" width="100" height="160" rx="4" fill="url(#buildingGrad1)" stroke="#10b981" strokeWidth="2"/>
                  <rect x="50" y="55" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="80" y="55" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="110" y="55" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="50" y="90" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="80" y="90" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="110" y="90" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="50" y="125" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="80" y="125" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="110" y="125" width="20" height="25" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="35" y="30" width="110" height="15" rx="3" fill="#f1f5f9" stroke="#10b981" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="buildingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc"/>
                      <stop offset="100%" stopColor="#e2e8f0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* მარცხენა შენობა */}
              <div className="absolute left-0 md:left-10 top-10 animate-float-slow z-10" style={{animationDelay: '1s'}}>
                <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-xl">
                  <rect x="20" y="30" width="80" height="120" rx="4" fill="url(#buildingGrad2)" stroke="#10b981" strokeWidth="2"/>
                  <rect x="30" y="45" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="55" y="45" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="80" y="45" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="30" y="75" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="55" y="75" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="80" y="75" width="15" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="15" y="22" width="90" height="12" rx="3" fill="#f1f5f9" stroke="#10b981" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="buildingGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#f1f5f9"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* მარჯვენა შენობა (სოლარული პანელით) */}
              <div className="absolute right-0 md:right-10 top-20 animate-float-delayed z-10" style={{animationDelay: '2s'}}>
                <svg width="140" height="180" viewBox="0 0 140 180" className="drop-shadow-xl">
                  <rect x="20" y="30" width="100" height="140" rx="4" fill="url(#buildingGrad3)" stroke="#10b981" strokeWidth="2"/>
                  <rect x="30" y="45" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="60" y="45" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="90" y="45" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="30" y="80" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="60" y="80" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="90" y="80" width="18" height="22" rx="2" fill="#e0f2fe" opacity="0.8"/>
                  <rect x="15" y="22" width="110" height="12" rx="3" fill="#f1f5f9" stroke="#10b981" strokeWidth="2"/>
                  <rect x="35" y="10" width="30" height="15" rx="2" fill="#3b82f6" stroke="#1e40af" strokeWidth="1"/>
                  <defs>
                    <linearGradient id="buildingGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0fdf4"/>
                      <stop offset="100%" stopColor="#dcfce7"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* ხეები */}
              <div className="absolute left-10 md:left-20 bottom-0 animate-float-slow z-30" style={{animationDelay: '0.5s'}}>
                <svg width="60" height="80" viewBox="0 0 60 80">
                  <rect x="25" y="50" width="10" height="30" fill="#92400e"/>
                  <circle cx="30" cy="35" r="25" fill="#10b981"/>
                  <circle cx="20" cy="40" r="15" fill="#059669"/>
                  <circle cx="40" cy="40" r="15" fill="#059669"/>
                </svg>
              </div>
              <div className="absolute right-10 md:right-20 bottom-10 animate-float z-30" style={{animationDelay: '1.5s'}}>
                <svg width="50" height="70" viewBox="0 0 60 80">
                  <rect x="25" y="50" width="10" height="30" fill="#92400e"/>
                  <circle cx="30" cy="35" r="25" fill="#10b981"/>
                  <circle cx="20" cy="40" r="15" fill="#059669"/>
                  <circle cx="40" cy="40" r="15" fill="#059669"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ტექსტი */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              კორპუსების მართვა
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              მარტივად, ეფექტურად და თანამედროვედ
            </p>
          </div>

          {/* CTA ღილაკები */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{animationDelay: '0.5s'}}>
            <Link href="/register" className="px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transition-all hover:scale-110 shadow-2xl hover:shadow-emerald-500/50">
              🚀 უფასო რეგისტრაცია
            </Link>
            <a href="#features" className="px-8 py-4 glass-strong text-emerald-700 text-lg font-semibold rounded-full hover:bg-white/60 transition-all hover:scale-105">
              გაიგე მეტი ↓
            </a>
          </div>

          {/* სტატისტიკა */}
          <div id="stats" className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.8s'}}>
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-xs md:text-sm text-gray-600">კორპუსი</div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">10K+</div>
              <div className="text-xs md:text-sm text-gray-600">მომხმარებელი</div>
            </div>
            <div className="glass rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">99%</div>
              <div className="text-xs md:text-sm text-gray-600">კმაყოფილება</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES სექცია ===== */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              რატომ EZO?
            </h2>
            <p className="text-xl text-gray-600">
              ყველაფერი რაც გჭირდება კორპუსის სამართავად
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'ფინანსური მართვა', desc: 'გადასახადების, ხარჯების და ბიუჯეტის სრული კონტროლი ერთ სივრცეში' },
              { icon: '🔧', title: 'შეკეთებები', desc: 'პრობლემების შეტყობინება და თვალყურის დევნება რეალურ დროში' },
              { icon: '📊', title: 'ანგარიშები', desc: 'დეტალური ანგარიშები და ანალიტიკა გადაწყვეტილებების მისაღებად' },
              { icon: '👥', title: 'კომუნიკაცია', desc: 'მეზობლებთან და მმართველ კომპანიასთან პირდაპირი კავშირი' },
              { icon: '🔒', title: 'უსაფრთხოება', desc: 'მონაცემთა დაცვა და კონფიდენციალურობა უმაღლეს დონეზე' },
              { icon: '📱', title: 'მობილური', desc: 'წვდომა ნებისმიერი მოწყობილობიდან, ნებისმიერი ადგილიდან' }
            ].map((feature, index) => (
              <div key={index} className="card-3d glass-strong rounded-3xl p-8 text-center">
                <div className="text-5xl md:text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA სექცია ===== */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-8 md:p-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              მზად ხარ დასაწყებად?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს
            </p>
            <Link href="/register" className="inline-block px-10 py-5 bg-emerald-600 text-white text-lg md:text-xl font-semibold rounded-full hover:bg-emerald-700 transition-all hover:scale-110 shadow-2xl hover:shadow-emerald-500/50">
              🏘️ დაიწყე უფასოდ
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="glass py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🏘️</span>
            <h3 className="text-xl font-bold text-emerald-700">EZO</h3>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 EZO. ყველა უფლება დაცულია.
          </p>
        </div>
      </footer>

    </div>
  )
}