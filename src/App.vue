<template>
  <nav
    class="relative z-20 overflow-clip h-18 bg-slate-primary flex items-center justify-between">
    <div
      class="relative w-18 h-18 bg-violet-primary flex items-center justify-center rounded-tr-[20px] rounded-br-[20px] before:absolute before:w-18 before:h-18 before:bg-violet-secondary before:top-9 before:rounded-tl-2xl before:rounded-bl-[20px]">
      <LogoSVG class="relative z-10" />
    </div>

    <div class="h-full grid grid-cols-2">
      <div class="w-full h-full flex items-center justify-center"><MoonSVG /></div>
      <div
        class="w-20 h-full flex items-center justify-center border-l border-gray-secondary/40">
        <img
          class="w-8 h-8 object-cover rounded-full"
          src="/src/assets/image-avatar.jpg" />
      </div>
    </div>
  </nav>
  <main class="relative flex-1 px-5 py-8">
    <router-view></router-view>
  </main>
</template>

<script>
import LogoSVG from "@/components/Svg/Logo";
import MoonSVG from "@/components/Svg/Moon";

export default {
  name: "App",
  components: {
    LogoSVG,
    MoonSVG,
  },
};
</script>

<style lang="scss" scoped></style>
