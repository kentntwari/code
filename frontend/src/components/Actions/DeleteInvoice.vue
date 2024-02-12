<template>
  <RAlertRoot
    v-model:open="open"
    @update:open="status === 'paid' ? (open = false) : (open = true)">
    <button
      type="button"
      class="w-[93px] bg-red-primary h-12 flex items-center justify-center font-bold text-SV text-white rounded-full"
      @click="open = true"
      title="Delete Invoice">
      Delete
    </button>
    <RAlertPortal>
      <RAlertOverlay
        class="w-full h-full fixed top-0 left-0 z-50 bg-black-site/50 dark:bg-black-site/70">
        <RAlertContent
          class="px-8 w-[90vw] max-w-sm min-h-[220px] p-6 bg-white dark:bg-slate-primary fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between rounded-lg shadow-sm">
          <section class="flex flex-col gap-5">
            <RAlertTitle class="text-M dark:text-white">Confirm Deletion</RAlertTitle>
            <RAlertDescription
              class="text-base text-gray-tertiary dark:text-slate-secondary"
              >Are you sure you want to delete invoice
              {{ this.$route.params.invoiceID.toUpperCase() }}? This action cannot be
              undone</RAlertDescription
            >
          </section>
          <VForm @submit="deleteInvoice" v-slot="{ isSubmitting }">
            <div class="flex justify-end items-center gap-2">
              <button
                type="button"
                class="px-6 h-12 bg-[#f9fafe] dark:bg-gray-secondary/10 flex items-center justify-center font-bold text-baseV text-gray-secondary dark:text-slate-secondary rounded-full"
                @click="open = false">
                Cancel
              </button>
              <button
                type="submitting"
                class="px-6 h-12 flex items-center justify-center font-bold text-baseV text-white rounded-full"
                :class="isSubmitting ? 'bg-red-secondary' : 'bg-red-primary'"
                :disabled="isSubmitting">
                <div class="white-loader" v-if="isSubmitting"></div>
                <span v-else>Delete</span>
              </button>
            </div>
          </VForm>
        </RAlertContent>
      </RAlertOverlay>
    </RAlertPortal>
  </RAlertRoot>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      open: false,
    };
  },

  methods: {
    async deleteInvoice() {
      await this.$fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/invoices/${this.id}`, {
        method: "DELETE",
        onResponse: async () => this.$router.push({ path: "/" }),
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
