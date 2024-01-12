<template>
  <article class="p-6 bg-white flex flex-col gap-6 rounded-lg shadow-sm">
    <header class="flex items-center justify-between">
      <slot name="header" :id="invoice.id" :clientName="invoice.clientName"></slot>
    </header>
    <slot></slot>
    <footer class="flex items-center justify-between">
      <slot
        name="footer"
        :due="invoice.paymentDue"
        :total="invoice.total"
        :status="invoice.status"></slot>
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (!this.invoice.id) throw new Error("Invoice must have an id");
    if (!this.invoice.total) throw new Error("Invoice must have a total");
    if (!this.invoice.status) throw new Error("Invoice must have a status");
    if (!this.invoice.clientName) throw new Error("Invoice must have a clientName");
    if (!this.invoice.paymentDue) throw new Error("Invoice must have a paymentDue");
  },
};
</script>

<style lang="scss" scoped></style>
