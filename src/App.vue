<template>
  <nav class="flex items-center justify-between">
    <div class="uppercase text-heading-S">Logo</div>
    <span>Toggle</span>
  </nav>
  <main class="px-5 py-8">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss" scoped></style>
