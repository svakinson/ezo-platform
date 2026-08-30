'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// ============ ICONS ============
const IconBuilding = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </svg>
)

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const IconMail = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconPhone = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconLock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const IconEyeOff = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrowLeft = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const IconAlertCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconLoader = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// ============ COMPONENTS ============

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  required = false,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ComponentType<{ className?: string }>
  error?: string
  required?: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-10' : 'pr-4'} py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${
            error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-600">
          <IconAlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const getStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 6) score++
    if (pwd.length >= 10) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const strength = getStrength(password)
  const labels = ['ძალიან სუსტი', 'სუსტი', 'საშუალო', 'ძლიერი', 'ძალიან ძლიერი']
  const colors = ['bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600']

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < strength ? colors[strength - 1] : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength <= 2 ? 'text-rose-600' : strength === 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
        პაროლის სიძლიერე: {labels[strength - 1] || 'ძალიან სუსტი'}
      </p>
    </div>
  )
}

// ============ MAIN PAGE ============

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    buildingAddress: '',
    apartmentCount: '',
    role: 'admin',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'სახელი სავალდებულოა'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ელ-ფოსტა სავალდებულოა'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'არასწორი ელ-ფოსტის ფორმატი'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'ტელეფონი სავალდებულოა'
    } else if (!/^(\+995|5)\d{8,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'არასწორი ტელეფონის ნომერი'
    }

    if (!formData.password) {
      newErrors.password = 'პაროლი სავალდებულოა'
    } else if (formData.password.length < 6) {
      newErrors.password = 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'პაროლები არ ემთხვევა'
    }

    if (!formData.buildingAddress.trim()) {
      newErrors.buildingAddress = 'მისამართი სავალდებულოა'
    }

    if (!agreedToTerms) {
      newErrors.terms = 'უნდა დაეთანხმო წესებს და პირობებს'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: formData.role,
            building_address: formData.buildingAddress,
            apartment_count: formData.apartmentCount,
          },
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: 'ეს ელ-ფოსტა უკვე რეგისტრირებულია' })
        } else {
          setErrors({ submit: error.message })
        }
        return
      }

      setSuccess(true)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/login?registered=true')
      }, 2000)
    } catch (err) {
      setErrors({ submit: 'რეგისტრაციის დროს მოხდა შეცდომა. სცადეთ თავიდან.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <IconCheck className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">რეგისტრაცია წარმატებულია!</h2>
          <p className="text-slate-600 mb-6">
            რეგისტრაციის დასასრულებლად გთხოვთ დაადასტუროთ თქვენი ელ-ფოსტა. გაგზავნილია წერილი მისამართზე:
          </p>
          <div className="bg-slate-50 rounded-lg p-3 mb-6">
            <p className="text-sm font-medium text-slate-700">{formData.email}</p>
          </div>
          <p className="text-sm text-slate-500">
            გადამისამართება შესვლის გვერდზე...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <IconBuilding className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EZO</span>
            </Link>
          </div>

          <div className="relative max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              დაიწყე კორპუსის ციფრული მართვა დღესვე
            </h1>
            <p className="text-lg text-emerald-50 leading-relaxed mb-8">
              შეუერთდი 420+ კორპუსს, რომლებიც უკვე იყენებენ EZO-ს. მიიღე სრული კონტროლი ფინანსებზე, კომუნიკაციაზე და მოვლაზე.
            </p>

            <div className="space-y-4">
              {[
                'უფასო 14-დღიანი ტესტი',
                'ბარათის მონაცემების გარეშე',
                'გაუქმება ნებისმიერ დროს',
                'ქართული მხარდაჭერა'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <IconCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-emerald-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <p className="text-sm text-emerald-100">
              © 2026 EZO. ყველა უფლება დაცულია.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <div className="w-full max-w-lg">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <Link href="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <IconBuilding className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900">EZO</span>
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                შექმენი ანგარიში
              </h2>
              <p className="text-slate-600">
                უკვე გაქვს ანგარიში?{' '}
                <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
                  შედი სისტემაში
                </Link>
              </p>
            </div>

            {errors.submit && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
                <IconAlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-rose-700">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  როლი <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'admin', label: 'ადმინისტრატორი', desc: 'კორპუსის მმართველი' },
                    { value: 'resident', label: 'მაცხოვრებელი', desc: 'ბინის მფლობელი' },
                  ].map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => updateField('role', role.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.role === role.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 text-sm">{role.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{role.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <InputField
                label="სრული სახელი"
                placeholder="მაგ: გიორგი ბერიძე"
                value={formData.fullName}
                onChange={(value) => updateField('fullName', value)}
                icon={IconUser}
                error={errors.fullName}
                required
              />

              {/* Email */}
              <InputField
                label="ელ-ფოსტა"
                type="email"
                placeholder="მაგ: giorgi@example.com"
                value={formData.email}
                onChange={(value) => updateField('email', value)}
                icon={IconMail}
                error={errors.email}
                required
              />

              {/* Phone */}
              <InputField
                label="ტელეფონი"
                type="tel"
                placeholder="მაგ: +995 599 123 456"
                value={formData.phone}
                onChange={(value) => updateField('phone', value)}
                icon={IconPhone}
                error={errors.phone}
                required
              />

              {/* Password */}
              <div className="space-y-2">
                <InputField
                  label="პაროლი"
                  type="password"
                  placeholder="მინიმუმ 6 სიმბოლო"
                  value={formData.password}
                  onChange={(value) => updateField('password', value)}
                  icon={IconLock}
                  error={errors.password}
                  required
                />
                <PasswordStrength password={formData.password} />
              </div>

              {/* Confirm Password */}
              <InputField
                label="გაიმეორე პაროლი"
                type="password"
                placeholder="იგივე პაროლი"
                value={formData.confirmPassword}
                onChange={(value) => updateField('confirmPassword', value)}
                icon={IconLock}
                error={errors.confirmPassword}
                required
              />

              {/* Building Address */}
              <InputField
                label="კორპუსის მისამართი"
                placeholder="მაგ: ვაჟა-ფშაველას 42, თბილისი"
                value={formData.buildingAddress}
                onChange={(value) => updateField('buildingAddress', value)}
                icon={IconBuilding}
                error={errors.buildingAddress}
                required
              />

              {/* Apartment Count */}
              <InputField
                label="ბინების რაოდენობა (არასავალდებულო)"
                type="number"
                placeholder="მაგ: 48"
                value={formData.apartmentCount}
                onChange={(value) => updateField('apartmentCount', value)}
                icon={IconBuilding}
              />

              {/* Terms */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked)
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }))
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-600">
                    ვეთანხმები{' '}
                    <a href="#" className="text-emerald-600 hover:underline">წესებს და პირობებს</a>
                    {' '}და{' '}
                    <a href="#" className="text-emerald-600 hover:underline">კონფიდენციალურობის პოლიტიკას</a>
                  </span>
                </label>
                {errors.terms && (
                  <div className="flex items-center gap-2 text-sm text-rose-600">
                    <IconAlertCircle className="w-4 h-4" />
                    <span>{errors.terms}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <IconLoader className="w-5 h-5" />
                    <span>რეგისტრაცია...</span>
                  </>
                ) : (
                  <>
                    <span>რეგისტრაცია</span>
                    <IconCheck className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-500">ან</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Social Login (placeholder) */}
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="py-3 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Back to home */}
            <div className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                <IconArrowLeft className="w-4 h-4" />
                <span>მთავარ გვერდზე დაბრუნება</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}