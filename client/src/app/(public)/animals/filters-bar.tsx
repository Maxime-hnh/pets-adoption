"use client"
import React from "react";
import { Input } from "@/_components/ui/input"
import { MultipleSelector } from "@/_components/ui/multiple-selector";
import { Search } from "lucide-react";
import { SpeciesLabelMap, Species, GenderLabelMap, Gender, PlacementTypeLabelMap, PlacementType, AnimalStatusLabelMap, AnimalStatus } from "@/_schemas/animal.schema";
import { useAnimalsStore } from "@/_stores/animals.store";
import { Chip } from "@/_components/ui/chip";


export default function FiltersBar() {

  const animals = useAnimalsStore((state) => state.animals);
  const filters = useAnimalsStore((state) => state.filters);
  const incompatibilities = useAnimalsStore((state) => state.incompatibilities);
  const setFilters = useAnimalsStore((state) => state.setFilters);
  const filteredAnimals = useAnimalsStore((state) => state.filteredAnimals);

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


  const handleChipClick = (species: Species) => {
    setFilters((prev) => ({
      ...prev,
      species: prev.species.includes(species) ? prev.species.filter((s) => s !== species) : [...prev.species, species]
    }));
  };

  const handleSexeChipClick = (sexe: Gender) => {
    setFilters((prev) => ({
      ...prev,
      sexe: prev.sexe.includes(sexe) ? prev.sexe.filter((s) => s !== sexe) : [...prev.sexe, sexe]
    }));
  };

  const handleAllClick = () => {
    setFilters((prev) => ({ ...prev, species: [] }));
  };


  const speciesChips = [
    <Chip
      key="all"
      checked={filters.species.length === 0}
      onChange={handleAllClick}
    >
      Tous
    </Chip>,
    ...Object.entries(SpeciesLabelMap).map(([key, label]) => (
      <Chip
        key={key}
        checked={filters.species.includes(key as Species)}
        onChange={() => handleChipClick(key as Species)}
      >
        {label}
      </Chip>
    )),
  ];

  const sexeChips = [
    <Chip
      key="all"
      checked={filters.sexe.length === 0}
      onChange={handleAllClick}
    >
      Tous
    </Chip>,
    ...Object.entries(GenderLabelMap).map(([key, label]) => (
      <Chip
        key={key}
        checked={filters.sexe.includes(key as Gender)}
        onChange={() => handleSexeChipClick(key as Gender)}
      >
        {label}
      </Chip>
    )),
  ];


  console.log(filteredAnimals);
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un animal..."
          className="pl-9 bg-background"
          value={filters.search || ''}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-2 border-b-1 border-gray-300 pb-4">
        <label className="font-inter font-[900] text-lg">Espèces</label>
        <div className="flex flex-row gap-2">
          {speciesChips}
        </div>
      </div>



      {/* MultipleSelector avec groupes pour les races */}
      <MultipleSelector
        label="Races"
        groups={breedGroups}
        value={filters.breed}
        onChange={(values) => setFilters((prev) => ({ ...prev, breed: values }))}
        placeholder="Sélectionner des races..."
        disabled={filters.species.length === 0}
        emptyMessage={filters.species.length === 0 ? "Veuillez d'abord sélectionner une espèce" : "Aucune race trouvée"}
        className="border-gray-300 pb-4"
      />

      {/* Sexe */}
      <div className="flex flex-col gap-2 border-b-1 border-gray-300 pb-4">
        <label className="font-inter font-[900] text-lg">Sexe</label>
        <div className="flex flex-row gap-2">
          {sexeChips}
        </div>
      </div>

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
            onChange={(e) => setFilters((prev) => ({
              ...prev,
              minAge: e.target.value ? parseInt(e.target.value) : null
            }))}
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
            onChange={(e) => setFilters((prev) => ({
              ...prev,
              maxAge: e.target.value ? parseInt(e.target.value) : null
            }))}
            className="w-full bg-background"
          />

        </div>
      </div>


      <MultipleSelector
        label="Type de placement"
        options={Object.entries(PlacementTypeLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.placementType}
        onChange={(values) => setFilters((prev) => ({ ...prev, placementType: values as PlacementType[] }))}
        placeholder="Sélectionner des types de placement..."
        disabled={false}
      />

      <MultipleSelector
        label="Statut"
        options={Object.entries(AnimalStatusLabelMap).map(([value, label]) => ({
          value,
          label
        }))}
        value={filters.status}
        onChange={(values) => setFilters((prev) => ({ ...prev, status: values as AnimalStatus[] }))}
        placeholder="Sélectionner des états..."
        disabled={false}
      />

      <MultipleSelector
        label="Incompatibilités"
        options={incompatibilities.map((item) => ({
          value: item.id.toString(),
          label: item.label
        }))}
        value={filters.incompatibilities}
        onChange={(values) => setFilters((prev) => ({ ...prev, incompatibilities: values as string[] }))}
        placeholder="Sélectionner des incompatibilités..."
        disabled={false}
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
