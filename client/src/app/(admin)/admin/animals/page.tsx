import dynamic from "next/dynamic";

export default function AnimalsPage() {

  const AnimalsTable = dynamic(() => import("./AnimalsTable"))

  return (
    <section className="w-full px-4 overflow-x-hidden h-[calc(100dvh-60px)]">
      <AnimalsTable />
    </section>
  )
}
