<template>
  <VForm @submit="confirmPaid" v-slot="{ isSubmitting }">
    <button
      type="submit"
      class="w-[150px] h-12 flex items-center justify-center font-bold text-SV text-white rounded-full"
      :class="
        status === 'paid'
          ? 'bg-violet-secondary opacity-60 line-through'
          : 'bg-violet-primary'
      ">
      <div class="white-loader" v-if="isSubmitting"></div>
      <span v-else> Mark as Paid </span>
    </button>
  </VForm>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  methods: {
    async confirmPaid() {
      return await this.$fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/api/invoices/${this.id}`,
        {
          method: "PATCH",
          headers: {
            "X-patch-request-action": "mark-as-paid",
          },
          onResponse: async ({ response }) => {
            if (response.ok) {
              this.$router.go();
            }
          },
        }
      );
    },
  },
};
</script>
