import { Separator } from "@/_components/ui/separator";
import { Skeleton } from "@/_components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" w-full h-[calc(100dvh-60px)] overflow-hidden py-8 pr-4 pl-8 overflow-x-hidden bg-[#f1f3f4]">

      <div className="space-y-4 w-11/12 2xl:w-10/12">
        <div className="flex flex-row justify-between">

          <div className="flex flex-col gap-4 w-full">
            <Skeleton className="h-12 w-1/3 bg-white" />
            <Skeleton className="h-6 w-1/2 bg-white" />
          </div>

          <div className="flex justify-between items-center">
            <Skeleton className="h-10 min-w-12 bg-white" />
            <Skeleton className="h-10 ml-4 min-w-[135px] bg-white" />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-8 w-full">
          <Skeleton className="w-full min-h-[445px] bg-white" />
          <Separator/>
          <Skeleton className="w-full min-h-[445px] bg-white" />
        </div>
      </div>
    </div>
  )
}