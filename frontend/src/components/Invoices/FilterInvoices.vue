<template>
  <OnClickOutside @trigger="isOpen = false">
    <CollapsibleRoot v-model:open="isOpen" class="relative m-auto">
      <CollapsibleTrigger class="flex items-center gap-3" title="Filter by status">
        <span class="text-SV text-black-site dark:text-white"
          >Filter <ins class="hidden md:inline-block no-underline">by status</ins></span
        >
        <ArrowDownSVG :class="isOpen ? 'rotate-180' : ''" />
      </CollapsibleTrigger>
      <CollapsibleContent
        class="absolute top-6 left-0 z-10 -translate-x-1/4 data-[state=open]:p-6 data-[state=open]:w-[192px] bg-white dark:bg-gray-primary flex flex-col gap-4 shadow-md rounded-lg">
        <div v-for="status in arr" :key="status.text">
          <CheckboxRoot
            v-model:checked="status.value"
            class="flex items-center gap-3"
            @click="filter">
            <span
              class="w-4 h-4 flex items-center justify-center rounded-[2px]"
              :class="[
                !status.value
                  ? 'bg-violet-secondary/20 dark:bg-transparent dark:border dark:border-violet-secondary'
                  : 'bg-violet-primary',
              ]">
              <CheckboxIndicator @click="status.value = !status.value">
                <CheckSVG />
              </CheckboxIndicator>
            </span>
            <span class="text-SV dark:text-white capitalize">
              {{ status.text }}
            </span>
          </CheckboxRoot>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </OnClickOutside>
</template>

<script>
import { nextTick } from "vue";
import queryString from "query-string";
import { OnClickOutside } from "@vueuse/components";
import CheckSVG from "@/components/Svg/Check.vue";
import ArrowDownSVG from "@/components/Svg/ArrowDown";
import ArrowLeftSVG from "@/components/Svg/ArrowLeft";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "radix-vue";

export default {
  name: "FilterInvoices",
  components: {
    CheckboxRoot,
    CheckboxIndicator,
    CollapsibleRoot,
    CollapsibleTrigger,
    CollapsibleContent,
    OnClickOutside,
    CheckSVG,
    ArrowDownSVG,
    ArrowLeftSVG,
  },
  data() {
    return {
      isOpen: false,
      arr: [
        { text: "draft", value: false },
        { text: "pending", value: false },
        { text: "paid", value: false },
      ],
    };
  },
  mounted() {
    const parsed = queryString.parse(window.location.search, { arrayFormat: "bracket" });
    this.arr = this.arr.map((item) => {
      if (parsed?.filter?.includes(item.text)) return { ...item, value: true };
      return { ...item };
    });
  },
  methods: {
    async filter() {
      await nextTick();

      const selected = this.arr
        .filter(({ value }) => value === true)
        .map(({ text }) => text.toLowerCase());

      this.$router.push({ query: { ...this.$router.query, "filter[]": [...selected] } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
