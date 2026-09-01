'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconBuilding = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" />
  </svg>
)

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconEdit = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconTrash = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconRefresh = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
)

const IconLoader = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconPin = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="17" x2="12" y2="22" /><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
  </svg>
)

// ============ CONFIRM MODAL ============
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, variant = "default" }: {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  variant?: "default" | "danger" | "warning"
}) {
  if (!isOpen) return null
  const btnStyle = variant === "danger" ? "bg-rose-500 hover:bg-rose-600" : variant === "warning" ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-5 py-2.5 text-slate-300 hover:text-white font-medium rounded-lg transition-colors">გაუქმება</button>
          <button onClick={onConfirm} className={`px-5 py-2.5 text-white font-medium rounded-lg transition-colors ${btnStyle}`}>დადასტურება</button>
        </div>
      </div>
    </div>
  )
}

// ============ ALERT MODAL ============
function AlertModal({ isOpen, title, message, onClose, variant = "info" }: {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
  variant?: "info" | "success" | "error" | "warning"
}) {
  if (!isOpen) return null
  const colors: Record<string, string> = { 
    info: "text-blue-400 bg-blue-500/20", 
    success: "text-emerald-400 bg-emerald-500/20", 
    error: "text-rose-400 bg-rose-500/20", 
    warning: "text-amber-400 bg-amber-500/20" 
  }
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-xl ${colors[variant]} flex items-center justify-center flex-shrink-0`}>
            {variant === "success" ? <IconCheck className="w-5 h-5" /> : variant === "error" ? <IconX className="w-5 h-5" /> : <IconClock className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-slate-300 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors">OK</button>
        </div>
      </div>
    </div>
  )
}

// ============ MAIN PAGE ============
export default function ExpensesPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [expenses, setExpenses] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<any>(null)
  const [confirmModal, setConfirmModal] = useState<any>({ isOpen: false })
  const [alertModal, setAlertModal] = useState<any>({ isOpen: false })

  // Form
  const [form, setForm] = useState({ description: '', amount: '', is_recurring: false, category_id: '' })

  const showAlert = (title: string, message: string, variant: "info" | "success" | "error" | "warning" = "info") => setAlertModal({ isOpen: true, title, message, variant })
  const showConfirm = (title: string, message: string, onConfirm: () => void, variant: "default" | "danger" | "warning" = "default") => setConfirmModal({ isOpen: true, title, message, onConfirm, variant })

  useEffect(() => {
    const init = async () => {
      if (!buildingId) return
      try {
        const { data: b } = await supabase.from('buildings').select('*').eq('id', buildingId).single()
        if (b) setBuilding(b)

        const { data: cats } = await supabase.from('expense_categories').select('id, name').eq('building_id', buildingId)
        setCategories(cats || [])

        await loadTemplates()
        await loadExpenses()
      } catch (e) {
        console.error(e)
        router.push('/dashboard')
      } finally { setLoading(false) }
    }
    init()
  }, [buildingId])

  useEffect(() => { if (buildingId && selectedMonth) loadExpenses() }, [selectedMonth])

  const loadTemplates = async () => {
    const { data } = await supabase.from('expense_templates').select('*').eq('building_id', buildingId).eq('is_active', true).order('created_at')
    setTemplates(data || [])
  }

  const loadExpenses = async () => {
    const { data } = await supabase.from('expenses').select('*').eq('building_id', buildingId).eq('expense_month', selectedMonth + '-01').order('is_paid').order('created_at')
    setExpenses(data || [])
  }

  // Auto-generate from templates
  const handleAutoGenerate = async () => {
    if (templates.length === 0) { showAlert('ყურადღება', 'არ არის ფიქსირებული შაბლონები', 'warning'); return }

    const existingTemplateIds = expenses.filter(e => e.template_id).map(e => e.template_id)
    const missing = templates.filter(t => !existingTemplateIds.includes(t.id))

    if (missing.length === 0) { showAlert('ინფორმაცია', 'ყველა ფიქსირებული გადასახადი უკვე არსებობს ამ თვეში', 'info'); return }

    showConfirm('ავტო-გენერაცია', `${missing.length} ფიქსირებული გადასახადი დაემატება ამ თვეს. გაგრძელება?`, async () => {
      setConfirmModal({ isOpen: false })
      const toInsert = missing.map(t => ({
        building_id: buildingId,
        template_id: t.id,
        category_id: t.category_id,
        description: t.description,
        amount: t.amount,
        expense_date: selectedMonth + '-01',
        expense_month: selectedMonth + '-01',
        is_paid: false,
        is_recurring: true,
      }))
      const { error } = await supabase.from('expenses').insert(toInsert)
      if (error) showAlert('შეცდომა', error.message, 'error')
      else { showAlert('წარმატება', `${missing.length} გადასახადი დაემატა`, 'success'); await loadExpenses() }
    })
  }

  // Add expense
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description || !form.amount) return
    setProcessingId('add')

    const payload: any = {
      building_id: buildingId,
      description: form.description,
      amount: parseFloat(form.amount),
      expense_date: selectedMonth + '-01',
      expense_month: selectedMonth + '-01',
      is_paid: false,
      is_recurring: form.is_recurring,
      category_id: form.category_id || null,
    }

    const { error } = await supabase.from('expenses').insert(payload)
    if (error) showAlert('შეცდომა', error.message, 'error')
    else {
      if (form.is_recurring) {
        await supabase.from('expense_templates').insert({
          building_id: buildingId,
          description: form.description,
          amount: parseFloat(form.amount),
          category_id: form.category_id || null,
          is_active: true,
        })
        await loadTemplates()
      }
      showAlert('წარმატება', 'გადასახადი დაემატა', 'success')
      setIsAddModalOpen(false)
      setForm({ description: '', amount: '', is_recurring: false, category_id: '' })
      await loadExpenses()
    }
    setProcessingId(null)
  }

  // Edit expense
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExpense) return
    setProcessingId(editingExpense.id)

    const { error } = await supabase.from('expenses').update({
      description: editingExpense.description,
      amount: parseFloat(editingExpense.amount),
    }).eq('id', editingExpense.id)

    if (error) showAlert('შეცდომა', error.message, 'error')
    else {
      if (editingExpense.template_id) {
        await supabase.from('expense_templates').update({
          description: editingExpense.description,
          amount: parseFloat(editingExpense.amount),
        }).eq('id', editingExpense.template_id)
        await loadTemplates()
      }
      showAlert('წარმატება', 'გადასახადი განახლდა', 'success')
      setEditingExpense(null)
      await loadExpenses()
    }
    setProcessingId(null)
  }

  // Delete
  const handleDelete = (id: string) => {
    showConfirm('წაშლა', 'დარწმუნებული ხარ, რომ გსურს ამ გადასახადის წაშლა?', async () => {
      setConfirmModal({ isOpen: false })
      setProcessingId(id)
      const { error } = await supabase.from('expenses').delete().eq('id', id)
      if (error) showAlert('შეცდომა', error.message, 'error')
      else { await loadExpenses(); showAlert('წარმატება', 'გადასახადი წაიშალა', 'success') }
      setProcessingId(null)
    }, 'danger')
  }

  // Mark as paid
  const handleMarkPaid = async (id: string) => {
    setProcessingId(id)
    const { error } = await supabase.from('expenses').update({ is_paid: true, paid_date: new Date().toISOString().slice(0, 10) }).eq('id', id)
    if (error) showAlert('შეცდომა', error.message, 'error')
    else await loadExpenses()
    setProcessingId(null)
  }

  // Pay all
  const handlePayAll = () => {
    const unpaid = expenses.filter(e => !e.is_paid)
    if (unpaid.length === 0) { showAlert('ინფორმაცია', 'ყველა გადასახადი უკვე გადახდილია', 'info'); return }
    showConfirm('ყველას გადახდა', `${unpaid.length} გადასახადი მოინიშნება გადახდილად. ჯამი: ₾${unpaid.reduce((s, e) => s + Number(e.amount), 0).toLocaleString()}`, async () => {
      setConfirmModal({ isOpen: false })
      setIsBulkProcessing(true)
      const ids = unpaid.map(e => e.id)
      const { error } = await supabase.from('expenses').update({ is_paid: true, paid_date: new Date().toISOString().slice(0, 10) }).in('id', ids)
      if (error) showAlert('შეცდომა', error.message, 'error')
      else { showAlert('წარმატება', `${unpaid.length} გადასახადი გადახდილად მოინიშნა`, 'success'); await loadExpenses() }
      setIsBulkProcessing(false)
    })
  }

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><IconLoader className="w-12 h-12 text-emerald-400" /></div>
  if (!building) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">კორპუსი ვერ მოიძებნა</div>

  const fixedExpenses = expenses.filter(e => e.template_id || e.is_recurring)
  const variableExpenses = expenses.filter(e => !e.template_id && !e.is_recurring)
  const totalAmount = expenses.reduce((s, e) => s + Number(e.amount), 0)
  const paidAmount = expenses.filter(e => e.is_paid).reduce((s, e) => s + Number(e.amount), 0)
  const unpaidAmount = totalAmount - paidAmount

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/building/${buildingId}/finances`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <IconArrowLeft /><span className="text-sm font-medium hidden sm:inline">უკან</span>
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2"><IconBuilding className="w-5 h-5 text-emerald-400" /><h1 className="text-lg font-bold text-white">{building.name || building.street}</h1></div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">გადასახადები</h2>
            <p className="text-slate-400 text-sm">კორპუსის ყოველთვიური ხარჯების მართვა</p>
          </div>
          <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">₾{totalAmount.toLocaleString()}</div>
            <div className="text-xs text-slate-400">სულ გადასახდელი</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">₾{paidAmount.toLocaleString()}</div>
            <div className="text-xs text-slate-400">გადახდილი</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-rose-400">₾{unpaidAmount.toLocaleString()}</div>
            <div className="text-xs text-slate-400">დარჩენილი</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
            <IconPlus className="w-4 h-4" /> ახალი გადასახადი
          </button>
          <button onClick={handleAutoGenerate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
            <IconRefresh className="w-4 h-4" /> ფიქსირებულების გენერაცია
          </button>
          <button onClick={handlePayAll} disabled={isBulkProcessing || unpaidAmount === 0} className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors">
            {isBulkProcessing ? <IconLoader /> : <IconCheck />} ყველას გადახდა
          </button>
        </div>

        {/* Fixed Expenses */}
        {fixedExpenses.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><IconPin className="w-5 h-5 text-blue-400" /> ფიქსირებული (ყოველთვიური)</h3>
            <div className="space-y-2">
              {fixedExpenses.map(exp => (
                <div key={exp.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${exp.is_paid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/50 border-white/10'}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${exp.is_paid ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                      {exp.is_paid ? <IconCheck className="w-5 h-5 text-emerald-400" /> : <IconPin className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div>
                      <div className="font-medium text-white">{exp.description}</div>
                      <div className="text-xs text-slate-400">ფიქსირებული • ყოველთვიური</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white text-lg">₾{Number(exp.amount).toLocaleString()}</div>
                      <div className={`text-xs font-medium ${exp.is_paid ? 'text-emerald-400' : 'text-rose-400'}`}>{exp.is_paid ? '✓ გადახდილი' : '⏳ გადაუხდელი'}</div>
                    </div>
                    {!exp.is_paid && (
                      <div className="flex gap-1">
                        <button onClick={() => handleMarkPaid(exp.id)} disabled={processingId === exp.id} className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors" title="გადახდილად მონიშვნა">
                          {processingId === exp.id ? <IconLoader /> : <IconCheck />}
                        </button>
                        <button onClick={() => setEditingExpense({ ...exp, amount: exp.amount.toString() })} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" title="რედაქტირება"><IconEdit /></button>
                        <button onClick={() => handleDelete(exp.id)} disabled={processingId === exp.id} className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors" title="წაშლა"><IconTrash /></button>
                      </div>
                    )}
                    {exp.is_paid && <span className="text-xs text-slate-500 italic">დაბლოკილი</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Variable Expenses */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><IconRefresh className="w-5 h-5 text-amber-400" /> ცვალებადი (ერთჯერადი)</h3>
          {variableExpenses.length === 0 ? (
            <div className="bg-slate-800/30 border border-dashed border-white/10 rounded-xl p-8 text-center">
              <p className="text-slate-400 mb-3">ამ თვეში ცვალებადი გადასახადები არ არის</p>
              <button onClick={() => setIsAddModalOpen(true)} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">+ ახალი გადასახადის დამატება</button>
            </div>
          ) : (
            <div className="space-y-2">
              {variableExpenses.map(exp => (
                <div key={exp.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${exp.is_paid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/50 border-white/10'}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${exp.is_paid ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                      {exp.is_paid ? <IconCheck className="w-5 h-5 text-emerald-400" /> : <IconClock className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div>
                      <div className="font-medium text-white">{exp.description}</div>
                      <div className="text-xs text-slate-400">ცვალებადი • ერთჯერადი</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white text-lg">₾{Number(exp.amount).toLocaleString()}</div>
                      <div className={`text-xs font-medium ${exp.is_paid ? 'text-emerald-400' : 'text-rose-400'}`}>{exp.is_paid ? '✓ გადახდილი' : '⏳ გადაუხდელი'}</div>
                    </div>
                    {!exp.is_paid && (
                      <div className="flex gap-1">
                        <button onClick={() => handleMarkPaid(exp.id)} disabled={processingId === exp.id} className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors" title="გადახდილად მონიშვნა">
                          {processingId === exp.id ? <IconLoader /> : <IconCheck />}
                        </button>
                        <button onClick={() => setEditingExpense({ ...exp, amount: exp.amount.toString() })} className="p-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors" title="რედაქტირება"><IconEdit /></button>
                        <button onClick={() => handleDelete(exp.id)} disabled={processingId === exp.id} className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors" title="წაშლა"><IconTrash /></button>
                      </div>
                    )}
                    {exp.is_paid && <span className="text-xs text-slate-500 italic">დაბლოკილი</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">ახალი გადასახადი</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white"><IconX /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">აღწერა *</label>
                <input required value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="მაგ: წყლის ქვითარი სექტემბერი" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">თანხა (₾) *</label>
                <input required type="number" step="0.01" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="მაგ: 500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">კატეგორია</label>
                <select value={form.category_id} onChange={(e) => setForm({...form, category_id: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option value="" className="bg-slate-800">აირჩიეთ კატეგორია</option>
                  {categories.map(c => <option key={c.id} value={c.id} className="bg-slate-800">{c.name}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-800/50 border border-white/10 rounded-lg">
                <input type="checkbox" checked={form.is_recurring} onChange={(e) => setForm({...form, is_recurring: e.target.checked})} className="w-5 h-5 rounded border-white/20 bg-slate-800 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-white">ფიქსირებული ყოველთვიურად</div>
                  <div className="text-xs text-slate-400">მომდევნო თვეებში ავტომატურად გამოჩნდება</div>
                </div>
              </label>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-slate-300 hover:text-white font-medium">გაუქმება</button>
                <button type="submit" disabled={processingId === 'add'} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg">
                  {processingId === 'add' ? <IconLoader /> : <IconPlus className="w-4 h-4" />} შენახვა
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">რედაქტირება</h3>
              <button onClick={() => setEditingExpense(null)} className="text-slate-400 hover:text-white"><IconX /></button>
            </div>
            <form onSubmit={handleEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">აღწერა</label>
                <input value={editingExpense.description} onChange={(e) => setEditingExpense({...editingExpense, description: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">თანხა (₾)</label>
                <input type="number" step="0.01" value={editingExpense.amount} onChange={(e) => setEditingExpense({...editingExpense, amount: e.target.value})} className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              {editingExpense.template_id && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-400">
                  💡 ეს ფიქსირებული გადასახადია. თანხის შეცვლა განაახლებს შაბლონს მომდევნო თვეებისთვის.
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setEditingExpense(null)} className="px-5 py-2.5 text-slate-300 hover:text-white font-medium">გაუქმება</button>
                <button type="submit" disabled={processingId === editingExpense.id} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg">
                  {processingId === editingExpense.id ? <IconLoader /> : <IconEdit />} განახლება
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal {...confirmModal} onCancel={() => setConfirmModal({ isOpen: false })} />
      <AlertModal {...alertModal} onClose={() => setAlertModal({ isOpen: false })} />
    </div>
  )
}