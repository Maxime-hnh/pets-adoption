import { AnimalStatus, Gender, PlacementType, Species } from "@/_schemas/animal.schema";
import AnimalsForm from "../AnimalsForm";

export default function NewAnimalPage() {

  const defaultValues = {
    icadNumber: "",
    name: "",
    species: Species.DOG,
    breed: "",
    gender: Gender.MALE,
    birthDate: new Date(),
    description: "",
    adoptionDate: undefined,
    status: AnimalStatus.AVAILABLE,
    placementType: PlacementType.STANDARD,
    photos: [],
    internalNotes: "",
    isArchived: false,
    isSterilized: false,
    incompatibilityIds: [],
  }

  return (
    <div className=" w-full py-8 pr-4 pl-8 overflow-x-hidden bg-[#f1f3f4]">
      <AnimalsForm
        mode="create"
        values={defaultValues}
      />
    </div>
  )
}