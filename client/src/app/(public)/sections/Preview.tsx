import SuggestCard from "@/_components/SuggestCard";
import SuggestCardSkeleton from "@/_components/SuggestCardSkeleton";
import { Suspense } from "react";

export default async function Preview() {


  return (
    <section className="px-4 lg:px-16 xl:px-24 2xl:px-48 mb-16">
      <h2 className="text-4xl  mb-16 lg:text-5xl">Suggestions</h2>

      <Suspense fallback={<SuggestCardSkeleton />}>
        <SuggestCard />
      </Suspense>
    </section>
  )
}