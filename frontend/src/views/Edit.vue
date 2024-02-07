<template>
  <InvoiceModal>
    <template v-if="invoice">
      <FormInvoice :invoice="invoice" />
    </template>
  </InvoiceModal>
</template>

<script>
import Modal from "@/components/Modal";
import Form from "@/components/Form";

export default {
  name: "EditInvoice",

  inject: ["invoice"],

  components: {
    InvoiceModal: Modal,
    FormInvoice: Form,
  },
};
</script>

<style lang="scss" scoped></style>
