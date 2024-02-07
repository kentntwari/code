<template>
  <DialogRoot v-model:open="openModal">
    <DialogPortal to="main">
      <DialogOverlay
        class="absolute lg:fixed top-0 left-0 lg:left-24 z-40 w-full min-h-screen h-[100dvh] bg-[rgba(0,0,0,.5)]">
        <DialogContent
          class="px-5 md:px-14 absolute lg:fixed top-0 left-0 lg:left-24 w-full md:w-[616px] h-full bg-white overflow-auto md:rounded-tr-3xl md:rounded-br-3xl"
          @escapeKeyDown="gobackToInvoice"
          @pointerDownOutside="gobackToInvoice">
          <GoBackBtn class="mt-8 md:hidden" />
          <DialogTitle class="mt-7 md:mt-14 text-M">
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
      if (this.$route.name === "edit")
        return this.$router.push({
          name: "invoice",
          params: { invoiceID: this.$route.params.invoiceID },
        });

      if (this.$route.name === "new") return this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
