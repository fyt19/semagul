"use client";

import { DayPicker } from "react-day-picker";
import { tr } from "react-day-picker/locale";
import { cn } from "@/lib/utils";
import { toDateOnly } from "@/lib/slots";
import "react-day-picker/style.css";

type BookingCalendarProps = {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  maxDate: Date;
};

/** Interactive calendar for appointment date selection. */
export function BookingCalendar({
  selected,
  onSelect,
  maxDate,
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
      <DayPicker
        mode="single"
        locale={tr}
        selected={selected}
        onSelect={onSelect}
        disabled={[
          { before: today },
          { after: maxDate },
          { dayOfWeek: [0] },
        ]}
        showOutsideDays={false}
        className="mx-auto"
        classNames={{
          root: "rdp-root",
          months: "flex flex-col",
          month: "space-y-4",
          month_caption: "flex justify-center relative items-center h-10",
          caption_label: "text-sm font-semibold text-navy-900",
          nav: "flex items-center gap-1",
          button_previous:
            "absolute left-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-navy-900",
          button_next:
            "absolute right-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-navy-900",
          month_grid: "w-full border-collapse",
          weekdays: "flex",
          weekday:
            "w-10 text-center text-xs font-medium uppercase tracking-wide text-slate-400",
          week: "mt-1 flex w-full",
          day: "relative p-0 text-center",
          day_button: cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all",
            "text-navy-900 hover:bg-teal-50 hover:text-teal-700",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40",
          ),
          selected:
            "[&>button]:bg-teal-600 [&>button]:text-white [&>button]:shadow-md [&>button]:shadow-teal-600/25 [&>button]:hover:bg-teal-700 [&>button]:hover:text-white",
          today: "[&>button]:ring-1 [&>button]:ring-teal-300",
          disabled:
            "[&>button]:text-slate-300 [&>button]:hover:bg-transparent [&>button]:cursor-not-allowed",
          outside: "[&>button]:text-slate-300",
        }}
      />
      {selected && (
        <p className="mt-3 border-t border-slate-200 pt-3 text-center text-sm text-slate-600">
          Seçilen:{" "}
          <span className="font-semibold text-teal-700">
            {selected.toLocaleDateString("tr-TR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      )}
    </div>
  );
}

export function dateToIsoString(date: Date): string {
  return toDateOnly(date);
}
