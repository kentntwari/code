<template>
  <main class="mx-5 my-8">
    <Invoices v-slot="{ invoices }">
      <ul class="mt-8 flex-1 flex flex-col gap-4">
        <li v-for="invoice in invoices" :key="randomKey()">
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
import { v4 as uuidv4 } from "uuid";

// components
import { RouterLink } from "vue-router";
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
