"use client"
import React from "react";
import { Input } from "@/_components/ui/input"
import { MultipleSelector } from "@/_components/ui/multiple-selector";
import { Search, X } from "lucide-react";
import { SpeciesLabelMap, Species, GenderLabelMap, Gender, PlacementTypeLabelMap, PlacementType } from "@/_schemas/animal.schema";
import { useAnimalsStore } from "@/_stores/animals.store";
import { Chip } from "@/_components/ui/chip";
import { AgeRange, ageRanges } from "@/_lib/constants";


export default function FiltersBar() {

  const animals = useAnimalsStore((state) => state.animals);
  const filters = useAnimalsStore((state) => state.filters);
  const incompatibilities = useAnimalsStore((state) => state.incompatibilities);
  const setFilters = useAnimalsStore((state) => state.setFilters);

  // Grouper les races par espèce
  const breedGroups = React.useMemo(() => {
    const groups: { [key in Species]?: string[] } = {};
    const filteredSpecies = filters.species.length > 0 ? filters.species : Object.keys(SpeciesLabelMap);

    animals.forEach(animal => {
      if (!groups[animal.species]) {
        groups[animal.species] = [];
      }
      if (!groups[animal.species]!.includes(animal.breed.toLowerCase())) {
        groups[animal.species]!.push(animal.breed.toLowerCase());
      }
    });

    return Object.entries(groups)
      .filter(([speciesKey]) => filteredSpecies.includes(speciesKey as Species))
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
  const handlePlacementTypeChipClick = (placementType: PlacementType) => {
    setFilters((prev) => ({
      ...prev,
      placementType: prev.placementType.includes(placementType) ? prev.placementType.filter((s) => s !== placementType) : [...prev.placementType, placementType]
    }));
  };
  const handleIncompatibilityChipClick = (incompatibilityId: string) => {
    setFilters((prev) => ({
      ...prev,
      incompatibilities: prev.incompatibilities.includes(incompatibilityId) ? prev.incompatibilities.filter((s) => s !== incompatibilityId) : [...prev.incompatibilities, incompatibilityId]
    }));
  };

  const handleAllClick = (state: string) => {
    setFilters((prev) => ({ ...prev, [state]: [] }));
  };
  const handleAgeChipClick = (range: AgeRange) => {
    setFilters((prev) => {
      const isSelected = prev.ageRanges.includes(range);
      let newRanges;
      if (isSelected) {
        newRanges = prev.ageRanges.filter(r => r !== range);
      } else {
        newRanges = [...prev.ageRanges, range]
      }
      return {
        ...prev,
        ageRanges: newRanges
      }
    })
  };


  const speciesChips = [
    <Chip
      key="all"
      checked={filters.species.length === 0}
      onChange={() => handleAllClick("species")}
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
      onChange={() => handleAllClick("sexe")}
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

  const placementTypeChips = [
    <Chip
      key="all"
      checked={filters.placementType.length === 0}
      onChange={() => handleAllClick("placementType")}
    >
      Tous
    </Chip>,
    ...Object.entries(PlacementTypeLabelMap).map(([key, label]) => (
      <Chip
        key={key}
        checked={filters.placementType.includes(key as PlacementType)}
        onChange={() => handlePlacementTypeChipClick(key as PlacementType)}
      >
        {label}
      </Chip>
    )),
  ];

  const ageChips = [
    <Chip
      key="all"
      checked={filters.ageRanges.length === 0}
      onChange={() => handleAllClick("age")}
    >
      Tous
    </Chip>,
    ...ageRanges.map((range) => (
      <Chip
        key={range.label}
        checked={filters.ageRanges.includes(range)}
        onChange={() => handleAgeChipClick(range)}
      >
        {range.label}
      </Chip>
    )),
  ];

  const incompatibilityChips = incompatibilities.map((item) => (
    <Chip
      key={item.id}
      checked={filters.incompatibilities.includes(item.id.toString())}
      onChange={() => handleIncompatibilityChipClick(item.id.toString())}
    >
      {item.label}
    </Chip>
  ))


  return (
    <>
      <div id="filters-bar-component" className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un animal..."
          className="pl-9 !bg-white"
          value={filters.search || ''}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-2 border-b-1 border-gray-200 pb-4">
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
        // emptyMessage="Aucune race trouvée"
        className="border-gray-200 border-b-1 pb-4"
        labelClassName="font-inter font-[900] text-lg"
      />

      {/* Sexe */}
      <div className="flex flex-col gap-2 border-b-1 border-gray-200 pb-4">
        <label className="font-inter font-[900] text-lg">Sexe</label>
        <div className="flex flex-row gap-2">
          {sexeChips}
        </div>
      </div>

      {/* Filtres d'âge */}
      <div className="flex flex-col gap-2 border-b-1 border-gray-200 pb-4">
        <label className="font-inter font-[900] text-lg">Âge</label>
        <div className="flex flex-row flex-wrap gap-2">
          {ageChips}
        </div>
      </div>

      {/* Type de placement */}
      <div className="flex flex-col gap-2 border-b-1 border-gray-200 pb-4">
        <label className="font-inter font-[900] text-lg">Type de placement</label>
        <div className="flex flex-row gap-2">
          {placementTypeChips}
        </div>
      </div>

      {/* OK avec */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-[900] text-lg">OK avec</label>
        <div className="flex flex-row gap-2">
          {incompatibilityChips}
        </div>
      </div>


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
