/** Clinic business hours and time slot generation. */

export const BUSINESS_HOURS = {
  weekday: { start: 9, end: 18, slotMinutes: 60 },
  saturday: { start: 9, end: 14, slotMinutes: 60 },
} as const;

export const ALL_TIME_SLOTS = generateAllSlots();

function generateAllSlots(): string[] {
  const slots: string[] = [];

  for (let h = BUSINESS_HOURS.weekday.start; h < BUSINESS_HOURS.weekday.end; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  for (
    let h = BUSINESS_HOURS.saturday.start;
    h < BUSINESS_HOURS.saturday.end;
    h++
  ) {
    const slot = `${String(h).padStart(2, "0")}:00`;
    if (!slots.includes(slot)) slots.push(slot);
  }

  return slots;
}

export function getSlotsForDate(date: Date): string[] {
  const day = date.getDay();
  if (day === 0) return []; // Sunday closed

  if (day === 6) {
    const slots: string[] = [];
    for (
      let h = BUSINESS_HOURS.saturday.start;
      h < BUSINESS_HOURS.saturday.end;
      h++
    ) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
    }
    return slots;
  }

  const slots: string[] = [];
  for (
    let h = BUSINESS_HOURS.weekday.start;
    h < BUSINESS_HOURS.weekday.end;
    h++
  ) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

export function isPastSlot(date: Date, timeSlot: string): boolean {
  const now = new Date();
  const [hours, minutes] = timeSlot.split(":").map(Number);
  const slotDate = new Date(date);
  slotDate.setHours(hours, minutes, 0, 0);
  return slotDate <= now;
}

export function formatDateTR(date: Date): string {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function generateReferenceId(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SH-${datePart}-${random}`;
}
