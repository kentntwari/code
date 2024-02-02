<template>
  <CollapsibleRoot v-model:open="open" class="relative m-auto">
    <CollapsibleTrigger class="flex items-center gap-3">
      <span class="text-SV text-black-site"
        >Filter <ins class="hidden no-underline">by status</ins></span
      >
      <ArrowDownSVG />
    </CollapsibleTrigger>
    <CollapsibleContent
      class="absolute top-6 left-0 -translate-x-1/4 data-[state=open]:p-6 data-[state=open]:w-[192px] bg-white flex flex-col gap-4 shadow-md rounded-lg">
      <div v-for="status in arr" :key="status.text">
        <CheckboxRoot v-model:checked="status.value" class="flex items-center gap-3">
          <span
            class="w-4 h-4 rounded-[2px]"
            :class="[!status.value ? 'bg-violet-secondary/20' : 'bg-violet-primary']"
           >
            <CheckboxIndicator @click="status.value = !status.value">
              <ArrowLeftSVG />
            </CheckboxIndicator>
          </span>
          <span class="text-SV">
            {{ status.text }}
          </span>
        </CheckboxRoot>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<script>
import { ref } from "vue";
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
    ArrowDownSVG,
    ArrowLeftSVG,
  },
  data() {
    return {
      open: false,
      arr: [
        { text: "Draft", value: false },
        { text: "Pending", value: false },
        { text: "Paid", value: false },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
