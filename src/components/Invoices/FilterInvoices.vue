<template>
  <CollapsibleRoot v-model:open="open" class="relative m-auto">
    <CollapsibleTrigger class="flex items-center gap-3">
      <span class="text-SV text-black-site"
        >Filter <ins class="hidden md:inline-block no-underline">by status</ins></span
      >
      <ArrowDownSVG />
    </CollapsibleTrigger>
    <CollapsibleContent
      class="absolute top-6 left-0 -translate-x-1/4 data-[state=open]:p-6 data-[state=open]:w-[192px] bg-white flex flex-col gap-4 shadow-md rounded-lg">
      <div v-for="status in arr" :key="status.text">
        <CheckboxRoot
          v-model:checked="status.value"
          class="flex items-center gap-3"
          @click="filter">
          <span
            class="w-4 h-4 flex items-center justify-center rounded-[2px]"
            :class="[!status.value ? 'bg-violet-secondary/20' : 'bg-violet-primary']">
            <CheckboxIndicator @click="status.value = !status.value">
              <CheckSVG />
            </CheckboxIndicator>
          </span>
          <span class="text-SV capitalize">
            {{ status.text }}
          </span>
        </CheckboxRoot>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<script>
import { ref, nextTick } from "vue";
import queryString from "query-string";
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
    CheckSVG,
    ArrowDownSVG,
    ArrowLeftSVG,
  },
  data() {
    return {
      open: false,
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
