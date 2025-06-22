import { animalsService } from "@/_services/animals.service";
import AnimalsForm from "../../AnimalsForm";
import { notFound } from "next/navigation";


interface UpdateAnimalPageProps {
  params: Promise<{ id: string }>
}

export default async function UpdateAnimalPage({ params }: UpdateAnimalPageProps) {

  const { serverGetById } = animalsService;
  const { id } = await params;
  const animal = await serverGetById(Number(id), 0);
  if (!animal) return notFound()

  return (
    <div className=" w-full py-8 pr-4 pl-8 overflow-x-hidden bg-[#f1f3f4]">
      <AnimalsForm
        mode="edit"
        values={animal}
      />
    </div>
  )
}