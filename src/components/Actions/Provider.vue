<template>
  <slot name="edit"></slot>
  <slot name="delete"></slot>
  <slot name="markAsPaid"></slot>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ActionsProvider",

  data() {
    return {
      isDelete: false,
    };
  },

  provide() {
    return {
      isDelete: computed(() => this.isDelete),
    };
  },
};
</script>

<style lang="scss" scoped></style>
