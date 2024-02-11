<template>
  <VForm
    :initial-values="state"
    :validation-schema="schema"
    :validate-on-change="true"
    v-slot="{ isSubmitting, validate }"
    @submit="sendFormData"
    @invalid-submit="validate()">
    <div class="mt-6 md:mt-12 mb-[200px] grid grid-cols-1 gap-3">
      <!-- SENDER -->
      <fieldset name="senderCredentials" class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <legend class="text-SV text-violet-primary">Bill From</legend>
        <VCustomInput
          id="senderStreet"
          name="sender.street"
          value="19 Union Terrace"
          class="mt-6 col-span-2 md:col-span-3">
          <template #label>Street Address</template>
        </VCustomInput>

        <VCustomInput
          id="senderCity"
          name="sender.city"
          value="London"
          class="col-span-1">
          <template #label>City</template>
        </VCustomInput>

        <VCustomInput
          id="senderPostCode"
          name="sender.postCode"
          value="E1 3EZ"
          class="col-span-1">
          <template #label>PostCode</template>
        </VCustomInput>

        <VCustomInput
          id="senderCountry"
          name="sender.country"
          value="United Kingdom"
          class="col-span-2 md:col-span-1">
          <template #label>Country</template>
        </VCustomInput>
      </fieldset>

      <!-- CLIENT -->
      <fieldset
        name="clientCredentials"
        class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
        <legend class="text-SV text-violet-primary">Bill To</legend>
        <VCustomInput
          id="clientName"
          name="client.name"
          class="mt-6 col-span-2 md:col-span-3">
          <template #label>Client's Name</template>
        </VCustomInput>

        <VCustomInput
          id="clientEmail"
          name="client.email"
          class="col-span-2 md:col-span-3">
          <template #label>Client's Email</template>
        </VCustomInput>

        <VCustomInput
          id="clientStreet"
          name="client.street"
          class="col-span-2 md:col-span-3">
          <template #label>Street Address</template>
        </VCustomInput>

        <VCustomInput id="clientCity" name="client.city" class="col-span-1">
          <template #label>City</template>
        </VCustomInput>

        <VCustomInput id="clientPostCode" name="client.postCode" class="col-span-1">
          <template #label>PostCode</template>
        </VCustomInput>

        <VCustomInput
          id="clientCountry"
          name="client.country"
          class="col-span-2 md:col-span-1">
          <template #label>Country</template>
        </VCustomInput>
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
              :value="universalizeDate(value)"
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

        <VCustomInput
          id="invoiceDescription"
          name="invoice.description"
          class="col-span-2">
          <template #label>Project Description</template>
        </VCustomInput>
      </fieldset>

      <!-- ORDERS -->
      <fieldset name="orders" class="mt-8 flex flex-col gap-3">
        <legend
          class="font-bold text-[18px] text-[#777F98] leading-[32px] tracking-[-0.38px]">
          Item List
        </legend>

        <VFieldArray name="orders" array-path="orders" v-slot="{ fields, push, remove }">
          <div
            v-for="(entry, idx) in fields"
            :key="entry.key"
            class="grid md:flex grid-cols-8 md:justify-start items-end gap-3"
            :class="entry.isFirst ? 'mt-6 md:mt-3' : ''">
            <VCustomInput
              :id="`orderItem[${idx}]`"
              :name="`orders[${idx}].item`"
              class="col-span-2">
              <template #label>Item name</template>
            </VCustomInput>

            <VCustomInput
              :ic="'px-0 md:w-[46px] text-center'"
              :id="`orderQuantity[${idx}]`"
              :name="`orders[${idx}].quantity`"
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              class="col-span-2">
              <template #label>Qty.</template>
            </VCustomInput>

            <VCustomInput
              :id="`orderPrice[${idx}]`"
              :name="`orders[${idx}].price`"
              type="number"
              inputmode="decimal"
              pattern="[0-9]*"
              class="col-span-3">
              <template #label>Price</template>
            </VCustomInput>

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
                class="default-input dark:bg-transparent px-0 border-none text-gray-secondary dark:text-slate-secondary/80"
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
        :title="$route.name === 'edit' ? 'Discard all changes' : 'Cancel and exit form'"
        @click="isOpenModal = false"
        :disabled="isSubmitting">
        {{ $route.name === "edit" ? "Cancel" : "Discard" }}
      </button>
      <button
        v-if="$route.name === 'new'"
        type="submit"
        value="save"
        title="Save form as draft"
        class="min-w-20 p-2 w-[120px] h-12 flex justify-center items-center bg-slate-primary dark:bg-slate-secondary/20 font-bold text-SV text-gray-secondary dark:text-slate-secondary/80 rounded-full"
        :class="isSubmitting ? 'opacity-60' : 'opacity-100'"
        :disabled="isSubmitting">
        <template v-if="isSavingDraft">
          <div class="white-loader"></div>
        </template>

        <template v-else>Save as Draft</template>
      </button>
      <button
        type="submit"
        value="publish"
        class="min-w-20 p-2 h-12 bg-violet-primary flex items-center justify-center font-bold text-SV text-white rounded-full"
        :title="$route.name === 'edit' ? 'Save edited form' : 'Save changes'"
        :class="[
          isSubmitting ? 'opacity-40' : 'opacity-100',
          $route.name === 'new' ? 'w-[120px]' : 'w-[108px]',
        ]"
        :disabled="isSubmitting">
        <template v-if="isUpdating || isCreating">
          <div class="white-loader"></div>
        </template>

        <template v-else>
          {{ $route.name === "edit" ? "Save & Send" : "Save Changes" }}
        </template>
      </button>
    </div>
  </VForm>
</template>

<script>
import { ref, reactive } from "vue";
import { formatDate } from "@/helpers/formatDate";
import { formSchema } from "@/helpers/formSchema";
import { generateUniqueInvoiceID } from "@/helpers/generateUniqueInvoiceID";
import CustomInput from "./CustomInput";
import Delete from "@/components/Svg/Delete";

export default {
  components: {
    DeleteSVG: Delete,
    VCustomInput: CustomInput,
  },

  props: {
    invoice: {
      type: Object,
    },
  },

  inject: ["isOpenModal"],

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

    const isUpdating = ref(false);
    const isCreating = ref(false);
    const isSavingDraft = ref(false);
    const isInvoiceCreated = ref(false);
    const isInvoiceUpdated = ref(false);

    const schema = formSchema;

    return {
      schema,
      state,
      availableTerms,
      isUpdating,
      isCreating,
      isSavingDraft,
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
    navigateToInvoice() {
      if (this.$route.name === "new") this.isInvoiceCreated = false;
      if (this.$route.name === "edit") this.isInvoiceUpdated = false;

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

      const url = `${import.meta.env.VITE_API_ENDPOINT}/api/invoices/${
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

                if (response.status === 204) {
                  this.isInvoiceUpdated = true;
                  this.$nextTick(() => this.navigateToInvoice());
                }
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
                if (response.status === 201) {
                  this.isInvoiceCreated = true;
                  this.$nextTick(() => this.navigateToInvoice());
                }
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
