const TZ = "Europe/Istanbul";

function ymdInIstanbul(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function startOfTodayIstanbul() {
  return new Date(`${ymdInIstanbul()}T00:00:00+03:00`);
}

export function startOfMonthIstanbul() {
  const [year, month] = ymdInIstanbul().split("-");
  return new Date(`${year}-${month}-01T00:00:00+03:00`);
}

export function minutesAgo(mins: number) {
  return new Date(Date.now() - mins * 60 * 1000);
}
