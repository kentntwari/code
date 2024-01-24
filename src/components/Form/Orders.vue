<template>
  <div class="mt-6 flex flex-col gap-12">
    <div v-for="order in orders" class="grid grid-cols-8 items-end gap-4">
      <FormInput
        v-model:item="order.item"
        :value="order.item"
        lc="col-span-8"
        type="text"
        id="order__name"
        label="Item Name" />

      <FormInput
        v-model:quantity="order.quantity"
        :value="order.quantity"
        lc="col-span-2"
        type="number"
        id="order__quantity"
        label="Qty."
        min="1"
        max="10" />

      <FormInput
        v-model:price="order.price"
        :value="order.price"
        lc="col-span-3"
        type="text"
        id="order__price"
        label="Price" />

      <FormInput
        :value="order.quantity * order.price"
        lc="col-span-2 border-none"
        ic="border-none text-gray-secondary"
        type="number"
        id="order__total"
        label="Total"
        style="padding: 0"
        disabled />

      <button type="button" class="col-span-1 h-12" @click="$emit('delete-order', order)">
        <DeleteSVG width="12" height="16" />
      </button>
    </div>
    <button
      type="button"
      class="bg-[#f9fafe] w-full h-12 font-bold text-gray-secondary flex items-center justify-center rounded-full"
      @click="$emit('add-order', { item: '', quantity: 1, price: 0 })">
      + Add New Item
    </button>
  </div>
</template>

<script>
import Input from "./Input.vue";
import Delete from "../Svg/Delete.vue";

export default {
  name: "FormOrders",

  components: {
    FormInput: Input,
    DeleteSVG: Delete,
  },

  props: {
    orders: {
      type: Array,
      required: true,
      default: [],
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped></style>
