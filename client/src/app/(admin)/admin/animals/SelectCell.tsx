"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal"
import { Animal } from "@/_schemas/animal.schema";
import React from "react";

interface SelectCellProps {
  animal: Partial<Animal>;
  initialValue: any;
  keyName: string;
  labelMap: Record<any, string>;
  configMap: Record<any, {
    icon?: React.ElementType;
    color: string;
  }>;
  updateAnimal: ReturnType<typeof useUpdateAnimal>;
}
const SelectCell: React.FC<SelectCellProps> = React.memo(
  function SelectCell({ animal, initialValue, keyName, labelMap, configMap, updateAnimal }) {
    const handleChangeValue = (value: any) => {
      updateAnimal.mutate({
        id: animal.id!,
        values: { [keyName]: value },
      });
    };

    return (
      <Select value={initialValue} onValueChange={handleChangeValue}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(labelMap).map(([option, label]) => {
            const config = configMap[option as any];
            const Icon = config.icon ? config.icon : null;
            return (
              <SelectItem value={option} key={option} className="w-full flex items-center">
                {Icon && <Icon className={`mr-2 ${config.color}`} />}
                <span className={config.color}>{label}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
  // (optionnel) tu peux passer une fonction de comparaison custom ici
);

export default SelectCell;