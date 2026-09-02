'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconCreditCard = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const IconBuilding2 = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconUpload = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconGift = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

// ============ შიდა კომპონენტი ============
function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan_id')
  const billing = (searchParams.get('billing') as 'monthly' | 'yearly') || 'monthly'

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'transfer'>('transfer')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login?redirect=/payment')
        return
      }
      setUser(user)

      let query = supabase.from('subscription_plans').select('*').eq('is_active', true)
      if (planId) {
        query = query.eq('id', planId)
      }
      
      const { data } = await query.order('price_monthly', { ascending: true }).limit(1).single()
      setPlan(data)
      setLoading(false)
    }
    init()
  }, [router, planId])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('ფაილი ძალიან დიდია. მაქსიმალური ზომა: 10MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('დაშვებულია მხოლოდ JPG, PNG ან PDF ფაილები')
      return
    }

    setSelectedFile(file)
    setErrorMessage('')
  }

  const handleSubmitTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !user || !plan) return

    setUploading(true)
    setErrorMessage('')

    try {
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('payment_proofs')
        .upload(fileName, selectedFile, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('payment_proofs').getPublicUrl(fileName)

      // გამოვთვალოთ სწორი ფასი ბილინგის ციკლის მიხედვით
      const currentPrice = billing === 'yearly' ? plan.price_yearly : plan.price_monthly

      const { error: dbError } = await supabase.from('payment_requests').insert({
        user_id: user.id,
        plan_id: plan.id,
        amount: currentPrice,
        billing_cycle: billing,
        payment_proof_url: urlData.publicUrl,
        status: 'pending',
      })

      if (dbError) throw dbError

      setSuccessMessage('ქვითარი წარმატებით აიტვირთა! ადმინისტრატორი შეამოწმებს მას 24 საათის განმავლობაში.')
      setSelectedFile(null)
      
      setTimeout(() => {
        router.push('/pricing')
      }, 3000)

    } catch (error: any) {
      console.error('Upload error:', error)
      setErrorMessage('შეცდომა: ' + (error.message || 'უცნობი შეცდომა'))
    } finally {
      setUploading(false)
    }
  }

  const handleOnlinePayment = () => {
    alert('დემო რეჟიმი: აქ გადაგამისამართებთ ბანკის უსაფრთხო გადახდის გვერდზე. (ინტეგრაცია მალე დაემატება)')
  }

  if (loading || !plan) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <IconLoader className="w-10 h-10 text-emerald-400" />
      </div>
    )
  }

  const currentPrice = billing === 'yearly' ? plan.price_yearly : plan.price_monthly
  const durationText = billing === 'yearly' ? '1 წელი' : '1 თვე'
  const isBasic = plan.name === 'Basic'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/pricing" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
            ← უკან დაბრუნება
          </Link>
          <span className="text-sm font-medium text-slate-400">უსაფრთხო გადახდა</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-white">გადახდის მეთოდის არჩევა</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === 'transfer' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-white/10 bg-slate-900 hover:border-white/20'
                }`}
              >
                <IconBuilding2 className={`w-8 h-8 mb-3 ${paymentMethod === 'transfer' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <div className="font-semibold text-white">ბანკით გადარიცხვა</div>
                <div className="text-sm text-slate-400 mt-1">ქვითრის ატვირთვით</div>
              </button>

              <button
                onClick={() => setPaymentMethod('online')}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === 'online' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-white/10 bg-slate-900 hover:border-white/20'
                }`}
              >
                <IconCreditCard className={`w-8 h-8 mb-3 ${paymentMethod === 'online' ? 'text-emerald-400' : 'text-slate-400'}`} />
                <div className="font-semibold text-white">ონლაინ გადახდა</div>
                <div className="text-sm text-slate-400 mt-1">ბარათით (Visa/Mastercard)</div>
              </button>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8">
              {paymentMethod === 'transfer' ? (
                <form onSubmit={handleSubmitTransfer} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">ბანკის რეკვიზიტები</h3>
                    <div className="bg-slate-950 rounded-xl p-5 space-y-3 border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">ბანკი:</span>
                        <span className="font-medium text-white">TBC Bank / Bank of Georgia</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">მიმღები:</span>
                        <span className="font-medium text-white">EZO Platform LLC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ანგარიში:</span>
                        <span className="font-mono text-emerald-400 select-all">GE00TB0000000000000000</span>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <span className="text-slate-400 text-sm block mb-1">გადახდის დანიშნულება (აუცილებელი):</span>
                        <code className="bg-slate-800 text-amber-400 px-3 py-2 rounded-lg text-sm block break-all">
                          გამოწერა: {user?.email}
                        </code>
                        <p className="text-xs text-slate-500 mt-2">
                          ⚠️ გთხოვთ, დანიშნულებაში ზუსტად მიუთითოთ თქვენი ელ-ფოსტა, რათა გადახდა სწრაფად დადასტურდეს.
                        </p>
                      </div>
                    </div>
                  </div>

                  {successMessage ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
                      <IconCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-emerald-300">წარმატებით!</div>
                        <div className="text-sm text-emerald-400/80 mt-1">{successMessage}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {errorMessage && (
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3">
                          <IconAlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <div className="text-sm text-rose-300">{errorMessage}</div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">გადახდის ქვითრის ატვირთვა</label>
                        <div className="relative">
                          <input type="file" id="receipt" accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
                          <label htmlFor="receipt" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                            {selectedFile ? (
                              <div className="text-center">
                                <IconCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                <div className="text-white font-medium">{selectedFile.name}</div>
                                <div className="text-xs text-slate-400 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <IconUpload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <div className="text-slate-300 font-medium">დააჭირეთ ფაილის ასარჩევად</div>
                                <div className="text-xs text-slate-500 mt-1">JPG, PNG ან PDF (მაქს. 10MB)</div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!selectedFile || uploading}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        {uploading ? <><IconLoader className="w-5 h-5" /> მუშავდება...</> : 'ქვითრის ატვირთვა და დადასტურება'}
                      </button>
                    </>
                  )}
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                    <IconCreditCard className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">უსაფრთხო ონლაინ გადახდა</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                      დააჭირეთ ქვემოთ მოცემულ ღილაკს და გადაგამისამართებთ ბანკის დაცულ გვერდზე ბარათის მონაცემების შესაყვანად.
                    </p>
                  </div>
                  <button
                    onClick={handleOnlinePayment}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    გადასვლა გადახდის გვერდზე →
                  </button>
                  <p className="text-xs text-slate-500">
                    🔒 მონაცემები დაცულია SSL სერტიფიკატით. ჩვენ არ ვინახავთ თქვენი ბარათის მონაცემებს.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">შეკვეთის შეჯამება</h3>
              
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-5 mb-6 text-white">
                <div className="text-sm opacity-80 mb-1">არჩეული პაკეტი</div>
                <div className="text-xl font-bold">{plan.name}</div>
                <div className="text-sm opacity-80 mt-2">{plan.description}</div>
              </div>

              {isBasic && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <IconGift className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-300 text-sm">14 დღე უფასო!</div>
                    <div className="text-xs text-amber-200/80 mt-1">
                      Basic პაკეტის არჩევისას იღებთ 14-დღიან უფასო საცდელ პერიოდს. ამ პერიოდის შემდეგ ავტომატურად გაგრძელდება არჩეული ციკლით.
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">პაკეტის ღირებულება</span>
                  <span className="text-white font-medium">₾{currentPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">ბილინგის ციკლი</span>
                  <span className="text-white font-medium">{durationText}</span>
                </div>
                {billing === 'yearly' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">ფასდაკლება</span>
                    <span className="text-emerald-400 font-medium">2 თვე უფასო</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">გადასახადი</span>
                  <span className="text-emerald-400 font-medium">უფასო</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-white">სულ გადასახდელი:</span>
                <span className="text-2xl font-bold text-emerald-400">₾{currentPrice}</span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 bg-slate-950 p-3 rounded-lg">
                <IconCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>გადახდის დადასტურების შემდეგ, თქვენი ანგარიში ავტომატურად განახლდება.</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

// ============ მთავარი ექსპორტი Suspense-ით ============
export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <IconLoader className="w-10 h-10 text-emerald-400 mr-3" />
        იტვირთება...
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}