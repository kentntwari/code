<template>
  <fieldset class="flex flex-col gap-6">
    <slot name="legend">
      <legend class="text-SV text-violet-primary" v-show="legend">{{ legend }}</legend>
    </slot>
    <slot></slot>
  </fieldset>
</template>

<script>
export default {
  name: "formFieldset",
  props: {
    legend: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
