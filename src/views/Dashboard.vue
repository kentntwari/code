<template>
  <main class="mx-5 my-8">
    <Invoices v-slot="{ invoices }">
      <ul class="mt-8 flex-1 flex flex-col gap-4">
        <li v-for="invoice in invoices" :key="invoice.id">
          <RouterLink :key="invoice.id" to="/">
            <Invoice :invoice="invoice" />
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
