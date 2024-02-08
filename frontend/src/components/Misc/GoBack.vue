<template>
  <button
    type="button"
    title="Go back"
    class="flex items-center gap-6 cursor-pointer"
    @click="$router.go(-1)">
    <ArrowLeftSVG />
    <h1 class="font-bold text-heading-S text-gray-primary dark:text-white">Go back</h1>
  </button>
</template>

<script>
import ArrowLeftSVG from "@/components/Svg/ArrowLeft";

export default {
  name: "GoBackBtn",
  components: {
    ArrowLeftSVG,
  },
};
</script>

<style lang="scss" scoped></style>
