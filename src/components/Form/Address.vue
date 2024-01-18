<template>
  <FormInput label="Street Address" type="text" :name="streetAdressName" class="mt-6" />

  <div class="grid grid-cols-2 gap-6">
    <FormInput label="City" type="text" :name="cityName" />
    <FormInput label="Post Code" type="text" :name="postCodeName" />
  </div>

  <FormInput label="Country" type="text" :name="countryName" />
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
  },
  computed: {
    streetAdressName() {
      return `${this.for.toLowerCase()} street address`;
    },
    cityName() {
      return `${this.for.toLowerCase()} city`;
    },
    postCodeName() {
      return `${this.for.toLowerCase()}post code`;
    },
    countryName() {
      return `${this.for.toLowerCase()} country`;
    },
  },
  mounted() {
    if (!this.for) throw new Error('You must provide "for" prop to formInput');
  },
};
</script>

<style lang="scss" scoped></style>
