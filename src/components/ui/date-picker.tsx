"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface Props {
  onChange: (date: Date) => void;
  name: string;
  value?: Date;
  disabled?: (date: Date) => boolean;
}

export function DatePicker({ onChange, value, disabled }: Props) {
  const [date, setDate] = useState<Date | undefined>(value);

  return (
    <Popover key={date?.getDate()}>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={value || date}
          defaultMonth={value || date || new Date()}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;
            setDate(selectedDate);
            onChange(selectedDate);
          }}
          {...(disabled && { disabled })}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
