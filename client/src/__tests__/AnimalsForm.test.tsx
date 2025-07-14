import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, expect, beforeEach, test, vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AnimalsForm from "@/app/(admin)/admin/animals/AnimalsForm"
import { AnimalStatus, PlacementType, Species } from "@/_schemas/animal.schema"
import { Gender } from "@/_schemas/animal.schema"


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



// Mock du store zustand si nécessaire
vi.mock("@/_stores/animalForm.store", () => ({
  useAnimalFormStore: () => ({
    close: vi.fn(),
  }),
}))

// Mock de la mutation useCreateAnimal
const mutateAsync = vi.fn()

vi.mock("@/_mutations/animals/useCreateAnimal", () => ({
  useCreateAnimal: () => ({
    mutateAsync,
    isPending: false,
  }),
}))

// Mock minimal des dépendances de ton formulaire
vi.mock("@/_queries/incompatibilities/useIncompatibilitiesQuery", () => ({
  useIncompatibilitiesQuery: () => ({
    data: [],
  }),
}))

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe("AnimalForm (mode création)", () => {
  beforeEach(() => {
    mutateAsync.mockReset()
  })

  test("affiche les champs et bloque si vide", async () => {
    renderWithProviders(<AnimalsForm mode="create" values={defaultValues} />)

    // Vérifie qu'un champ est présent
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument()

    // Soumets le formulaire sans remplir
    fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }))

    // Attends le message d'erreur Zod
    expect(await screen.findByText(/Le nom est requis/i)).toBeInTheDocument()

    // La mutation ne doit pas être appelée
    expect(mutateAsync).not.toHaveBeenCalled()
  })

  test("envoie les données valides à la mutation", async () => {
    const onSuccess = vi.fn()
    renderWithProviders(<AnimalsForm mode="create" values={defaultValues} />)

    fireEvent.input(screen.getByLabelText(/Nom/i), {
      target: { value: "Rex" },
    })

    fireEvent.click(screen.getByRole("button", { name: /enregistrer/i }))

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Rex" })
      )
    })
  })
})
