<template>
  <header>
    <GoBackBtn />
  </header>

  <template v-if="invoice">
    <div class="mt-8 mb-24">
      <div
        class="p-6 bg-white dark:bg-gray-primary flex items-center justify-between rounded-lg">
        <div class="w-full flex items-center justify-between md:justify-start md:gap-5">
          <span class="text-baseSV text-gray-seondary dark:text-slate-secondary"
            >Status</span
          >
          <Status :status="invoice.status" />
        </div>

        <ul
          class="fixed md:relative bottom-0 left-0 z-30 px-6 py-5 md:p-0 w-full bg-white dark:bg-gray-primary md:bg-transparent flex items-center justify-end gap-2 shadow-[4px_0px_10px_rgba(0,0,0,.2)] md:shadow-none"
          title="invoice navigation">
          <li>
            <button
              type="edit"
              class="w-20 h-12 bg-white dark:bg-gray-secondary/10 flex items-center justify-center capitalize text-SV text-gray-seondary dark:text-slate-secondary rounded-full"
              title="Edit invoice"
              @click="
                this.$router.push({
                  name: 'edit',
                  params: { invoiceID: invoice.id.toLowerCase() },
                })
              ">
              Edit
            </button>
          </li>

          <li>
            <DeleteInvoice :id="invoice.id" :status="invoice.status" />
          </li>

          <li>
            <MarkAsPaidInvoice :id="invoice.id" :status="invoice.status" />
          </li>
        </ul>
      </div>

      <section
        class="mt-5 p-6 bg-white dark:bg-gray-primary flex flex-col gap-8 md:gap-12 rounded-lg"
        title="invoice essentials">
        <header
          class="flex flex-col md:flex-row md:justify-between gap-[30px]"
          title="invoice header">
          <div class="flex flex-col gap-1">
            <h3 class="font-bold text-SV text-gray-primary dark:text-white">
              <span class="text-gray-seondary dark:text-slate-secondary">#</span
              >{{ invoice.id }}
            </h3>
            <span class="text-baseV text-gray-seondary dark:text-slate-secondary">{{
              invoice.description
            }}</span>
          </div>

          <div class="flex items-center gap-2 md:text-right">
            <template v-for="senderAdress in invoice.senders">
              <Address :address="senderAdress" />
            </template>
          </div>
        </header>

        <div
          class="grid grid-cols-2 md:grid-cols-6 grid-rows-[repeat(3,48px)] md:grid-rows-[repeat(2,48px)] gap-y-8"
          title="miscellaneous invoice information">
          <section class="col-start-1 flex flex-col gap-3">
            <span class="text-baseV text-gray-seondary dark:text-slate-secondary"
              >Invoice Date</span
            >
            <h4
              class="font-bold text-SV md:leading-[20px] text-gray-primary dark:text-white">
              {{ createdAt }}
            </h4>
          </section>
          <section class="col-start-1 row-start-2 flex flex-col gap-3">
            <span class="text-baseV text-gray-seondary dark:text-slate-secondary"
              >Payment Due</span
            >
            <h4
              class="font-bold text-SV md:leading-[20px] text-gray-primary dark:text-white">
              {{ dueDate }}
            </h4>
          </section>
          <section
            class="col-start-1 md:col-start-5 md:col-span-2 row-start-3 md:row-start-1 flex flex-col gap-3">
            <span class="text-baseV text-gray-seondary dark:text-slate-secondary"
              >Sent to</span
            >
            <h4
              class="font-bold text-SV md:leading-[20px] text-gray-primary dark:text-white">
              {{ invoice.client.email }}
            </h4>
          </section>

          <section class="md:col-start-3 md:col-span-2 flex flex-col gap-3">
            <span class="text-baseV text-gray-seondary dark:text-slate-secondary"
              >Bill to</span
            >
            <h4
              class="font-bold text-SV md:leading-[20px] text-gray-primary dark:text-white">
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
          <div class="bg-[#f9fafe] dark:bg-gray-secondary/20 rounded-lg">
            <OrdersTable :orders="invoice.orders" :grandTotal="invoice.grandTotal" />
          </div>
        </footer>
      </section>
    </div>
  </template>

  <!-- skeleton loader -->
  <template v-if="!invoice">
    <div class="mt-8 flex flex-col gap-5">
      <div
        class="bg-white dark:bg-gray-primary w-90vh p-6 flex justify-between animate-pulse rounded-lg shadow-sm">
        <div class="w-1/4 md:w-2/12 h-4 bg-gray-secondary opacity-40"></div>
        <div class="w-1/2 md:w-5/12 h-4 bg-gray-secondary opacity-40"></div>
      </div>
      <div class="w-90vh p-6 h-[300px] flex items-center justify-center animate-pulse">
        <div
          class="violet-loader dark:white-loader"
          style="width: var(--spinner-width-large)"></div>
      </div>
    </div>
  </template>

  <!-- nested edit or delete view -->
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import { computed } from "vue";
import { formatToIsoString } from "@/helpers/formatDate";

// components
import Status from "@/components/Status";
import Address from "@/components/Address";
import Table from "@/components/Orders/Table";
import GoBackBtn from "@/components/Misc/GoBack.vue";
import ArrowLeftSVG from "@/components/Svg/ArrowLeft";
import DeleteInvoice from "@/components/Actions/DeleteInvoice";
import MarkAsPaidInvoice from "@/components/Actions/MarkAsPaidInvoice.vue";

export default {
  name: "Current",
  components: {
    ArrowLeftSVG,
    Status,
    Address,
    OrdersTable: Table,
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
      return formatToIsoString(this.invoice?.createdAt);
    },
    dueDate() {
      return formatToIsoString(this.invoice?.dueDate);
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
    this.$router.onError(() => {
      window.location.reload();
    });

    this.$watch(
      () => this.$route.params.invoiceID,
      () => {
        this.fetchInvoice();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchInvoice() {
      const data = await this.$fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/api/invoices/${
          this.$route.params.invoiceID
        }`,
        {
          onRequest: async () => {
            this.loading = true;
          },
          onResponse: async () => {
            this.loading = false;
          },
        }
      );

      this.invoice = data;
    },
  },
};
</script>
