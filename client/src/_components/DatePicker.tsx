"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/_components/ui/button"
import { Calendar } from "@/_components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover"
import { cn } from "@/_helpers/cn"
import { Dispatch, SetStateAction } from "react"
import { fr } from 'date-fns/locale';

interface DatePickerProps {
  date: Date | undefined;
  handleBirthDate: (birthDate: Date | undefined) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DatePicker({ date, handleBirthDate, open, setOpen }: DatePickerProps) {

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "dd/MM/yyyy", { locale: fr }) : <span>Sélectionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleBirthDate(d)}
          disabled={(d) =>
            d > new Date() || d < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}