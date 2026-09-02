'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconUser = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export default function AdminUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [saving, setSaving] = useState(false)
  
  // ვადის გახანგრძლივების state
  const [extendingId, setExtendingId] = useState<string | null>(null)
  const [extensionDays, setExtensionDays] = useState(30)
  const [extending, setExtending] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      await fetchUsers()
    }
    init()
  }, [router])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, subscription_status, subscription_end_date, created_at')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setUsers(data)
    }
    setLoading(false)
  }

  const handleEditClick = (user: any) => {
    setEditingId(user.id)
    setEditRole(user.role)
    setEditStatus(user.subscription_status)
  }

  const handleSave = async (userId: string) => {
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({
        role: editRole,
        subscription_status: editStatus,
      })
      .eq('id', userId)

    if (!error) {
      setEditingId(null)
      await fetchUsers()
    } else {
      alert('შეცდომა განახლებისას: ' + error.message)
    }
    setSaving(false)
  }

  // ვადის გახანგრძლივების ფუნქცია
  const handleExtendSubscription = async (userId: string) => {
    setExtending(true)
    
    const user = users.find(u => u.id === userId)
    if (!user) return

    const currentDate = user.subscription_end_date 
      ? new Date(user.subscription_end_date) 
      : new Date()
    
    const startDate = currentDate < new Date() ? new Date() : currentDate
    const newEndDate = new Date(startDate)
    newEndDate.setDate(newEndDate.getDate() + extensionDays)

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'active',
        subscription_end_date: newEndDate.toISOString().split('T')[0],
        last_payment_date: new Date().toISOString().split('T')[0],
      })
      .eq('id', userId)

    if (!error) {
      setExtendingId(null)
      await fetchUsers()
    } else {
      alert('შეცდომა: ' + error.message)
    }
    setExtending(false)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'chairman': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400'
      case 'inactive': return 'bg-slate-500/20 text-slate-400'
      case 'grace_period': return 'bg-amber-500/20 text-amber-400'
      case 'expired': return 'bg-rose-500/20 text-rose-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  const formatDate = (date: string | null) => {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('ka-GE', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <IconLoader className="w-10 h-10 text-emerald-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconShield className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">ადმინ პანელი</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/payments" className="text-sm text-slate-400 hover:text-white transition-colors">
              გადახდები
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/')
              }}
              className="text-sm text-rose-400 hover:text-rose-300 transition-colors"
            >
              გამოსვლა
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <IconUsers className="w-6 h-6 text-emerald-400" />
              მომხმარებელთა მართვა
            </h2>
            <p className="text-slate-400 text-sm mt-1">სულ დარეგისტრირებულია: {users.length} მომხმარებელი</p>
          </div>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm font-medium transition-colors"
          >
            სიის განახლება
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/50 border-b border-white/10 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">მომხმარებელი</th>
                  <th className="px-6 py-4 font-medium">როლი</th>
                  <th className="px-6 py-4 font-medium">სტატუსი</th>
                  <th className="px-6 py-4 font-medium">ვადა</th>
                  <th className="px-6 py-4 font-medium">რეგისტრაცია</th>
                  <th className="px-6 py-4 font-medium text-right">მოქმედება</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{user.full_name || 'უცნობი'}</div>
                      <div className="text-slate-400 text-xs">{user.email}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="bg-slate-800 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-emerald-500"
                        >
                          <option value="user">მომხმარებელი</option>
                          <option value="chairman">თავმჯდომარე</option>
                          <option value="admin">ადმინი</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}>
                          {user.role === 'chairman' ? 'თავმჯდომარე' : user.role === 'admin' ? 'ადმინი' : 'მომხმარებელი'}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="bg-slate-800 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-emerald-500"
                        >
                          <option value="inactive">არააქტიური</option>
                          <option value="active">აქტიური</option>
                          <option value="grace_period">შეღავათი</option>
                          <option value="expired">ვადაგასული</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.subscription_status)}`}>
                          {user.subscription_status === 'active' ? 'აქტიური' : 
                           user.subscription_status === 'inactive' ? 'არააქტიური' : 
                           user.subscription_status === 'grace_period' ? 'შეღავათი' : 'ვადაგასული'}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-slate-300 text-xs">{formatDate(user.subscription_end_date)}</div>
                      {user.subscription_end_date && (
                        <div className="text-slate-500 text-xs mt-0.5">
                          {new Date(user.subscription_end_date) > new Date() 
                            ? `დარჩენილი: ${Math.ceil((new Date(user.subscription_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} დღე`
                            : 'ვადა გასულია'}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {formatDate(user.created_at)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === user.id ? (
                          <>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 text-slate-400 hover:text-white text-xs font-medium"
                            >
                              გაუქმება
                            </button>
                            <button
                              onClick={() => handleSave(user.id)}
                              disabled={saving}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors"
                            >
                              {saving ? <IconLoader className="w-3 h-3" /> : <IconCheck className="w-3 h-3" />}
                              შენახვა
                            </button>
                          </>
                        ) : (
                          <>
                            {/* ⭐ View as User ღილაკი ⭐ */}
                            <Link
                              href={`/dashboard?view_as=${user.id}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-medium transition-colors"
                              title="ნახვა მომხმარებლის ხედით"
                            >
                              <IconUser className="w-3 h-3" />
                              ნახვა
                            </Link>

                            {/* ⭐ ვადის გახანგრძლივების ღილაკი ⭐ */}
                            <button
                              onClick={() => setExtendingId(user.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition-colors"
                              title="გაახანგრძლივე ვადა"
                            >
                              <IconClock className="w-3 h-3" />
                              გაახანგრძლივე
                            </button>
                            
                            <button
                              onClick={() => handleEditClick(user)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                            >
                              რედაქტირება
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              მომხმარებლები ვერ მოიძებნა
            </div>
          )}
        </div>
      </main>

      {/* ⭐ ვადის გახანგრძლივების Modal ⭐ */}
      {extendingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <IconClock className="w-5 h-5 text-blue-400" />
                ვადის გახანგრძლივება
              </h3>
              <button
                onClick={() => setExtendingId(null)}
                className="text-slate-400 hover:text-white"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-400 mb-4">
                აირჩიეთ რამდენი დღით გსურთ გააგრძელოთ გამოწერა:
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[7, 30, 90, 365].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExtensionDays(days)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      extensionDays === days
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-white/10 bg-slate-800 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {days} დღე
                    {days === 365 && <span className="block text-xs opacity-70">1 წელი</span>}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">შედეგი:</div>
                <div className="text-sm text-white">
                  ვადა გაგრძელდება <span className="text-blue-400 font-semibold">{extensionDays} დღით</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  სტატუსი ავტომატურად გახდება: <span className="text-emerald-400">აქტიური</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setExtendingId(null)}
                  className="flex-1 px-4 py-2.5 text-slate-300 hover:text-white font-medium"
                >
                  გაუქმება
                </button>
                <button
                  onClick={() => handleExtendSubscription(extendingId)}
                  disabled={extending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                >
                  {extending ? <IconLoader className="w-4 h-4" /> : <IconCheck className="w-4 h-4" />}
                  დადასტურება
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}