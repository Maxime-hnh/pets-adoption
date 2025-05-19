import { Animal, AnimalStatus, Gender, PlacementType, Species } from "@/_schemas/animal.schema";
import { create } from "zustand";

type AnimalFormMode = "create" | "edit";


interface AnimalFormState {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: AnimalFormMode;
  defaultValues?: Animal;
  openCreate: () => void;
  openEdit: (animal: Animal) => void;
  close: () => void;
}

export const useAnimalFormStore = create<AnimalFormState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  mode: "create",
  defaultValues: undefined,

  openCreate: () => {
    set({
      open: true,
      mode: "create",
      defaultValues: {
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
      },
    })
  },

  openEdit: (animal: Animal) => {
    set({
      open: true,
      mode: "edit",
      defaultValues: animal
    })
  },
  close: () => set({ open: false }),

}))
