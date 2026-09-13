'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ApartmentTariffModal from './apartments/ApartmentTariffModal'
import MonthlyExpensesTab from '@/components/building/MonthlyExpensesTab'

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

const IconChevronDown = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconCalendar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const IconTrendUp = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconCheckCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const IconFilter = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const IconDoorOpen = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h3a2 2 0 0 1 2 2v14" />
    <path d="M2 20h3" />
    <path d="M13 20h9" />
    <path d="M10 20V4L3 5.2v14.7" />
    <circle cx="9" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const IconLayers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconMaximize = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const IconHome = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IconAlertTriangle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

// ============ TABS CONFIG ============
const tabs = [
  { id: 'overview', label: 'მიმოხილვა', icon: IconBuilding },
  { id: 'apartments', label: 'ბინები', icon: IconUser },
  { id: 'monthly-expenses', label: 'თვიური ხარჯები', icon: IconCalendar },
  { id: 'payments', label: 'გადახდები', icon: IconWallet },
  { id: 'announcements', label: 'შეტყობინებები', icon: IconSend },
  { id: 'settings', label: 'პარამეტრები', icon: IconSettings },
]

interface NotificationState {
  title?: string
  message: string
  type: 'success' | 'error'
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
  const [activeTab, setActiveTab] = useState('overview')
  const [notification, setNotification] = useState<NotificationState | null>(null)
  const [fundBalance, setFundBalance] = useState(0)

  // Edit Building Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<any>({})

  // Delete Building Modal State
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  // Apartments State
  const [apartments, setApartments] = useState<any[]>([])
  const [invoices, setInvoices] = useState<Record<string, any>>({}) // apartment_id -> invoice
  const [searchQuery, setSearchQuery] = useState('')
  const [balanceFilter, setBalanceFilter] = useState<'all' | 'debtors' | 'paid' | 'rented'>('all')
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false)
  const [editingApartment, setEditingApartment] = useState<any>(null)
  const [isDeleteApartmentConfirmOpen, setIsDeleteApartmentConfirmOpen] = useState(false)
  const [apartmentToDelete, setApartmentToDelete] = useState<any>(null)
  const [showAdvancedAptInfo, setShowAdvancedAptInfo] = useState(false)

  const [aptForm, setAptForm] = useState({
    apartment_number: '',
    floor: '',
    area_sqm: '',
    parking_spaces: '',
    residency_status: 'მეპატრონე ცხოვრობს',
    owner_name: '',
    owner_phone: '',
    owner_email: '',
    tenant_name: '',
    tenant_phone: '',
    tenant_email: '',
    rooms: '',
    bathrooms: '',
    special_notes: ''
  })

  // Tariff Modal State
  const [isTariffModalOpen, setIsTariffModalOpen] = useState(false)
  const [selectedApartmentForTariff, setSelectedApartmentForTariff] = useState<any>(null)

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const showNotification = (message: string, type: 'success' | 'error' = 'success', title?: string) => {
    setNotification({ message, type, title })
  }

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
        setEditForm(buildingData)

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

        const { data: aptsData, error: aptsError } = await supabase
          .from('apartments')
          .select('*')
          .eq('building_id', buildingId)
          .order('apartment_number', { ascending: true })

        if (aptsError) throw aptsError
        setApartments(aptsData || [])

        // Load invoices for current month
        const { data: invoicesData, error: invoicesError } = await supabase
          .from('monthly_invoices')
          .select('*')
          .eq('building_id', buildingId)
          .eq('month', currentMonth)
          .eq('year', currentYear)

        if (!invoicesError && invoicesData) {
          const invoiceMap: Record<string, any> = {}
          invoicesData.forEach((inv: any) => {
            invoiceMap[inv.apartment_id] = inv
          })
          setInvoices(invoiceMap)
        }

        // Load fund balance
        const { data: fundData, error: fundError } = await supabase
          .from('fund_transactions')
          .select('amount, type')
          .eq('building_id', buildingId)

        let calculatedFundBalance = 0
        if (!fundError && fundData) {
          calculatedFundBalance = fundData.reduce((sum: number, tx: any) => {
            const amt = Number(tx.amount) || 0
            if (tx.type === 'monthly_surplus' || tx.type === 'manual_deposit') {
              return sum + amt
            }
            if (tx.type === 'emergency_withdrawal') {
              return sum - amt
            }
            if (tx.type === 'correction') {
              return sum + amt
            }
            return sum
          }, 0)
        }
        setFundBalance(calculatedFundBalance)

      } catch (error) {
        console.error('Error loading data:', error)
        showNotification('მონაცემების ჩატვირთვის შეცდომა', 'error')
        setTimeout(() => router.push('/dashboard'), 1500)
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
      const { data } = await supabase.from('buildings').select('*').eq('id', buildingId).single()
      setBuilding(data)
      showNotification('კორპუსის ინფორმაცია წარმატებით განახლდა', 'success')
    } catch (error: any) {
      console.error('Edit error:', error)
      showNotification('შეცდომა განახლებისას: ' + error.message, 'error')
    }
  }

  const handleDeleteBuilding = async () => {
    try {
      await supabase.from('apartments').delete().eq('building_id', buildingId)
      await supabase.from('building_settings').delete().eq('building_id', buildingId)
      await supabase.from('building_utilities').delete().eq('building_id', buildingId)
      await supabase.from('building_contacts').delete().eq('building_id', buildingId)
      await supabase.from('monthly_invoices').delete().eq('building_id', buildingId)

      const { error } = await supabase.from('buildings').delete().eq('id', buildingId)
      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      console.error('Delete error:', error)
      showNotification('შეცდომა წაშლისას: ' + error.message, 'error')
    }
  }

  const handleOpenAddApartment = () => {
    setEditingApartment(null)
    setShowAdvancedAptInfo(false)
    setAptForm({
      apartment_number: '', floor: '', area_sqm: '', parking_spaces: '',
      residency_status: 'მეპატრონე ცხოვრობს',
      owner_name: '', owner_phone: '', owner_email: '',
      tenant_name: '', tenant_phone: '', tenant_email: '',
      rooms: '', bathrooms: '', special_notes: ''
    })
    setIsApartmentModalOpen(true)
  }

  const handleOpenEditApartment = (apt: any) => {
    setEditingApartment(apt)
    setShowAdvancedAptInfo(false)
    setAptForm({
      apartment_number: apt.apartment_number || '',
      floor: apt.floor?.toString() || '',
      area_sqm: apt.area_sqm?.toString() || '',
      parking_spaces: apt.parking_spaces?.toString() || '',
      residency_status: apt.residency_status || 'მეპატრონე ცხოვრობს',
      owner_name: apt.owner_name || '',
      owner_phone: apt.phone || apt.owner_phone || '',
      owner_email: apt.email || apt.owner_email || '',
      tenant_name: apt.tenant_name || '',
      tenant_phone: apt.tenant_phone || '',
      tenant_email: apt.tenant_email || '',
      rooms: apt.rooms?.toString() || '',
      bathrooms: apt.bathrooms?.toString() || '',
      special_notes: apt.special_notes || ''
    })
    setIsApartmentModalOpen(true)
  }

  const handleSaveApartment = async () => {
    if (!aptForm.apartment_number.trim()) {
      showNotification('ბინის ნომერი სავალდებულოა', 'error')
      return
    }

    try {
      const payload = {
        building_id: buildingId,
        apartment_number: aptForm.apartment_number,
        floor: aptForm.floor ? parseInt(aptForm.floor) : null,
        area_sqm: aptForm.area_sqm ? parseFloat(aptForm.area_sqm) : null,
        parking_spaces: aptForm.parking_spaces ? parseInt(aptForm.parking_spaces) : null,
        residency_status: aptForm.residency_status || null,
        owner_name: aptForm.owner_name || null,
        phone: aptForm.owner_phone || null,
        email: aptForm.owner_email || null,
        tenant_name: aptForm.residency_status === 'გაქირავებულია' ? (aptForm.tenant_name || null) : null,
        tenant_phone: aptForm.residency_status === 'გაქირავებულია' ? (aptForm.tenant_phone || null) : null,
        tenant_email: aptForm.residency_status === 'გაქირავებულია' ? (aptForm.tenant_email || null) : null,
        rooms: aptForm.rooms ? parseInt(aptForm.rooms) : null,
        bathrooms: aptForm.bathrooms ? parseInt(aptForm.bathrooms) : null,
        special_notes: aptForm.special_notes || null,
      }

      if (editingApartment) {
        const { error } = await supabase.from('apartments').update(payload).eq('id', editingApartment.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('apartments').insert(payload)
        if (error) throw error
      }

      setIsApartmentModalOpen(false)
      const { data } = await supabase.from('apartments').select('*').eq('building_id', buildingId).order('apartment_number', { ascending: true })
      if (data) setApartments(data)
      showNotification(editingApartment ? 'ბინა წარმატებით განახლდა' : 'ბინა წარმატებით დაემატა', 'success')

    } catch (error: any) {
      console.error('Apartment save error:', error)
      showNotification('შეცდომა შენახვისას: ' + error.message, 'error')
    }
  }

  const handleDeleteApartment = async () => {
    if (!apartmentToDelete) return
    try {
      await supabase.from('monthly_invoices').delete().eq('apartment_id', apartmentToDelete.id)
      const { error } = await supabase.from('apartments').delete().eq('id', apartmentToDelete.id)
      if (error) throw error

      setIsDeleteApartmentConfirmOpen(false)
      setApartmentToDelete(null)

      const { data } = await supabase.from('apartments').select('*').eq('building_id', buildingId).order('apartment_number', { ascending: true })
      if (data) setApartments(data)

    } catch (error: any) {
      console.error('Apartment delete error:', error)
      showNotification('შეცდომა წაშლისას: ' + error.message, 'error')
    }
  }

  const handleOpenTariffModal = (apt: any) => {
    setSelectedApartmentForTariff(apt)
    setIsTariffModalOpen(true)
  }

  const handleTariffSaved = () => {
    console.log('ტარიფები წარმატებით შეინახა')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A0F] flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold mb-1">მონაცემები იტვირთება...</div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-[#070A0F] flex items-center justify-center">
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

  const filteredApartments = apartments.filter(apt => {
    const matchesSearch =
      apt.apartment_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.owner_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.tenant_name?.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    const inv = invoices[apt.id]
    const balance = inv ? (inv.total_amount - inv.paid_amount) : 0

    if (balanceFilter === 'debtors') return balance > 0
    if (balanceFilter === 'paid') return balance <= 0 && inv
    if (balanceFilter === 'rented') return apt.residency_status === 'გაქირავებულია'

    return true
  })

  // Calculate totals
  const totalDebt = apartments.reduce((sum, apt) => {
    const inv = invoices[apt.id]
    if (!inv) return sum
    return sum + (inv.total_amount - inv.paid_amount)
  }, 0)

  const totalExpected = apartments.reduce((sum, apt) => {
    const inv = invoices[apt.id]
    if (!inv) return sum
    return sum + inv.total_amount
  }, 0)

  const totalPaid = apartments.reduce((sum, apt) => {
    const inv = invoices[apt.id]
    if (!inv) return sum
    return sum + inv.paid_amount
  }, 0)

  const debtorsCount = apartments.filter(apt => {
    const inv = invoices[apt.id]
    return inv && (inv.total_amount - inv.paid_amount) > 0
  }).length

  const paidCount = apartments.filter(apt => {
    const inv = invoices[apt.id]
    return inv && (inv.total_amount - inv.paid_amount) <= 0
  }).length

  const getContactDisplay = (apt: any) => {
    if (apt.residency_status === 'გაქირავებულია' && apt.tenant_name) {
      return { label: 'მოქირავე', name: apt.tenant_name, phone: apt.tenant_phone }
    }
    if (apt.residency_status === 'დაკეტილი/ცარიელი') {
      return { label: 'სტატუსი', name: 'დაკეტილი / ცარიელი', phone: null }
    }
    return { label: 'მეპატრონე', name: apt.owner_name, phone: apt.phone || apt.owner_phone }
  }

  const getInvoiceStatus = (apt: any) => {
    const inv = invoices[apt.id]
    if (!inv) return { label: '—', color: 'text-slate-500', bg: 'bg-slate-500/10' }
    const balance = inv.total_amount - inv.paid_amount
    if (balance <= 0) return { label: 'გადახდილი', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
    if (inv.paid_amount > 0) return { label: 'ნაწილობრივ', color: 'text-amber-400', bg: 'bg-amber-500/10' }
    return { label: 'ვალიანი', color: 'text-rose-400', bg: 'bg-rose-500/10' }
  }

  const filterOptions: { key: typeof balanceFilter; label: string; count: number; activeClass: string }[] = [
    { key: 'all', label: `ყველა (${apartments.length})`, count: apartments.length, activeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' },
    { key: 'debtors', label: `ვალიანები (${debtorsCount})`, count: debtorsCount, activeClass: 'bg-rose-500/20 text-rose-400 border border-rose-400/30' },
    { key: 'paid', label: `გადახდილი (${paidCount})`, count: paidCount, activeClass: 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' },
    { key: 'rented', label: 'გაქირავებული', count: 0, activeClass: 'bg-blue-500/20 text-blue-400 border border-blue-400/30' },
  ]

  return (
    <div className="ezo-shell min-h-screen bg-[#070A0F] text-slate-100 overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-[#070A0F]/85 border-b border-white/[0.07] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.22)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
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
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#111823] hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              <span className="hidden sm:inline">რედაქტირება</span>
            </button>
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-rose-500/[0.08] hover:bg-rose-500/[0.14] border border-rose-400/[0.12] text-rose-300 text-sm font-semibold rounded-xl transition-all duration-200"
            >
              <IconTrash className="w-4 h-4" />
              <span className="hidden sm:inline">წაშლა</span>
            </button>
          </div>
        </div>

        <div className="border-t border-white/[0.055] bg-white/[0.018]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-slate-400 hover:text-white hover:border-white/20'
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

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="group relative overflow-hidden bg-white/[0.045] border border-white/[0.08] rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] hover:bg-white/[0.06] hover:border-emerald-400/25 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconHome className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.apartments_count || '0'}</div>
                <div className="text-sm text-slate-400">ბინები</div>
              </div>
              <div className="group relative overflow-hidden bg-white/[0.045] border border-white/[0.08] rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] hover:bg-white/[0.06] hover:border-white/[0.13] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconDoorOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.entrances_count || '0'}</div>
                <div className="text-sm text-slate-400">სადარბაზო</div>
              </div>
              <div className="group relative overflow-hidden bg-white/[0.045] border border-white/[0.08] rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] hover:bg-white/[0.06] hover:border-white/[0.13] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconLayers className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.floors || '0'}</div>
                <div className="text-sm text-slate-400">სართული</div>
              </div>
              <div className="group relative overflow-hidden bg-white/[0.045] border border-white/[0.08] rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] hover:bg-white/[0.06] hover:border-white/[0.13] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconMaximize className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{building.total_area || '0'} <span className="text-lg text-slate-400">მ²</span></div>
                <div className="text-sm text-slate-400">ფართობი</div>
              </div>
              <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500/[0.08] to-amber-500/[0.02] border border-amber-400/20 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] hover:bg-amber-500/[0.12] hover:border-amber-400/40 hover:-translate-y-0.5 transition-all duration-300 col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-4 shadow-lg">
                  <IconWallet className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-300 mb-1">{fundBalance.toFixed(2)}₾</div>
                <div className="text-sm text-amber-300/80">კორპუსის ყულაბა</div>
              </div>
            </div>

            <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
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

            <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">საკონტაქტო პირები</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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

                <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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

                <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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

            {utilities && (
              <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">კომუნალური სერვისები</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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
                  <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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
                  <div className="bg-[#0B1018]/75 border border-white/[0.07] rounded-2xl p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] hover:border-white/[0.12] transition-all">
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

        {activeTab === 'apartments' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/[0.08] to-emerald-500/[0.02] border border-emerald-400/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <IconTrendUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300/80 font-semibold">მოსალოდნელი თანხა</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-300">{totalExpected.toFixed(2)}₾</div>
                <div className="text-xs text-slate-500 mt-1">ამ თვის ჯამი</div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/[0.08] to-cyan-500/[0.02] border border-cyan-400/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <IconCheckCircle className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold">გადახდილი</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-300">{totalPaid.toFixed(2)}₾</div>
                <div className="text-xs text-slate-500 mt-1">{paidCount} ბინა</div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-rose-500/[0.08] to-rose-500/[0.02] border border-rose-400/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <IconAlertCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-[11px] uppercase tracking-wider text-rose-300/80 font-semibold">ვალიანობა</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-rose-300">{totalDebt.toFixed(2)}₾</div>
                <div className="text-xs text-slate-500 mt-1">{debtorsCount} ვალიანი ბინა</div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/[0.08] to-amber-500/[0.02] border border-amber-400/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <IconWallet className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] uppercase tracking-wider text-amber-300/80 font-semibold">შემოსავალი</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-amber-300">
                  {totalExpected > 0 ? ((totalPaid / totalExpected) * 100).toFixed(0) : 0}%
                </div>
                <div className="text-xs text-slate-500 mt-1">აღდგენის %</div>
              </div>
            </div>

            {/* Search, Filters, Add */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="ძიება ბინის ნომრით ან სახელით..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#111823]/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handleOpenAddApartment}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 text-sm font-extrabold rounded-xl transition-all duration-200 shadow-[0_10px_30px_rgba(16,185,129,0.20)] hover:shadow-[0_14px_38px_rgba(16,185,129,0.28)] shrink-0"
                >
                  <IconPlus className="w-4 h-4" /> ბინის დამატება
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                <IconFilter className="w-4 h-4 text-slate-500 shrink-0" />
                {filterOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setBalanceFilter(opt.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                      balanceFilter === opt.key
                        ? opt.activeClass
                        : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredApartments.length === 0 ? (
              <div className="bg-[#111823]/50 border border-white/10 rounded-3xl p-12 text-center">
                <IconBuilding className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400 text-lg mb-2">ბინები ვერ მოიძებნა</p>
                <p className="text-slate-500 text-sm">დაამატეთ პირველი ბინა ან შეამოწმეთ საძიებო სიტყვა</p>
              </div>
            ) : (
              <>
                {/* Desktop / tablet table */}
                <div className="hidden md:block bg-white/[0.035] border border-white/[0.08] rounded-[28px] overflow-hidden backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#0B1018]/70 border-b border-white/10">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ბინა</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">სართული</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ფართი</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">სტატუსი / კონტაქტი</th>
                          <th className="px-6 py-4 text-xs font-semibold text-emerald-400 uppercase tracking-wider">გადასახდელი</th>
                          <th className="px-6 py-4 text-xs font-semibold text-cyan-400 uppercase tracking-wider">ბალანსი</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">მოქმედებები</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.055]">
                        {filteredApartments.map((apt) => {
                          const contact = getContactDisplay(apt)
                          const inv = invoices[apt.id]
                          const totalAmount = inv?.total_amount || 0
                          const paidAmount = inv?.paid_amount || 0
                          const balance = totalAmount - paidAmount
                          const status = getInvoiceStatus(apt)

                          return (
                            <tr key={apt.id} className="hover:bg-white/[0.035] transition-colors">
                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-white bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg">
                                  {apt.apartment_number}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-300">{apt.floor || '—'}</td>
                              <td className="px-6 py-4 text-sm text-slate-300">{apt.area_sqm ? `${apt.area_sqm} მ²` : '—'}</td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                      apt.residency_status === 'გაქირავებულია' ? 'bg-blue-500/20 text-blue-400' :
                                      apt.residency_status === 'დაკეტილი/ცარიელი' ? 'bg-slate-500/20 text-slate-400' :
                                      'bg-emerald-500/20 text-emerald-400'
                                    }`}>
                                      {apt.residency_status || 'მეპატრონე'}
                                    </span>
                                    <span className="text-sm font-medium text-white">{contact.name || '—'}</span>
                                  </div>
                                  {contact.phone && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                      <IconPhone className="w-3 h-3" /> {contact.phone}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {inv ? (
                                  <div className="text-sm font-bold text-emerald-300">{totalAmount.toFixed(2)}₾</div>
                                ) : (
                                  <div className="text-xs text-slate-500 italic">—</div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {inv ? (
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold ${
                                      balance > 0 ? 'text-rose-400' : 'text-emerald-400'
                                    }`}>
                                      {balance > 0 ? `${balance.toFixed(2)}₾` : '0₾'}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${status.bg} ${status.color}`}>
                                      {status.label}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-500 italic">—</div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleOpenTariffModal(apt)}
                                    className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                    title="ტარიფების მართვა"
                                  >
                                    <IconSettings className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleOpenEditApartment(apt)}
                                    className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                    title="რედაქტირება"
                                  >
                                    <IconEdit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => { setApartmentToDelete(apt); setIsDeleteApartmentConfirmOpen(true) }}
                                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                    title="წაშლა"
                                  >
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

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {filteredApartments.map((apt) => {
                    const contact = getContactDisplay(apt)
                    const inv = invoices[apt.id]
                    const totalAmount = inv?.total_amount || 0
                    const paidAmount = inv?.paid_amount || 0
                    const balance = totalAmount - paidAmount
                    const status = getInvoiceStatus(apt)

                    return (
                      <div key={apt.id} className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.14)]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                              ბინა {apt.apartment_number}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              apt.residency_status === 'გაქირავებულია' ? 'bg-blue-500/20 text-blue-400' :
                              apt.residency_status === 'დაკეტილი/ცარიელი' ? 'bg-slate-500/20 text-slate-400' :
                              'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {apt.residency_status || 'მეპატრონე'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenTariffModal(apt)}
                              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                              title="ტარიფების მართვა"
                            >
                              <IconSettings className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditApartment(apt)}
                              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                              title="რედაქტირება"
                            >
                              <IconEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setApartmentToDelete(apt); setIsDeleteApartmentConfirmOpen(true) }}
                              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="წაშლა"
                            >
                              <IconTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                          <span>სართული: <span className="text-slate-200 font-medium">{apt.floor || '—'}</span></span>
                          <span>ფართი: <span className="text-slate-200 font-medium">{apt.area_sqm ? `${apt.area_sqm} მ²` : '—'}</span></span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-white">{contact.name || '—'}</span>
                          {contact.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <IconPhone className="w-3 h-3" /> {contact.phone}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">გადასახდელი</div>
                            <div className="text-sm font-bold text-emerald-300">{inv ? `${totalAmount.toFixed(2)}₾` : '—'}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">ბალანსი</div>
                            {inv ? (
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className={`text-sm font-bold ${balance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                  {balance > 0 ? `${balance.toFixed(2)}₾` : '0₾'}
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${status.bg} ${status.color}`}>
                                  {status.label}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500 italic">—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'monthly-expenses' && (
          <MonthlyExpensesTab buildingId={buildingId} />
        )}

        {activeTab === 'payments' && (
          <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">გადახდების ჟურნალი</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-sm font-extrabold rounded-xl transition-all duration-200 shadow-[0_10px_30px_rgba(34,211,238,0.18)]">
                <IconPlus className="w-4 h-4" /> გადახდის დამატება
              </button>
            </div>
            <div className="text-center py-12 text-slate-400">
              <IconWallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>გადახდების ისტორია და მართვის ინსტრუმენტები მალე დაემატება.</p>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">შეტყობინებები და განცხადებები</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white text-sm font-extrabold rounded-xl transition-all duration-200 shadow-[0_10px_30px_rgba(139,92,246,0.20)]">
                <IconPlus className="w-4 h-4" /> ახალი განცხადება
              </button>
            </div>
            <div className="text-center py-12 text-slate-400">
              <IconSend className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>განცხადებების მართვის პანელი მალე დაემატება.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/[0.035] border border-white/[0.08] rounded-[28px] p-5 sm:p-7 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">ზოგადი პარამეტრები</h2>
              <p className="text-slate-400 mb-6">კორპუსის ძირითადი ინფორმაციის შესაცვლელად გამოიყენეთ ზედა მარჯვენა კუთხეში არსებული "რედაქტირება" ღილაკი.</p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#0B1018]/70 p-4 rounded-xl border border-white/5">
                  <span className="text-slate-500 block mb-1">კორპუსის ID</span>
                  <span className="text-white font-mono">{buildingId}</span>
                </div>
                <div className="bg-[#0B1018]/70 p-4 rounded-xl border border-white/5">
                  <span className="text-slate-500 block mb-1">შექმნის თარიღი</span>
                  <span className="text-white">{new Date(building.created_at).toLocaleDateString('ka-GE')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500/[0.07] to-transparent border border-rose-400/[0.15] rounded-[28px] p-5 sm:p-7">
              <h2 className="text-xl sm:text-2xl font-bold text-rose-400 mb-4 flex items-center gap-2">
                <IconTrash className="w-6 h-6" /> საშიში ზონა
              </h2>
              <p className="text-slate-300 mb-6">
                კორპუსის წაშლა წაშლის მის ყველა დაკავშირებულ მონაცემს სამუდამოდ: ბინებს, გადახდებს, საკონტაქტო პირებს და კომუნალურ ინფორმაციას. ეს მოქმედება შეუქცევადია.
              </p>
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(244,63,94,0.20)]"
              >
                კორპუსის სამუდამოდ წაშლა
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ============ EDIT BUILDING MODAL ============ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#020409]/75 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1018]/98 border border-white/[0.10] rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1018]/98 backdrop-blur-xl z-10">
              <h2 className="text-xl font-bold text-white">კორპუსის რედაქტირება</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <IconX className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">კორპუსის სახელი</label>
                  <input type="text" value={editForm.name || ''} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: ვაჟა-ფშაველას 42" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">მისამართი (ქუჩა)</label>
                  <input type="text" value={editForm.street || ''} onChange={(e) => setEditForm({...editForm, street: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">ქალაქი</label>
                  <input type="text" value={editForm.city || ''} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">უბანი</label>
                  <input type="text" value={editForm.district || ''} onChange={(e) => setEditForm({...editForm, district: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">საფოსტო ინდექსი</label>
                  <input type="text" value={editForm.postal_code || ''} onChange={(e) => setEditForm({...editForm, postal_code: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">კორპუსის ტიპი</label>
                  <select value={editForm.building_type || ''} onChange={(e) => setEditForm({...editForm, building_type: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors">
                    <option value="multi-family">მრავალსართულიანი საცხოვრებელი</option>
                    <option value="private-houses">კერძო სახლების კომპლექსი</option>
                    <option value="business-center">ბიზნეს ცენტრი</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">აგების წელი</label>
                  <input type="number" value={editForm.construction_year || ''} onChange={(e) => setEditForm({...editForm, construction_year: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">სართულები</label>
                  <input type="number" value={editForm.floors || ''} onChange={(e) => setEditForm({...editForm, floors: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">ბინების რაოდენობა</label>
                  <input type="number" value={editForm.apartments_count || ''} onChange={(e) => setEditForm({...editForm, apartments_count: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">სადარბაზოები</label>
                  <input type="number" value={editForm.entrances_count || ''} onChange={(e) => setEditForm({...editForm, entrances_count: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">საერთო ფართობი (მ²)</label>
                  <input type="number" step="0.1" value={editForm.total_area || ''} onChange={(e) => setEditForm({...editForm, total_area: e.target.value})} className="w-full px-4 py-2.5 bg-[#111823] border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0A1018]">
              <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-[#111823] hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleSaveEdit} className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.22)]">შენახვა</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ APARTMENT MODAL ============ */}
      {isApartmentModalOpen && (
        <div className="fixed inset-0 bg-[#020409]/75 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1018]/98 border border-white/[0.10] rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A1018]/98 backdrop-blur-xl z-10">
              <h2 className="text-xl font-bold text-white">{editingApartment ? 'ბინის რედაქტირება' : 'ახალი ბინის დამატება'}</h2>
              <button onClick={() => setIsApartmentModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <IconX className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <IconShield className="w-4 h-4" /> ძირითადი ინფორმაცია
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">ბინის ნომერი *</label>
                    <input type="text" value={aptForm.apartment_number} onChange={(e) => setAptForm({...aptForm, apartment_number: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 12" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">სართული</label>
                    <input type="number" value={aptForm.floor} onChange={(e) => setAptForm({...aptForm, floor: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 3" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">ფართი (მ²)</label>
                    <input type="number" step="0.1" value={aptForm.area_sqm} onChange={(e) => setAptForm({...aptForm, area_sqm: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 85.5" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">პარკინგი</label>
                    <input type="number" value={aptForm.parking_spaces} onChange={(e) => setAptForm({...aptForm, parking_spaces: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 1" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">ბინის სტატუსი</label>
                  <select value={aptForm.residency_status} onChange={(e) => setAptForm({...aptForm, residency_status: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors">
                    <option value="მეპატრონე ცხოვრობს">🏠 მეპატრონე ცხოვრობს</option>
                    <option value="გაქირავებულია">🔑 გაქირავებულია</option>
                    <option value="დაკეტილი/ცარიელი">🔒 დაკეტილი / ცარიელი</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">მეპატრონის სახელი</label>
                    <input type="text" value={aptForm.owner_name} onChange={(e) => setAptForm({...aptForm, owner_name: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: გიორგი გიორგაძე" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">მეპატრონის ტელეფონი</label>
                    <input type="text" value={aptForm.owner_phone} onChange={(e) => setAptForm({...aptForm, owner_phone: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: +995 555 123 456" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">მეპატრონის ელ-ფოსტა</label>
                    <input type="email" value={aptForm.owner_email} onChange={(e) => setAptForm({...aptForm, owner_email: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: owner@example.com" />
                  </div>
                </div>

                {aptForm.residency_status === 'გაქირავებულია' && (
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                      <IconUser className="w-4 h-4" /> მოქირავის ინფორმაცია
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">მოქირავის სახელი</label>
                        <input type="text" value={aptForm.tenant_name} onChange={(e) => setAptForm({...aptForm, tenant_name: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="მოქირავის სახელი" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">მოქირავის ტელეფონი</label>
                        <input type="text" value={aptForm.tenant_phone} onChange={(e) => setAptForm({...aptForm, tenant_phone: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="მოქირავის ტელეფონი" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">მოქირავის ელ-ფოსტა</label>
                        <input type="email" value={aptForm.tenant_email} onChange={(e) => setAptForm({...aptForm, tenant_email: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="მოქირავის ელ-ფოსტა" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => setShowAdvancedAptInfo(!showAdvancedAptInfo)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <IconChevronDown className={`w-4 h-4 transition-transform ${showAdvancedAptInfo ? 'rotate-180' : ''}`} />
                  {showAdvancedAptInfo ? 'დამატებითი ინფორმაციის დამალვა' : 'დამატებითი დეტალების დამატება'}
                </button>
              </div>

              {showAdvancedAptInfo && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2">
                    <IconSettings className="w-4 h-4" /> დამატებითი დეტალები
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">ოთახების რაოდენობა</label>
                      <input type="number" value={aptForm.rooms} onChange={(e) => setAptForm({...aptForm, rooms: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 3" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">სააბაზანოების რაოდენობა</label>
                      <input type="number" value={aptForm.bathrooms} onChange={(e) => setAptForm({...aptForm, bathrooms: e.target.value})} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" placeholder="მაგ: 1" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">დამატებითი შენიშვნები</label>
                      <textarea value={aptForm.special_notes} onChange={(e) => setAptForm({...aptForm, special_notes: e.target.value})} rows={3} className="w-full px-3 py-2 bg-[#111823] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="ნებისმიერი დამატებითი ინფორმაცია..." />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0A1018]">
              <button onClick={() => setIsApartmentModalOpen(false)} className="px-5 py-2.5 bg-[#111823] hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleSaveApartment} className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.22)]">შენახვა</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ TARIFF MODAL (External Component) ============ */}
      {isTariffModalOpen && selectedApartmentForTariff && (
        <ApartmentTariffModal
          apartment={selectedApartmentForTariff}
          buildingId={buildingId}
          isOpen={isTariffModalOpen}
          onClose={() => {
            setIsTariffModalOpen(false)
            setSelectedApartmentForTariff(null)
          }}
          onSave={handleTariffSaved}
        />
      )}

      {/* ============ DELETE APARTMENT CONFIRMATION MODAL ============ */}
      {isDeleteApartmentConfirmOpen && apartmentToDelete && (
        <div className="fixed inset-0 bg-[#020409]/82 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1018]/99 border border-rose-400/20 rounded-[24px] max-w-md w-full p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <IconTrash className="w-7 h-7 text-rose-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">ბინის წაშლა</h3>
                <p className="text-sm text-slate-400">დარწმუნებული ხარ?</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              ბინა <span className="font-bold text-white">"{apartmentToDelete.apartment_number}"</span> და მასთან დაკავშირებული ყველა მონაცემი წაიშლება სამუდამოდ. ეს მოქმედება შეუქცევადია.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setIsDeleteApartmentConfirmOpen(false); setApartmentToDelete(null) }} className="px-4 py-2.5 bg-[#111823] hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleDeleteApartment} className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(244,63,94,0.20)]">დიახ, წაშლა</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ DELETE BUILDING CONFIRMATION MODAL ============ */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-[#020409]/82 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1018]/99 border border-rose-400/20 rounded-[24px] max-w-md w-full p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
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
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2.5 bg-[#111823] hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">გაუქმება</button>
              <button onClick={handleDeleteBuilding} className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white font-extrabold rounded-xl transition-all shadow-[0_10px_30px_rgba(244,63,94,0.20)]">დიახ, წაშლა</button>
            </div>
          </div>
        </div>
      )}

      {/* ============ NOTIFICATION MODAL (replaces alert()) ============ */}
      {notification && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setNotification(null)}
          />
          <div className="relative w-full max-w-sm animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
            <div
              className={`relative overflow-hidden rounded-[28px] border p-8 text-center backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${
                notification.type === 'success'
                  ? 'bg-gradient-to-b from-[#0F1D17] to-[#0B1611] border-emerald-400/25'
                  : 'bg-gradient-to-b from-[#1D0F0F] to-[#160B0B] border-rose-400/25'
              }`}
            >
              <div
                className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                  notification.type === 'success' ? 'bg-emerald-400/20' : 'bg-rose-400/20'
                }`}
              />

              <button
                onClick={() => setNotification(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <IconX className="w-4 h-4" />
              </button>

              <div className="relative flex justify-center mb-5">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    notification.type === 'success'
                      ? 'bg-emerald-400/[0.12] ring-1 ring-emerald-400/30'
                      : 'bg-rose-400/[0.12] ring-1 ring-rose-400/30'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" stroke="rgb(52,211,153)" strokeWidth="1.5" opacity="0.3" />
                      <path
                        d="M7 12.5l3 3 7-7"
                        stroke="rgb(52,211,153)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ezo-check-draw"
                      />
                    </svg>
                  ) : (
                    <IconAlertTriangle className="w-7 h-7 text-rose-400" />
                  )}
                </div>
              </div>

              <h3 className={`relative text-lg font-bold mb-2 ${notification.type === 'success' ? 'text-white' : 'text-rose-50'}`}>
                {notification.title || (notification.type === 'success' ? 'წარმატებით შესრულდა' : 'დაფიქსირდა შეცდომა')}
              </h3>
              <p className="relative text-sm text-slate-400 leading-relaxed mb-6">
                {notification.message}
              </p>

              <button
                onClick={() => setNotification(null)}
                className={`relative w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                  notification.type === 'success'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_12px_32px_rgba(16,185,129,0.25)]'
                    : 'bg-white/[0.08] text-white border border-white/[0.12]'
                }`}
              >
                გასაგებია
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .ezo-shell {
          background:
            radial-gradient(900px 500px at 10% -5%, rgba(16,185,129,.10), transparent 60%),
            radial-gradient(800px 500px at 95% 0%, rgba(59,130,246,.08), transparent 58%),
            radial-gradient(700px 500px at 50% 100%, rgba(139,92,246,.055), transparent 62%),
            #070A0F;
        }
        .ezo-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .18;
          background-image: linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 85%);
        }
        .ezo-shell button,
        .ezo-shell a,
        .ezo-shell input,
        .ezo-shell select {
          -webkit-tap-highlight-color: transparent;
        }
        .ezo-shell button:focus-visible,
        .ezo-shell a:focus-visible,
        .ezo-shell input:focus-visible,
        .ezo-shell select:focus-visible {
          outline: 2px solid rgba(52,211,153,.7);
          outline-offset: 2px;
        }
        .ezo-shell ::selection {
          background: rgba(16,185,129,.28);
          color: white;
        }
        .ezo-shell .animate-in {
          animation-timing-function: cubic-bezier(.22,1,.36,1);
        }
        .ezo-shell .no-scrollbar::-webkit-scrollbar { display: none; }
        .ezo-shell .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .ezo-check-draw {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: checkDraw 0.4s ease-out 0.15s forwards;
        }
        @keyframes checkDraw {
          to { stroke-dashoffset: 0; }
        }
        @media (max-width: 640px) {
          .ezo-shell main { min-height: calc(100vh - 130px); }
          .ezo-shell table { min-width: 760px; }
        }
      `}</style>

    </div>
  )
}