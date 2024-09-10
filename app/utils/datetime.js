import { format } from "date-fns";

export function formatToAbrFormat(dateString) {
  const date = new Date(dateString);
  const formattedDate = format(date, "EEE, MMM dd");
  return formattedDate;
}
