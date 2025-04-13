"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { AutoFormFieldProps } from "@autoform/react"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React, { useEffect } from "react"

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  field,
  value,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(
    field.default ? new Date(field.default) : undefined,
  )
  const [openPopover, setOpenPopover] = React.useState(false)

  useEffect(() => {
    if (value) {
      setDate(new Date(value))
    }
  }, [value])

  return (
    <Popover modal open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{inputProps.placeholder || "Select a date"}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            inputProps.onChange({
              target: { value: value?.toString(), name: inputProps.name },
            })
            setDate(value)
            setOpenPopover(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
