'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import { Calendar } from './ui/calendar'; // Use your custom Calendar component

interface CalendarFilterProps {
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function CalendarFilter({ onDateRangeChange }: CalendarFilterProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    onDateRangeChange(range);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter by Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={handleDateChange}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}