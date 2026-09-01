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

export default function AdminUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editRole, setEditRole] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // შევამოწმოთ რომ admin-ია
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
      .select('id, email, full_name, role, subscription_status, created_at')
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
      await fetchUsers() // განვაახლოთ სია
    } else {
      alert('შეცდომა განახლებისას: ' + error.message)
    }
    setSaving(false)
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
      default: return 'bg-slate-500/20 text-slate-400'
    }
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
                  <th className="px-6 py-4 font-medium">რეგისტრაციის თარიღი</th>
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

                    <td className="px-6 py-4 text-slate-400">
                      {new Date(user.created_at).toLocaleDateString('ka-GE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {editingId === user.id ? (
                        <div className="flex items-center justify-end gap-2">
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
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(user)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                        >
                          რედაქტირება
                        </button>
                      )}
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
    </div>
  )
}