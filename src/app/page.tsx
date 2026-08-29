import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">EZO</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">ფუნქციები</a>
              <a href="#stats" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">სტატისტიკა</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">კონტაქტი</a>
              <Link 
                href="/register" 
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                რეგისტრაცია
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO სექცია ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* მარცხენა მხარე - ტექსტი */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2 animate-pulse"></span>
                <span className="text-emerald-700 font-medium text-sm">🏘️ კორპუსების მართვის პლატფორმა</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                EZO
                <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-gray-600 mt-4">
                  კორპუსების მართვა
                  <br />
                  <span className="gradient-text font-semibold">ახალ დონეზე</span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                მარტივი, ეფექტური და თანამედროვე პლატფორმა კორპუსების სამართავად. 
                მართეთ ფინანსები, შეკეთებები და კომუნიკაცია ერთ სივრცეში.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 animate-pulse-glow"
                >
                  უფასო რეგისტრაცია →
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg border-2 border-gray-200 hover:border-emerald-600 hover:text-emerald-600 transition-all"
                >
                  გაიგე მეტი
                </a>
              </div>

              {/* სტატისტიკა */}
              <div id="stats" className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600 mt-1">კორპუსი</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600 mt-1">მომხმარებელი</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600 mt-1">კმაყოფილება</div>
                </div>
              </div>
            </div>

            {/* მარჯვენა მხარე - სურათი */}
            <div className="relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                  alt="Modern apartment building"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating ბარათი 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">💰</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">ფინანსური მართვა</div>
                    <div className="text-xl font-bold text-gray-900">100% კონტროლი</div>
                  </div>
                </div>
              </div>

              {/* Floating ბარათი 2 */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-float" style={{animationDelay: '3s'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🔧</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">შეკეთებები</div>
                    <div className="text-xl font-bold text-gray-900">რეალურ დროში</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES სექცია ===== */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              რატომ <span className="gradient-text">EZO</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ყველაფერი რაც გჭირდება კორპუსის ეფექტურად სამართავად
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ბარათი 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ფინანსური მართვა</h3>
              <p className="text-gray-600 leading-relaxed">გადასახადების, ხარჯების და ბიუჯეტის სრული კონტროლი ერთ სივრცეში</p>
            </div>

            {/* ბარათი 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">შეკეთებები</h3>
              <p className="text-gray-600 leading-relaxed">პრობლემების შეტყობინება და თვალყურის დევნება რეალურ დროში</p>
            </div>

            {/* ბარათი 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ანგარიშები</h3>
              <p className="text-gray-600 leading-relaxed">დეტალური ანგარიშები და ანალიტიკა გადაწყვეტილებების მისაღებად</p>
            </div>

            {/* ბარათი 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">კომუნიკაცია</h3>
              <p className="text-gray-600 leading-relaxed">მეზობლებთან და მმართველ კომპანიასთან პირდაპირი კავშირი</p>
            </div>

            {/* ბარათი 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">უსაფრთხოება</h3>
              <p className="text-gray-600 leading-relaxed">მონაცემთა დაცვა და კონფიდენციალურობა უმაღლეს დონეზე</p>
            </div>

            {/* ბარათი 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl"></span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">მობილური</h3>
              <p className="text-gray-600 leading-relaxed">წვდომა ნებისმიერი მოწყობილობიდან, ნებისმიერი ადგილიდან</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA სექცია ===== */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Modern office"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-900/90"></div>
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  მზად ხარ დასაწყებად?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl">
                  შეუერთდი ასობით კორპუსს, რომლებიც უკვე იყენებენ EZO-ს
                </p>
                <Link 
                  href="/register" 
                  className="inline-block px-10 py-5 bg-white text-emerald-700 text-xl font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:-translate-y-1"
                >
                  დაიწყე უფასოდ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <h3 className="text-2xl font-bold">EZO</h3>
              </div>
              <p className="text-gray-400">კორპუსების მართვის თანამედროვე პლატფორმა</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">კონტაქტი</h4>
              <p className="text-gray-400">info@ezo.ge</p>
              <p className="text-gray-400">+995 555 123 456</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">მისამართი</h4>
              <p className="text-gray-400">თბილისი, საქართველო</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 EZO. ყველა უფლება დაცულია.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}