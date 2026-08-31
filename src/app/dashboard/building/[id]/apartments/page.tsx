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

// ============ STATUS CONFIG ============
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

  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return

      try {
        // 1. Load building
        const { data: buildingData, error: buildingError } = await supabase
          .from('buildings')
          .select('*')
          .eq('id', buildingId)
          .single()

        if (buildingError) throw buildingError
        setBuilding(buildingData)

        // 2. Load apartments
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">ბინები იტვირთება...</div>
          <div className="text-slate-400 text-sm">გთხოვთ მოიცადოთ</div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">კორპუსი ვერ მოიძებნა</div>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300">
            ← Dashboard-ზე დაბრუნება
          </Link>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors">
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
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-800/50 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconGrid className="w-4 h-4" />
              ბადე
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconList className="w-4 h-4" />
              სია
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
            <p className="text-sm text-slate-400 mb-6 max-w-sm">
              დაამატე პირველი ბინა, რათა დაიწყო კორპუსის სრულფასოვანი მართვა.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all">
              <IconPlus className="w-5 h-5" />
              ბინის დამატება
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {apartments.map((apt) => {
              const status = statusConfig[apt.status as keyof typeof statusConfig] || statusConfig.vacant
              return (
                <div key={apt.id} className={`group bg-slate-800/50 border ${status.borderColor} rounded-xl p-5 hover:bg-slate-800 transition-all duration-300`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">ბინა {apt.apartment_number}</h3>
                      <p className="text-xs text-slate-400">სართული {apt.floor}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">ფართობი</span>
                      <span className="text-white font-medium">{apt.area_sqm || '—'} მ²</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">ოთახები</span>
                      <span className="text-white font-medium">{apt.rooms || '—'}</span>
                    </div>
                    {apt.bedrooms && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">საძინებლები</span>
                        <span className="text-white font-medium">{apt.bedrooms}</span>
                      </div>
                    )}
                    {apt.unit_type && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">ტიპი</span>
                        <span className="text-white font-medium">{unitTypeLabels[apt.unit_type as keyof typeof unitTypeLabels] || apt.unit_type}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {apt.has_balcony && (
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">აივანი</span>
                    )}
                    {apt.parking_spaces > 0 && (
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{apt.parking_spaces} პარკინგი</span>
                    )}
                    {apt.storage_units > 0 && (
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">{apt.storage_units} სათავსო</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* TABLE VIEW */
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
                  </tr>
                </thead>
                <tbody>
                  {apartments.map((apt) => {
                    const status = statusConfig[apt.status as keyof typeof statusConfig] || statusConfig.vacant
                    return (
                      <tr key={apt.id} className="border-b border-white/5 hover:bg-slate-800/50 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">ბინა {apt.apartment_number}</div>
                        </td>
                        <td className="p-4 text-slate-300">{apt.floor}</td>
                        <td className="p-4 text-slate-300">{apt.area_sqm || '—'} მ²</td>
                        <td className="p-4 text-slate-300">{apt.rooms || '—'}</td>
                        <td className="p-4 text-slate-300">{unitTypeLabels[apt.unit_type as keyof typeof unitTypeLabels] || apt.unit_type || '—'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor} border ${status.borderColor}`}>
                            {status.label}
                          </span>
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
    </div>
  )
}