<template>
  <slot></slot>
</template>

<script>
import { computed } from "vue";

export default {
  name: "InvoiceActionsProvider",

  inject: ["invoice"],

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

  mounted() {
    this.markAsPaid.isPaid = this.invoice?.status === "paid" ? true : false;
    this.markAsPaid.isConfirmedPaid = this.invoice?.status === "paid" ? true : false;
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
        await this.$fetch(`/api/invoices/${this.invoice?.id}`, {
          method: "DELETE",
          onRequest: async () => {
            this.isDeleting = true;
            console.log(this.isDeleting);
          },
          onResponse: async () => {
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
        await this.$fetch(`/api/invoices/${this.invoice?.id}`, {
          method: "PATCH",
          headers: {
            "X-patch-request-action": "mark-as-paid",
          },
          onRequest: async ({ request }) => {
            this.markAsPaid.isConfirmingPaid = true;
          },
          onResponse: async ({ response }) => {
            if (response.ok) {
              this.markAsPaid.isConfirmingPaid = false;
              this.markAsPaid.isConfirmedPaid = true;
              this.$router.go();
            }
          },
        });
      },
    };
  },
};
</script>
