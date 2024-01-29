<template>
  <InvoiceModal>
    <FormInvoice />
  </InvoiceModal>
</template>

<script>
import Modal from "@/components/Modal";
import Form from "@/components/Form";

export default {
  name: "NewInvoice",

  components: {
    InvoiceModal: Modal,
    FormInvoice: Form,
  },
};
</script>

<style lang="scss" scoped></style>
