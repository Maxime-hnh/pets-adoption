'use client'

import { AnimalsTable } from "@/_components/tables/AnimalsTable";
import { columns } from "./colums";
import { useAllAnimalsQuery } from "@/_queries/animals/useAnimalsQuery";
import { Skeleton } from "@/_components/ui/skeleton";

export default function AnimalsPage() {

  const { data, error, isPending, isLoading } = useAllAnimalsQuery();


  if (isLoading) return <div className="w-full p-4">
    <Skeleton className="rounded-xl w-full h-[500px]" />
  </div>
  return (
    <div className=" w-full p-4">

      <AnimalsTable columns={columns} data={data as any} />
    </div>
  )
}
