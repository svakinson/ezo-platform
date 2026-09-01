'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconClock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconFileText = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [rejectNotes, setRejectNotes] = useState('')
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

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
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setCurrentUser(user)
      await loadPayments()
    }

    init()
  }, [router])

  const loadPayments = async () => {
    setLoading(true)
    let query = supabase
      .from('payment_requests')
      .select(`
        *,
        profiles:user_id (email, full_name, phone, role, subscription_status)
      `)
      .order('created_at', { ascending: false })

    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus)
    }

    const { data } = await query
    setPayments(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (currentUser) loadPayments()
  }, [filterStatus])

  // დამტკიცება
  const handleApprove = async (payment: any) => {
    if (!confirm(`დარწმუნებული ხარ რომ გსურს ${payment.profiles?.email}-ის გადახდის დამტკიცება?`)) return

    setProcessingId(payment.id)

    try {
      // 1. განვაახლოთ payment_request
      const { error: updateError } = await supabase
        .from('payment_requests')
        .update({
          status: 'approved',
          processed_at: new Date().toISOString(),
          processed_by: currentUser.id,
        })
        .eq('id', payment.id)

      if (updateError) throw updateError

      // 2. განვაახლოთ user-ის პროფილი - მივანიჭოთ chairman როლი
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30) // +30 დღე

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: 'chairman',
          subscription_status: 'active',
          subscription_start_date: new Date().toISOString().split('T')[0],
          subscription_end_date: endDate.toISOString().split('T')[0],
          last_payment_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', payment.user_id)

      if (profileError) throw profileError

      alert(`წარმატებით დამტკიცდა! ${payment.profiles?.email} ახლა არის "თავმჯდომარე" სტატუსით.`)
      await loadPayments()
    } catch (error: any) {
      console.error('Approve error:', error)
      alert('შეცდომა: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  // უარყოფა
  const handleReject = async (payment: any) => {
    setRejectingId(payment.id)
    setRejectNotes('')
  }

  const confirmReject = async () => {
    if (!rejectingId) return

    setProcessingId(rejectingId)

    try {
      const { error } = await supabase
        .from('payment_requests')
        .update({
          status: 'rejected',
          processed_at: new Date().toISOString(),
          processed_by: currentUser.id,
          admin_notes: rejectNotes,
        })
        .eq('id', rejectingId)

      if (error) throw error

      alert('გადახდა უარყოფილია.')
      setRejectingId(null)
      setRejectNotes('')
      await loadPayments()
    } catch (error: any) {
      console.error('Reject error:', error)
      alert('შეცდომა: ' + error.message)
    } finally {
      setProcessingId(null)
    }
  }

  // ქვითრის ნახვა
  const handleViewReceipt = (payment: any) => {
    setPreviewUrl(payment.payment_proof_url)
  }

  // სტატუსის ბეჯი
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs font-medium text-amber-400">
            <IconClock className="w-3 h-3" />
            მოლოდინში
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-medium text-emerald-400">
            <IconCheck className="w-3 h-3" />
            დამტკიცებული
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-xs font-medium text-rose-400">
            <IconX className="w-3 h-3" />
            უარყოფილი
          </span>
        )
      default:
        return <span className="text-slate-400 text-xs">{status}</span>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white text-lg">იტვირთება...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconShield className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white transition-colors">
              Dashboard
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">გადახდების მართვა</h2>
          <p className="text-slate-400">შეამოწმე და დაამტკიცე მომხმარებლების გადახდები</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{payments.length}</div>
            <div className="text-xs text-slate-400">სულ მოთხოვნა</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-400">
              {payments.filter(p => p.status === 'pending').length}
            </div>
            <div className="text-xs text-slate-400">მოლოდინში</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">
              {payments.filter(p => p.status === 'approved').length}
            </div>
            <div className="text-xs text-slate-400">დამტკიცებული</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-rose-400">
              {payments.filter(p => p.status === 'rejected').length}
            </div>
            <div className="text-xs text-slate-400">უარყოფილი</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'ყველა', color: 'bg-slate-500' },
            { key: 'pending', label: 'მოლოდინში', color: 'bg-amber-500' },
            { key: 'approved', label: 'დამტკიცებული', color: 'bg-emerald-500' },
            { key: 'rejected', label: 'უარყოფილი', color: 'bg-rose-500' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === filter.key
                  ? `${filter.color} text-white`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Payments List */}
        {payments.length === 0 ? (
          <div className="bg-slate-800/30 border border-dashed border-white/10 rounded-2xl p-12 text-center">
            <IconFileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">გადახდები ვერ მოიძებნა</h3>
            <p className="text-sm text-slate-400">
              {filterStatus === 'all' ? 'ჯერ არავის არ აუტვირთავს ქვითარი' : `ამ სტატუსით გადახდები არ არის`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-slate-800/50 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <IconFileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">
                        {payment.profiles?.full_name || payment.profiles?.email || 'უცნობი'}
                      </div>
                      <div className="text-sm text-slate-400">
                        {payment.profiles?.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">₾{payment.amount}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(payment.created_at).toLocaleDateString('ka-GE', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(payment.status)}
                    {payment.status === 'rejected' && payment.admin_notes && (
                      <span className="text-xs text-slate-400 italic">
                        💬 {payment.admin_notes}
                      </span>
                    )}
                    {payment.status === 'approved' && (
                      <span className="text-xs text-emerald-400">
                        ✓ როლი: chairman
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {/* ქვითრის ნახვა */}
                    <button
                      onClick={() => handleViewReceipt(payment)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium rounded-lg transition-colors"
                    >
                      <IconEye className="w-4 h-4" />
                      ქვითრის ნახვა
                    </button>

                    {/* დამტკიცება/უარყოფა (მხოლოდ pending-ისთვის) */}
                    {payment.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(payment)}
                          disabled={processingId === payment.id}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          {processingId === payment.id ? (
                            <IconLoader className="w-4 h-4" />
                          ) : (
                            <IconCheck className="w-4 h-4" />
                          )}
                          დამტკიცება
                        </button>
                        <button
                          onClick={() => handleReject(payment)}
                          disabled={processingId === payment.id}
                          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <IconX className="w-4 h-4" />
                          უარყოფა
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ქვითრის Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">ქვითრის ნახვა</h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="text-slate-400 hover:text-white"
              >
                <IconX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              {previewUrl.endsWith('.pdf') ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[70vh] rounded-lg"
                  title="Receipt PDF"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Receipt"
                  className="w-full rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* უარყოფის Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">გადახდის უარყოფა</h3>
            <p className="text-sm text-slate-400 mb-4">
              მიუთითე მიზეზი (არასავალდებულო):
            </p>
            <textarea
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-rose-500/50 mb-4"
              placeholder="მაგ: ქვითარი არ არის კითხვადი..."
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setRejectingId(null)
                  setRejectNotes('')
                }}
                className="px-5 py-2.5 text-slate-300 hover:text-white font-medium"
              >
                გაუქმება
              </button>
              <button
                onClick={confirmReject}
                disabled={processingId === rejectingId}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 text-white font-medium rounded-lg"
              >
                {processingId === rejectingId ? (
                  <IconLoader className="w-4 h-4" />
                ) : (
                  <IconX className="w-4 h-4" />
                )}
                უარყოფა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}