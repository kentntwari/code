<template>
  <DialogRoot v-model:open="openModal">
    <DialogPortal to="main">
      <DialogOverlay class="absolute top-0 left-0 z-10 w-full h-full bg-[rgba(0,0,0,.5)]">
        <DialogContent
          class="px-5 absolute top-0 left-0 w-full h-full bg-white overflow-auto"
          @escapeKeyDown="gobackToInvoice"
          @pointerDownOutside="gobackToInvoice">
          <GoBackBtn class="mt-8" />
          <DialogTitle class="mt-7 text-M">
            Edit <span class="text-gray-secondary">#</span
            >{{ this.$route.params.invoiceId.toUpperCase() }}</DialogTitle
          >
          <template v-if="invoice">
            <FormWrapper class="mb-40">
              <FormFieldSet legend="Bill From">
                <div class="mt-6 flex flex-col gap-6">
                  <FormAddress for="sender" :address="invoice.senders[0]" />
                </div>
              </FormFieldSet>

              <FormFieldSet legend="Bill To">
                <FormInput
                  v-model:client-name="invoice.client.name"
                  :value="invoice.client.name"
                  type="text"
                  id="client__name"
                  label="Client's Name"
                  lc="mt-6" />
                <FormInput
                  v-model:client-email="invoice.client.email"
                  :value="invoice.client.email"
                  type="email"
                  id="client__email"
                  label="Client's Email" />
                <FormAddress for="client" :address="invoice.client" />
              </FormFieldSet>

              <FormFieldSet>
                <FormDatePicker v-model:new-date="invoiceDate" />
                <FormPaymentTerms
                  v-model:payment-terms="currentPaymentTerms"
                  :value="currentPaymentTerms"
                  label="Payment Terms" />
                <FormInput
                  v-model:description="invoice.description"
                  :value="invoice.description"
                  type="text"
                  id="invoice__description"
                  label="Project Description" />
              </FormFieldSet>

              <FormFieldSet>
                <template #legend>
                  <legend
                    class="font-bold text-[18px] text-[#777F98] leading-[32px] tracking-[-0.38px]">
                    Item List
                  </legend>
                </template>
                <FormOrders
                  :orders="invoice?.orders ?? []"
                  @add-order="addNewOrder"
                  @delete-order="deleteOrder" />
              </FormFieldSet>
            </FormWrapper>
          </template>
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
import Form from "@/components/Form";
import Input from "@/components/Form/Input";
import Orders from "@/components/Form/Orders";
import Address from "@/components/Form/Address";
import PaymentTerms from "@/components/Form/Extended/PaymentTerms";
import FieldSet from "@/components/Form/FieldSet";
import Delete from "@/components/Svg/Delete";
import DatePicker from "@/components/Form/DatePicker";

export default {
  name: "EditInvoice",

  inject: ["invoice"],

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
    FormWrapper: Form,
    FormInput: Input,
    FormOrders: Orders,
    FormAddress: Address,
    FormFieldSet: FieldSet,
    FormDatePicker: DatePicker,
    FormPaymentTerms: PaymentTerms,
    DeleteSVG: Delete,
  },

  data() {
    return {
      openModal: false,
      invoiceDate: "",
      currentPaymentTerms: null,
    };
  },

  mounted() {
    this.openModal = true;
  },

  watch: {
    invoice: {
      immediate: true,
      handler(s) {
        if (s) {
          this.invoiceDate = s?.dueDate;
          this.currentPaymentTerms = s?.paymentTerms;
        }
      },
    },
  },

  methods: {
    gobackToInvoice() {
      return this.$router.push({
        name: "invoice",
        params: { invoiceId: this.$route.params.invoiceId },
      });
    },
    addNewOrder(newOrder) {
      this.invoice.orders.push(newOrder);
    },
    deleteOrder(orderToDelete) {
      const index = this.invoice.orders.findIndex((order) => order === orderToDelete);
      return this.invoice.orders.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
