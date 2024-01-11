<template>
  <main class="mx-5 my-8">
    <Invoices v-slot="{ invoices }">
      <ul class="mt-8 flex-1 flex flex-col gap-4">
        <li v-for="invoice in invoices" :key="crypto.randomUUID()">
          <RouterLink to="/">
            <Invoice :invoice="invoice">
              <template #header="{ id, clientName }">
                <div class="font-bold text-SV">
                  <span class="text-gray-secondary">#</span>
                  <span>{{ id }}</span>
                </div>
                <small class="text-baseV text-gray-secondary">{{ clientName }}</small>
              </template>

              <template #footer="{ due, total, status }">
                <div class="flex flex-col gap-2">
                  <small class="text-baseV text-gray-secondary">Due {{ due }}</small>
                  <span class="text-S">£ {{ total }}</span>
                </div>
                <Status class="capitalize" :status="status">
                  {{ invoice.status }}
                </Status>
              </template>
            </Invoice>
          </RouterLink>
        </li>
      </ul>
    </Invoices>
  </main>
</template>

<script>
// components
import { RouterLink } from "vue-router";
import Invoices from "@/components/Invoices";
import Invoice from "@/components/Invoices/Invoice";

export default {
  name: "Dashboard",
  components: {
    RouterLink,
    Invoices,
    Invoice,
  },
};
</script>

<style lang="scss" scoped></style>
