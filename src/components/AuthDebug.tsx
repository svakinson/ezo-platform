'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type DebugInfo = {
  session: any
  profileData: any
  profileError: any
  rawResponse: string
  logs: string[]
}

export default function SuperAuthDebug() {
  const [info, setInfo] = useState<DebugInfo>({
    session: null,
    profileData: null,
    profileError: null,
    rawResponse: '',
    logs: []
  })

  useEffect(() => {
    const runDeepDebug = async () => {
      const logs: string[] = ['🚀 Super Debugger გაეშვა...']
      
      try {
        // 1. სესიის შემოწმება
        logs.push('🔑 სესიის შემოწმება...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          logs.push(`❌ Session Error: ${sessionError.message}`)
        } else if (session) {
          logs.push(`✅ სესია აქტიურია. User ID: ${session.user.id}`)
          logs.push(`🍪 Access Token: ${session.access_token.substring(0, 20)}...`)
        } else {
          logs.push('⚠️ სესია არ არის (არ არის დალოგინებული)')
        }

        // 2. პროფილის მიღების მცდელობა (ზუსტად ისე, როგორც login-ში)
        if (session?.user) {
          logs.push('📡 პროფილის მოთხოვნა ბაზიდან...')
          const { data, error } = await supabase
            .from('profiles')
            .select('id, email, role, subscription_status, subscription_end_date')
            .eq('id', session.user.id)
            .single()

          if (error) {
            logs.push(`❌ პროფილის შეცდომა!`)
            logs.push(`   Code: ${error.code || 'N/A'}`)
            logs.push(`   Message: ${error.message}`)
            logs.push(`   Details: ${error.details || 'N/A'}`)
            logs.push(`   Hint: ${error.hint || 'N/A'}`)
            
            setInfo(prev => ({
              ...prev,
              profileError: error,
              rawResponse: JSON.stringify(error, null, 2)
            }))
          } else {
            logs.push(`✅ პროფილი წარმატებით მიღებულია!`)
            logs.push(`   Role: ${data?.role}`)
            logs.push(`   Status: ${data?.subscription_status}`)
            setInfo(prev => ({ ...prev, profileData: data }))
          }
        }

      } catch (err: any) {
        logs.push(`💥 კრიტიკული კრახი: ${err.message}`)
      }

      setInfo(prev => ({ ...prev, logs }))
    }

    runDeepDebug()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-[500px] max-h-[80vh] overflow-y-auto bg-slate-950 border-2 border-rose-500/50 rounded-xl shadow-2xl font-mono text-xs">
      <div className="sticky top-0 bg-slate-900 border-b border-rose-500/50 p-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-rose-400">🔬 SUPER DEBUGGER (500 Error Hunter)</h3>
        <button onClick={() => window.location.reload()} className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded">
          Refresh
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Logs */}
        <div>
          <h4 className="text-amber-400 font-bold mb-2">📜 Execution Logs:</h4>
          <div className="bg-black/50 rounded p-3 space-y-1 max-h-40 overflow-y-auto border border-slate-800">
            {info.logs.map((log, i) => (
              <div key={i} className={log.includes('✅') ? 'text-emerald-400' : log.includes('❌') ? 'text-rose-400' : 'text-slate-300'}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Raw Error Details (The most important part!) */}
        {info.profileError && (
          <div>
            <h4 className="text-rose-400 font-bold mb-2">🚨 RAW ERROR DETAILS (ეს არის მთავარი მიზეზი):</h4>
            <div className="bg-rose-950/30 border border-rose-500/30 rounded p-3 text-rose-200 whitespace-pre-wrap break-words">
              {info.rawResponse}
            </div>
          </div>
        )}

        {/* Profile Data if successful */}
        {info.profileData && (
          <div>
            <h4 className="text-emerald-400 font-bold mb-2">✅ SUCCESSFUL PROFILE DATA:</h4>
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded p-3 text-emerald-200 whitespace-pre-wrap break-words">
              {JSON.stringify(info.profileData, null, 2)}
            </div>
          </div>
        )}

        {/* Copy Button */}
        <button
          onClick={() => {
            const text = `LOGS:\n${info.logs.join('\n')}\n\nRAW ERROR:\n${info.rawResponse}`
            navigator.clipboard.writeText(text)
            alert('დეტალები დაკოპირდა! მომაწოდე ეს ტექსტი.')
          }}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold"
        >
          📋 დააკოპირე მთლიანი ანგარიში (მომწერე ეს ტექსტი)
        </button>
      </div>
    </div>
  )
}