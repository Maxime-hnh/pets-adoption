import { Skeleton } from "@/_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full p-4">
      <Skeleton className="rounded-xl w-full h-[500px]" />
    </div>
  )
}