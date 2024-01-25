<template>
  <label :for="id" class="text-baseV text-gray-secondary">
    {{ label }}
    <select
      :id="id"
      :name="name"
      class="app-select default-input"
      @input="$emit('update:payment-terms', parseInt($event.target.value))">
      <option disabled>Please choose a payment term</option>
      <option v-for="paymentTerm in availableTerms" :value="paymentTerm.value">
        {{ paymentTerm.verbose }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "FormPaymentTerms",

  emits: ["update:defaultPaymentTerms"],

  props: {
    label: {
      type: String,
    },
    id: {
      type: String,
      default: "invoice__payment-terms",
    },
    name: {
      type: String,
      default: "invoice__payment-terms",
    },
    availableTerms: {
      type: Array,
      default: [
        { verbose: "Net 1 day", value: 1 },
        { verbose: "Net 7 days", value: 7 },
        { verbose: "Net 14 days", value: 14 },
        { verbose: "Net 30 days", value: 30 },
      ],
    },
  },
};
</script>

<style lang="scss" scoped></style>
