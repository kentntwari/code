export function formatDate(date, style = null) {
  const initDate = new Date(date);

  if (!style || style === "simplified") {
    const day = initDate.getDate().toString().padStart(2, "0");
    const month = initDate.toLocaleString("en-US", { month: "short" });
    const year = initDate.getFullYear();
    return {
      day,
      month,
      year,
    };
  }

  if (style === "universal") {
    const year = initDate.getFullYear();
    const month = String(initDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    const day = String(initDate.getDate()).padStart(2, "0");

    return {
      day,
      month,
      year,
    };
  }
}
