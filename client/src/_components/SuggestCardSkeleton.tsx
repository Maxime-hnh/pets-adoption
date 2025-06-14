import { Skeleton } from "./ui/skeleton";


export default function SuggestCardSkeleton() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Skeleton className="h-48 w-full rounded-bl-none rounded-br-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}