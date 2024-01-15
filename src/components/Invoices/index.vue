<template>
  <header class="w-full flex items-center justify-between">
    <div class="text-base text-gray-secondary">
      <h1 class="font-bold text-M">Invoices</h1>
      <small>{{ invoices.length > 0 ? invoices.length : "No" }} invoices</small>
    </div>

    <RouterLink to="/new">
      <button
        type="button"
        title="add new invoice"
        class="bg-violet-primary h-11 min-w-12 px-0.5 flex items-center justify-center text-white rounded-full">
        New
      </button>
    </RouterLink>
  </header>

  <section class="max-w-52 flex-1" v-if="!invoices.length">
    <EmptyPackageSVG />

    <div class="flex flex-col items-center justify-center gap-6">
      <h2>There is Nothing here</h2>
      <p class="text-center text-baseV text-gray-tertiary">
        Create an invoice by clicking the New button and get started
      </p>
    </div>
  </section>

  <slot :invoices="invoices" v-else />
</template>

<script>
// utils
import { ofetch } from "ofetch";

// components
import { RouterLink } from "vue-router";
import EmptyPackageSVG from "@/components/Svg/EmptyPackage";

export default {
  components: {
    EmptyPackageSVG,
    RouterLink,
  },
  data() {
    return {
      invoices: [],
    };
  },
  created() {
    this.fetchInvoices();
  },
  methods: {
    async fetchInvoices() {
      const data = await ofetch("http://localhost:3000/api/invoices");
      this.invoices = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
