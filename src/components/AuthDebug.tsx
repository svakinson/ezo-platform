'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// დავამატოთ მკაფიო ტიპიზაცია TypeScript-ისთვის
type DebugInfo = {
  supabaseUrl: string | undefined
  supabaseKey: string | undefined
  user: any
  profile: any
  cookies: Record<string, string>
  errors: string[]
  logs: string[]
}

export default function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + '...',
    user: null,
    profile: null,
    cookies: {},
    errors: [],
    logs: []
  })

  useEffect(() => {
    const runDebug = async () => {
      const logs: string[] = []
      const errors: string[] = []

      try {
        logs.push('🔍 დაიწყო დებაგერი...')

        // 1. შევამოწმოთ Supabase კლიენტი
        logs.push('📡 Supabase კლიენტის შემოწმება...')
        logs.push(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
        logs.push(`   Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10)}...`)

        // 2. მივიღოთ მომხმარებელი
        logs.push('👤 მომხმარებლის მიღება...')
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError) {
          errors.push(`❌ User Error: ${userError.message}`)
          logs.push(`   შეცდომა: ${userError.message}`)
        } else if (user) {
          logs.push(`   ✅ User ID: ${user.id}`)
          logs.push(`   Email: ${user.email}`)
          logs.push(`   Created: ${user.created_at}`)
          logs.push(`   Last Sign In: ${user.last_sign_in_at}`)
        } else {
          logs.push('   ⚠️ მომხმარებელი არ არის ავტორიზებული')
        }

        // 3. მივიღოთ პროფილი
        if (user) {
          logs.push('📋 პროფილის მიღება...')
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError) {
            errors.push(`❌ Profile Error: ${profileError.message}`)
            logs.push(`   შეცდომა: ${profileError.message}`)
          } else if (profile) {
            logs.push(`   ✅ პროფილი მოიძებნა`)
            logs.push(`   Role: ${profile.role}`)
            logs.push(`   Subscription Status: ${profile.subscription_status}`)
            logs.push(`   Start Date: ${profile.subscription_start_date}`)
            logs.push(`   End Date: ${profile.subscription_end_date}`)
          } else {
            logs.push('   ⚠️ პროფილი ვერ მოიძებნა')
          }
        }

        // 4. შევამოწმოთ cookies
        logs.push('🍪 Cookie-ების შემოწმება...')
        const cookies: Record<string, string> = {}
        document.cookie.split(';').forEach(cookie => {
          const [name, value] = cookie.trim().split('=')
          if (name.includes('sb-') || name.includes('auth')) {
            cookies[name] = value.substring(0, 20) + '...'
            logs.push(`   ${name}: ${cookies[name]}`)
          }
        })

        if (Object.keys(cookies).length === 0) {
          logs.push('   ⚠️ Supabase/Auth cookies ვერ მოიძებნა')
        } else {
          logs.push(`   ✅ ნაპოვნია ${Object.keys(cookies).length} cookie`)
        }

        // 5. შევამოწმოთ localStorage
        logs.push('💾 LocalStorage შემოწმება...')
        const sbKeys = Object.keys(localStorage).filter(k => k.includes('sb-'))
        if (sbKeys.length > 0) {
          logs.push(`   ნაპოვნია ${sbKeys.length} Supabase key:`)
          sbKeys.forEach(key => {
            const value = localStorage.getItem(key)
            logs.push(`   ${key}: ${value?.substring(0, 30)}...`)
          })
        } else {
          logs.push('   ⚠️ Supabase localStorage keys ვერ მოიძებნა')
        }

        logs.push('✅ დებაგერი დასრულდა')

      } catch (error: any) {
        errors.push(`❌ Critical Error: ${error.message}`)
        logs.push(`   კრიტიკული შეცდომა: ${error.message}`)
      }

      // აქ დავამატეთ ტიპი (prev: DebugInfo) შეცდომის თავიდან ასაცილებლად
      setDebugInfo((prev: DebugInfo) => ({
        ...prev,
        logs,
        errors
      }))
    }

    runDebug()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[70vh] overflow-y-auto bg-slate-900 border border-emerald-500/30 rounded-xl shadow-2xl">
      <div className="sticky top-0 bg-slate-900 border-b border-emerald-500/30 p-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-emerald-400">🔧 Auth Debugger</h3>
        <button 
          onClick={() => window.location.reload()}
          className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs rounded-lg"
        >
          Refresh
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Environment */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Environment:</h4>
          <div className="bg-slate-800/50 rounded-lg p-3 text-xs font-mono">
            <div className="text-slate-400">URL: {debugInfo.supabaseUrl}</div>
            <div className="text-slate-400">Key: {debugInfo.supabaseKey}</div>
          </div>
        </div>

        {/* User Info */}
        {debugInfo.user && (
          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">User:</h4>
            <div className="bg-slate-800/50 rounded-lg p-3 text-xs font-mono">
              <div className="text-emerald-300">ID: {debugInfo.user.id}</div>
              <div className="text-slate-300">Email: {debugInfo.user.email}</div>
            </div>
          </div>
        )}

        {/* Profile Info */}
        {debugInfo.profile && (
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">Profile:</h4>
            <div className="bg-slate-800/50 rounded-lg p-3 text-xs font-mono">
              <div className="text-blue-300">Role: {debugInfo.profile.role}</div>
              <div className="text-slate-300">Status: {debugInfo.profile.subscription_status}</div>
              <div className="text-slate-300">End Date: {debugInfo.profile.subscription_end_date}</div>
            </div>
          </div>
        )}

        {/* Logs */}
        <div>
          <h4 className="text-sm font-semibold text-amber-400 mb-2">Logs:</h4>
          <div className="bg-slate-950 rounded-lg p-3 text-xs font-mono space-y-1 max-h-48 overflow-y-auto">
            {debugInfo.logs.map((log: string, i: number) => (
              <div key={i} className={log.includes('✅') ? 'text-emerald-400' : log.includes('⚠️') ? 'text-amber-400' : log.includes('❌') ? 'text-rose-400' : 'text-slate-400'}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Errors */}
        {debugInfo.errors.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-rose-400 mb-2">Errors:</h4>
            <div className="bg-rose-950/50 border border-rose-500/30 rounded-lg p-3 text-xs font-mono">
              {debugInfo.errors.map((error: string, i: number) => (
                <div key={i} className="text-rose-300">{error}</div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={async () => {
              const { error } = await supabase.auth.signOut()
              alert(error ? 'Error: ' + error.message : 'Logged out')
              window.location.reload()
            }}
            className="flex-1 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs rounded-lg"
          >
            Sign Out
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(debugInfo.logs.join('\n'))
              alert('Logs copied to clipboard!')
            }}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg"
          >
            Copy Logs
          </button>
        </div>
      </div>
    </div>
  )
}