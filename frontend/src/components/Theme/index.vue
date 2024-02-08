<template>
  <button
    type="button"
    class="lg:pb-6 w-full h-full flex items-center justify-center"
    @click="isDark = !isDark">
    <slot :is-dark="isDark"></slot>
  </button>
</template>

<script>
export default {
  name: "ThemeSwitcher",

  data() {
    return {
      isDark: window.localStorage.getItem("theme") === "light" ? false : true,
    };
  },

  watch: {
    isDark: {
      handler(newVal, oldVal) {
        if (newVal == true) {
          window.localStorage.removeItem("theme");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
          document?.documentElement.setAttribute("data-theme", "dark");
        }

        if (newVal == false) {
          window.localStorage.removeItem("theme");
          window.localStorage.setItem("theme", "light");
          document?.documentElement.classList.remove("dark");
          document?.documentElement.setAttribute("data-theme", "light");
        }
      },
      immediate: true,
    },
  },
};
</script>
