<template>
  <DialogRoot v-model:open="openModal">
    <DialogPortal to="main">
      <DialogOverlay
        class="absolute top-0 left-0 z-10 w-full min-h-screen h-[100dvh] bg-[rgba(0,0,0,.5)]">
        <DialogContent
          class="px-5 absolute top-0 left-0 w-full h-full bg-white overflow-auto"
          @escapeKeyDown="gobackToInvoice"
          @pointerDownOutside="gobackToInvoice">
          <GoBackBtn class="mt-8" />
          <DialogTitle class="mt-7 text-M">
            <template v-if="$route.name === 'edit'">
              Edit <span class="text-gray-secondary">#</span
              >{{ $route.params.invoiceID.toUpperCase() }}
            </template>
            <template v-else> New Invoice </template>
          </DialogTitle>
          <slot></slot>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>

<script>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";

import GoBack from "@/components/Misc/GoBack";

export default {
  name: "InvoiceModal",

  components: {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    GoBackBtn: GoBack,
  },

  data() {
    return {
      openModal: false,
    };
  },

  mounted() {
    this.openModal = true;
  },

  methods: {
    gobackToInvoice() {
      return this.$router.push({
        name: "invoice",
        params: { invoiceID: this.$route.params.invoiceID },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
