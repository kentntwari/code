<template>
  <article>
    <slot name="header" :id="invoice.id" :clientName="invoice.client.name"></slot>
    <slot v-bind="invoice"></slot>
    <slot
      name="footer"
      :dueDate="dueDate"
      :total="invoice.grandTotal"
      :status="invoice.status"></slot>
  </article>
</template>

<script>
import { formatToIsoString } from "@/helpers/formatDate.js";

export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dueDate() {
      return formatToIsoString(this.invoice.dueDate);
    },
  },
};
</script>

<style lang="scss" scoped></style>
