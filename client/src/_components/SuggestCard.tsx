export default function SuggestCard() {
  return (
    <div className="mt-16 mb-16">
      <h2 className="text-2xl font-bold mb-8">Vous pourriez aussi aimer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cette section pourrait être implémentée avec des suggestions d'autres animaux */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}