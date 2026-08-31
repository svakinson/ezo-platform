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

const IconEdit = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

// ============ STAT CARD ============
function StatCard({ icon: Icon, label, value, gradient }: { 
  icon: any; 
  label: string; 
  value: string;
  gradient: string;
}) {
  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  )
}

// ============ MAIN PAGE ============

export default function BuildingPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [building, setBuilding] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [utilities, setUtilities] = useState<any>(null)

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

        // 2. Load contacts
        const { data: contactsData, error: contactsError } = await supabase
          .from('building_contacts')
          .select('*')
          .eq('building_id', buildingId)

        if (contactsError) throw contactsError
        setContacts(contactsData || [])

        // 3. Load utilities
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">მონაცემები იტვირთება...</div>
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

  const manager = contacts.find(c => c.role === 'manager')
  const emergency = contacts.find(c => c.role === 'emergency')
  const accountant = contacts.find(c => c.role === 'accountant')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors">
            <IconArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
          </Link>
          <div className="flex items-center gap-3">
            <IconBuilding className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">{building.name || building.street}</h1>
          </div>
          
          {/* Header Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              href={`/dashboard/building/${buildingId}/finances`}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm font-medium rounded-lg transition-colors"
            >
              <IconWallet className="w-4 h-4" />
              ფინანსები
            </Link>
            <Link 
              href={`/dashboard/building/${buildingId}/apartments`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium rounded-lg transition-colors"
            >
              <IconBuilding className="w-4 h-4" />
              ბინები
            </Link>
            <Link 
              href={`/dashboard/building/${buildingId}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              რედაქტირება
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* UPDATED: Wrapped in Link to make it clickable */}
          <Link 
            href={`/dashboard/building/${buildingId}/apartments`} 
            className="block hover:-translate-y-1 transition-transform duration-300"
          >
            <StatCard
              icon={IconBuilding}
              label="ბინები"
              value={building.apartments_count?.toString() || '0'}
              gradient="from-emerald-500 to-teal-600"
            />
          </Link>

          <StatCard
            icon={IconBuilding}
            label="სადარბაზო"
            value={building.entrances_count?.toString() || '0'}
            gradient="from-blue-500 to-cyan-600"
          />
          <StatCard
            icon={IconBuilding}
            label="სართული"
            value={building.floors?.toString() || '0'}
            gradient="from-purple-500 to-pink-600"
          />
          <StatCard
            icon={IconBuilding}
            label="ფართობი"
            value={`${building.total_area || '0'} მ²`}
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        {/* Building Info */}
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">კორპუსის ინფორმაცია</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-slate-400 mb-1">სახელი</div>
              <div className="text-white font-medium">{building.name || '—'}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">მისამართი</div>
              <div className="text-white font-medium">{building.street}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">ქალაქი</div>
              <div className="text-white font-medium">{building.city}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">უბანი</div>
              <div className="text-white font-medium">{building.district || '—'}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">კორპუსის ტიპი</div>
              <div className="text-white font-medium">
                {building.building_type === 'multi-family' ? 'მრავალსართულიანი საცხოვრებელი' : 
                 building.building_type === 'private-houses' ? 'კერძო სახლების კომპლექსი' : 
                 building.building_type === 'business-center' ? 'ბიზნეს ცენტრი' : building.building_type}
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">აგების წელი</div>
              <div className="text-white font-medium">{building.construction_year || '—'}</div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">საკონტაქტო პირები</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Manager */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <IconUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">მთავარი მმართველი</div>
                  <div className="text-white font-bold">{manager?.full_name || '—'}</div>
                </div>
              </div>
              {manager?.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <IconPhone className="w-4 h-4 text-emerald-400" />
                  {manager.phone}
                </div>
              )}
              {manager?.email && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <IconMail className="w-4 h-4 text-emerald-400" />
                  {manager.email}
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
                  <div className="text-sm text-slate-400">საგანგებო კონტაქტი</div>
                  <div className="text-white font-bold">{emergency?.full_name || '—'}</div>
                </div>
              </div>
              {emergency?.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <IconPhone className="w-4 h-4 text-rose-400" />
                  {emergency.phone}
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
                  <div className="text-sm text-slate-400">ბუღალტერი</div>
                  <div className="text-white font-bold">{accountant?.full_name || '—'}</div>
                </div>
              </div>
              {accountant?.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <IconPhone className="w-4 h-4 text-blue-400" />
                  {accountant.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Utilities */}
        {utilities && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">კომუნალური სერვისები</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Electricity */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <IconZap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">ელექტროენერგია</div>
                    <div className="text-white font-bold">{utilities.electricity_provider || '—'}</div>
                  </div>
                </div>
                {utilities.electricity_meter_id && (
                  <div className="text-sm text-slate-300 mb-1">
                    მრიცხველი: <span className="text-white">{utilities.electricity_meter_id}</span>
                  </div>
                )}
                {utilities.electricity_reading && (
                  <div className="text-sm text-slate-300">
                    ჩვენება: <span className="text-white">{utilities.electricity_reading} kWh</span>
                  </div>
                )}
              </div>

              {/* Water */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">წყალი</div>
                    <div className="text-white font-bold">{utilities.water_provider || '—'}</div>
                  </div>
                </div>
                {utilities.water_meter_id && (
                  <div className="text-sm text-slate-300 mb-1">
                    მრიცხველი: <span className="text-white">{utilities.water_meter_id}</span>
                  </div>
                )}
                {utilities.water_reading && (
                  <div className="text-sm text-slate-300">
                    ჩვენება: <span className="text-white">{utilities.water_reading} m³</span>
                  </div>
                )}
              </div>

              {/* Gas */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2c0 0-7 4-7 11v3l-2 2h18l-2-2v-3c0-7-7-11-7-11z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">გაზი</div>
                    <div className="text-white font-bold">{utilities.gas_provider || '—'}</div>
                  </div>
                </div>
                {utilities.gas_meter_id && (
                  <div className="text-sm text-slate-300 mb-1">
                    მრიცხველი: <span className="text-white">{utilities.gas_meter_id}</span>
                  </div>
                )}
                {utilities.gas_reading && (
                  <div className="text-sm text-slate-300">
                    ჩვენება: <span className="text-white">{utilities.gas_reading} m³</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-2">გათბობის ტიპი</div>
                <div className="text-white font-medium">
                  {utilities.heating_type === 'central' ? 'ცენტრალური გათბობა' : 
                   utilities.heating_type === 'individual' ? 'ინდივიდუალური გათბობა' : 
                   utilities.heating_type === 'electric' ? 'ელექტრო გამათბობლები' : 
                   utilities.heating_type === 'gas' ? 'გაზის გამათბობლები' : '—'}
                </div>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-2">ლიფტები</div>
                <div className="text-white font-medium">
                  {utilities.elevator_count ? `${utilities.elevator_count} ლიფტი` : '—'}
                  {utilities.elevator_company && ` (${utilities.elevator_company})`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Safety & Security */}
        {utilities && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">უსაფრთხოება და დაზღვევა</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Security Systems */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <IconShield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white font-bold text-lg">უსაფრთხოების სისტემები</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">სათვალთვალო კამერები</span>
                    <span className="text-white font-medium">
                      {utilities.has_cameras ? `✓ (${utilities.camera_count || 0})` : '✗'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">დომოფონი</span>
                    <span className="text-white font-medium">{utilities.has_domophone ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">დარაჯი</span>
                    <span className="text-white font-medium">{utilities.has_guard ? '✓' : '✗'}</span>
                  </div>
                  {utilities.smoke_detectors && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">კვამლის დეტექტორები</span>
                      <span className="text-white font-medium">{utilities.smoke_detectors} ცალი</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Insurance */}
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <IconShield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white font-bold text-lg">დაზღვევა</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-400">კომპანია</div>
                    <div className="text-white font-medium">{utilities.insurance_company || '—'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">პოლისის ნომერი</div>
                    <div className="text-white font-medium">{utilities.insurance_policy || '—'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">ვადის გასვლა</div>
                    <div className="text-white font-medium">{utilities.insurance_expiry || '—'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        {utilities?.comments && (
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">დამატებითი ინფორმაცია</h2>
            <p className="text-slate-300 leading-relaxed">{utilities.comments}</p>
          </div>
        )}
      </main>
    </div>
  )
}