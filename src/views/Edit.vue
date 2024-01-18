<template>
  <DialogRoot v-model:open="openModal">
    <DialogPortal to="main">
      <DialogOverlay class="absolute top-0 left-0 z-10 w-full h-full bg-[rgba(0,0,0,.5)]">
        <DialogContent
          class="px-5 absolute top-0 left-0 w-full h-full bg-white"
          @escapeKeyDown="gobackToInvoice"
          @pointerDownOutside="gobackToInvoice">
          <GoBackBtn class="mt-8" />
          <DialogTitle class="mt-7 text-M">
            Edit <span class="text-gray-secondary">#</span
            >{{ this.$route.params.invoiceId.toUpperCase() }}</DialogTitle
          >
          <form class="mt-5 grid grid-cols-1 gap-6">
            <FormFieldSet legend="Bill From">
              <FormAddress for="sender" />
            </FormFieldSet>

            <FormFieldSet legend="Bill To">
              <FormAddress for="client" />
            </FormFieldSet>

            <FormFieldSet>
              <FormInput />
            </FormFieldSet>
          </form>
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

import GoBack from "@/components/Misc/GoBack.vue";
import Input from "@/components/Form/Input";
import FieldSet from "@/components/Form/FieldSet";
import Address from "@/components/Form/Address";

export default {
  name: "EditInvoice",

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
    FormInput: Input,
    FormAddress: Address,
    FormFieldSet: FieldSet,
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
        params: { invoiceId: this.$route.params.invoiceId },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
