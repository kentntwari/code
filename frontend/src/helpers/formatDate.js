import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatToIsoString(date) {
  if (date) {
    return dayjs.utc(date).format("D MMM YYYY");
  }

  return dayjs.utc().format("D MMM YYYY");
}

export function formatToISO8601(date) {
  if (date) {
    return dayjs.utc(date).format("YYYY-MM-DD");
  }

  return dayjs.utc().format("YYYY-MM-DD");
}
