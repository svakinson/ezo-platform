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

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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

const IconCamera = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ STEPS CONFIG ============
const steps = [
  { id: 1, title: 'ძირითადი', icon: IconBuilding },
  { id: 2, title: 'მმართველი', icon: IconUser },
  { id: 3, title: 'კომუნალური', icon: IconZap },
  { id: 4, title: 'უსაფრთხოება', icon: IconShield },
  { id: 5, title: 'დოკუმენტები', icon: IconCamera },
]

// ============ MAIN PAGE ============

export default function EditBuildingPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    buildingName: '',
    street: '',
    district: '',
    city: 'თბილისი',
    postalCode: '',
    buildingType: 'multi-family',
    constructionYear: '',
    floors: '',
    apartments: '',
    entrances: '',
    area: '',
    managerName: '',
    managerPosition: '',
    managerPhone: '',
    managerEmail: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    accountantName: '',
    accountantPhone: '',
    electricityProvider: '',
    electricityMeterId: '',
    electricityReading: '',
    waterProvider: '',
    waterMeterId: '',
    waterReading: '',
    gasProvider: '',
    gasMeterId: '',
    gasReading: '',
    heatingType: 'central',
    elevatorCount: '',
    elevatorCompany: '',
    smokeDetectors: '',
    lastFireInspection: '',
    nextFireInspection: '',
    hasCameras: false,
    cameraCount: '',
    hasDomophone: false,
    hasGuard: false,
    insuranceCompany: '',
    insurancePolicy: '',
    insuranceExpiry: '',
    comments: '',
  })

  // Load existing data
  useEffect(() => {
    const loadData = async () => {
      if (!buildingId) return

      try {
        // 1. Load building
        const { data: building, error: buildingError } = await supabase
          .from('buildings')
          .select('*')
          .eq('id', buildingId)
          .single()

        if (buildingError) throw buildingError

        // 2. Load contacts
        const { data: contacts, error: contactsError } = await supabase
          .from('building_contacts')
          .select('*')
          .eq('building_id', buildingId)

        if (contactsError) throw contactsError

        // 3. Load utilities
        const { data: utilities, error: utilitiesError } = await supabase
          .from('building_utilities')
          .select('*')
          .eq('building_id', buildingId)
          .single()

        if (utilitiesError && utilitiesError.code !== 'PGRST116') throw utilitiesError

        // Populate form
        const manager = contacts?.find((c: any) => c.role === 'manager')
        const emergency = contacts?.find((c: any) => c.role === 'emergency')
        const accountant = contacts?.find((c: any) => c.role === 'accountant')

        setFormData({
          buildingName: building.name || '',
          street: building.street || '',
          district: building.district || '',
          city: building.city || 'თბილისი',
          postalCode: building.postal_code || '',
          buildingType: building.building_type || 'multi-family',
          constructionYear: building.construction_year?.toString() || '',
          floors: building.floors?.toString() || '',
          apartments: building.apartments_count?.toString() || '',
          entrances: building.entrances_count?.toString() || '',
          area: building.total_area?.toString() || '',
          managerName: manager?.full_name || '',
          managerPosition: manager?.position || '',
          managerPhone: manager?.phone || '',
          managerEmail: manager?.email || '',
          emergencyContactName: emergency?.full_name || '',
          emergencyContactPhone: emergency?.phone || '',
          emergencyContactRelation: emergency?.position || '',
          accountantName: accountant?.full_name || '',
          accountantPhone: accountant?.phone || '',
          electricityProvider: utilities?.electricity_provider || '',
          electricityMeterId: utilities?.electricity_meter_id || '',
          electricityReading: utilities?.electricity_reading?.toString() || '',
          waterProvider: utilities?.water_provider || '',
          waterMeterId: utilities?.water_meter_id || '',
          waterReading: utilities?.water_reading?.toString() || '',
          gasProvider: utilities?.gas_provider || '',
          gasMeterId: utilities?.gas_meter_id || '',
          gasReading: utilities?.gas_reading?.toString() || '',
          heatingType: utilities?.heating_type || 'central',
          elevatorCount: utilities?.elevator_count?.toString() || '',
          elevatorCompany: utilities?.elevator_company || '',
          smokeDetectors: utilities?.smoke_detectors?.toString() || '',
          lastFireInspection: utilities?.last_fire_inspection || '',
          nextFireInspection: utilities?.next_fire_inspection || '',
          hasCameras: utilities?.has_cameras || false,
          cameraCount: utilities?.camera_count?.toString() || '',
          hasDomophone: utilities?.has_domophone || false,
          hasGuard: utilities?.has_guard || false,
          insuranceCompany: utilities?.insurance_company || '',
          insurancePolicy: utilities?.insurance_policy || '',
          insuranceExpiry: utilities?.insurance_expiry || '',
          comments: utilities?.comments || '',
        })
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

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setSaving(true)

    try {
      // 1. Update building
      const { error: buildingError } = await supabase
        .from('buildings')
        .update({
          name: formData.buildingName || null,
          street: formData.street,
          district: formData.district || null,
          city: formData.city,
          postal_code: formData.postalCode || null,
          building_type: formData.buildingType,
          construction_year: formData.constructionYear ? parseInt(formData.constructionYear) : null,
          floors: formData.floors ? parseInt(formData.floors) : null,
          apartments_count: formData.apartments ? parseInt(formData.apartments) : null,
          entrances_count: formData.entrances ? parseInt(formData.entrances) : null,
          total_area: formData.area ? parseFloat(formData.area) : null,
        })
        .eq('id', buildingId)

      if (buildingError) throw buildingError

      // 2. Update contacts (delete old, insert new)
      const { error: deleteContactsError } = await supabase
        .from('building_contacts')
        .delete()
        .eq('building_id', buildingId)

      if (deleteContactsError) throw deleteContactsError

      const contactsToInsert = []
      if (formData.managerName) {
        contactsToInsert.push({
          building_id: buildingId,
          role: 'manager',
          full_name: formData.managerName,
          position: formData.managerPosition || null,
          phone: formData.managerPhone || null,
          email: formData.managerEmail || null,
          is_primary: true
        })
      }
      if (formData.emergencyContactName) {
        contactsToInsert.push({
          building_id: buildingId,
          role: 'emergency',
          full_name: formData.emergencyContactName,
          position: formData.emergencyContactRelation || null,
          phone: formData.emergencyContactPhone || null,
          is_primary: false
        })
      }
      if (formData.accountantName) {
        contactsToInsert.push({
          building_id: buildingId,
          role: 'accountant',
          full_name: formData.accountantName,
          phone: formData.accountantPhone || null,
          is_primary: false
        })
      }

      if (contactsToInsert.length > 0) {
        const { error: contactsError } = await supabase
          .from('building_contacts')
          .insert(contactsToInsert)
        if (contactsError) throw contactsError
      }

      // 3. Update utilities
      const { error: utilitiesError } = await supabase
        .from('building_utilities')
        .update({
          electricity_provider: formData.electricityProvider || null,
          electricity_meter_id: formData.electricityMeterId || null,
          electricity_reading: formData.electricityReading ? parseFloat(formData.electricityReading) : null,
          water_provider: formData.waterProvider || null,
          water_meter_id: formData.waterMeterId || null,
          water_reading: formData.waterReading ? parseFloat(formData.waterReading) : null,
          gas_provider: formData.gasProvider || null,
          gas_meter_id: formData.gasMeterId || null,
          gas_reading: formData.gasReading ? parseFloat(formData.gasReading) : null,
          heating_type: formData.heatingType || null,
          elevator_count: formData.elevatorCount ? parseInt(formData.elevatorCount) : null,
          elevator_company: formData.elevatorCompany || null,
          has_cameras: formData.hasCameras,
          camera_count: formData.cameraCount ? parseInt(formData.cameraCount) : null,
          has_domophone: formData.hasDomophone,
          has_guard: formData.hasGuard,
          smoke_detectors: formData.smokeDetectors ? parseInt(formData.smokeDetectors) : null,
          last_fire_inspection: formData.lastFireInspection || null,
          next_fire_inspection: formData.nextFireInspection || null,
          insurance_company: formData.insuranceCompany || null,
          insurance_policy: formData.insurancePolicy || null,
          insurance_expiry: formData.insuranceExpiry || null,
          comments: formData.comments || null,
        })
        .eq('building_id', buildingId)

      if (utilitiesError) throw utilitiesError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      console.error('Update error:', error)
      alert('განახლების შეცდომა: ' + (error.message || 'უცნობი შეცდომა'))
      setSaving(false)
    }
  }

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

  if (success) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-slate-800/50 border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <IconCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">წარმატებით განახლდა!</h2>
          <p className="text-slate-400 mb-8">
            კორპუსი <span className="text-emerald-400 font-semibold">{formData.buildingName || formData.street}</span> წარმატებით განახლდა.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <IconLoader className="w-4 h-4" />
            <span>გადამისამართება Dashboard-ზე...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors">
            <IconArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">უკან დაბრუნება</span>
          </Link>
          <div className="flex items-center gap-2">
            <IconBuilding className="w-5 h-5 text-emerald-400" />
            <span className="text-lg font-bold text-white">რედაქტირება</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg' : 'bg-white/10 text-white/50'
                    }`}>
                      {isCompleted ? <IconCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>
                    <div className={`mt-2 text-xs font-medium text-center hidden sm:block ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-white/50'}`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (<div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${isCompleted ? 'bg-emerald-500' : 'bg-white/10'}`} />)}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12">
          
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">კორპუსის ძირითადი ინფორმაცია</h2>
                <p className="text-slate-400">შეცვალეთ კორპუსის ზოგადი მონაცემები</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">კორპუსის სახელი</label>
                  <input type="text" value={formData.buildingName} onChange={(e) => updateField('buildingName', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">ქუჩა და ნომერი *</label>
                  <input type="text" value={formData.street} onChange={(e) => updateField('street', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">უბანი/რაიონი</label>
                  <input type="text" value={formData.district} onChange={(e) => updateField('district', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">ქალაქი *</label>
                  <select value={formData.city} onChange={(e) => updateField('city', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                    <option value="თბილისი" className="bg-slate-800">თბილისი</option>
                    <option value="ბათუმი" className="bg-slate-800">ბათუმი</option>
                    <option value="ქუთაისი" className="bg-slate-800">ქუთაისი</option>
                    <option value="რუსთავი" className="bg-slate-800">რუსთავი</option>
                    <option value="სხვა" className="bg-slate-800">სხვა</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">კორპუსის ტიპი *</label>
                  <select value={formData.buildingType} onChange={(e) => updateField('buildingType', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                    <option value="multi-family" className="bg-slate-800">მრავალსართულიანი საცხოვრებელი</option>
                    <option value="private-houses" className="bg-slate-800">კერძო სახლების კომპლექსი</option>
                    <option value="business-center" className="bg-slate-800">ბიზნეს ცენტრი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">აგების წელი</label>
                  <input type="number" value={formData.constructionYear} onChange={(e) => updateField('constructionYear', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">სართულების რაოდენობა *</label>
                  <input type="number" value={formData.floors} onChange={(e) => updateField('floors', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">ბინების რაოდენობა *</label>
                  <input type="number" value={formData.apartments} onChange={(e) => updateField('apartments', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">სადარბაზოების რაოდენობა *</label>
                  <input type="number" value={formData.entrances} onChange={(e) => updateField('entrances', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">საერთო ფართობი (მ²)</label>
                  <input type="number" value={formData.area} onChange={(e) => updateField('area', e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">მმართველი და საკონტაქტო ინფორმაცია</h2>
                <p className="text-slate-400">შეცვალეთ მმართველის მონაცემები</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconUser className="w-5 h-5 text-emerald-400" />მთავარი მმართველი</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">სრული სახელი *</label>
                    <input type="text" value={formData.managerName} onChange={(e) => updateField('managerName', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ტელეფონი *</label>
                    <input type="tel" value={formData.managerPhone} onChange={(e) => updateField('managerPhone', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">ელ-ფოსტა *</label>
                    <input type="email" value={formData.managerEmail} onChange={(e) => updateField('managerEmail', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">საგანგებო საკონტაქტო პირი</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">სახელი და გვარი</label>
                    <input type="text" value={formData.emergencyContactName} onChange={(e) => updateField('emergencyContactName', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ტელეფონი</label>
                    <input type="tel" value={formData.emergencyContactPhone} onChange={(e) => updateField('emergencyContactPhone', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ურთიერთობა</label>
                    <select value={formData.emergencyContactRelation} onChange={(e) => updateField('emergencyContactRelation', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                      <option value="" className="bg-slate-800">აირჩიეთ</option>
                      <option value="მფლობელი" className="bg-slate-800">მფლობელი</option>
                      <option value="მმართველი" className="bg-slate-800">მმართველი</option>
                      <option value="დარაჯი" className="bg-slate-800">დარაჯი</option>
                      <option value="სხვა" className="bg-slate-800">სხვა</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">კომუნალური სერვისები</h2>
                <p className="text-slate-400">შეცვალეთ კომუნალური მონაცემები</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconZap className="w-5 h-5 text-amber-400" />ელექტროენერგია</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მიმწოდებელი</label>
                      <select value={formData.electricityProvider} onChange={(e) => updateField('electricityProvider', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                        <option value="" className="bg-slate-800">აირჩიეთ</option>
                        <option value="თელასი" className="bg-slate-800">თელასი</option>
                        <option value="ენერგო-პრო" className="bg-slate-800">ენერგო-პრო ორჯია</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მრიცხველის ID</label>
                      <input type="text" value={formData.electricityMeterId} onChange={(e) => updateField('electricityMeterId', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">საწყისი ჩვენება (kWh)</label>
                      <input type="number" value={formData.electricityReading} onChange={(e) => updateField('electricityReading', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">წყალი</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მიმწოდებელი</label>
                      <select value={formData.waterProvider} onChange={(e) => updateField('waterProvider', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                        <option value="" className="bg-slate-800">აირჩიეთ</option>
                        <option value="საქართველოს წყალი" className="bg-slate-800">საქართველოს წყალი</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მრიცხველის ID</label>
                      <input type="text" value={formData.waterMeterId} onChange={(e) => updateField('waterMeterId', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">საწყისი ჩვენება (m³)</label>
                      <input type="number" value={formData.waterReading} onChange={(e) => updateField('waterReading', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">უსაფრთხოება</h2>
                <p className="text-slate-400">შეცვალეთ უსაფრთხოების სისტემები</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">უსაფრთხოების სისტემები</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.hasCameras} onChange={(e) => updateField('hasCameras', e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500/50" />
                    <span className="text-slate-300">სათვალთვალო კამერები</span>
                    {formData.hasCameras && (
                      <input type="number" value={formData.cameraCount} onChange={(e) => updateField('cameraCount', e.target.value)} placeholder="რაოდენობა" className="ml-4 w-32 px-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                    )}
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.hasDomophone} onChange={(e) => updateField('hasDomophone', e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500/50" />
                    <span className="text-slate-300">დომოფონი/ვიდეო დომოფონი</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.hasGuard} onChange={(e) => updateField('hasGuard', e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500/50" />
                    <span className="text-slate-300">საკონტროლო პუნქტი/დარაჯი</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">დოკუმენტები</h2>
                <p className="text-slate-400">დამატებითი ინფორმაცია</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">დამატებითი ინფორმაცია</h3>
                <textarea value={formData.comments} onChange={(e) => updateField('comments', e.target.value)} placeholder="ნებისმიერი დამატებითი ინფორმაცია..." rows={4} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none" />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
            <button onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300">
              <IconArrowLeft className="w-5 h-5" /> უკან
            </button>
            <div className="text-sm text-slate-500">ნაბიჯი {currentStep} / 5</div>
            {currentStep < 5 ? (
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300">
                შემდეგი <IconArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300">
                {saving ? (<><IconLoader className="w-5 h-5" /> ინახება...</>) : (<><IconCheck className="w-5 h-5" /> განახლება</>)}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}