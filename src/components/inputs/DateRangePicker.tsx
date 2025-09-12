"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import moment from 'moment';

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

type dateRangeType = {
    onSelect: (selected?:DateRange) => void
    dateRange?: DateRange 
}

const DateRangePicker = (props: dateRangeType) =>  {
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | undefined>(new Date())

  return (
      <div className="relative flex">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size={'sm'} id="date-picker">
            <span>{moment(props.dateRange?.from).format('YYYY-MM-DD')} - {moment(props.dateRange?.to).format('YYYY-MM-DD')} </span>
              <CalendarIcon className="size-3.5" />      
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode='range'
              selected={props.dateRange}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={props.onSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
  )
}

export default DateRangePicker