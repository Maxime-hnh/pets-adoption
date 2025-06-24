"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { cn } from "@/_lib/cn";
import { useQuickPropsUpdate } from "@/_mutations/animals/useQuickPropsUpdate"
import { Animal } from "@/_schemas/animal.schema";
import React, { startTransition, useOptimistic } from "react";

interface SelectCellProps {
  animal: Partial<Animal>;
  initialValue: any;
  keyName: string;
  labelMap: Record<any, string>;
  configMap: Record<any, {
    icon?: React.ElementType;
    color: string;
  }>;
  updateFn: ReturnType<typeof useQuickPropsUpdate>;
}
const SelectCell: React.FC<SelectCellProps> = React.memo(
  function SelectCell({ animal, initialValue, keyName, labelMap, configMap, updateFn }) {

    const { isPending } = updateFn;
    const handleChangeValue = (value: any) => {
      startTransition(() => {
        setValue(value)
      })
      updateFn.mutate({
        id: animal.id!,
        values: { [keyName]: value },
      });
    };

    const [value, setValue] = useOptimistic(initialValue, (_, newValue: string) => newValue)

    return (
      <Select value={value} onValueChange={handleChangeValue}>
        <SelectTrigger className="w-full min-w-[159px] max-w-[159px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="">
          {Object.entries(labelMap).map(([option, label]) => {
            const config = configMap[option as any];
            const Icon = config.icon ? config.icon : null;
            return (
              <SelectItem
                value={option}
                key={option}
                className="w-full flex items-center"
              >
                {Icon && <Icon className={`mr-2 ${config.color}`} />}
                <span className={cn(config.color, { "animate-pulse": isPending })}>{label}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
);

export default SelectCell;