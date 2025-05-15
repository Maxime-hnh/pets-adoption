import { AnimalsTable } from "@/_components/tables/AnimalsTable";
import { columns } from "./colums";

export default function AnimalsPage() {


  return (
    <div className=" w-full p-4 overflow-x-hidden">
        <AnimalsTable columns={columns} />
    </div>
  )
}
