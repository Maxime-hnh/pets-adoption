import { useState } from "react";
import { Dog, Cat, Rabbit } from "lucide-react";
import { cn } from "@/_lib/cn";
import { Species } from "@/_schemas/animal.schema";
import { useFormContext } from "react-hook-form";

interface SpeciesCardProps {
  species: Species;
  label: string;
  icon: React.ElementType;
  isSelected: boolean;
  onClick: () => void;
}

const SpeciesCard = ({ species, label, icon: Icon, isSelected, onClick }: SpeciesCardProps) => {
  const getBackgroundColor = () => {
    switch (species) {
      case Species.DOG:
        return isSelected ? "bg-blue-50 dark:bg-blue-900/20" : "";
      case Species.CAT:
        return isSelected ? "bg-amber-50 dark:bg-amber-900/20" : "";
      case Species.OTHER:
        return isSelected ? "bg-emerald-50 dark:bg-emerald-900/20" : "";
      default:
        return "";
    }
  };

  const getIconColor = () => {
    switch (species) {
      case Species.DOG:
        return isSelected ? "text-blue-500" : "text-gray-400";
      case Species.CAT:
        return isSelected ? "text-amber-500" : "text-gray-400";
      case Species.OTHER:
        return isSelected ? "text-emerald-400" : "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const getBorderColor = () => {
    switch (species) {
      case Species.DOG:
        return isSelected ? "border-blue-500" : "border-gray-200 dark:border-gray-700";
      case Species.CAT:
        return isSelected ? "border-amber-500" : "border-gray-200 dark:border-gray-700";
      case Species.OTHER:
        return isSelected ? "border-emerald-400" : "border-gray-200 dark:border-gray-700";
      default:
        return "border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
        "hover:shadow-md hover:scale-[1.02]",
        getBorderColor(),
        getBackgroundColor()
      )}
      onClick={onClick}
    >
      <div className={cn(
        "rounded-full p-4 mb-3",
        isSelected ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-800"
      )}>
        <Icon className={cn("h-8 w-8", getIconColor())} />
      </div>
      <span className={cn(
        "font-medium text-lg",
        isSelected ? getIconColor() : "text-gray-700 dark:text-gray-300"
      )}>
        {label}
      </span>
      {isSelected && (
        <div className="absolute top-2 right-2 h-3 w-3 rounded-full animate-pulse bg-current" style={{ color: species === Species.DOG ? "#3b82f6" : species === Species.CAT ? "#f59e0b" : "#10b981" }} />
      )}
    </div>
  );
};

export const SpeciesSelector = () => {
  const { setValue, watch } = useFormContext();
  const currentSpecies = watch("species");

  const speciesOptions = [
    { value: Species.DOG, label: "Chien", icon: Dog },
    { value: Species.CAT, label: "Chat", icon: Cat },
    { value: Species.OTHER, label: "Autres (NACs)", icon: Rabbit },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-medium">Espèce</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">Sélectionnez l&apos;espèce de l&apos;animal</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {speciesOptions.map((option) => (
          <SpeciesCard
            key={option.value}
            species={option.value}
            label={option.label}
            icon={option.icon}
            isSelected={currentSpecies === option.value}
            onClick={() => setValue("species", option.value, { shouldValidate: true })}
          />
        ))}
      </div>
    </div>
  );
};