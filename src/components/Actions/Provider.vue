<template>
  <slot></slot>
</template>

<script>
import { computed } from "vue";

export default {
  name: "ActionsProvider",

  data() {
    return {
      delete: {
        isDeleted: false,
        isDeleting: false,
      },
      markAsPaid: {
        isConfirmedPaid: false,
        isConfirmingPaid: false,
      },
    };
  },
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.markAsPaid.isPaid = this.invoice.status === "paid" ? true : false;
    this.markAsPaid.isConfirmedPaid = this.invoice.status === "paid" ? true : false;
  },
  provide() {
    return {
      // provide delete actions
      isDeleted: computed(() => this.delete.isDeleted),
      isDeleting: computed(() => this.delete.isDeleting),
      setIsDeleted: (bool) => {
        if (typeof bool !== "boolean") throw new Error("can only accept true or false");
        this.delete.isDeleted = bool;
      },
      deleteInvoice: async () => {
        await this.$fetch(`/api/invoices/${this.invoice.id}`, {
          method: "DELETE",
          onRequest: async ({ request }) => {
            this.isDeleting = true;
          },
          onResponse: async (res) => {
            this.isDeleted = true;
            this.isDeleting = false;
            this.$router.push({ path: "/" });
          },
        });
      },

      // provide markAsPaid actions
      isConfirmedPaid: computed(() => this.markAsPaid.isConfirmedPaid),
      isConfirmingPaid: computed(() => this.markAsPaid.isConfirmingPaid),
      confirmPaid: async () => {
        await this.$fetch(`/api/invoices/${this.invoice.id}`, {
          method: "PATCH",
          headers: {
            "X-patch-request-action": "mark-as-paid",
          },
          onRequest: async ({ request }) => {
            this.markAsPaid.isConfirmingPaid = true;
          },
          onResponse: async (res) => {
            this.markAsPaid.isConfirmingPaid = false;
            this.markAsPaid.isConfirmedPaid = true;
            this.$router.go();
          },
        });
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
