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
      const day = formatDate(this.invoice.dueDate).day;
      const month = formatDate(this.invoice.dueDate).month;
      const year = formatDate(this.invoice.dueDate).year;

      return `${day} ${month} ${year}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
