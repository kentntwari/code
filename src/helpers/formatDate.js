export function formatDate(date) {
  const dueDate = new Date(date);
  const day = dueDate.getDate().toString().padStart(2, "0");
  const month = dueDate.toLocaleString("en-US", { month: "short" });
  const year = dueDate.getFullYear();
  return `${day} ${month} ${year}`;
}
