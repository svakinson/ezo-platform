'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const IconUpload = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
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

export default function AddBuildingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
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
    
    // Step 2: Manager & Contacts
    managerName: '',
    managerPosition: '',
    managerPhone: '',
    managerEmail: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    accountantName: '',
    accountantPhone: '',
    
    // Step 3: Utilities
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
    
    // Step 4: Safety & Insurance
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
    
    // Step 5: Documents
    comments: '',
  })

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
    setIsSubmitting(true)
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      alert('სესია ამოიწურა. გთხოვთ, თავიდან შეხვიდეთ სისტემაში.')
      router.push('/login')
      return
    }

    try {
      // 1. შევინახოთ კორპუსი (Buildings)
      const { data: building, error: buildingError } = await supabase
        .from('buildings')
        .insert({
          user_id: user.id,
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
        .select()
        .single()

      if (buildingError) throw buildingError
      const buildingId = building.id

      // 2. შევინახოთ საკონტაქტო პირები (Building Contacts)
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
        const { error: contactsError } = await supabase.from('building_contacts').insert(contactsToInsert)
        if (contactsError) throw contactsError
      }

      // 3. შევინახოთ კომუნალური და უსაფრთხოების მონაცემები (Building Utilities)
      const { error: utilitiesError } = await supabase.from('building_utilities').insert({
        building_id: buildingId,
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
        comments: formData.comments || null
      })

      if (utilitiesError) throw utilitiesError

      // 4. შევინახოთ ნაგულისხმევი პარამეტრები (Building Settings)
      const { error: settingsError } = await supabase.from('building_settings').insert({
        building_id: buildingId,
        monthly_fee: 0,
        fee_calculation_method: 'per_apartment',
        payment_due_day: 15,
        late_fee_percentage: 0,
        grace_period_days: 5,
        currency: 'GEL'
      })

      if (settingsError) throw settingsError

      // წარმატება!
      setIsSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2500)

    } catch (error: any) {
      console.error('Database error:', error)
      alert('შეცდომა მონაცემების შენახვისას: ' + (error.message || 'უცნობი შეცდომა'))
      setIsSubmitting(false)
    }
  }

  // ============ SUCCESS SCREEN ============
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-slate-900/80 border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-[bounce_1s_ease-in-out_infinite]">
            <IconCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">წარმატებით დაემატა!</h2>
          <p className="text-slate-400 mb-8">
            თქვენი კორპუსი <span className="text-emerald-400 font-semibold">{formData.buildingName || formData.street}</span> წარმატებით შეინახა სისტემაში.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <IconLoader className="w-4 h-4" />
            <span>გადამისამართება Dashboard-ზე...</span>
          </div>
        </div>
      </div>
    )
  }

  // ============ FORM SCREEN ============
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-x-hidden">
      <header className="relative z-40 bg-slate-950/90 border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <IconBuilding className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EZO</span>
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/10"></div>
            <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span>უკან დაბრუნება</span>
            </Link>
          </div>
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
            <IconLogOut className="w-4 h-4" />
            <span className="hidden sm:inline">გამოსვლა</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* ⭐ განახლებული Stepper - ახლა ფორმის ბანერის შიგნითაა, რაც უზრუნველყოფს იდეალურ გასწვრივ კიდეებთან */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-6">
          <div className="relative flex items-center justify-between w-full mb-2">
            {/* ფონის ხაზი (მთლიანი სიგრძე) */}
            <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 bg-slate-700/50 mx-4 sm:mx-8" />
            
            {/* აქტიური ხაზი (ანიმაციური შევსება) */}
            <div 
              className="absolute top-5 sm:top-6 left-0 h-0.5 bg-emerald-500 mx-4 sm:mx-8 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step) => {
              const isCompleted = currentStep > step.id
              const isActive = currentStep === step.id
              const Icon = step.icon
              
              return (
                <div key={step.id} className="relative flex flex-col items-center flex-1 z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : isActive 
                        ? 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    {isCompleted ? <IconCheck className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <span className={`mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-center transition-colors ${
                    isActive ? 'text-emerald-400' : isCompleted ? 'text-emerald-500/80' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content Card */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12">
          
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">კორპუსის ძირითადი ინფორმაცია</h2>
                <p className="text-slate-400">შეავსეთ კორპუსის ზოგადი მონაცემები</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">კორპუსის სახელი (არასავალდებულო)</label>
                  <input type="text" value={formData.buildingName} onChange={(e) => updateField('buildingName', e.target.value)} placeholder="მაგ: ვაჟა-ფშაველას 42" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">ქუჩა და ნომერი *</label>
                  <input type="text" value={formData.street} onChange={(e) => updateField('street', e.target.value)} placeholder="მაგ: ვაჟა-ფშაველას გამზირი 42" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">უბანი/რაიონი</label>
                  <input type="text" value={formData.district} onChange={(e) => updateField('district', e.target.value)} placeholder="მაგ: საბურთალო" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">საფოსტო ინდექსი</label>
                  <input type="text" value={formData.postalCode} onChange={(e) => updateField('postalCode', e.target.value)} placeholder="მაგ: 0160" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
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
                  <input type="number" value={formData.constructionYear} onChange={(e) => updateField('constructionYear', e.target.value)} placeholder="მაგ: 2010" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">სართულების რაოდენობა *</label>
                  <input type="number" value={formData.floors} onChange={(e) => updateField('floors', e.target.value)} placeholder="მაგ: 9" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">ბინების რაოდენობა *</label>
                  <input type="number" value={formData.apartments} onChange={(e) => updateField('apartments', e.target.value)} placeholder="მაგ: 72" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">სადარბაზოების რაოდენობა *</label>
                  <input type="number" value={formData.entrances} onChange={(e) => updateField('entrances', e.target.value)} placeholder="მაგ: 3" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">საერთო ფართობი (მ²)</label>
                  <input type="number" value={formData.area} onChange={(e) => updateField('area', e.target.value)} placeholder="მაგ: 5400" className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Manager & Contacts */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">მმართველი და საკონტაქტო ინფორმაცია</h2>
                <p className="text-slate-400">შეავსეთ მმართველის და საკონტაქტო პირების მონაცემები</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconUser className="w-5 h-5 text-emerald-400" />მთავარი მმართველი</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">სრული სახელი *</label>
                    <input type="text" value={formData.managerName} onChange={(e) => updateField('managerName', e.target.value)} placeholder="მაგ: გიორგი სვანიძე" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">თანამდებობა</label>
                    <input type="text" value={formData.managerPosition} onChange={(e) => updateField('managerPosition', e.target.value)} placeholder="მაგ: თავმჯდომარე" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ტელეფონი *</label>
                    <input type="tel" value={formData.managerPhone} onChange={(e) => updateField('managerPhone', e.target.value)} placeholder="მაგ: +995 599 123 456" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ელ-ფოსტა *</label>
                    <input type="email" value={formData.managerEmail} onChange={(e) => updateField('managerEmail', e.target.value)} placeholder="მაგ: manager@ezo.ge" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" required />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">საგანგებო საკონტაქტო პირი</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">სახელი და გვარი</label>
                    <input type="text" value={formData.emergencyContactName} onChange={(e) => updateField('emergencyContactName', e.target.value)} placeholder="მაგ: ნინო კვარაცხელია" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ტელეფონი</label>
                    <input type="tel" value={formData.emergencyContactPhone} onChange={(e) => updateField('emergencyContactPhone', e.target.value)} placeholder="მაგ: +995 599 654 321" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
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

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">დამატებითი კონტაქტები</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ბუღალტერი (სახელი)</label>
                    <input type="text" value={formData.accountantName} onChange={(e) => updateField('accountantName', e.target.value)} placeholder="მაგ: მარიამ ჯანელიძე" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ბუღალტერი (ტელეფონი)</label>
                    <input type="tel" value={formData.accountantPhone} onChange={(e) => updateField('accountantPhone', e.target.value)} placeholder="მაგ: +995 599 111 222" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Utilities */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">კომუნალური სერვისები</h2>
                <p className="text-slate-400">შეავსეთ კომუნალური მრიცხველების და სერვისების მონაცემები</p>
              </div>

              <div className="space-y-6">
                {/* Electricity */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconZap className="w-5 h-5 text-amber-400" />ელექტროენერგია</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მიმწოდებელი</label>
                      <select value={formData.electricityProvider} onChange={(e) => updateField('electricityProvider', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                        <option value="" className="bg-slate-800">აირჩიეთ</option>
                        <option value="თელასი" className="bg-slate-800">თელასი</option>
                        <option value="ენერგო-პრო" className="bg-slate-800">ენერგო-პრო ორჯია</option>
                        <option value="სხვა" className="bg-slate-800">სხვა</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მრიცხველის ID</label>
                      <input type="text" value={formData.electricityMeterId} onChange={(e) => updateField('electricityMeterId', e.target.value)} placeholder="მაგ: EL-12345" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">საწყისი ჩვენება (kWh)</label>
                      <input type="number" value={formData.electricityReading} onChange={(e) => updateField('electricityReading', e.target.value)} placeholder="მაგ: 15420" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Water */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                    წყალი
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მიმწოდებელი</label>
                      <select value={formData.waterProvider} onChange={(e) => updateField('waterProvider', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                        <option value="" className="bg-slate-800">აირჩიეთ</option>
                        <option value="საქართველოს წყალი" className="bg-slate-800">საქართველოს წყალი</option>
                        <option value="ადგილობრივი" className="bg-slate-800">ადგილობრივი</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მრიცხველის ID</label>
                      <input type="text" value={formData.waterMeterId} onChange={(e) => updateField('waterMeterId', e.target.value)} placeholder="მაგ: W-67890" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">საწყისი ჩვენება (m³)</label>
                      <input type="number" value={formData.waterReading} onChange={(e) => updateField('waterReading', e.target.value)} placeholder="მაგ: 8920" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Gas */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 0-7 4-7 11v3l-2 2h18l-2-2v-3c0-7-7-11-7-11z" /></svg>
                    გაზი
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მიმწოდებელი</label>
                      <select value={formData.gasProvider} onChange={(e) => updateField('gasProvider', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                        <option value="" className="bg-slate-800">აირჩიეთ</option>
                        <option value="ყაზტრანსგაზი" className="bg-slate-800">ყაზტრანსგაზი</option>
                        <option value="სხვა" className="bg-slate-800">სხვა</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">მრიცხველის ID</label>
                      <input type="text" value={formData.gasMeterId} onChange={(e) => updateField('gasMeterId', e.target.value)} placeholder="მაგ: G-11223" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">საწყისი ჩვენება (m³)</label>
                      <input type="number" value={formData.gasReading} onChange={(e) => updateField('gasReading', e.target.value)} placeholder="მაგ: 3450" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Heating & Elevator */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">გათბობის ტიპი</h3>
                    <select value={formData.heatingType} onChange={(e) => updateField('heatingType', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                      <option value="central" className="bg-slate-800">ცენტრალური გათბობა</option>
                      <option value="individual" className="bg-slate-800">ინდივიდუალური გათბობა</option>
                      <option value="electric" className="bg-slate-800">ელექტრო გამათბობლები</option>
                      <option value="gas" className="bg-slate-800">გაზის გამათბობლები</option>
                    </select>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">ლიფტი</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">ლიფტების რაოდენობა</label>
                        <input type="number" value={formData.elevatorCount} onChange={(e) => updateField('elevatorCount', e.target.value)} placeholder="მაგ: 2" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">სერვისის კომპანია</label>
                        <input type="text" value={formData.elevatorCompany} onChange={(e) => updateField('elevatorCompany', e.target.value)} placeholder="მაგ: ლიფტი სერვისი" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Safety & Insurance */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">უსაფრთხოება და დაზღვევა</h2>
                <p className="text-slate-400">შეავსეთ უსაფრთხოების სისტემების და დაზღვევის ინფორმაცია</p>
              </div>

              <div className="space-y-6">
                {/* Fire Safety */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 0-7 4-7 11v3l-2 2h18l-2-2v-3c0-7-7-11-7-11z" /></svg>
                    სახანძრო უსაფრთხოება
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">კვამლის დეტექტორები (რაოდ.)</label>
                      <input type="number" value={formData.smokeDetectors} onChange={(e) => updateField('smokeDetectors', e.target.value)} placeholder="მაგ: 12" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">უკანასკნელი შემოწმება</label>
                      <input type="date" value={formData.lastFireInspection} onChange={(e) => updateField('lastFireInspection', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">შემდეგი შემოწმება</label>
                      <input type="date" value={formData.nextFireInspection} onChange={(e) => updateField('nextFireInspection', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Security Systems */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">უსაფრთხოების სისტემები</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.hasCameras} onChange={(e) => updateField('hasCameras', e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-slate-900/50 text-emerald-500 focus:ring-emerald-500/50" />
                      <span className="text-slate-300">სათვალთვალო კამერები</span>
                      {formData.hasCameras && (
                        <input type="number" value={formData.cameraCount} onChange={(e) => updateField('cameraCount', e.target.value)} placeholder="რაოდენობა" className="ml-4 w-32 px-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
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

                {/* Insurance */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconShield className="w-5 h-5 text-purple-400" />დაზღვევა</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">სადაზღვევო კომპანია</label>
                      <input type="text" value={formData.insuranceCompany} onChange={(e) => updateField('insuranceCompany', e.target.value)} placeholder="მაგ: ალდაგი" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">პოლისის ნომერი</label>
                      <input type="text" value={formData.insurancePolicy} onChange={(e) => updateField('insurancePolicy', e.target.value)} placeholder="მაგ: POL-12345" className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">ვადის გასვლა</label>
                      <input type="date" value={formData.insuranceExpiry} onChange={(e) => updateField('insuranceExpiry', e.target.value)} className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Documents */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">დოკუმენტები და ფოტოები</h2>
                <p className="text-slate-400">ატვირთეთ საჭირო დოკუმენტები და კორპუსის ფოტოები (ფუნქციონალი მალე დაემატება)</p>
              </div>

              <div className="space-y-6">
                {/* Documents Upload Placeholder */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">სავალდებულო დოკუმენტები</h3>
                  <div className="space-y-3">
                    {['კორპუსის რეგისტრაციის მოწმობა', 'ტექნიკური პასპორტი', 'სადაზღვევო პოლისი'].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <span className="text-slate-300 font-medium">{doc}</span>
                        </div>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2">
                          <IconUpload className="w-4 h-4" />
                          ატვირთვა
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos Upload Placeholder */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><IconCamera className="w-5 h-5 text-blue-400" />ფოტო დოკუმენტაცია</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['ფასადი', 'სადარბაზო', 'ლიფტი', 'ეზო'].map((photo, i) => (
                      <div key={i} className="aspect-square bg-slate-900/50 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center hover:border-emerald-500/50 transition-colors cursor-pointer group">
                        <IconCamera className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
                        <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{photo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">დამატებითი ინფორმაცია</h3>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => updateField('comments', e.target.value)}
                    placeholder="ნებისმიერი დამატებითი ინფორმაცია, შენიშვნა ან განსაკუთრებული მახასიათებელი..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300"
            >
              <IconArrowLeft className="w-5 h-5" />
              უკან
            </button>

            <div className="text-sm text-slate-500 font-medium">
              ნაბიჯი {currentStep} / {steps.length}
            </div>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                შემდეგი
                <IconArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isSubmitting ? (
                  <><IconLoader className="w-5 h-5" /> ინახება...</>
                ) : (
                  <><IconCheck className="w-5 h-5" /> დასრულება</>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}