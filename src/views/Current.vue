<template>
  <header>
    <GoBackBtn />
  </header>

  <template v-if="invoice">
    <div class="mt-8">
      <div class="p-6 bg-white flex items-center justify-between rounded-lg">
        <span class="text-baseSV text-gray-secondary">Status</span>
        <Status :status="invoice.status" />
      </div>

      <section
        class="mt-5 p-6 bg-white flex flex-col gap-8 rounded-lg"
        title="invoice essentials">
        <header class="flex flex-col gap-[30px]" title="invoice header">
          <div class="flex flex-col gap-1">
            <h3 class="font-bold text-SV text-gray-primary">
              <span class="text-gray-secondary">#</span>{{ invoice.id }}
            </h3>
            <span class="text-baseV text-gray-secondary">{{ invoice.description }}</span>
          </div>

          <div class="flex items-center gap-2">
            <template v-for="senderAdress in invoice.senders">
              <Address :address="senderAdress" />
            </template>
          </div>
        </header>

        <div class="grid grid-cols-2" title="miscellaneous invoice information">
          <div class="grid grid-cols-1 gap-8">
            <section class="flex flex-col gap-3">
              <span class="text-baseV text-gray-secondary">Invoice Date</span>
              <h4 class="font-bold text-SV text-gray-primary">
                {{ createdAt }}
              </h4>
            </section>
            <section class="flex flex-col gap-3">
              <span class="text-baseV text-gray-secondary">Payment Due</span>
              <h4 class="font-bold text-SV text-gray-primary">
                {{ dueDate }}
              </h4>
            </section>
            <section class="flex flex-col gap-3">
              <span class="text-baseV text-gray-secondary">Sent to</span>
              <h4 class="font-bold text-SV text-gray-primary">
                {{ invoice.client.email }}
              </h4>
            </section>
          </div>

          <section class="flex flex-col gap-3">
            <span class="text-baseV text-gray-secondary">Bill to</span>
            <h4 class="font-bold text-SV text-gray-primary">
              {{ invoice.client.name }}
            </h4>
            <Address
              :address="{
                street: invoice.client.street,
                city: invoice.client.city,
                postCode: invoice.client.postCode,
                country: invoice.client.country,
              }" />
          </section>
        </div>

        <footer title="invoice footer">
          <div class="bg-[#f9fafe] rounded-lg">
            <OrdersTable :orders="invoice.orders" :grandTotal="invoice.grandTotal" />
          </div>
        </footer>
      </section>
    </div>

    <footer class="px-6 pt-6">
      <InvoiceActionsProvider>
        <nav class="flex items-center gap-2" title="invoice navigation">
          <button
            type="edit"
            class="w-20 h-12 bg-white flex items-center justify-center capitalize text-base text-gray-secondary rounded-full"
            @click="
              this.$router.push({
                name: 'edit',
                params: { invoiceId: invoice.id.toLowerCase() },
              })
            ">
            Edit
          </button>
          <DeleteInvoice />
          <MarkAsPaidInvoice />
        </nav>
      </InvoiceActionsProvider>
    </footer>
  </template>

  <template v-if="!invoice">
    <div class="mt-8 flex flex-col gap-5">
      <div
        class="bg-white w-90vh max-w-sm p-6 flex justify-between animate-pulse rounded-lg shadow-sm">
        <div class="w-1/4 h-4 bg-gray-secondary opacity-40"></div>
        <div class="w-1/2 h-4 bg-gray-secondary opacity-40"></div>
      </div>
      <div
        class="w-90vh max-w-sm p-6 h-[300px] flex items-center justify-center animate-pulse">
        <div class="loader" style="width: var(--spinner-width-large)"></div>
      </div>
    </div>
  </template>

  <!-- nested edit or delete view -->
  <RouterView />
</template>

<script>
import { formatDate } from "@/helpers/formatDate";

// components
import { RouterView } from "vue-router";

import Status from "@/components/Status";
import Address from "@/components/Address";
import Table from "@/components/Orders/Table";
import GoBackBtn from "@/components/Misc/GoBack.vue";
import ArrowLeftSVG from "@/components/Svg/ArrowLeft";
import DeleteInvoice from "@/components/Actions/DeleteInvoice";
import MarkAsPaidInvoice from "@/components/Actions/MarkAsPaidInvoice.vue";

import InvoiceActionsProvider from "@/Providers/InvoiceActions";
import { computed } from "vue";

export default {
  name: "Current",
  components: {
    ArrowLeftSVG,
    Status,
    Address,
    OrdersTable: Table,
    InvoiceActionsProvider,
    DeleteInvoice,
    GoBackBtn,
    MarkAsPaidInvoice,
  },
  data() {
    return {
      loading: false,
      invoice: null,
      error: null,
    };
  },
  computed: {
    createdAt() {
      return formatDate(this.invoice.createdAt);
    },
    dueDate() {
      return formatDate(this.invoice.dueDate);
    },
    tablePadding() {
      return "p-6";
    },
  },
  provide() {
    return {
      invoice: computed(() => this.invoice),
    };
  },
  created() {
    this.$watch(
      () => this.$route.params.invoiceId,
      () => {
        this.fetchInvoice();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchInvoice() {
      const data = await this.$fetch(`/api/invoices/${this.$route.params.invoiceId}`, {
        onRequest: async () => {
          this.loading = true;
        },
        onResponse: async () => {
          this.loading = false;
        },
      });

      this.invoice = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
