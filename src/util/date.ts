import format from "date-fns/fp/format";

const formatter = format("MMMM do, yyyy");

function formatDate(date: Date): string {
  return formatter(date);
}

export default {
  formatDate
};
