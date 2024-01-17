<template>
  <header>
    <button
      type="button"
      title="Go back"
      class="flex items-center gap-6 cursor-pointer"
      @click="$router.go(-1)">
      <ArrowLeftSVG />
      <h1 class="font-bold text-heading-S text-gray-primary">Go back</h1>
    </button>
  </header>

  <div class="mt-8">
    <template v-if="invoice">
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
    </template>
  </div>

  <footer class="px-6 pt-6">
    <nav class="flex items-center gap-2" title="invoice navigation">
      <ActionsProvider>
        <template #edit>
          <RouterLink
            v-if="invoice"
            :to="{
              name: 'Edit invoice',
              path: '/edit',
              params: { id: invoice.id },
            }">
            <button
              type="edit"
              class="w-20 h-12 bg-white flex items-center justify-center capitalize text-base text-gray-secondary rounded-full">
              Edit
            </button>
          </RouterLink>
        </template>

        <template #delete>
          <DeleteInvoice />
        </template>

        <template #markAsPaid>
          <button
            type="button"
            class="w-[150px] h-12 bg-violet-primary flex items-center justify-center font-bold text-baseV text-white rounded-full">
            Mark as Paid
          </button>
        </template>
      </ActionsProvider>
    </nav>
  </footer>

  <!-- nested edit or delete view -->
  <RouterView />
</template>

<script>
import { formatDate } from "@/helpers/formatDate";

// components
import { RouterLink, RouterView } from "vue-router";
import Status from "@/components/Status";
import Address from "@/components/Address";
import Table from "@/components/Orders/Table";
import ArrowLeftSVG from "@/components/Svg/ArrowLeft";
import ActionsProvider from "@/components/Actions/Provider";
import DeleteInvoice from "@/components/Actions/DeleteInvoice";

export default {
  name: "Current",
  components: {
    ArrowLeftSVG,
    Status,
    Address,
    OrdersTable: Table,
    ActionsProvider,
    DeleteInvoice,
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
        onRequest: async ({ request }) => {
          this.loading = true;
        },
        onResponse: async (res) => {
          this.loading = false;
        },
      });

      this.invoice = data;
    },
    async deleteInvoice() {
      await this.$fetch(`/api/invoices/${this.$route.params.invoiceId}`, {
        method: "DELETE",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
