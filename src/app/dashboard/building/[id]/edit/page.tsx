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

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

export default function EditBuildingPage() {
  const router = useRouter()
  const params = useParams()
  const buildingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [buildingData, setBuildingData] = useState<any>(null)

  useEffect(() => {
    const fetchBuilding = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('buildings')
        .select('*')
        .eq('id', buildingId)
        .single()

      if (error || !data) {
        console.error('შეცდომა მონაცემების წამოღებისას:', error)
        alert('კორპუსი ვერ მოიძებნა')
        router.push('/dashboard')
      } else {
        setBuildingData(data)
      }
      setLoading(false)
    }

    if (buildingId) {
      fetchBuilding()
    }
  }, [buildingId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <IconLoader className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <div className="text-white font-semibold">მონაცემები იტვირთება...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group text-slate-400 hover:text-white transition-colors">
            <IconArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">უკან დაბრუნება</span>
          </Link>
          <div className="flex items-center gap-2">
            <IconBuilding className="w-5 h-5 text-emerald-400" />
            <span className="text-xl font-bold text-white">კორპუსის რედაქტირება</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            რედაქტირება: <span className="text-emerald-400">{buildingData?.name || buildingData?.street}</span>
          </h2>
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-emerald-400 text-sm">
              ✅ მონაცემები წარმატებით ჩაიტვირთა! ახლა შეგვიძლია გადავიდეთ მე-2 ნაბიჯზე და ავაწყოთ სრული ფორმა.
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300">
              <div>ქალაქი: <span className="text-white">{buildingData?.city}</span></div>
              <div>ბინები: <span className="text-white">{buildingData?.apartments_count}</span></div>
              <div>სართული: <span className="text-white">{buildingData?.floors}</span></div>
              <div>ფართობი: <span className="text-white">{buildingData?.total_area} მ²</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}