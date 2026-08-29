'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [debugInfo, setDebugInfo] = useState({
    tailwindLoaded: false,
    cssLoaded: false,
    envVars: {
      supabaseUrl: false,
      supabaseKey: false,
    },
    windowSize: { width: 0, height: 0 },
    userAgent: '',
    errors: [] as string[],
    warnings: [] as string[],
    computedStyles: {} as Record<string, string>,
  })

  useEffect(() => {
    const errors: string[] = []
    const warnings: string[] = []

    // 1. შემოწმება: Tailwind CSS ჩატვირთულია?
    const testDiv = document.createElement('div')
    testDiv.className = 'bg-emerald-600'
    document.body.appendChild(testDiv)
    const bgColor = window.getComputedStyle(testDiv).backgroundColor
    document.body.removeChild(testDiv)
    const tailwindLoaded = bgColor === 'rgb(5, 150, 105)' || bgColor.includes('16')
    
    if (!tailwindLoaded) {
      warnings.push('⚠️ Tailwind CSS არ ჩანს ჩატვირთული')
    }

    // 2. შემოწმება: CSS ფაილი ჩატვირთულია?
    const styles = document.styleSheets
    let cssLoaded = false
    try {
      for (let i = 0; i < styles.length; i++) {
        const sheet = styles[i]
        if (sheet.href && sheet.href.includes('globals.css')) {
          cssLoaded = true
          break
        }
      }
    } catch (e) {
      errors.push('CSS ფაილის წვდომა აკრძალულია (CORS)')
    }

    // 3. შემოწმება: Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl) {
      errors.push('❌ NEXT_PUBLIC_SUPABASE_URL არ არის დაყენებული')
    }
    if (!supabaseKey) {
      errors.push('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY არ არის დაყენებული')
    }

    // 4. შემოწმება: Computed Styles
    const testElement = document.createElement('div')
    testElement.className = 'bg-gradient-to-br from-pink-100 via-blue-100 to-green-100'
    document.body.appendChild(testElement)
    const computedStyles = {
      background: window.getComputedStyle(testElement).background,
      minHeight: window.getComputedStyle(testElement).minHeight,
    }
    document.body.removeChild(testElement)

    setDebugInfo({
      tailwindLoaded,
      cssLoaded,
      envVars: {
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
      },
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      userAgent: navigator.userAgent,
      errors,
      warnings,
      computedStyles,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
      
      {/* ===== დებაგერის პანელი ===== */}
      <div className="fixed top-0 right-0 z-50 m-4 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border-2 border-red-500 max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-red-600 mb-3 flex items-center">
          🐛 დებაგერი
          <button 
            onClick={() => window.location.reload()}
            className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 განაახლე
          </button>
        </h2>

        <div className="space-y-2 text-sm">
          <div className={`flex items-center gap-2 ${debugInfo.tailwindLoaded ? 'text-green-600' : 'text-red-600'}`}>
            {debugInfo.tailwindLoaded ? '✅' : '❌'}
            <span>Tailwind CSS: {debugInfo.tailwindLoaded ? 'მუშაობს' : 'არ მუშაობს'}</span>
          </div>

          <div className={`flex items-center gap-2 ${debugInfo.cssLoaded ? 'text-green-600' : 'text-yellow-600'}`}>
            {debugInfo.cssLoaded ? '✅' : '⚠️'}
            <span>CSS ფაილი: {debugInfo.cssLoaded ? 'ჩატვირთულია' : 'ვერ ვპოულობ'}</span>
          </div>

          <div className={`flex items-center gap-2 ${debugInfo.envVars.supabaseUrl ? 'text-green-600' : 'text-red-600'}`}>
            {debugInfo.envVars.supabaseUrl ? '✅' : '❌'}
            <span>SUPABASE_URL: {debugInfo.envVars.supabaseUrl ? 'არის' : 'არ არის'}</span>
          </div>

          <div className={`flex items-center gap-2 ${debugInfo.envVars.supabaseKey ? 'text-green-600' : 'text-red-600'}`}>
            {debugInfo.envVars.supabaseKey ? '✅' : '❌'}
            <span>SUPABASE_KEY: {debugInfo.envVars.supabaseKey ? 'არის' : 'არ არის'}</span>
          </div>
        </div>

        {debugInfo.warnings.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <h3 className="font-bold text-yellow-700 mb-2">⚠️ გაფრთხილებები:</h3>
            <ul className="text-xs text-yellow-800 space-y-1">
              {debugInfo.warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}

        {debugInfo.errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="font-bold text-red-700 mb-2">❌ შეცდომები:</h3>
            <ul className="text-xs text-red-800 space-y-1">
              {debugInfo.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-4 space-y-2 text-xs">
          <details className="bg-gray-50 p-2 rounded">
            <summary className="cursor-pointer font-bold text-gray-700">📊 დეტალური ინფორმაცია</summary>
            <div className="mt-2 space-y-1 text-gray-600">
              <div>📱 ეკრანი: {debugInfo.windowSize.width} x {debugInfo.windowSize.height}px</div>
              <div>🌐 ბრაუზერი: {debugInfo.userAgent.split(' ')[0]}</div>
              <div>🎨 ფონი: {debugInfo.computedStyles.background || 'ვერ განისაზღვრა'}</div>
            </div>
          </details>

          <details className="bg-gray-50 p-2 rounded">
            <summary className="cursor-pointer font-bold text-gray-700">📝 ტესტის ელემენტები</summary>
            <div className="mt-2 space-y-1">
              <div className="p-2 bg-emerald-600 text-white rounded text-xs">
                ეს არის bg-emerald-600 - {debugInfo.tailwindLoaded ? 'მუშაობს ✅' : 'არ მუშაობს ❌'}
              </div>
              <div className="p-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded text-xs">
                ეს არის gradient - {debugInfo.tailwindLoaded ? 'მუშაობს ✅' : 'არ მუშაობს ❌'}
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* ===== მთავარი კონტენტი ===== */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            EZO
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            კორპუსების მართვა მარტივად და ეფექტურად
          </p>
          <Link 
            href="/register" 
            className="inline-block px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 shadow-lg transition-all hover:scale-105"
          >
            🚀 დაიწყე ახლა
          </Link>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold text-gray-800">ფინანსები</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-2">🔧</div>
              <h3 className="font-bold text-gray-800">შეკეთებები</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-bold text-gray-800">ანგარიშები</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}