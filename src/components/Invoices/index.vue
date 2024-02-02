<template>
  <header class="w-full flex items-center justify-between">
    <div class="text-base text-gray-secondary">
      <h1 class="font-bold text-M">Invoices</h1>
      <small>{{ invoices.length > 0 ? invoices.length : "No" }} invoices</small>
    </div>

    <div class="flex items-center gap-5">
      <FilterInvoices />
      <RouterLink to="/new">
        <button
          type="button"
          title="add new invoice"
          class="bg-violet-primary hover:bg-violet-secondary h-11 min-w-12 px-2 flex items-center justify-center gap-2 text-white rounded-full">
          <div class="w-8 h-8 flex items-center justify-center bg-white rounded-full">
            <PlusSVG />
          </div>
          <span class="text-SV">New <ins class="hidden no-underline">Invoice</ins></span>
        </button>
      </RouterLink>
    </div>
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
// components
import { RouterLink } from "vue-router";
import FilterInvoices from "./FilterInvoices";
import EmptyPackageSVG from "@/components/Svg/EmptyPackage";
import PlusSVG from "@/components/Svg/Plus";

export default {
  components: {
    PlusSVG,
    FilterInvoices,
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
      const data = await this.$fetch("/api/invoices");
      this.invoices = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
