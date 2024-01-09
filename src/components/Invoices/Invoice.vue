<template>
  <article class="p-6 bg-white flex flex-col gap-6 rounded-lg shadow-sm">
    <header class="flex items-center justify-between">
      <div class="font-bold text-SV">
        <span class="text-gray-secondary">#</span>
        <span>{{ invoice.id }}</span>
      </div>
      <small class="text-baseV text-gray-secondary">{{ invoice.clientName }}</small>
    </header>
    <footer class="flex items-center justify-between">
      <div class="flex flex-col gap-2">
        <small class="text-baseV text-gray-secondary">Due {{ invoice.paymentDue }}</small>
        <span class="text-S">£ {{ invoice.total }}</span>
      </div>
      <Status class="capitalize" :status="invoice.status">
        {{ invoice.status }}
      </Status>
    </footer>
  </article>
</template>

<script>
import Status from "@/components/Status";

export default {
  components: {
    Status,
  },
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
