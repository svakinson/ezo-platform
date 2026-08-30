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

const IconStar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <IconBuilding className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">EZO</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-slate-900">
                {user?.user_metadata?.full_name || 'მომხმარებელი'}
              </div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">გამოსვლა</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/dashboard/plans"
              className="group p-6 border-2 border-emerald-200 rounded-xl hover:border-emerald-400 transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-emerald-50 to-teal-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <IconStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">აირჩიე პაკეტი</h3>
                  <p className="text-sm text-slate-600">დაიწყე სრული ფუნქციონალით</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>ნახე პაკეტები</span>
                <IconArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <div className="p-6 border-2 border-slate-200 rounded-xl opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center">
                  <IconBuilding className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">ჩემი კორპუსი</h3>
                  <p className="text-sm text-slate-600">მალე დაემატება</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-semibold text-sm">
                <span>მალე</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3"></div>
            <h3 className="font-bold text-slate-900 mb-2">კორპუსის მართვა</h3>
            <p className="text-sm text-slate-600">
              პაკეტის არჩევის შემდეგ შეგეძლება დაამატო შენი კორპუსი და დაიწყო მართვა.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-slate-900 mb-2">ფინანსები</h3>
            <p className="text-sm text-slate-600">
              აკონტროლე შემოსავლები, ხარჯები და გადახდები ერთ სივრცეში.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-slate-900 mb-2">ანალიტიკა</h3>
            <p className="text-sm text-slate-600">
              მიიღე დეტალური ანგარიშები და ინსაიტები შენი კორპუსის შესახებ.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}