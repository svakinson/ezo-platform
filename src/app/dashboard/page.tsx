'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // თუ სესია არ არის, უკან ლოგინზე გავუშვათ
        router.push('/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600">იტვირთება...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <IconBuilding className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">EZO</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <IconLogOut className="w-4 h-4" />
            გამოსვლა
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                კეთილი იყოს თქვენი დაბრუნება, {user?.user_metadata?.full_name || 'მომხმარებელი'}!
              </h1>
              <p className="text-slate-600">{user?.email}</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-emerald-900 mb-2">🎉 რეგისტრაცია წარმატებულია!</h2>
            <p className="text-emerald-800 text-sm leading-relaxed">
              თქვენ წარმატებით შეხვედით სისტემაში. ამ ეტაპზე თქვენი ანგარიში შექმნილია. 
              მომდევნო ეტაპზე აქ დაგემატება პაკეტების არჩევის და კორპუსის მართვის ფუნქციონალი.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-semibold text-slate-900">ჩემი კორპუსი</h3>
              <p className="text-sm text-slate-600 mt-1">მალე დაემატება</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors cursor-pointer">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-semibold text-slate-900">პარამეტრები</h3>
              <p className="text-sm text-slate-600 mt-1">მალე დაემატება</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}