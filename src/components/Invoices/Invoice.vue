<template>
  <article>
    <header class="flex items-center justify-between">
      <slot name="header" :id="invoice.id" :clientName="invoice.client.name"></slot>
    </header>
    <slot v-bind="invoice"></slot>
    <footer class="flex items-center justify-between">
      <slot
        name="footer"
        :dueDate="dueDate"
        :total="invoice.grandTotal"
        :status="invoice.status"></slot>
    </footer>
  </article>
</template>

<script>
import { formatDate } from "@/helpers/formatDate.js";

export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dueDate() {
      return formatDate(this.invoice.dueDate);
    },
  },
};
</script>

<style lang="scss" scoped></style>
