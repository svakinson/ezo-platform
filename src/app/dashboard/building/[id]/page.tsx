'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ============ ICONS ============
const IconBuilding = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const IconWallet = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconZap = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconShield = ({ className = "w-5 h-5" }: { className?: string }) => (
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

const IconPhone = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconMail = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconSend = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const IconSettings = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

// ============ TABS CONFIG ============
const tabs = [
  { id: 'overview', label: 'მიმოხილვა', icon: IconBuilding },
  { id: 'apartments', label: 'ბინები', icon: IconUser },
  { id: 'payments', label: 'გადახდები', icon: IconWallet },
  { id: 'announcements', label: 'შეტყობინებები', icon: IconSend },
  { id: 'settings', label: 'პარამეტრები', icon: IconSettings },
]

// ============ MAIN PAGE ============
export default function BuildingPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [utilities, setUtilities] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<any>({})

  // Delete Modal State
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return
      setLoading(true)
      try {
        const { data: buildingData, error: buildingError } = await supabase
          .from('buildings')
          .select('*')
          .eq('id', buildingId)
          .single()

        if (buildingError) throw buildingError
        setBuilding(buildingData)
        setEditForm(buildingData) // Initialize edit form

        const { data: contactsData, error: contactsError } = await supabase
          .from('building_contacts')
          .select('*')
          .eq('building_id', buildingId)

        if (contactsError) throw contactsError
        setContacts(contactsData || [])

        const { data: utilitiesData, error: utilitiesError } = await supabase
          .from('building_utilities')
          .select('*')
          .eq('building_id', buildingId)
          .single()

        if (utilitiesError && utilitiesError.code !== 'PGRST116') throw utilitiesError
        setUtilities(utilitiesData)

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

  const handleSaveEdit = async () => {
    try {
      const { error } = await supabase
        .from('buildings')
        .update({
          name: editForm.name,
          street: editForm.street,
          city: editForm.city,
          district: editForm.district,
          postal_code: editForm.postal_code,
          building_type: editForm.building_type,
          construction_year: editForm.construction_year ? parseInt(editForm.construction_year) : null,
          floors: editForm.floors ? parseInt(editForm.floors) : null,
          apartments_count: editForm.apartments_count ? parseInt(editForm.apartments_count) : null,
          entrances_count: editForm.entrances_count ? parseInt(editForm.entrances_count) : null,
          total_area: editForm.total_area ? parseFloat(editForm.total_area) : null,
        })
        .eq('id', buildingId)

      if (error) throw error
      setIsEditModalOpen(false)
      // Reload data
      const { data } = await supabase.from('buildings').select('*').eq('id', buildingId).single()
      setBuilding(data)
      alert('კორპუსის ინფორმაცია წარმატებით განახლდა!')
    } catch (error: any) {
      console.error('Edit error:', error)
      alert('შეცდომა განახლებისას: ' + error.message)
    }
  }

  const handleDeleteBuilding = async () => {
    try {
      // Cascade delete related data
      await supabase.from('apartments').delete().eq('building_id', buildingId)
      await supabase.from('building_settings').delete().eq('building_id', buildingId)
      await supabase.from('building_utilities').delete().eq('building_id', buildingId)
      await supabase.from('building_contacts').delete().eq('building_id', buildingId)
      
      const { error } = await supabase.from('buildings').delete().eq('id', buildingId)
      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      console.error('Delete error:', error)
      alert('შეცდომა წაშლისას: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">მონაცემები იტვირთება...</div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">კორპუსი ვერ მოიძებნა</div>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">← Dashboard-ზე დაბრუნება</Link>
        </div>
      </div>
    )
  }

  const manager = contacts.find(c => c.role === 'manager')
  const emergency = contacts.find(c => c.role === 'emergency')
  const accountant = contacts.find(c => c.role === 'accountant')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors">
            <IconArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
          </Link>
          <div className="flex items-center gap-3">
            <IconBuilding className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white truncate max-w-[200px] sm:max-w-md">{building.name || building.street}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              <span className="hidden sm:inline">რედაქტირება</span>
            </button>
            <button 
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium rounded-lg transition-colors"
            >
              <IconTrash className="w-4 h-4" />
              <span className="hidden sm:inline">წაშლა</span>
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-t border-white/5 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                      isActive 
                        ? 'border-emerald-500 text-emerald-400' 
                        : 'border-transparent text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconBuilding className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.apartments_count || '0'}</div>
                <div className="text-sm text-slate-400">ბინები</div>
              </div>
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconBuilding className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.entrances_count || '0'}</div>
                <div className="text-sm text-slate-400">სადარბაზო</div>
              </div>
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconBuilding className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.floors || '0'}</div>
                <div className="text-sm text-slate-400">სართული</div>
              </div>
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconBuilding className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.total_area || '0'} <span className="text-lg text-slate-400">მ²</span></div>
                <div className="text-sm text-slate-400">ფართობი</div>
              </div>
            </div>

            {/* Building Info */}
            <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">კორპუსის ინფორმაცია</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">სახელი</div>
                  <div className="text-white font-medium">{building.name || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">მისამართი</div>
                  <div className="text-white font-medium">{building.street}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">ქალაქი / უბანი</div>
                  <div className="text-white font-medium">{building.city}{building.district ? `, ${building.district}` : ''}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">კორპუსის ტიპი</div>
                  <div className="text-white font-medium capitalize">
                    {building.building_type === 'multi-family' ? 'მრავალსართულიანი საცხოვრებელი' : 
                     building.building_type === 'private-houses' ? 'კერძო სახლების კომპლექსი' : 
                     building.building_type === 'business-center' ? 'ბიზნეს ცენტრი' : building.building_type || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">აგების წელი</div>
                  <div className="text-white font-medium">{building.construction_year || '—'}</div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">საკონტაქტო პირები</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Manager */}
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <IconUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">მთავარი მმართველი</div>
                      <div className="text-white font-bold">{manager?.full_name || '—'}</div>
                    </div>
                  </div>
                  {manager?.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                      <IconPhone className="w-4 h-4 text-emerald-400" /> {manager.phone}
                    </div>
                  )}
                  {manager?.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <IconMail className="w-4 h-4 text-emerald-400" /> {manager.email}
                    </div>
                  )}
                </div>

                {/* Emergency */}
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                      <IconShield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">საგანგებო კონტაქტი</div>
                      <div className="text-white font-bold">{emergency?.full_name || '—'}</div>
                    </div>
                  </div>
                  {emergency?.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                      <IconPhone className="w-4 h-4 text-rose-400" /> {emergency.phone}
                    </div>
                  )}
                  {emergency?.position && (
                    <div className="text-sm text-slate-400">{emergency.position}</div>
                  )}
                </div>

                {/* Accountant */}
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <IconUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">ბუღალტერი</div>
                      <div className="text-white font-bold">{accountant?.full_name || '—'}</div>
                    </div>
                  </div>
                  {accountant?.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <IconPhone className="w-4 h-4 text-blue-400" /> {accountant.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Utilities */}
            {utilities && (
              <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">კომუნალური სერვისები</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Electricity */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <IconZap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">ელექტროენერგია</div>
                        <div className="text-white font-bold">{utilities.electricity_provider || '—'}</div>
                      </div>
                    </div>
                  </div>
                  {/* Water */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">წყალი</div>
                        <div className="text-white font-bold">{utilities.water_provider || '—'}</div>
                      </div>
                    </div>
                  </div>
                  {/* Gas */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 0-7 4-7 11v3l-2 2h18l-2-2v-3c0-7-7-11-7-11z" /></svg>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">გაზი</div>
                        <div className="text-white font-bold">{utilities.gas_provider || '—'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: APARTMENTS */}
        {activeTab === 'apartments' && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">ბინების მართვა</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors">
                <IconPlus className="w-4 h-4" /> ბინის დამატება
              </button>
            </div>
            <div className="text-center py-12 text-slate-400">
              <IconBuilding className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>ბინების სია და მართვის ინსტრუმენტები მალე დაემატება.</p>
            </div>
          </div>
        )}

        {/* TAB: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">გადახდების ჟურნალი</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors">
                <IconPlus className="w-4 h-4" /> გადახდის დამატება
              </button>
            </div>
            <div className="text-center py-12 text-slate-400">
              <IconWallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>გადახდების ისტორია და მართვის ინსტრუმენტები მალე დაემატება.</p>
            </div>
          </div>
        )}

        {/* TAB: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">შეტყობინებები და განცხადებები</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded-lg transition-colors">
                <IconPlus className="w-4 h-4" /> ახალი განცხადება
              </button>
            </div>
            <div className="text-center py-12 text-slate-400">
              <IconSend className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>განცხადებების მართვის პანელი მალე დაემატება.</p>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">ზოგადი პარამეტრები</h2>
              <p className="text-slate-400 mb-6">კორპუსის ძირითადი ინფორმაციის შესაცვლელად გამოიყენეთ ზედა მარჯვენა კუთხეში არსებული "რედაქტირება" ღილაკი.</p>
              
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                  <span className="text-slate-500 block mb-1">კორპუსის ID</span>
                  <span className="text-white font-mono">{buildingId}</span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                  <span className="text-slate-500 block mb-1">შექმნის თარიღი</span>
                  <span className="text-white">{new Date(building.created_at).toLocaleDateString('ka-GE')}</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/20 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-rose-400 mb-4 flex items-center gap-2">
                <IconTrash className="w-6 h-6" /> საშიში ზონა
              </h2>
              <p className="text-slate-300 mb-6">
                კორპუსის წაშლა წაშლის მის ყველა დაკავშირებულ მონაცემს სამუდამოდ: ბინებს, გადახდებს, საკონტაქტო პირებს და კომუნალურ ინფორმაციას. ეს მოქმედება შეუქცევადია.
              </p>
              <button 
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors"
              >
                კორპუსის სამუდამოდ წაშლა
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ============ EDIT MODAL ============ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-white">კორპუსის რედაქტირება</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <IconX className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">კორპუსის სახელი</label>
                  <input type="text" value={editForm.name || ''} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: ვაჟა-ფშაველას 42" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">მისამართი (ქუჩა)</label>
                  <input type="text" value={editForm.street || ''} onChange={(e) => setEditForm({...editForm, street: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">ქალაქი</label>
                  <input type="text" value={editForm.city || ''} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">უბანი</label>
                  <input type="text" value={editForm.district || ''} onChange={(e) => setEditForm({...editForm, district: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">საფოსტო ინდექსი</label>
                  <input type="text" value={editForm.postal_code || ''} onChange={(e) => setEditForm({...editForm, postal_code: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">კორპუსის ტიპი</label>
                  <select value={editForm.building_type || ''} onChange={(e) => setEditForm({...editForm, building_type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option value="multi-family">მრავალსართულიანი საცხოვრებელი</option>
                    <option value="private-houses">კერძო სახლების კომპლექსი</option>
                    <option value="business-center">ბიზნეს ცენტრი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">აგების წელი</label>
                  <input type="number" value={editForm.construction_year || ''} onChange={(e) => setEditForm({...editForm, construction_year: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">სართულები</label>
                  <input type="number" value={editForm.floors || ''} onChange={(e) => setEditForm({...editForm, floors: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">ბინების რაოდენობა</label>
                  <input type="number" value={editForm.apartments_count || ''} onChange={(e) => setEditForm({...editForm, apartments_count: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">სადარბაზოები</label>
                  <input type="number" value={editForm.entrances_count || ''} onChange={(e) => setEditForm({...editForm, entrances_count: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">საერთო ფართობი (მ²)</label>
                  <input type="number" step="0.1" value={editForm.total_area || ''} onChange={(e) => setEditForm({...editForm, total_area: e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-slate-900">
              <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleSaveEdit} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20">შენახვა</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRMATION MODAL ============ */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <IconTrash className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">კორპუსის წაშლა</h3>
                <p className="text-sm text-slate-400">დარწმუნებული ხარ?</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              კორპუსი <span className="font-bold text-white">"{building.name || building.street}"</span> და ყველა მისი მონაცემი (ბინები, გადახდები, აქტივობები, კონტაქტები) წაიშლება სამუდამოდ. ეს მოქმედება შეუქცევადია.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleDeleteBuilding} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-rose-500/20">დიახ, წაშლა</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}