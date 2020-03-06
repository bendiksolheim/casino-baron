import format from "date-fns/fp/format";

const formatter = format("MMMM do, yyyy");

function formatDate(date: number): string {
  return formatter(new Date(date));
}

export default {
  formatDate
};
