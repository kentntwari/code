<template>
  <table class="flex flex-col gap-6 text-SV">
    <thead class="px-6 pt-6 hidden lg:block">
      <slot name="header">
        <tr class="flex items-center justify-between">
          <th>Item Name</th>
          <th>QTY.</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </slot>
    </thead>
    <tbody class="px-6 pt-6 flex flex-col gap-6">
      <slot name="body" :orders="orders">
        <tr v-if="!orders.length" class="flex items-center justify-center italic">
          No data available
        </tr>

        <tr v-for="order in orders" class="flex items-center justify-between">
          <td>
            <div class="flex flex-col gap-2">
              <span>{{ order.item }}</span>
              <span class="text-gray-secondary"
                >{{ order.quantity }} x {{ order.price }}</span
              >
            </div>
          </td>
          <td>£ {{ order.total }}</td>
        </tr>
      </slot>
    </tbody>
    <tfoot
      v-if="grandTotal"
      class="px-6 pb-6 relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-slate-primary after:rounded-b-lg">
      <tr class="relative z-10 h-20 flex items-center justify-between text-white">
        <td class="text-baseV">Grand Total</td>
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
