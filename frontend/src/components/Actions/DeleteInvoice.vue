<template>
  <AlertDialogRoot
    v-model:open="open"
    @update:open="status === 'paid' ? (open = false) : (open = true)">
    <button
      type="button"
      class="w-[93px] h-12 flex items-center justify-center font-bold text-SV text-white rounded-full"
      :class="
        status === 'paid' ? 'bg-red-secondary opacity-60 line-through' : 'bg-red-primary'
      "
      @click="open = true">
      Delete
    </button>
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="w-full h-full fixed top-0 left-0 z-50 bg-[rgba(0,0,0,.5)]">
        <AlertDialogContent
          class="px-8 w-[90vw] max-w-sm min-h-[220px] p-6 bg-white fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between rounded-lg shadow-sm">
          <section class="flex flex-col gap-5">
            <AlertDialogTitle class="text-M">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription class="text-base text-gray-tertiary"
              >Are you sure you want to delete invoice
              {{ this.$route.params.invoiceID.toUpperCase() }}? This action cannot be
              undone</AlertDialogDescription
            >
          </section>
          <VForm @submit="deleteInvoice" v-slot="{ isSubmitting }">
            <div class="flex justify-end items-center gap-2">
              <button
                type="button"
                class="px-6 h-12 bg-[#f9fafe] flex items-center justify-center font-bold text-baseV text-gray-secondary rounded-full"
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
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script>
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "radix-vue";

export default {
  components: {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
  },

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
      await this.$fetch(`/api/invoices/${this.id}`, {
        method: "DELETE",
        onResponse: async () => this.$router.push({ path: "/" }),
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
