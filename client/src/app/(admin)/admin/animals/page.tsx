import dynamic from "next/dynamic";

export default function AnimalsPage() {

  const AnimalsTable = dynamic(() => import("./AnimalsTable"))

  return (
    <div className=" w-full p-4 overflow-x-hidden">
      <AnimalsTable />
    </div>
  )
}
