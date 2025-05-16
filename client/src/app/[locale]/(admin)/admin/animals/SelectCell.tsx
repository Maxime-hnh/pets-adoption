"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { useUpdateAnimal } from "@/_mutations/animals/useUpdateAnimal"
import { Animal, Species } from "@/_schemas/animal.schema";

interface SelectCellProps {
  animal: Partial<Animal>;
  initialValue: any;
  keyName: string;
  labelMap: Record<any, string>;
  configMap: Record<any, {
    icon?: React.ElementType;
    color: string;
  }>;
}
export default function SelectCell({ animal, initialValue, keyName, labelMap, configMap }: SelectCellProps) {

  const updateAnimalMutation = useUpdateAnimal();

  const handleChangeSpecies = (value: any) => {
    updateAnimalMutation.mutate({
      id: animal.id!,
      values: { [keyName]: value },
    });
  };

  return (
    <Select value={initialValue} onValueChange={handleChangeSpecies}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(labelMap).map(([option, label]) => {
          const config = configMap[option as any];
          const Icon = config.icon ? config.icon : null;

          return (
            <SelectItem value={option} key={option} className="w-full flex items-center">
              {Icon !== null && <Icon className={`mr-2 ${config.color}`} />}
              <span className={config.color}>
                {label}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select >
  )
}