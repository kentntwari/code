export function formatDate(date, style = null) {
  const dueDate = new Date(date);

  if (!style || style === "simplified") {
    const day = dueDate.getDate().toString().padStart(2, "0");
    const month = dueDate.toLocaleString("en-US", { month: "short" });
    const year = dueDate.getFullYear();
    return {
      day,
      month,
      year,
    };
  }

  if (style === "universal") {
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    const day = String(dueDate.getDate()).padStart(2, "0");
    return {
      day,
      month,
      year,
    };
  }
}
