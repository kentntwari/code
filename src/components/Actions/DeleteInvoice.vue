<template>
  <AlertDialogRoot
    v-model:open="open"
    @update:open="isConfirmedPaid ? (open = false) : (open = true)">
      <button
        type="button"
        class="w-[93px] h-12 flex items-center justify-center font-bold text-baseV text-white rounded-full"
        :class="
          isConfirmedPaid ? 'bg-red-secondary opacity-60 line-through' : 'bg-red-primary'
        " @click="open=true">
        Delete
      </button>
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="w-full h-full fixed top-0 left-0 z-10 bg-[rgba(0,0,0,.5)]">
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
          <div class="flex justify-end items-center gap-2">
            <button
              type="button"
              class="px-6 h-12 bg-[#f9fafe] flex items-center justify-center font-bold text-baseV text-gray-secondary rounded-full"
              @click="open = false">
              Cancel
            </button>
            <button
              type="button"
              class="px-6 h-12 flex items-center justify-center font-bold text-baseV text-white rounded-full"
              :class="isDeleting ? 'bg-red-secondary' : 'bg-red-primary'"
              :disabled="isDeleting"
              @click="deleteInvoice">
              <div class="loader" v-if="isDeleting"></div>
              <span v-else>Delete</span>
            </button>
          </div>
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
  inject: ["isDeleted", "isConfirmedPaid", "isDeleting", "setIsDeleted", "deleteInvoice"],

  components: {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
  },

  computed: {
    open: {
      get() {
        return this.isDeleted;
      },
      set(bool) {
        if (bool === true) this.setIsDeleted(true);
        if (bool === false) this.setIsDeleted(false);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
