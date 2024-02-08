if (
  !localStorage?.getItem("theme") &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  localStorage.setItem("theme", "dark");
  document?.documentElement.classList.add("dark");
  document?.documentElement.setAttribute("data-theme", "dark");
}

if (
  !localStorage?.getItem("theme") &&
  !window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  localStorage.setItem("theme", "light");
  document?.documentElement.setAttribute("data-theme", "light");
}

if (localStorage?.getItem("theme") && localStorage.getItem("theme") === "dark") {
  document?.documentElement.classList.add("dark");
  document?.documentElement.setAttribute("data-theme", "dark");
}

if (
  localStorage.getItem("theme") &&
  localStorage.getItem("theme") === "light" &&
  document?.documentElement.classList.contains("dark")
) {
  document?.documentElement.classList.remove("dark");
  document?.documentElement.setAttribute("data-theme", "light");
}
