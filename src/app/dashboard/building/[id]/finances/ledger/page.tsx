'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconClock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconFileText = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const IconBell = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const IconLoader = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ STATUS CONFIG ============
const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; borderColor: string; icon: any }> = {
  paid: { label: 'გადახდილი', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/30', icon: IconCheck },
  pending_receipt: { label: 'ქვითარი ატვირთულია', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', borderColor: 'border-blue-500/30', icon: IconFileText },
  pending: { label: 'მოლოდინში', bgColor: 'bg-slate-400/10', textColor: 'text-slate-400', borderColor: 'border-slate-400/30', icon: IconClock },
  overdue: { label: 'გადაუხდელი', bgColor: 'bg-rose-500/10', textColor: 'text-rose-400', borderColor: 'border-rose-500/30', icon: IconAlertCircle },
  exempt: { label: 'განთავისუფლებული', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400', borderColor: 'border-purple-500/30', icon: IconCheck },
}

// ============ MAIN PAGE ============

export default function LedgerPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [fees, setFees] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [filter, setFilter] = useState<string>('all')
  
  // ცალკე სტეითები ინდივიდუალური და ჯგუფური მოქმედებებისთვის
  const [processingFeeId, setProcessingFeeId] = useState<string | null>(null)
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)
  
  // მონიშვნის სტეითი
  const [selectedFees, setSelectedFees] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return
      try {
        const { data: buildingData, error: buildingError } = await supabase
          .from('buildings')
          .select('*')
          .eq('id', buildingId)
          .single()

        if (buildingError) throw buildingError
        setBuilding(buildingData)

        await loadFees()
      } catch (error) {
        console.error('Error loading data:', error)
        alert('მონაცემების ჩატვირთვის შეცდომა')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [buildingId, router])

  useEffect(() => {
    if (buildingId && selectedMonth) {
      loadFees()
      setSelectedFees(new Set()) // თვის შეცვლისას გავასუფთავოთ მონიშვნა
    }
  }, [selectedMonth])

  const loadFees = async () => {
    const { data: feesData, error } = await supabase
      .from('monthly_fees')
      .select('*')
      .eq('building_id', buildingId)
      .eq('fee_month', selectedMonth + '-01')

    if (error) {
      console.error('Error loading fees:', error)
      alert('შეცდომა: ' + error.message)
      return
    }

    if (feesData && feesData.length > 0) {
      const apartmentIds = feesData.map(f => f.apartment_id)
      
      const { data: apartmentsData } = await supabase
        .from('apartments')
        .select('id, apartment_number, floor, area_sqm')
        .in('id', apartmentIds)

      const { data: ownersData } = await supabase
        .from('owners')
        .select('apartment_id, full_name, phone')
        .in('apartment_id', apartmentIds)

      const enrichedFees = feesData.map(fee => {
        const apartment = apartmentsData?.find(a => a.id === fee.apartment_id)
        const owners = ownersData?.filter(o => o.apartment_id === fee.apartment_id) || []
        
        return {
          ...fee,
          apartments: apartment ? [apartment] : [],
          owners: owners
        }
      })

      setFees(enrichedFees)
    } else {
      setFees([])
    }
  }

  // ============ SELECTION HANDLERS ============
  const handleSelectFee = (feeId: string) => {
    const newSelected = new Set(selectedFees)
    if (newSelected.has(feeId)) {
      newSelected.delete(feeId)
    } else {
      newSelected.add(feeId)
    }
    setSelectedFees(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedFees.size === filteredFees.length) {
      setSelectedFees(new Set())
    } else {
      setSelectedFees(new Set(filteredFees.map(f => f.id)))
    }
  }

  // ============ DELETE HANDLERS ============
  const handleDeleteFee = async (feeId: string) => {
    if (!confirm('დარწმუნებული ხარ, რომ გსურს ამ ჩანაწერის წაშლა?')) return
    setProcessingFeeId(feeId)

    const { error } = await supabase
      .from('monthly_fees')
      .delete()
      .eq('id', feeId)

    if (error) {
      alert('შეცდომა წაშლისას: ' + error.message)
    } else {
      await loadFees()
      setSelectedFees(prev => {
        const newSet = new Set(prev)
        newSet.delete(feeId)
        return newSet
      })
    }
    setProcessingFeeId(null)
  }

  const handleBulkDelete = async () => {
    if (selectedFees.size === 0) {
      alert('არ არის მონიშნული ჩანაწერები')
      return
    }
    if (!confirm(`დარწმუნებული ხარ, რომ გსურს ${selectedFees.size} ჩანაწერის წაშლა?`)) return
    setIsBulkProcessing(true)

    const feeIds = Array.from(selectedFees)
    const { error } = await supabase
      .from('monthly_fees')
      .delete()
      .in('id', feeIds)

    if (error) {
      alert('შეცდომა წაშლისას: ' + error.message)
    } else {
      alert(`წარმატებით წაიშალა ${selectedFees.size} ჩანაწერი`)
      await loadFees()
      setSelectedFees(new Set())
    }
    setIsBulkProcessing(false)
  }

  // ============ VERIFY & REMIND HANDLERS ============
  const handleVerify = async (feeId: string) => {
    if (!confirm('დაადასტურე გადახდა?')) return
    setProcessingFeeId(feeId)

    const { error } = await supabase
      .from('monthly_fees')
      .update({ 
        status: 'paid',
        verified_by: (await supabase.auth.getUser()).data.user?.id,
        verified_at: new Date().toISOString(),
        payment_confirmed_at: new Date().toISOString()
      })
      .eq('id', feeId)

    if (error) {
      alert('შეცდომა: ' + error.message)
    } else {
      // წარმატების შემთხვევაში ვხსნით მონიშვნას
      setSelectedFees(prev => {
        const newSet = new Set(prev)
        newSet.delete(feeId)
        return newSet
      })
      await loadFees()
    }
    setProcessingFeeId(null)
  }

  const handleSendReminder = async (feeId: string) => {
    if (!confirm('გაუგზავნო შეხსენება მფლობელს?')) return
    setProcessingFeeId(feeId)

    const { error } = await supabase
      .from('monthly_fees')
      .update({ 
        reminder_sent: true,
        reminder_count: (fees.find(f => f.id === feeId)?.reminder_count || 0) + 1,
        reminder_last_sent: new Date().toISOString()
      })
      .eq('id', feeId)

    if (error) {
      alert('შეცდომა: ' + error.message)
    } else {
      alert('შეხსენება გაიგზავნა!')
      // წარმატების შემთხვევაში ვხსნით მონიშვნას
      setSelectedFees(prev => {
        const newSet = new Set(prev)
        newSet.delete(feeId)
        return newSet
      })
      await loadFees()
    }
    setProcessingFeeId(null)
  }

  const handleBulkRemind = async () => {
    const overdueFees = fees.filter(f => f.status === 'overdue' || f.status === 'pending')
    if (overdueFees.length === 0) {
      alert('არ არის გადაუხდელი ბინები')
      return
    }
    if (!confirm(`გაუგზავნო შეხსენება ${overdueFees.length} ბინას?`)) return
    setIsBulkProcessing(true)

    const feeIds = overdueFees.map(f => f.id)
    const { error } = await supabase
      .from('monthly_fees')
      .update({ 
        reminder_sent: true,
        reminder_last_sent: new Date().toISOString()
      })
      .in('id', feeIds)

    if (error) {
      alert('შეცდომა: ' + error.message)
    } else {
      alert(`შეხსენება გაიგზავნა ${overdueFees.length} ბინისთვის!`)
      await loadFees()
    }
    setIsBulkProcessing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">იტვირთება...</div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">კორპუსი ვერ მოიძებნა</div>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">← Dashboard-ზე დაბრუნება</Link>
        </div>
      </div>
    )
  }

  const filteredFees = filter === 'all' ? fees : fees.filter(f => f.status === filter)

  const stats = {
    total: fees.length,
    paid: fees.filter(f => f.status === 'paid').length,
    pending_receipt: fees.filter(f => f.status === 'pending_receipt').length,
    pending: fees.filter(f => f.status === 'pending').length,
    overdue: fees.filter(f => f.status === 'overdue').length,
    exempt: fees.filter(f => f.status === 'exempt').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/building/${buildingId}/finances`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <IconArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
            </Link>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold text-white">{building.name || building.street}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">აღრიცხვის ჟურნალი</h2>
            <p className="text-slate-400">გადახდების კონტროლი და მართვა</p>
          </div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-slate-400">სულ ბინა</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">{stats.paid}</div>
            <div className="text-xs text-slate-400">გადახდილი</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.pending_receipt}</div>
            <div className="text-xs text-slate-400">ქვითარი</div>
          </div>
          <div className="bg-slate-400/10 border border-slate-400/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-slate-400">{stats.pending}</div>
            <div className="text-xs text-slate-400">მოლოდინში</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-rose-400">{stats.overdue}</div>
            <div className="text-xs text-slate-400">გადაუხდელი</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{stats.exempt}</div>
            <div className="text-xs text-slate-400">განთავისუფლებული</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-emerald-500 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              ყველა ({stats.total})
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'paid' ? 'bg-emerald-500 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              გადახდილი ({stats.paid})
            </button>
            <button
              onClick={() => setFilter('pending_receipt')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending_receipt' ? 'bg-blue-500 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              ქვითარი ({stats.pending_receipt})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending' ? 'bg-slate-500 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              მოლოდინში ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'overdue' ? 'bg-rose-500 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              გადაუხდელი ({stats.overdue})
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBulkRemind}
              disabled={isBulkProcessing || stats.overdue + stats.pending === 0}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isBulkProcessing ? <IconLoader className="w-4 h-4" /> : <IconBell className="w-4 h-4" />}
              ყველას შეხსენება
            </button>
            
            {selectedFees.size > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isBulkProcessing}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {isBulkProcessing ? <IconLoader className="w-4 h-4" /> : <IconTrash className="w-4 h-4" />}
                წაშლა ({selectedFees.size})
              </button>
            )}
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedFees.size > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4 flex items-center justify-between">
            <div className="text-sm text-blue-400">
              მონიშნულია <span className="font-bold">{selectedFees.size}</span> ჩანაწერი
            </div>
            <button
              onClick={() => setSelectedFees(new Set())}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              გასუფთავება
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/50">
                  <th className="text-left p-4 w-12">
                    <input
                      type="checkbox"
                      checked={filteredFees.length > 0 && selectedFees.size === filteredFees.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                    />
                  </th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">ბინა</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">მფლობელი</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">თანხა</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">სტატუსი</th>
                  <th className="text-left p-4 text-slate-400 font-medium text-sm">ქვითარი</th>
                  <th className="text-right p-4 text-slate-400 font-medium text-sm">მოქმედება</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      ამ თვისთვის გადასახადები არ არის გენერირებული
                    </td>
                  </tr>
                ) : (
                  filteredFees.map((fee) => {
                    const status = statusConfig[fee.status] || statusConfig.pending
                    const StatusIcon = status.icon
                    const owner = fee.owners?.[0]
                    const apartment = fee.apartments?.[0]
                    const isSelected = selectedFees.has(fee.id)
                    const isProcessingThis = processingFeeId === fee.id

                    return (
                      <tr 
                        key={fee.id} 
                        className={`border-b border-white/5 transition-colors ${
                          isSelected ? 'bg-blue-500/10' : 'hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectFee(fee.id)}
                            className="w-4 h-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white">ბინა {apartment?.apartment_number || '—'}</div>
                          <div className="text-xs text-slate-400">სართული {apartment?.floor || '—'}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-white">{owner?.full_name || '—'}</div>
                          {owner?.phone && (
                            <div className="text-xs text-slate-400">{owner.phone}</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">₾{Number(fee.amount || 0).toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="p-4">
                          {fee.receipt_url ? (
                            <a
                              href={fee.receipt_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              ნახვა
                            </a>
                          ) : (
                            <span className="text-slate-500 text-sm">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            {(fee.status === 'pending_receipt' || fee.status === 'pending' || fee.status === 'overdue') && (
                              <button
                                onClick={() => handleVerify(fee.id)}
                                disabled={isProcessingThis}
                                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                              >
                                {isProcessingThis ? <IconLoader className="w-3 h-3" /> : <IconCheck className="w-3 h-3" />}
                                {isProcessingThis ? 'მუშავდება...' : 'დადასტურება'}
                              </button>
                            )}
                            {(fee.status === 'pending' || fee.status === 'overdue') && (
                              <button
                                onClick={() => handleSendReminder(fee.id)}
                                disabled={isProcessingThis}
                                className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
                              >
                                {isProcessingThis ? <IconLoader className="w-3 h-3" /> : <IconBell className="w-3 h-3" />}
                                {isProcessingThis ? 'იგზავნება...' : 'შეხსენება'}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteFee(fee.id)}
                              disabled={isProcessingThis}
                              className="flex items-center justify-center p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors disabled:opacity-50"
                              title="წაშლა"
                            >
                              {isProcessingThis ? <IconLoader className="w-4 h-4" /> : <IconTrash className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}