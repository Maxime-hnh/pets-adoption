import { calculateAgeToNumber } from "@/_lib/utils";
import { Animal, AnimalStatus, AnimalStatusLabelMap, Gender, GenderLabelMap, PlacementType, PlacementTypeLabelMap, Species, SpeciesLabelMap } from "@/_schemas/animal.schema";
import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";
import { create } from "zustand";

interface AnimalsFilters {
  search: string;
  species: Species[];
  breed: string[];
  minAge: number | null;
  maxAge: number | null;
  sexe: Gender[];
  placementType: PlacementType[];
  status: AnimalStatus[];
  incompatibilities: string[];
}

interface AnimalsStore {
  animals: Animal[];
  incompatibilities: ShortIncompatibility[];
  setAnimals: (animals: Animal[]) => void;
  setIncompatibilities: (inc: ShortIncompatibility[]) => void;
  filters: AnimalsFilters;
  setFilters: (filters: AnimalsFilters | ((prev: AnimalsFilters) => AnimalsFilters)) => void;
  filteredAnimals: Animal[];
  _updateFilteredAnimals: () => void;
}


export const useAnimalsStore = create<AnimalsStore>((set, get) => ({
  animals: [],
  incompatibilities: [],
  filteredAnimals: [],
  
  setAnimals: (animals) => {
    set({ animals });
    get()._updateFilteredAnimals();
  },
  
  setIncompatibilities: (incompatibilities) => set({ incompatibilities }),
  
  filters: {
    search: '',
    species: [] as Species[],
    breed: [] as string[],
    minAge: null as number | null,
    maxAge: null as number | null,
    sexe: [] as Gender[],
    placementType: [] as PlacementType[],
    status: [] as AnimalStatus[],
    incompatibilities: [] as string[],
  },
  
  setFilters: (filtersOrUpdater) => {
    if (typeof filtersOrUpdater === 'function') {
      set((state) => ({ filters: filtersOrUpdater(state.filters) }));
    } else {
      set({ filters: filtersOrUpdater });
    }
    get()._updateFilteredAnimals();
  },
  
  _updateFilteredAnimals: () => {
    const { animals, filters } = get();
    
    const filtered = animals.filter((animal) => {
      // Recherche textuelle dans le nom, la race et la description
      if (filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        const matchesSearch = 
          animal.name.toLowerCase().includes(searchTerm) ||
          animal.breed.toLowerCase().includes(searchTerm) ||
          (animal.description && animal.description.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }
      
      // Si aucun filtre d'espèce n'est sélectionné, on affiche tous les animaux
      if (filters.species.length > 0 && !filters.species.includes(animal.species)) return false;
      
      // Si aucun filtre de race n'est sélectionné, on affiche toutes les races
      if (filters.breed.length > 0 && !filters.breed.includes(animal.breed)) return false;
      
      // Si aucun filtre de sexe n'est sélectionné, on affiche tous les sexes
      if (filters.sexe.length > 0 && !filters.sexe.includes(animal.gender)) return false;
      
      // Si aucun filtre de type de placement n'est sélectionné, on affiche tous les types
      if (filters.placementType.length > 0 && !filters.placementType.includes(animal.placementType)) return false;
      
      // Si aucun filtre de statut n'est sélectionné, on affiche tous les statuts
      if (filters.status.length > 0 && !filters.status.includes(animal.status)) return false;
      
      // Filtrage par âge
      const animalAge = calculateAgeToNumber(animal.birthDate);
      if (filters.minAge !== null && animalAge < filters.minAge) return false;
      if (filters.maxAge !== null && animalAge > filters.maxAge) return false;
      
      // Filtrage par incompatibilités (si l'animal a des incompatibilités qui sont dans les filtres, on l'exclut)
      if (filters.incompatibilities.length > 0) {
        const animalIncompatibilityIds = animal.incompatibilityIds?.map(id => id.toString()) || [];
        const hasFilteredIncompatibility = filters.incompatibilities.some(filterId => 
          animalIncompatibilityIds.includes(filterId)
        );
        if (hasFilteredIncompatibility) return false;
      }
      
      return true;
    });
    
    set({ filteredAnimals: filtered });
  },
}))