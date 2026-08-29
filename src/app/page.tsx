import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100">
      {/* მარტივი Header */}
      <header className="p-6 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-600">️ EZO</h1>
          <Link href="/register" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            რეგისტრაცია
          </Link>
        </div>
      </header>

      {/* მარტივი Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-6">EZO</h2>
        <p className="text-2xl text-gray-600 mb-8">
          კორპუსების მართვა მარტივად და ეფექტურად
        </p>
        <Link href="/register" className="px-8 py-4 bg-emerald-600 text-white text-lg rounded-full hover:bg-emerald-700 shadow-lg">
          🚀 დაიწყე ახლა
        </Link>
      </main>
    </div>
  )
}