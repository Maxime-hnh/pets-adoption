"use client"
import React, { useState } from "react";
import { Input } from "@/_components/ui/input"
import { MultipleSelector } from "@/_components/ui/multiple-selector";
import { Search } from "lucide-react";
import { Animal, SpeciesLabelMap, Species, GenderLabelMap, Gender, PlacementTypeLabelMap, PlacementType, AnimalStatusLabelMap, AnimalStatus } from "@/_schemas/animal.schema";
import { ShortIncompatibility } from "@/_schemas/incompatibility.schema";


export default function FiltersBar({ animals, incompatibilities }: { animals: Animal[], incompatibilities: ShortIncompatibility[] }) {

  const [search, setSearch] = useState('');

  const [filters, setFilters] = useState({
    species: Object.keys(SpeciesLabelMap) as Species[],
    breed: [] as string[],
    minAge: null as number | null,
    maxAge: null as number | null,
    sexe: Object.keys(GenderLabelMap) as Gender[],
    placementType: Object.keys(PlacementTypeLabelMap) as PlacementType[],
    status: Object.keys(AnimalStatusLabelMap) as AnimalStatus[],
    incompatibilities: [] as string[],
  });

  // Grouper les races par espèce
  const breedGroups = React.useMemo(() => {
    const groups: { [key in Species]?: string[] } = {};

    animals.forEach(animal => {
      if (!groups[animal.species]) {
        groups[animal.species] = [];
      }
      if (!groups[animal.species]!.includes(animal.breed)) {
        groups[animal.species]!.push(animal.breed);
      }
    });

    return Object.entries(groups)
      .filter(([speciesKey]) => filters.species.includes(speciesKey as Species))
      .map(([speciesKey, breeds]) => ({
        label: SpeciesLabelMap[speciesKey as Species],
        options: breeds!.sort().map(breed => ({
          value: breed,
          label: breed
        }))
      }));
  }, [animals, filters.species]);


  const filteredAnimals = animals.filter((animal) => {
    if (filters.species && !filters.species.includes(animal.species)) return false;
    if (filters.breed && !filters.breed.includes(animal.breed)) return false;
    if (filters.sexe && !filters.sexe.includes(animal.gender)) return false;
    if (filters.placementType && !filters.placementType.includes(animal.placementType)) return false;
    if (filters.status && !filters.status.includes(animal.status)) return false;
    // if (filters.incompatibilities && !filters.incompatibilities.every(incompatibility => animal.incompatibilityIds.includes(incompatibility))) return false;
    return true;
  });

  console.log(filteredAnimals);
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un animal..."
          className="pl-9 bg-background"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <MultipleSelector
        label="Espèces"
        options={Object.entries(SpeciesLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.species}
        onChange={(values) => setFilters({ ...filters, species: values as Species[] })}
        placeholder="Sélectionner des espèces..."
        disabled={false}
      />

      {/* MultipleSelector avec groupes pour les races */}
      <MultipleSelector
        label="Races"
        groups={breedGroups}
        value={filters.breed}
        onChange={(values) => setFilters({ ...filters, breed: values })}
        placeholder="Sélectionner des races..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucune race trouvée"}
      />
      {/* Filtres d'âge */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Âge minimum</label>
          <Input
            type="number"
            placeholder="0"
            min="0"
            max="20"
            value={filters.minAge || ''}
            onChange={(e) => setFilters({
              ...filters,
              minAge: e.target.value ? parseInt(e.target.value) : null
            })}
            className="w-full bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Âge maximum</label>
          <Input
            type="number"
            placeholder="20"
            min="0"
            max="20"
            value={filters.maxAge || ''}
            onChange={(e) => setFilters({
              ...filters,
              maxAge: e.target.value ? parseInt(e.target.value) : null
            })}
            className="w-full bg-background"
          />

        </div>
      </div>

      <MultipleSelector
        label="Sexe"
        options={Object.entries(GenderLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.sexe}
        onChange={(values) => setFilters({ ...filters, sexe: values as Gender[] })}
        placeholder="Sélectionner des sexes..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucun sexe trouvée"}
      />

      <MultipleSelector
        label="Type de placement"
        options={Object.entries(PlacementTypeLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.placementType}
        onChange={(values) => setFilters({ ...filters, placementType: values as PlacementType[] })}
        placeholder="Sélectionner des types de placement..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucun type de placement trouvée"}
      />

      <MultipleSelector
        label="Statut"
        options={Object.entries(AnimalStatusLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.status}
        onChange={(values) => setFilters({ ...filters, status: values as AnimalStatus[] })}
        placeholder="Sélectionner des états..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucun état trouvée"}
      />

      <MultipleSelector
        label="Incompatibilités"
        options={incompatibilities.map((item) => ({
          value: item.id.toString(),
          label: item.label
        }))}
        value={filters.incompatibilities}
        onChange={(values) => setFilters({ ...filters, incompatibilities: values as string[] })}
        placeholder="Sélectionner des incompatibilités..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucune incompatibilité trouvée"}
      />


      {/* Exemple d'affichage des sélections pour démo */}
      {/* {process.env.NODE_ENV === 'development' && <div className="mt-4 p-3 bg-gray-100 rounded text-sm space-y-1">
        <p><strong>Espèces sélectionnées:</strong> {filters.species.join(', ') || 'Aucune'}</p>
        <p><strong>Races sélectionnées:</strong> {filters.breed.join(', ') || 'Aucune'}</p>
        <p><strong>Âge:</strong> {filters.minAge || 0} - {filters.maxAge || '∞'} ans</p>
        <p><strong>Sexes sélectionnées:</strong> {filters.sexe.join(', ') || 'Aucune'}</p>
        <p><strong>Types de placement sélectionnées:</strong> {filters.placementType.join(', ') || 'Aucune'}</p>
        <p><strong>Statuts sélectionnés:</strong> {filters.status.join(', ') || 'Aucun'}</p>
        <p><strong>Incompatibilités sélectionnées:</strong> {filters.incompatibilities.join(', ') || 'Aucune'}</p>
      </div>
      } */}
    </>
  );
}
