<template>
  <VForm
    @submit="sendFormData"
    :initial-values="initValues"
    v-slot="{ isSubmitting, handleReset }">
    <div class="mt-6 mb-40 grid grid-cols-1 gap-6">
      <fieldset name="senderCredentials" class="grid grid-cols-2 gap-6">
        <legend class="text-SV text-violet-primary">Bill From</legend>
        <VField
          id="senderStreet"
          name="sender.street"
          value="19 Union Terrace"
          v-slot="{ field }">
          <label :for="field.id" class="mt-6 col-span-2 text-baseV text-gray-secondary">
            Street Address
            <input v-bind="field" type="text" class="default-input" disabled />
          </label>
        </VField>
        <VField id="senderCity" name="sender.city" value="London" v-slot="{ field }">
          <label :for="field.id" class="col-span-1 text-baseV text-gray-secondary">
            City
            <input v-bind="field" type="text" class="default-input" disabled />
          </label>
        </VField>
        <VField
          id="senderPostCode"
          name="sender.postCode"
          value="E1 3EZ"
          v-slot="{ field }">
          <label :for="field.id" class="col-span-1 text-baseV text-gray-secondary">
            PostCode
            <input v-bind="field" type="text" class="default-input" disabled />
          </label>
        </VField>
        <VField
          id="senderCountry"
          name="sender.country"
          value="United Kingdom"
          v-slot="{ field }">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Country
            <input v-bind="field" type="text" class="default-input" disabled />
          </label>
        </VField>
      </fieldset>

      <fieldset name="clientCredentials" class="mt-10 grid grid-cols-2 gap-6">
        <legend class="text-SV text-violet-primary">Bill To</legend>
        <VField id="clientName" name="client.name" v-slot="{ field }">
          <label :for="field.id" class="mt-6 col-span-2 text-baseV text-gray-secondary">
            Client's Name
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
        <VField id="clientEmail" name="client.email" v-slot="{ field }" type="email">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Client's Email
            <input v-bind="field" type="email" class="default-input" />
          </label>
        </VField>
        <VField id="clientStreet" name="client.street" v-slot="{ field }">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Street Address
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
        <VField id="clientCity" name="client.city" v-slot="{ field }">
          <label :for="field.id" class="col-span-1 text-baseV text-gray-secondary">
            City
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
        <VField id="clientPostCode" name="client.postCode" v-slot="{ field }">
          <label :for="field.id" class="col-span-1 text-baseV text-gray-secondary">
            PostCode
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
        <VField id="clientCountry" name="client.country" v-slot="{ field }">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Country
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
      </fieldset>

      <fieldset name="invoiceDetails" class="mt-10 grid grid-cols-2 gap-6">
        <VField id="invoiceDueDate" name="invoice.dueDate" v-slot="{ field, value }">
          <label
            :for="field.id"
            class="col-span-2 text-baseV text-gray-secondary"
            :class="$route.name === 'edit' ? 'opacity-40' : 'opacity-100'">
            Invoice Date
            <input
              v-bind="field"
              type="date"
              class="default-input input-calendar"
              :data-date="simplifyDate(value)"
              :min="universalizeDate(new Date())"
              :disabled="$route.name === 'edit' ? true : false" />
          </label>
        </VField>
        <VField id="invoicePaymentTerms" name="invoice.paymentTerms" v-slot="{ field }">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Payment Terms
            <select v-bind="field" class="app-select default-input">
              <option disabled>Please choose a payment term</option>
              <option v-for="paymentTerm in availableTerms" :value="paymentTerm.value">
                {{ paymentTerm.verbose }}
              </option>
            </select>
          </label>
        </VField>
        <VField id="invoiceDescription" name="invoice.description" v-slot="{ field }">
          <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
            Project Description
            <input v-bind="field" type="text" class="default-input" />
          </label>
        </VField>
      </fieldset>

      <fieldset name="orders" class="mt-10 flex flex-col gap-6">
        <legend
          class="font-bold text-[18px] text-[#777F98] leading-[32px] tracking-[-0.38px]">
          Item List
        </legend>

        <VFieldArray name="orders" array-path="orders" v-slot="{ fields, push, remove }">
          <div
            v-for="(entry, idx) in fields"
            :key="entry.key"
            class="grid grid-cols-8 items-end gap-4"
            :class="entry.isFirst ? 'mt-6' : ''">
            <VField
              :id="`orderItem[${idx}]`"
              :name="`orders[${idx}].item`"
              v-slot="{ field }">
              <label :for="field.id" class="col-span-8 text-baseV text-gray-secondary">
                Item name
                <input v-bind="field" type="text" class="default-input" />
              </label>
            </VField>
            <VField
              :id="`orderQuantity[${idx}]`"
              :name="`orders[${idx}].quantity`"
              v-slot="{ field }">
              <label :for="field.id" class="col-span-2 text-baseV text-gray-secondary">
                Qty.
                <input v-bind="field" type="number" class="default-input" />
              </label>
            </VField>
            <VField
              :id="`orderPrice[${idx}]`"
              :name="`orders[${idx}].price`"
              v-slot="{ field }">
              <label :for="field.id" class="col-span-3 text-baseV text-gray-secondary">
                Price
                <input v-bind="field" type="number" step="0.01" class="default-input" />
              </label>
            </VField>

            <label
              :for="`orderTotal[${idx}]`"
              class="col-span-2 text-baseV text-gray-secondary border-none">
              Total
              <input
                :id="`orderTotal[${idx}]`"
                :name="`orders[${idx}].total`"
                :value="entry.value.price * entry.value.quantity"
                type="text"
                class="default-input px-0 border-none text-gray-secondary"
                disabled />
            </label>

            <button type="button" class="col-span-1 h-12" @click="remove(idx)">
              <DeleteSVG width="12" height="16" />
            </button>
          </div>

          <button
            type="button"
            class="bg-[#f9fafe] w-full h-12 font-bold text-gray-secondary flex items-center justify-center rounded-full"
            @click="push({ id: '', item: '', quantity: 1, price: 0 })">
            + Add New Item
          </button>
        </VFieldArray>
      </fieldset>
    </div>

    <div
      class="fixed bottom-0 left-0 z-100 px-6 py-5 w-full bg-white flex justify-end items-center gap-2 shadow-[-6px_-2px_40px_rgba(0,0,0,.16)]">
      <button
        type="button"
        class="min-w-20 p-2 w-20 h-12 bg-[#f9faf9] text-SV text-gray-secondary rounded-full"
        @click="$route.name === 'edit' ? (isDiscarding = true) : (isCancelling = true)"
        :disabled="isSubmitting">
        {{ $route.name === "edit" ? "Discard" : "Cancel" }}
      </button>
      <button
        v-if="$route.name === 'edit'"
        type="submit"
        name="action"
        value="save"
        class="min-w-20 p-2 w-[108px] h-12 flex justify-center items-center bg-slate-primary text-SV text-gray-secondary rounded-full"
        :class="isSubmitting ? 'opacity-60' : 'opacity-100'"
        :disabled="isSubmitting">
        Save as Draft
      </button>
      <button
        type="submit"
        name="action"
        value="publish"
        class="min-w-20 p-2 h-12 bg-violet-primary flex items-center justify-center text-SV text-white rounded-full"
        :class="[
          isSubmitting ? 'opacity-40' : 'opacity-100',
          $route.name === 'new' ? 'w-[120px]' : 'w-[108px]',
        ]"
        :disabled="isSubmitting">
        {{ $route.name === "edit" ? "Save & Send" : "Save Changes" }}
      </button>
    </div>

    <!-- created invoice Alert -->
    <RAlertRoot v-model:open="isModalOpen">
      <RAlertOverlay
        class="w-full h-full fixed top-0 left-0 z-10 bg-[rgba(221,203,203,0.5)]">
        <RAlertContent
          class="px-8 w-[90vw] max-w-sm h-[200px] p-6 bg-white fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between rounded-lg shadow-sm"
          @escape-key-down="handleReset">
          <section class="flex flex-col gap-5">
            <RAlertTitle class="m-auto text-M text-center">
              <h2 v-if="isInvoiceCreated || isInvoiceUpdated">Success</h2>
              <h2 v-if="isDiscarding">Are you sure?</h2>
            </RAlertTitle>
            <RAlertDescription class="m-auto text-base text-gray-tertiary">
              <template v-if="isInvoiceCreated">
                Invoice #{{ initValues.invoice.id?.toUpperCase() }} has been
                created</template
              >
              <template v-if="isInvoiceUpdated">Changes have been made!!</template>
              <template v-if="isDiscarding">All your changes will be lost </template>
            </RAlertDescription>
          </section>

          <RAlertAction as-child>
            <button
              class="w-fit mx-auto p-2 font-bold rounded-lg"
              :class="[
                isInvoiceCreated || isInvoiceUpdated
                  ? 'text-violet-primary border border-violet-primary '
                  : '',
                isDiscarding ? 'bg-red-primary text-white' : '',
              ]"
              @click="
                isInvoiceCreated || isInvoiceUpdated ? navigateToInvoice() : handleReset()
              ">
              <template v-if="isInvoiceCreated || isInvoiceUpdated">
                Go to invoice</template
              >
              <template v-if="isDiscarding">Discard</template>
            </button>
          </RAlertAction>
        </RAlertContent>
      </RAlertOverlay>
    </RAlertRoot>
  </VForm>

  >
</template>

<script>
import { ref } from "vue";
import { Form, Field, FieldArray, ErrorMessage } from "vee-validate";
import { formatDate } from "@/helpers/formatDate";
import { generateUniqueInvoiceID } from "@/helpers/generateUniqueInvoiceID";
import Delete from "@/components/Svg/Delete.vue";
import router from "@/router";

export default {
  components: {
    DeleteSVG: Delete,
    // vee-validate components
    VForm: Form,
    VField: Field,
    VFieldArray: FieldArray,
    VErrorMessage: ErrorMessage,
  },
  props: {
    invoice: {
      type: Object,
    },
  },

  setup(props) {
    const initState = {
      invoice: {
        id: ref(props?.invoice?.id ?? generateUniqueInvoiceID()),
        description: ref(props?.invoice?.description ?? ""),
        dueDate: ref(props?.invoice?.dueDate ?? new Date()),
        paymentTerms: ref(props?.invoice?.paymentTerms ?? 1),
      },

      client: {
        name: ref(props?.invoice?.client?.name ?? ""),
        email: ref(props?.invoice?.client?.email ?? ""),
        street: ref(props?.invoice?.client?.street ?? ""),
        city: ref(props?.invoice?.client?.city ?? ""),
        postCode: ref(props?.invoice?.client?.postCode ?? ""),
        country: ref(props?.invoice?.client?.country ?? ""),
      },
      sender: {
        street: ref(props?.invoice?.senders[0]?.street ?? "19 Union Terrace"),
        city: ref(props?.invoice?.senders[0]?.city ?? "London"),
        postCode: ref(props?.invoice?.senders[0]?.postCode ?? "R1 3EZ"),
        country: ref(props?.invoice?.senders[0]?.country ?? "United Kingdom"),
      },
      orders: ref(props?.invoice?.orders ?? []),
    };

    const initValues = {
      invoice: {
        id: initState.invoice.id.value,
        description: initState.invoice.description.value,
        dueDate: initState.invoice.dueDate.value,
        paymentTerms: initState.invoice.paymentTerms.value,
      },

      client: {
        name: initState.client.name.value,
        email: initState.client.email.value,
        street: initState.client.street.value,
        city: initState.client.city.value,
        postCode: initState.client.postCode.value,
        country: initState.client.country.value,
      },
      sender: {
        street: initState.sender.street.value,
        city: initState.sender.city.value,
        postCode: initState.sender.postCode.value,
        country: initState.sender.country.value,
      },
      orders: initState.orders.value,
    };

    const availableTerms = ref([
      { verbose: "Net 1 day", value: 1 },
      { verbose: "Net 7 days", value: 7 },
      { verbose: "Net 14 days", value: 14 },
      { verbose: "Net 30 days", value: 30 },
    ]);

    const isModalOpen = ref(false);
    const isError = ref(false);
    const isCancelling = ref(false);
    const isDiscarding = ref(false);
    const isUpdating = ref(false);
    const isCreating = ref(false);
    const isInvoiceCreated = ref(false);
    const isInvoiceUpdated = ref(false);

    return {
      initValues,
      availableTerms,
      isModalOpen,
      isError,
      isCancelling,
      isDiscarding,
      isUpdating,
      isCreating,
      isInvoiceCreated,
      isInvoiceUpdated,
    };
  },

  beforeMount() {
    if (this.$route.name === "new") {
      this.initValues.orders.push({ item: "", quantity: 1, price: 0 });
    }
  },
  mounted() {
    this.initValues.invoice.dueDate = this.universalizeDate(
      this.initValues.invoice.dueDate
    );
  },

  watch: {
    isCancelling(newVal) {
      if (newVal === true) return router.push("/");
    },
    isDiscarding(newVal) {
      if (newVal === true) this.isModalOpen = true;
    },
  },

  methods: {
    universalizeDate(date) {
      const day = formatDate(date, "universal").day;
      const month = formatDate(date, "universal").month;
      const year = formatDate(date, "universal").year;

      return `${year}-${month}-${day}`;
    },
    simplifyDate(date) {
      const day = formatDate(date, "simplified").day;
      const month = formatDate(date, "simplified").month;
      const year = formatDate(date, "simplified").year;

      return `${day} ${month} ${year}`;
    },
    resetErrorState() {
      this.isError = false;
    },
    async navigateToInvoice() {
      this.isInvoiceCreated = false;
      window.reload;
      this.$router.push({
        name: "invoice",
        params: { invoiceID: this.initValues.invoice.id },
      });
    },

    async sendFormData(values, $event) {
      const submitter = $event.evt.submitter.value;

      const body = {
        ...values,
        invoice: {
          ...values.invoice,
          status: submitter === "save" ? "draft" : "pending",
        },
      };

      const url = `/api/invoices/${
        this.$route.fullPath.name === "edit"
          ? this.$route.params.invoiceID
          : this.initValues.invoice.id
      }`;

      // init requests
      switch (true) {
        case this.$route.name === "edit":
          await this.$fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
            onRequest: ({ request }) => {
              if (submitter === "save") {
                this.isSavingDraft = true;
              }

              if (submitter) {
                this.isUpdating = true;
              }
            },
            onResponse: ({ response }) => {
              if (submitter === "save") this.isSavingDraft = false;
              if (submitter === "publish") this.isUpdating = false;

              if (response.status === 500) this.isError = true;
              if (response.status === 204) this.isInvoiceUpdated = true;

              this.isModalOpen = true;
            },
          });
          break;

        case this.$route.name === "new":
          await this.$fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
            onResponse: ({ response }) => {
              if (response.status === 500) this.isError = true;
              if (response.status === 201) this.isInvoiceCreated = true;

              this.isModalOpen = true;
            },
          });

          break;

        default:
          throw new Error("Form not configured to be called in this route");
      }
    },
  },
};
</script>
