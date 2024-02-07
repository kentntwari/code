<template>
  <Invoices v-slot="{ invoices }">
    <ul class="mt-8 md:mt-14 flex-1 flex flex-col gap-4">
      <li v-for="invoice in invoices" :key="generateRandomKey()">
        <RouterLink
          :to="{ name: 'invoice', params: { invoiceID: invoice.id.toLowerCase() } }">
          <Invoice
            class="p-6 bg-white grid grid-cols-2 md:grid-cols-[58px_repeat(14,1fr)] grid-rows-[repeat(5,15px)_11px] md:grid-rows-1 md:items-center rounded-lg shadow-sm"
            :invoice="invoice">
            <template #header="{ id, clientName }">
              <div class="row-start-1 font-bold text-SV">
                <span class="text-gray-secondary">#</span>
                <span>{{ id }}</span>
              </div>
              <small
                class="md:col-start-7 md:col-span-3 text-right md:text-left text-baseV text-gray-secondary"
                >{{ clientName }}</small
              >
            </template>

            <template #footer="{ dueDate, total, status }">
              <small
                class="row-start-4 md:row-start-1 md:col-start-3 md:col-span-3 text-baseV text-gray-secondary"
                >Due {{ dueDate }}</small
              >
              <span
                class="mt-1 row-start-5 md:row-start-1 md:col-start-10 md:col-span-3 text-S md:text-right"
                >£ {{ total }}</span
              >
              <div
                class="row-start-4 md:row-start-1 col-span-1 md:[grid-column-start:14] flex justify-end">
                <Status :status="status" />
              </div>
              <ArrowRightSVG
                class="hidden md:block md:[grid-column-start:15] md:justify-self-end" />
            </template>
          </Invoice>
        </RouterLink>
      </li>
    </ul>
  </Invoices>

  <!-- Nested new invoice -->
  <RouterView />
</template>

<script>
import { v4 as uuidv4 } from "uuid";

// components
import Status from "@/components/Status";
import Invoices from "@/components/Invoices";
import Invoice from "@/components/Invoices/Invoice";
import ArrowRightSVG from "@/components/Svg/ArrowRight";

export default {
  name: "Dashboard",
  components: {
    Invoices,
    Invoice,
    Status,
    ArrowRightSVG,
  },
  methods: {
    generateRandomKey() {
      return uuidv4();
    },
  },
};
</script>
