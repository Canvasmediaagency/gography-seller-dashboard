"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({
  date,
  onDateChange,
  className,
}: DateRangePickerProps) {
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)
  const [isOpen, setIsOpen] = React.useState(false)

  // Update temp date when external date changes
  React.useEffect(() => {
    setTempDate(date)
  }, [date])

  const handleSubmit = () => {
    onDateChange(tempDate)
    setIsOpen(false)
  }

  const handleReset = () => {
    setTempDate(undefined)
  }

  const handleCancel = () => {
    setTempDate(date) // Reset to original value
    setIsOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:cursor-pointer",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 ml-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM dd, yyyy")} -{" "}
                  {format(date.to, "MMM dd, yyyy")}
                </>
              ) : (
                format(date.from, "MMM dd, yyyy")
              )
            ) : (
              <span className="text-gray-400">Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDate?.from || date?.from}
              selected={tempDate}
              onSelect={setTempDate}
              numberOfMonths={1}
            />
            <div className="flex font-normal items-center justify-between mt-3 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-sm font-normal hover:cursor-pointer"
              >
                Reset
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-sm font-normal hover:cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="text-sm font-normal bg-gray-900 hover:bg-gray-800 hover:cursor-pointer"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
