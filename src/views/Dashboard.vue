<template>
  <Invoices v-slot="{ invoices }">
    <ul class="mt-8 flex-1 flex flex-col gap-4">
      <li v-for="invoice in invoices" :key="randomKey()">
        <RouterLink
          :to="{ name: 'invoice', params: { invoiceId: invoice.id.toLowerCase() } }">
          <Invoice
            class="p-6 bg-white flex flex-col gap-6 rounded-lg shadow-sm"
            :invoice="invoice">
            <template #header="{ id, clientName }">
              <div class="font-bold text-SV">
                <span class="text-gray-secondary">#</span>
                <span>{{ id }}</span>
              </div>
              <small class="text-baseV text-gray-secondary">{{ clientName }}</small>
            </template>

            <template #footer="{ dueDate, total, status }">
              <div class="flex flex-col gap-2">
                <small class="text-baseV text-gray-secondary">Due {{ dueDate }}</small>
                <span class="text-S">£ {{ total }}</span>
              </div>
              <Status :status="status" />
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
import { RouterLink, RouterView } from "vue-router";
import Status from "@/components/Status";
import Invoices from "@/components/Invoices";
import Invoice from "@/components/Invoices/Invoice";

export default {
  name: "Dashboard",
  components: {
    RouterLink,
    Invoices,
    Invoice,
    Status,
  },
  methods: {
    randomKey() {
      return uuidv4();
    },
  },
};
</script>

<style lang="scss" scoped></style>
