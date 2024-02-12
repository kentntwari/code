<template>
  <header class="w-full flex items-center justify-between">
    <div class="text-base text-gray-secondary dark:text-slate-secondary">
      <h1 class="font-bold text-M md:text-L text-black-site dark:text-white">Invoices</h1>
      <small class="block mt-1 md:mt-2 text-baseV" v-if="invoices.length > 0"
        ><ins class="hidden md:inline-block no-underline">There are</ins>
        {{ invoices.length > 0 ? invoices.length : "No" }}
        <ins class="hidden md:inline-block no-underline">total</ins> invoices</small
      >
      <small class="block mt-1 md:mt-2 text-baseV" v-else>No invoices</small>
    </div>

    <div class="flex items-center gap-5">
      <FilterInvoices />
      <RouterLink to="/new">
        <button
          type="button"
          title="Add new invoice"
          class="bg-violet-primary hover:bg-violet-secondary h-11 md:h-12 min-w-12 px-2 flex items-center justify-center gap-2 text-white rounded-full">
          <div class="w-8 h-8 flex items-center justify-center bg-white rounded-full">
            <PlusSVG />
          </div>
          <span class="text-SV"
            >New <ins class="hidden md:inline-block no-underline">Invoice</ins></span
          >
        </button>
      </RouterLink>
    </div>
  </header>

  <section
    class="absolute md:max-w-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center md:gap-8"
    v-if="!invoices.length">
    <EmptyPackageSVG />

    <div class="flex flex-col items-center justify-center gap-6">
      <h2 class="md:text-M dark:text-white">There is Nothing here</h2>
      <p class="text-center text-baseV text-gray-tertiary dark:text-slate-secondary">
        Create an invoice by clicking the <br /><button
          type="button"
          class="font-bold"
          title="Add new invoice"
          @click="$router.push('/new')">
          New button
        </button>
        and get started
      </p>
    </div>
  </section>

  <slot :invoices="invoices" v-else />
</template>

<script>
import queryString from "query-string";
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
      fetchAbortController: null,
      invoiceCache: {},
    };
  },
  created() {
    this.fetchInvoices();
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler() {
        this.fetchInvoices();
      },
    },
  },
  methods: {
    async fetchInvoices() {
      let mounted = true;
      const cacheKey = JSON.stringify(this.$route.query);

      if (this.invoiceCache[cacheKey]) {
        // return cached data if exists
        this.invoices = this.invoiceCache[cacheKey];
        return;
      }

      if (mounted) {
        const params = queryString.parse(window.location.search, {
          arrayFormat: "bracket",
        });
        const data = await this.$fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/api/invoices`,
          {
            method: "GET",
            params,
          }
        );
        this.invoices = data;
        // store response in cache
        this.invoiceCache[cacheKey] = data;
      }
      return () => {
        mounted = false;
      };
    },
  },
};
</script>
