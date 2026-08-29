import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">🏘️ EZO</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        კორპუსების მართვა მარტივად და ეფექტურად
      </p>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
        >
          რეგისტრაცია
        </Link>
      </div>
    </div>
  )
}
