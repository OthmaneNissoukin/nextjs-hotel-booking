import { differenceInCalendarDays, format } from "date-fns";

export function formatToAbrFormat(dateString) {
  const date = new Date(dateString);
  const formattedDate = format(date, "EEE, MMM dd");
  return formattedDate;
}

export function daysDifferCount(before, after) {
  return differenceInCalendarDays(new Date(before), new Date(after));
}
