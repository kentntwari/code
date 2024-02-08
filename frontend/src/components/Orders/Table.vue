<template>
  <table class="flex flex-col gap-6 text-SV">
    <thead class="px-6 pt-6 hidden md:block md:text-base md:text-gray-secondary">
      <slot name="header">
        <tr class="md:grid md:grid-cols-6">
          <th class="md:col-start-1 md:col-span-3 md:text-left">Item Name</th>
          <th>QTY.</th>
          <th class="md:text-right">Price</th>
          <th class="text-right">Total</th>
        </tr>
      </slot>
    </thead>
    <tbody
      class="px-6 pt-6 md:pt-0 md:min-h-36 flex flex-col gap-6"
      :class="[!orders.length ? 'justify-center' : '']">
      <slot name="body" :orders="orders">
        <tr v-if="!orders.length" class="flex items-center justify-center italic">
          No data available
        </tr>

        <tr v-for="order in orders" class="grid grid-cols-2 md:grid-cols-6 items-center">
          <td
            class="col-start-1 md:col-start-1 md:col-span-3 md:row-start-1 dark:text-white">
            {{ order.item }}
          </td>
          <td class="mt-2 md:mt-0 col-start-1 md:col-start-4 row-start-2 md:row-start-1">
            <span class="block md:hidden text-gray-secondary dark:text-slate-secondary"
              >{{ order.quantity }} x {{ order.price }}</span
            >
            <span
              class="hidden md:block md:text-center text-gray-secondary dark:text-slate-secondary"
              >{{ order.quantity }}</span
            >
          </td>
          <td class="hidden md:block md:text-right text-gray-secondary dark:text-white">
            £ {{ order.price }}
          </td>
          <td
            class="row-start-1 row-end-3 flex justify-end items-center text-gray-secondary dark:text-white">
            £ {{ order.total }}
          </td>
        </tr>
      </slot>
    </tbody>
    <tfoot
      v-if="grandTotal"
      class="px-6 pb-6 relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-primary/90 dark:after:bg-black-site after:rounded-b-lg">
      <tr class="relative z-10 h-20 flex items-center justify-between text-white">
        <td class="text-baseV dark:text-slate-secondary">
          <span>Amount Due</span>
        </td>
        <td class="text-M">£ {{ grandTotal }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: "OrdersTable",
  props: {
    orders: {
      type: Array,
      required: true,
    },
    grandTotal: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped></style>
