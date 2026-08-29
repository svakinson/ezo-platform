'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [debugInfo, setDebugInfo] = useState({
    tailwindLoaded: false,
    nextJsCssLoaded: false,
    envVars: {
      supabaseUrl: false,
      supabaseKey: false,
    },
    windowSize: { width: 0, height: 0 },
    errors: [] as string[],
    warnings: [] as string[],
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
    
    // emerald-600 არის rgb(5, 150, 105). ვამოწმებთ თუ შეიცავს ამ მნიშვნელობას.
    const tailwindLoaded = bgColor.includes('5, 150, 105') || bgColor.includes('16, 185, 129')
    
    if (!tailwindLoaded) {
      warnings.push(`Tailwind არ მუშაობს. ბრაუზერი ხედავს ფერს როგორც: "${bgColor}"`)
    }

    // 2. შემოწმება: Next.js-ის CSS ფაილი ჩატვირთულია?
    const stylesheets = Array.from(document.styleSheets)
    const nextJsCssLoaded = stylesheets.some(sheet => 
      sheet.href && sheet.href.includes('_next/static/css')
    )

    if (!nextJsCssLoaded) {
      warnings.push('Next.js-ის CSS ფაილები ვერ მოიძებნა DOM-ში.')
    }

    // 3. შემოწმება: Environment Variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl) errors.push('❌ NEXT_PUBLIC_SUPABASE_URL აკლია')
    if (!supabaseKey) errors.push('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY აკლია')

    setDebugInfo({
      tailwindLoaded,
      nextJsCssLoaded,
      envVars: {
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
      },
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      errors,
      warnings,
    })
  }, [])

  // დებაგერის სტილები (Inline), რათა ის მაინც ჩანდეს, თუ Tailwind გაფუჭებულია!
  const debugPanelStyle = {
    position: 'fixed' as const,
    top: '10px',
    right: '10px',
    zIndex: 9999,
    background: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    border: '2px solid #ef4444',
    maxWidth: '380px',
    maxHeight: '80vh',
    overflowY: 'auto' as const,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    lineHeight: '1.5'
  }

  return (
    // მთავარი კონტეინერი Tailwind კლასებით
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
      
      {/* ===== ჭკვიანი დებაგერის პანელი ===== */}
      <div style={debugPanelStyle} className="glass-strong">
        <h2 className="text-xl font-bold text-red-600 mb-3 flex items-center" style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '12px', fontSize: '18px' }}>
          🐛 EZO დებაგერი
          <button 
            onClick={() => window.location.reload()}
            className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            style={{ marginLeft: '8px', padding: '4px 8px', fontSize: '12px', background: '#2563eb', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            🔄 განაახლე
          </button>
        </h2>

        <div className="space-y-2 text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: debugInfo.tailwindLoaded ? '#16a34a' : '#dc2626' }}>
            <span>{debugInfo.tailwindLoaded ? '✅' : '❌'}</span>
            <span>Tailwind CSS: {debugInfo.tailwindLoaded ? 'მუშაობს' : 'არ მუშაობს'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: debugInfo.nextJsCssLoaded ? '#16a34a' : '#ca8a04' }}>
            <span>{debugInfo.nextJsCssLoaded ? '✅' : '⚠️'}</span>
            <span>Next.js CSS: {debugInfo.nextJsCssLoaded ? 'ჩატვირთულია' : 'ვერ ვპოულობ'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: debugInfo.envVars.supabaseUrl ? '#16a34a' : '#dc2626' }}>
            <span>{debugInfo.envVars.supabaseUrl ? '✅' : '❌'}</span>
            <span>SUPABASE_URL: {debugInfo.envVars.supabaseUrl ? 'არის' : 'არ არის'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: debugInfo.envVars.supabaseKey ? '#16a34a' : '#dc2626' }}>
            <span>{debugInfo.envVars.supabaseKey ? '✅' : '❌'}</span>
            <span>SUPABASE_KEY: {debugInfo.envVars.supabaseKey ? 'არის' : 'არ არის'}</span>
          </div>
        </div>

        {debugInfo.warnings.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded" style={{ marginTop: '16px', padding: '12px', background: '#fefce8', borderLeft: '4px solid #eab308', borderRadius: '4px' }}>
            <h3 className="font-bold text-yellow-700 mb-2" style={{ fontWeight: 'bold', color: '#a16207', marginBottom: '8px' }}>⚠️ გაფრთხილებები:</h3>
            <ul className="text-xs text-yellow-800 space-y-1" style={{ fontSize: '12px', color: '#854d0e' }}>
              {debugInfo.warnings.map((w, i) => <li key={i}>• {w}</li>)}
            </ul>
          </div>
        )}

        {debugInfo.errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded" style={{ marginTop: '16px', padding: '12px', background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '4px' }}>
            <h3 className="font-bold text-red-700 mb-2" style={{ fontWeight: 'bold', color: '#b91c1c', marginBottom: '8px' }}>❌ შეცდომები:</h3>
            <ul className="text-xs text-red-800 space-y-1" style={{ fontSize: '12px', color: '#991b1b' }}>
              {debugInfo.errors.map((e, i) => <li key={i}>• {e}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-4 space-y-2 text-xs" style={{ marginTop: '16px', fontSize: '12px' }}>
          <details style={{ background: '#f9fafb', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
            <summary className="font-bold text-gray-700" style={{ fontWeight: 'bold', color: '#374151' }}>📊 დეტალური ინფორმაცია</summary>
            <div className="mt-2 space-y-1 text-gray-600" style={{ marginTop: '8px', color: '#4b5563' }}>
              <div>📱 ეკრანი: {debugInfo.windowSize.width} x {debugInfo.windowSize.height}px</div>
              <div>🔍 Tailwind-მა დააგენერირა ფერი: {debugInfo.tailwindLoaded ? 'კი' : 'არა'}</div>
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