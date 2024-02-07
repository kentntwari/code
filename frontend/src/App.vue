<template>
  <nav
    class="relative lg:fixed z-20 overflow-clip h-18 lg:h-full lg:w-24 bg-slate-primary flex lg:flex-col items-center justify-between lg:rounded-tr-[20px] lg:rounded-br-[20px]">
    <RouterLink
      to="/"
      class="relative lg:overflow-clip w-18 lg:w-full h-18 lg:h-24 bg-violet-primary flex items-center justify-center rounded-tr-[20px] rounded-br-[20px] before:absolute before:w-18 lg:before:w-full before:h-18 before:bg-violet-secondary before:top-9 lg:before:top-1/2 before:right-0 before:rounded-tl-[20px] before:rounded-bl-[20px]">
      <LogoSVG class="relative z-10 lg:scale-150" />
    </RouterLink>

    <div class="h-full lg:h-fit lg:w-full grid grid-cols-2 lg:grid-cols-1">
      <button
        type="button"
        class="lg:pb-6 w-full h-full flex items-center justify-center">
        <MoonSVG />
      </button>
      <div
        class="lg:py-6 w-20 h-full lg:h-auto lg:w-full flex items-center justify-center border-l lg:border-t border-gray-secondary/40">
        <img
          class="w-8 lg:w-10 h-8 lg:h-10 object-cover rounded-full"
          src="/src/assets/image-avatar.jpg" />
      </div>
    </div>
  </nav>
  <main
    class="relative flex-1 m-auto px-5 md:px-12 py-8 md:py-16 w-full lg:max-w-3xl h-full">
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
