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

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconEdit = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const IconTrash = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconGrid = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const IconList = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ CONFIG ============
const statusConfig = {
  owner_occupied: { label: 'მფლობელი ცხოვრობს', color: 'bg-emerald-500', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
  rented: { label: 'ქირავდება', color: 'bg-blue-500', textColor: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  vacant: { label: 'ცარიელია', color: 'bg-slate-400', textColor: 'text-slate-400', bgColor: 'bg-slate-400/10', borderColor: 'border-slate-400/30' },
  under_maintenance: { label: 'რემონტში', color: 'bg-amber-500', textColor: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
  reserved: { label: 'დაჯავშნილი', color: 'bg-purple-500', textColor: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
}

const unitTypeLabels = {
  studio: 'სტუდია',
  '1_bedroom': '1-ოთახიანი',
  '2_bedroom': '2-ოთახიანი',
  '3_bedroom': '3-ოთახიანი',
  '4_bedroom': '4-ოთახიანი',
  penthouse: 'პენტჰაუსი',
  duplex: 'დუპლექსი',
}

// ============ MAIN PAGE ============

export default function ApartmentsPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [apartments, setApartments] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingApartment, setEditingApartment] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    apartment_number: '', floor: '', area_sqm: '', rooms: '', bedrooms: '', bathrooms: '',
    unit_type: '1_bedroom', status: 'vacant', parking_spaces: '0', storage_units: '0',
    has_balcony: false, has_elevator_access: true, special_notes: '',
  })

  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return
      try {
        const { data: buildingData, error: buildingError } = await supabase.from('buildings').select('*').eq('id', buildingId).single()
        if (buildingError) throw buildingError
        setBuilding(buildingData)

        const { data: apartmentsData, error: apartmentsError } = await supabase
          .from('apartments')
          .select('*')
          .eq('building_id', buildingId)
          .order('floor', { ascending: false })
          .order('apartment_number', { ascending: true })
        if (apartmentsError) throw apartmentsError
        setApartments(apartmentsData || [])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const payload = {
      building_id: buildingId,
      apartment_number: formData.apartment_number,
      floor: parseInt(formData.floor) || 1,
      area_sqm: parseFloat(formData.area_sqm) || 0,
      rooms: parseInt(formData.rooms) || 1,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      unit_type: formData.unit_type,
      status: formData.status,
      parking_spaces: parseInt(formData.parking_spaces) || 0,
      storage_units: parseInt(formData.storage_units) || 0,
      has_balcony: formData.has_balcony,
      has_elevator_access: formData.has_elevator_access,
      special_notes: formData.special_notes || null,
    }

    const { error } = await supabase.from('apartments').insert(payload)

    if (error) {
      alert('შეცდომა: ' + error.message)
    } else {
      const { data } = await supabase.from('apartments').select('*').eq('building_id', buildingId).order('floor', { ascending: false }).order('apartment_number', { ascending: true })
      setApartments(data || [])
      setIsAddModalOpen(false)
      setFormData({
        apartment_number: '', floor: '', area_sqm: '', rooms: '', bedrooms: '', bathrooms: '',
        unit_type: '1_bedroom', status: 'vacant', parking_spaces: '0', storage_units: '0',
        has_balcony: false, has_elevator_access: true, special_notes: '',
      })
      
      if (building) {
        const newCount = (building.apartments_count || 0) + 1
        await supabase.from('buildings').update({ apartments_count: newCount }).eq('id', buildingId)
        setBuilding({ ...building, apartments_count: newCount })
      }
    }
    setIsProcessing(false)
  }

  const handleEditClick = (apt: any) => {
    setEditingApartment({
      ...apt,
      floor: apt.floor?.toString() || '',
      area_sqm: apt.area_sqm?.toString() || '',
      rooms: apt.rooms?.toString() || '',
      bedrooms: apt.bedrooms?.toString() || '',
      bathrooms: apt.bathrooms?.toString() || '',
      parking_spaces: apt.parking_spaces?.toString() || '0',
      storage_units: apt.storage_units?.toString() || '0',
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingApartment) return
    setIsProcessing(true)
    
    const payload = {
      apartment_number: editingApartment.apartment_number,
      floor: parseInt(editingApartment.floor) || 1,
      area_sqm: parseFloat(editingApartment.area_sqm) || 0,
      rooms: parseInt(editingApartment.rooms) || 1,
      bedrooms: editingApartment.bedrooms ? parseInt(editingApartment.bedrooms) : null,
      bathrooms: editingApartment.bathrooms ? parseInt(editingApartment.bathrooms) : null,
      unit_type: editingApartment.unit_type,
      status: editingApartment.status,
      parking_spaces: parseInt(editingApartment.parking_spaces) || 0,
      storage_units: parseInt(editingApartment.storage_units) || 0,
      has_balcony: editingApartment.has_balcony,
      has_elevator_access: editingApartment.has_elevator_access,
      special_notes: editingApartment.special_notes || null,
    }

    const { error } = await supabase.from('apartments').update(payload).eq('id', editingApartment.id)

    if (error) {
      alert('შეცდომა განახლებისას: ' + error.message)
    } else {
      const { data } = await supabase.from('apartments').select('*').eq('building_id', buildingId).order('floor', { ascending: false }).order('apartment_number', { ascending: true })
      setApartments(data || [])
      setIsEditModalOpen(false)
      setEditingApartment(null)
    }
    setIsProcessing(false)
  }

  const handleDeleteClick = async (aptId: string) => {
    if (confirm('დარწმუნებული ხარ, რომ გსურს ამ ბინის წაშლა? ეს მოქმედება შეუქცევადია.')) {
      const { error } = await supabase.from('apartments').delete().eq('id', aptId)
      if (error) {
        alert('შეცდომა წაშლისას: ' + error.message)
      } else {
        setApartments(prev => prev.filter(a => a.id !== aptId))
        if (building) {
          const newCount = Math.max(0, (building.apartments_count || 1) - 1)
          await supabase.from('buildings').update({ apartments_count: newCount }).eq('id', buildingId)
          setBuilding({ ...building, apartments_count: newCount })
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">ბინები იტვირთება...</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/building/${buildingId}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <IconArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
            </Link>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <IconBuilding className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold text-white">{building.name || building.street}</h1>
            </div>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            ბინის დამატება
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">ბინები</h2>
            <p className="text-slate-400 text-sm">
              სულ {apartments.length} ბინა
              {apartments.filter(a => a.status === 'vacant').length > 0 && (
                <span className="text-slate-500"> • {apartments.filter(a => a.status === 'vacant').length} ცარიელი</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              <IconGrid className="w-4 h-4" /> ბადე
            </button>
            <button onClick={() => setViewMode('table')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              <IconList className="w-4 h-4" /> სია
            </button>
          </div>
        </div>

        {/* Content */}
        {apartments.length === 0 ? (
          <div className="bg-slate-800/50 border border-white/10 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mb-4">
              <IconBuilding className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">ბინები ჯერ არ არის დამატებული</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-sm">დაამატე პირველი ბინა, რათა დაიწყო კორპუსის სრულფასოვანი მართვა.</p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              <IconPlus className="w-5 h-5" />
              ბინის დამატება
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {apartments.map((apt) => {
              const status = statusConfig[apt.status as keyof typeof statusConfig] || statusConfig.vacant
              return (
                <div key={apt.id} className={`group bg-slate-800/50 border ${status.borderColor} rounded-xl p-5 hover:bg-slate-800 transition-all duration-300 flex flex-col`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">ბინა {apt.apartment_number}</h3>
                      <p className="text-xs text-slate-400">სართული {apt.floor}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">ფართობი</span>
                      <span className="text-white font-medium">{apt.area_sqm || '—'} მ²</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">ოთახები</span>
                      <span className="text-white font-medium">{apt.rooms || '—'}</span>
                    </div>
                    {apt.unit_type && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">ტიპი</span>
                        <span className="text-white font-medium">{unitTypeLabels[apt.unit_type as keyof typeof unitTypeLabels] || apt.unit_type}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mb-4">
                    {apt.has_balcony && <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">აივანი</span>}
                    {apt.parking_spaces > 0 && <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{apt.parking_spaces} პარკინგი</span>}
                    {apt.storage_units > 0 && <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{apt.storage_units} სათავსო</span>}
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto">
                    <button 
                      onClick={() => handleEditClick(apt)}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-medium rounded-lg transition-colors"
                    >
                      <IconEdit className="w-3 h-3" /> რედაქტირება
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(apt.id)}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-medium rounded-lg transition-colors"
                    >
                      <IconTrash className="w-3 h-3" /> წაშლა
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-900/50">
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">ნომერი</th>
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">სართული</th>
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">ფართობი</th>
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">ოთახები</th>
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">ტიპი</th>
                    <th className="text-left p-4 text-slate-400 font-medium text-sm">სტატუსი</th>
                    <th className="text-right p-4 text-slate-400 font-medium text-sm">მოქმედებები</th>
                  </tr>
                </thead>
                <tbody>
                  {apartments.map((apt) => {
                    const status = statusConfig[apt.status as keyof typeof statusConfig] || statusConfig.vacant
                    return (
                      <tr key={apt.id} className="border-b border-white/5 hover:bg-slate-800/50 transition-colors">
                        <td className="p-4"><div className="font-semibold text-white">ბინა {apt.apartment_number}</div></td>
                        <td className="p-4 text-slate-300">{apt.floor}</td>
                        <td className="p-4 text-slate-300">{apt.area_sqm || '—'} მ²</td>
                        <td className="p-4 text-slate-300">{apt.rooms || '—'}</td>
                        <td className="p-4 text-slate-300">{unitTypeLabels[apt.unit_type as keyof typeof unitTypeLabels] || apt.unit_type || '—'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEditClick(apt)} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="რედაქტირება">
                              <IconEdit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteClick(apt.id)} className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors" title="წაშლა">
                              <IconTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ============ ADD APARTMENT MODAL ============ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
              <h3 className="text-xl font-bold text-white">ახალი ბინის დამატება</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <IconX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ბინის ნომერი *</label>
                  <input required name="apartment_number" value={formData.apartment_number} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 14A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სართული *</label>
                  <input required type="number" name="floor" value={formData.floor} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ფართობი (მ²) *</label>
                  <input required type="number" step="0.1" name="area_sqm" value={formData.area_sqm} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 85.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ოთახების რაოდენობა *</label>
                  <input required type="number" name="rooms" value={formData.rooms} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">საძინებლები</label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სააბაზანოები</label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="მაგ: 1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ბინის ტიპი</label>
                  <select name="unit_type" value={formData.unit_type} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none">
                    <option value="studio">სტუდია</option>
                    <option value="1_bedroom">1-ოთახიანი</option>
                    <option value="2_bedroom">2-ოთახიანი</option>
                    <option value="3_bedroom">3-ოთახიანი</option>
                    <option value="4_bedroom">4-ოთახიანი</option>
                    <option value="penthouse">პენტჰაუსი</option>
                    <option value="duplex">დუპლექსი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სტატუსი</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none">
                    <option value="vacant">ცარიელია</option>
                    <option value="owner_occupied">მფლობელი ცხოვრობს</option>
                    <option value="rented">ქირავდება</option>
                    <option value="under_maintenance">რემონტში</option>
                    <option value="reserved">დაჯავშნილი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">პარკინგის ადგილები</label>
                  <input type="number" name="parking_spaces" value={formData.parking_spaces} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სათავსოები</label>
                  <input type="number" name="storage_units" value={formData.storage_units} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none" placeholder="0" />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="has_balcony" checked={formData.has_balcony} onChange={handleInputChange} className="w-4 h-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50" />
                  <span className="text-sm text-slate-300">აქვს აივანი</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="has_elevator_access" checked={formData.has_elevator_access} onChange={handleInputChange} className="w-4 h-4 rounded border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50" />
                  <span className="text-sm text-slate-300">აქვს ლიფტთან წვდომა</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">დამატებითი შენიშვნები</label>
                <textarea name="special_notes" value={formData.special_notes} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none resize-none" placeholder="ნებისმიერი დამატებითი ინფორმაცია..."></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors">
                  გაუქმება
                </button>
                <button type="submit" disabled={isProcessing} className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isProcessing ? <IconLoader className="w-4 h-4" /> : <IconPlus className="w-4 h-4" />}
                  {isProcessing ? 'ინახება...' : 'დამატება'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ EDIT APARTMENT MODAL ============ */}
      {isEditModalOpen && editingApartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
              <h3 className="text-xl font-bold text-white">ბინის რედაქტირება: {editingApartment.apartment_number}</h3>
              <button onClick={() => { setIsEditModalOpen(false); setEditingApartment(null); }} className="text-slate-400 hover:text-white transition-colors">
                <IconX className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ბინის ნომერი *</label>
                  <input required name="apartment_number" value={editingApartment.apartment_number} onChange={(e) => setEditingApartment({...editingApartment, apartment_number: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სართული *</label>
                  <input required type="number" name="floor" value={editingApartment.floor} onChange={(e) => setEditingApartment({...editingApartment, floor: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ფართობი (მ²) *</label>
                  <input required type="number" step="0.1" name="area_sqm" value={editingApartment.area_sqm} onChange={(e) => setEditingApartment({...editingApartment, area_sqm: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ოთახების რაოდენობა *</label>
                  <input required type="number" name="rooms" value={editingApartment.rooms} onChange={(e) => setEditingApartment({...editingApartment, rooms: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">საძინებლები</label>
                  <input type="number" name="bedrooms" value={editingApartment.bedrooms || ''} onChange={(e) => setEditingApartment({...editingApartment, bedrooms: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სააბაზანოები</label>
                  <input type="number" name="bathrooms" value={editingApartment.bathrooms || ''} onChange={(e) => setEditingApartment({...editingApartment, bathrooms: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ბინის ტიპი</label>
                  <select name="unit_type" value={editingApartment.unit_type} onChange={(e) => setEditingApartment({...editingApartment, unit_type: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none">
                    <option value="studio">სტუდია</option>
                    <option value="1_bedroom">1-ოთახიანი</option>
                    <option value="2_bedroom">2-ოთახიანი</option>
                    <option value="3_bedroom">3-ოთახიანი</option>
                    <option value="4_bedroom">4-ოთახიანი</option>
                    <option value="penthouse">პენტჰაუსი</option>
                    <option value="duplex">დუპლექსი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სტატუსი</label>
                  <select name="status" value={editingApartment.status} onChange={(e) => setEditingApartment({...editingApartment, status: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none">
                    <option value="vacant">ცარიელია</option>
                    <option value="owner_occupied">მფლობელი ცხოვრობს</option>
                    <option value="rented">ქირავდება</option>
                    <option value="under_maintenance">რემონტში</option>
                    <option value="reserved">დაჯავშნილი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">პარკინგის ადგილები</label>
                  <input type="number" name="parking_spaces" value={editingApartment.parking_spaces} onChange={(e) => setEditingApartment({...editingApartment, parking_spaces: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">სათავსოები</label>
                  <input type="number" name="storage_units" value={editingApartment.storage_units} onChange={(e) => setEditingApartment({...editingApartment, storage_units: e.target.value})} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none" />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="has_balcony" checked={editingApartment.has_balcony} onChange={(e) => setEditingApartment({...editingApartment, has_balcony: e.target.checked})} className="w-4 h-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500/50" />
                  <span className="text-sm text-slate-300">აქვს აივანი</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="has_elevator_access" checked={editingApartment.has_elevator_access} onChange={(e) => setEditingApartment({...editingApartment, has_elevator_access: e.target.checked})} className="w-4 h-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500/50" />
                  <span className="text-sm text-slate-300">აქვს ლიფტთან წვდომა</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">დამატებითი შენიშვნები</label>
                <textarea name="special_notes" value={editingApartment.special_notes || ''} onChange={(e) => setEditingApartment({...editingApartment, special_notes: e.target.value})} rows={3} className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingApartment(null); }} className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors">
                  გაუქმება
                </button>
                <button type="submit" disabled={isProcessing} className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isProcessing ? <IconLoader className="w-4 h-4" /> : <IconEdit className="w-4 h-4" />}
                  {isProcessing ? 'ინახება...' : 'განახლება'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}