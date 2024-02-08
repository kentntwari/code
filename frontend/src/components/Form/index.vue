<template>
  <VForm
    @submit="sendFormData"
    :initial-values="state"
    :validation-schema="schema"
    :validate-on-change="true"
    v-slot="{ meta, isSubmitting, handleReset }">
    <div class="mt-6 md:mt-12 mb-[200px] grid grid-cols-1 gap-3">
      <!-- SENDER -->
      <fieldset name="senderCredentials" class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <legend class="text-SV text-violet-primary">Bill From</legend>
        <VField
          id="senderStreet"
          name="sender.street"
          value="19 Union Terrace"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="mt-6 col-span-3 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80 dark:text-slate-secondary/80">
            Street Address
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]"
              disabled />
            <VErrorMessage
              name="sender.street"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField
          id="senderCity"
          name="sender.city"
          value="London"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            City
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]"
              disabled />
            <VErrorMessage
              name="sender.city"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField
          id="senderPostCode"
          name="sender.postCode"
          value="E1 3EZ"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            PostCode
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]"
              disabled />
            <VErrorMessage
              name="sender.postCode"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField
          id="senderCountry"
          name="sender.country"
          value="United Kingdom"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-2 h-[90px] md:col-span-1 text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Country
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]"
              disabled />
            <VErrorMessage
              name="sender.country"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
      </fieldset>

      <!-- CLIENT -->
      <fieldset
        name="clientCredentials"
        class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
        <legend class="text-SV text-violet-primary">Bill To</legend>
        <VField id="clientName" name="client.name" v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="mt-6 col-span-2 md:col-span-3 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Client's Name
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.name"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField
          id="clientEmail"
          name="client.email"
          v-slot="{ field, meta }"
          type="email">
          <label
            :for="field.id"
            class="col-span-2 md:col-span-3 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Client's Email
            <input
              v-bind="field"
              type="email"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.email"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField id="clientStreet" name="client.street" v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-2 md:col-span-3 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Street Address
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.street"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField id="clientCity" name="client.city" v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            City
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.city"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField id="clientPostCode" name="client.postCode" v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            PostCode
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.postCode"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
        <VField id="clientCountry" name="client.country" v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-2 md:col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Country
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="client.country"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
      </fieldset>

      <!-- INVOICE -->
      <fieldset name="invoiceDetails" class="mt-10 md:mt-12 grid grid-cols-2 gap-3">
        <VField id="invoiceDueDate" name="invoice.dueDate" v-slot="{ field, value }">
          <label
            :for="field.id"
            class="col-span-2 md:col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80"
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
        <VField
          id="invoicePaymentTerms"
          name="invoice.paymentTerms"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-2 md:col-span-1 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Payment Terms
            <select v-bind="field" class="app-select default-input">
              <option disabled>Please choose a payment term</option>
              <option v-for="paymentTerm in availableTerms" :value="paymentTerm.value">
                {{ paymentTerm.verbose }}
              </option>
            </select>
          </label>
        </VField>
        <VField
          id="invoiceDescription"
          name="invoice.description"
          v-slot="{ field, meta }">
          <label
            :for="field.id"
            class="col-span-2 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
            Project Description
            <input
              v-bind="field"
              type="text"
              class="default-input"
              :class="[
                meta.touched
                  ? !meta.valid
                    ? 'outline outline-1 outline-red-primary'
                    : 'outline outline-1 outline-green-400'
                  : '',
              ]" />
            <VErrorMessage
              name="invoice.description"
              as="small"
              class="block mt-1 text-baseV text-red-primary" />
          </label>
        </VField>
      </fieldset>

      <!-- ORDERS -->
      <fieldset name="orders" class="mt-8 flex flex-col gap-3">
        <legend
          class="font-bold text-[18px] text-[#777F98] leading-[32px] tracking-[-0.38px]">
          Item List
        </legend>

        <VFieldArray
          name="orders"
          array-path="orders"
          v-slot="{ fields, meta, push, remove }">
          <div
            v-for="(entry, idx) in fields"
            :key="entry.key"
            class="grid md:flex grid-cols-8 md:justify-start items-end gap-3"
            :class="entry.isFirst ? 'mt-6 md:mt-3' : ''">
            <VField
              :id="`orderItem[${idx}]`"
              :name="`orders[${idx}].item`"
              v-slot="{ field, meta }">
              <label
                :for="field.id"
                class="col-span-8 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
                Item name
                <input
                  v-bind="field"
                  type="text"
                  class="default-input md:w-[214px]"
                  :class="[
                    meta.touched
                      ? !meta.valid
                        ? 'outline outline-1 outline-red-primary'
                        : 'outline outline-1 outline-green-400'
                      : '',
                  ]" />
                <VErrorMessage
                  :name="`orders[${idx}].item`"
                  as="small"
                  class="block mt-1 text-baseV text-red-primary" />
              </label>
            </VField>
            <VField
              :id="`orderQuantity[${idx}]`"
              :name="`orders[${idx}].quantity`"
              v-slot="{ field, meta }">
              <label
                :for="field.id"
                class="col-span-2 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
                Qty.
                <input
                  v-bind="field"
                  type="number"
                  inputmode="numeric"
                  class="default-input px-0 md:w-[46px] text-center"
                  :class="[
                    meta.touched
                      ? !meta.valid
                        ? 'outline outline-1 outline-red-primary'
                        : 'outline outline-1 outline-green-400'
                      : '',
                  ]" />
                <VErrorMessage
                  :name="`orders[${idx}].quantity`"
                  as="small"
                  class="block mt-1 text-baseV text-red-primary" />
              </label>
            </VField>
            <VField
              :id="`orderPrice[${idx}]`"
              :name="`orders[${idx}].price`"
              v-slot="{ field, meta }">
              <label
                :for="field.id"
                class="col-span-3 h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
                Price
                <input
                  v-bind="field"
                  type="number"
                  inputmode="numeric"
                  step="0.01"
                  class="default-input"
                  :class="[
                    meta.touched
                      ? !meta.valid
                        ? 'outline outline-1 outline-red-primary'
                        : 'outline outline-1 outline-green-400'
                      : '',
                  ]" />
                <VErrorMessage
                  :name="`orders[${idx}].price`"
                  as="small"
                  class="block mt-1 text-baseV text-red-primary" />
              </label>
            </VField>

            <label
              :for="`orderTotal[${idx}]`"
              class="col-span-2 text-baseV h-[90px] text-gray-secondary dark:text-slate-secondary/80 border-none">
              Total
              <input
                :id="`orderTotal[${idx}]`"
                :name="`orders[${idx}].total`"
                :value="entry.value.price * entry.value.quantity"
                type="number"
                inputmode="numeric"
                class="default-input px-0 border-none text-gray-secondary dark:text-slate-secondary/80"
                disabled />
            </label>

            <button type="button" class="col-span-1 h-[90px]" @click="remove(idx)">
              <DeleteSVG width="12" height="16" />
            </button>
          </div>

          <button
            type="button"
            class="mt-6 bg-[#f9fafe] dark:bg-gray-primary/40 w-full h-12 font-bold text-gray-secondary dark:text-slate-secondary/80 flex items-center justify-center rounded-full"
            @click="push({ id: '', item: '', quantity: 1, price: 0 })">
            + Add New Item
          </button>
        </VFieldArray>
      </fieldset>
    </div>

    <div
      class="fixed bottom-0 left-0 lg:left-24 z-50 px-6 py-5 w-full md:w-[616px] bg-white dark:bg-slate-primary flex justify-end items-center gap-2 shadow-[-6px_-2px_40px_rgba(0,0,0,.16)]">
      <button
        type="button"
        class="min-w-20 p-2 w-20 md:w-24 h-12 bg-[#f9faf9] dark:bg-gray-secondary/10 font-bold text-SV text-gray-secondary dark:text-slate-secondary/80 rounded-full"
        @click="
          $route.name === 'edit'
            ? meta.touched
              ? (isDiscarding = true)
              : $router.go(-1)
            : meta.touched
            ? (isDiscarding = true)
            : (isCancelling = true)
        "
        :disabled="isSubmitting">
        {{ $route.name === "edit" ? "Discard" : "Cancel" }}
      </button>
      <button
        v-if="$route.name === 'new'"
        type="submit"
        name="action"
        value="save"
        class="min-w-20 p-2 w-[120px] h-12 flex justify-center items-center bg-slate-primary dark:bg-slate-secondary/20 font-bold text-SV text-gray-secondary dark:text-slate-secondary/80 rounded-full"
        :class="isSubmitting ? 'opacity-60' : 'opacity-100'"
        :disabled="isSubmitting">
        Save as Draft
      </button>
      <button
        type="submit"
        name="action"
        value="publish"
        class="min-w-20 p-2 h-12 bg-violet-primary flex items-center justify-center font-bold text-SV text-white rounded-full"
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
        class="w-full h-full fixed top-0 left-0 z-[60] bg-[rgba(221,203,203,0.5)] dark:bg-black-site/70">
        <RAlertContent
          class="px-8 w-[90vw] max-w-sm h-[200px] p-6 bg-white dark:bg-slate-primary fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between rounded-lg shadow-sm"
          @escape-key-down="handleReset">
          <section class="flex flex-col gap-5">
            <RAlertTitle class="m-auto text-M text-center dark:text-white">
              <h2 v-if="isInvoiceCreated || isInvoiceUpdated">Success</h2>
              <h2 v-if="isDiscarding">Are you sure?</h2>
            </RAlertTitle>
            <RAlertDescription
              class="m-auto text-base text-gray-tertiary dark:text-slate-secondary">
              <template v-if="isInvoiceCreated">
                Invoice #{{ state.invoice.id?.toUpperCase() }} has been created</template
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
</template>

<script>
import { ref, reactive } from "vue";
import { formatDate } from "@/helpers/formatDate";
import { formSchema } from "@/helpers/formSchema";
import { generateUniqueInvoiceID } from "@/helpers/generateUniqueInvoiceID";
import Delete from "@/components/Svg/Delete.vue";
import router from "@/router";

export default {
  components: {
    DeleteSVG: Delete,
  },
  props: {
    invoice: {
      type: Object,
    },
  },

  setup(props) {
    const state = reactive({
      invoice: {
        id: props?.invoice?.id ?? generateUniqueInvoiceID(),
        description: props?.invoice?.description ?? "",
        dueDate: props?.invoice?.dueDate ?? new Date(),
        paymentTerms: props?.invoice?.paymentTerms ?? 1,
      },

      client: {
        name: props?.invoice?.client?.name ?? "",
        email: props?.invoice?.client?.email ?? "",
        street: props?.invoice?.client?.street ?? "",
        city: props?.invoice?.client?.city ?? "",
        postCode: props?.invoice?.client?.postCode ?? "",
        country: props?.invoice?.client?.country ?? "",
      },
      sender: {
        street: props?.invoice?.senders[0]?.street ?? "19 Union Terrace",
        city: props?.invoice?.senders[0]?.city ?? "London",
        postCode: props?.invoice?.senders[0]?.postCode ?? "R1 3EZ",
        country: props?.invoice?.senders[0]?.country ?? "United Kingdom",
      },
      orders: props?.invoice?.orders ?? [],
    });

    const availableTerms = ref([
      { verbose: "Net 1 day", value: 1 },
      { verbose: "Net 7 days", value: 7 },
      { verbose: "Net 14 days", value: 14 },
      { verbose: "Net 30 days", value: 30 },
    ]);

    const isModalOpen = ref(false);
    const isCancelling = ref(false);
    const isDiscarding = ref(false);
    const isUpdating = ref(false);
    const isCreating = ref(false);
    const isInvoiceCreated = ref(false);
    const isInvoiceUpdated = ref(false);

    const schema = formSchema;

    return {
      schema,
      state,
      availableTerms,
      isModalOpen,
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
      this.state.orders.push({ item: "", quantity: 1, price: 0 });
    }
  },
  mounted() {
    this.state.invoice.dueDate = this.universalizeDate(this.state.invoice.dueDate);
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
    async navigateToInvoice() {
      this.isInvoiceCreated = false;
      this.$router.push({
        name: "invoice",
        params: { invoiceID: this.state.invoice.id },
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
          : this.state.invoice.id
      }`;

      // init requests
      switch (true) {
        case this.$route.name === "edit":
          try {
            await this.$fetch(url, {
              method: "PUT",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
              onRequest: () => {
                if (submitter === "save") {
                  this.isSavingDraft = true;
                }

                if (submitter === "publish") {
                  this.isUpdating = true;
                }
              },
              onResponse: ({ response }) => {
                if (submitter === "save") this.isSavingDraft = false;
                if (submitter === "publish") this.isUpdating = false;

                if (response.status === 204) this.isInvoiceUpdated = true;

                this.isModalOpen = true;
              },
              onRequestError: () => {
                this.isSavingDraft = false;
                this.isUpdating = false;
              },
              onResponseError: () => {
                this.isSavingDraft = false;
                this.isUpdating = false;
              },
            });
          } catch (error) {
            console.error(error);
          }

          break;

        case this.$route.name === "new":
          try {
            await this.$fetch(url, {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
              onResponse: ({ response }) => {
                if (response.status === 201) this.isInvoiceCreated = true;

                this.isModalOpen = true;
              },
              onResponseError: () => {
                this.isInvoiceCreated = false;
              },
            });
          } catch (error) {
            console.error(error);
          }

          break;

        default:
          throw new Error("Form not configured to be called in this route");
      }
    },
  },
};
</script>
