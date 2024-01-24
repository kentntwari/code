<template>
  <FormInput
    v-model:street="address.street"
    :id="streetName"
    :value="address.street"
    label="Street Address"
    type="text"
    :name="streetName" />

  <div class="grid grid-cols-2 gap-6">
    <FormInput
      v-model:city="address.city"
      :id="cityName"
      :value="address.city"
      label="City"
      type="text"
      :name="cityName" />
    <FormInput
      v-model:post-code="address.postCode"
      :id="postCodeName"
      :value="address.postCode"
      label="Post Code"
      type="text"
      :name="postCodeName" />
  </div>

  <FormInput
    v-model:country="address.country"
    :id="countryName"
    :value="address.country"
    label="Country"
    type="text"
    :name="countryName" />
</template>

<script>
import Input from "@/components/Form/Input";

export default {
  name: "formAddress",

  components: {
    FormInput: Input,
  },
  props: {
    for: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    streetName() {
      return `${this.for.toLowerCase()}__street`;
    },
    cityName() {
      return `${this.for.toLowerCase()}__city`;
    },
    postCodeName() {
      return `${this.for.toLowerCase()}__postCode`;
    },
    countryName() {
      return `${this.for.toLowerCase()}__country`;
    },
  },
  mounted() {
    if (!this.for) throw new Error('You must provide "for" prop to formInput');
  },
};
</script>

<style lang="scss" scoped></style>
