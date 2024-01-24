<template>
  <label :for="id" class="text-baseV text-gray-secondary">
    {{ label }}
    <select
      :id="id"
      :name="name"
      :value="defaultPaymentTerms"
      :class="defaultInputClasses"
      @input="$emit('update:defaultPaymentTerms', parseInt($event.target.value))">
      <option disabled>Please choose a payment term</option>
      <option v-for="option in paymentTermsOptions" :value="option.value">
        {{ option.term }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: "FormSelect",

  emits: ["update:defaultPaymentTerms"],

  inject: ["defaultInputClasses"],

  props: {
    defaultPaymentTerms: {
      type: Number,
      default: 1,
    },
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
  },

  data() {
    return {
      paymentTermsOptions: [
        { term: "Net 1 day", value: 1 },
        { term: "Net 7 days", value: 7 },
        { term: "Net 14 days", value: 14 },
        { term: "Net 30 days", value: 30 },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
