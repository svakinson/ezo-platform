'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconUpload = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const IconCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconX = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

export default function PaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<any[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      // 1. მივიღოთ current user
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/login')
        return
      }
      setUser(user)

      // 2. მივიღოთ user-ის როლი
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, subscription_status')
        .eq('id', user.id)
        .single()

      // თუ chairman-ია → dashboard-ზე
      if (profile?.role === 'chairman') {
        router.push('/dashboard')
        return
      }

      // 3. მივიღოთ აქტიური პაკეტი
      const { data: planData } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })
        .limit(1)
        .single()

      setPlan(planData)

      // 4. მივიღოთ გადახდების ისტორია
      const { data: history } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setPaymentHistory(history || [])
      setLoading(false)
    }

    init()
  }, [router])

  // ფაილის არჩევა
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // ვალიდაცია: ომა (მაქს 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('ფაილი ძალიან დიდია. მაქსიმალური ზომა: 10MB')
      return
    }

    // ვალიდაცია: ტიპი
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('დაშვებულია მხოლოდ JPG, PNG ან PDF ფაილები')
      return
    }

    setSelectedFile(file)
    setErrorMessage('')

    // Preview სურათისთვის
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  // გადახდის მოთხოვნის გაგზავნა
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !user || !plan) return

    setUploading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      // 1. ატვირთვა Storage-ში
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // 2. მივიღოთ ფაილის URL
      const { data: urlData } = supabase.storage
        .from('payment_proofs')
        .getPublicUrl(fileName)

      const proofUrl = urlData.publicUrl

      // 3. შევქმნათ payment_request ჩანაწერი
      const { error: dbError } = await supabase
        .from('payment_requests')
        .insert({
          user_id: user.id,
          amount: plan.price,
          payment_proof_url: proofUrl,
          status: 'pending',
        })

      if (dbError) throw dbError

      // 4. წარმატება
      setSuccessMessage('ქვითარი წარმატებით აიტვირთა! დაველოდოთ ადმინისტრატორის დამტკიცებას.')
      setSelectedFile(null)
      setPreviewUrl(null)

      // 5. განვაახლოთ ისტორია
      const { data: history } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setPaymentHistory(history || [])

    } catch (error: any) {
      console.error('Upload error:', error)
      setErrorMessage('შეცდომა: ' + (error.message || 'უცნობი შეცდომა'))
    } finally {
      setUploading(false)
    }
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
          <Link href="/pricing" className="flex items-center gap-2">
            <IconBuilding className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">EZO Platform</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white transition-colors">
              პაკეტები
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            გადახდის ქვითრის ატვირთვა
          </h2>
          <p className="text-slate-400">
            ატვირთეთ ბანკის გადარიცხვის ქვითარი და დაველოდოთ ადმინისტრატორის დამტკიცებას
          </p>
        </div>

        {/* Plan Info */}
        {plan && (
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-400">₾{plan.price}</div>
                <div className="text-sm text-slate-400">/{plan.duration_days} დღე</div>
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-emerald-300 text-sm">{successMessage}</div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <IconX className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="text-rose-300 text-sm">{errorMessage}</div>
          </div>
        )}

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">ქვითრის ატვირთვა</h3>

          {/* File Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              აირჩიეთ ფაილი (JPG, PNG ან PDF, მაქს. 10MB)
            </label>
            
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-emerald-500/50 transition-colors bg-slate-900/50"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : selectedFile ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-white font-medium">{selectedFile.name}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <IconUpload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <div className="text-slate-300 font-medium mb-1">დააჭირეთ ფაილის ასარჩევად</div>
                    <div className="text-xs text-slate-500">ან ჩაათრიეთ აქ</div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <IconLoader className="w-5 h-5" />
                იტვირთება...
              </>
            ) : (
              <>
                <IconUpload className="w-5 h-5" />
                ქვითრის ატვირთვა
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-2">როგორ მუშაობს?</h4>
            <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
              <li>ატვირთეთ ბანკის გადარიცხვის ქვითარი</li>
              <li>ადმინისტრატორი შეამოწმებს გადახდას (ჩვეულებრივ 24 საათში)</li>
              <li>დამტკიცების შემდეგ მიიღებთ "თავმჯდომარის" სტატუსს</li>
              <li>გაიხსნება Dashboard და შეძლებთ კორპუსის მართვას</li>
            </ol>
          </div>
        </form>

        {/* Payment History */}
        {paymentHistory.length > 0 && (
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">გადახდების ისტორია</h3>
            
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 border border-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                      
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        ₾{payment.amount}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(payment.created_at).toLocaleDateString('ka-GE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(payment.status)}
                    {payment.admin_notes && (
                      <div className="text-xs text-slate-400 max-w-[200px] truncate" title={payment.admin_notes}>
                        💬 {payment.admin_notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}