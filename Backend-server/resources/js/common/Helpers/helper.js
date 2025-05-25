import moment from "moment";

export function dateFormat(value) {
  if (value) {
    return moment(String(value)).format("llll");
  }
}
