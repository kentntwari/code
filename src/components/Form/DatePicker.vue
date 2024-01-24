<template>
  <FormInput
    type="date"
    label="Invoice Date"
    v-model:selected-date="selectedDate"
    id="invoice__date"
    :lc="`${disableInput ? 'opacity-40' : 'opacity-100'}`"
    :ic="`${defaultInputClasses} ${customDateInputClass}`"
    :value="universalizeDate(selectedDate)"
    :min="minimumDate"
    :data-date="selectedDate"
    :disabled="disableInput" />
</template>

<script>
import { formatDate } from "@/helpers/formatDate.js";

import Input from "./Input.vue";

export default {
  name: "formDatePicker",

  inject: [
    "defaultInputClasses",
    "inputDate__beforePseudoElementClasses",
    "inputDate__afterPseudoElementClasses",
  ],

  props: {
    newDate: {
      type: String,
    },
  },

  components: {
    FormInput: Input,
  },

  data() {
    return {
      selectedDate: this.newDate ? this.simplifyDate(this.newDate) : null,
    };
  },

  watch: {
    newDate(value) {
      this.selectedDate = this.simplifyDate(value);
    },
    selectedDate(value) {
      this.selectedDate = this.simplifyDate(value);
    },
  },

  computed: {
    customDateInputClass() {
      return `${this.inputDate__beforePseudoElementClasses}
      ${this.inputDate__afterPseudoElementClasses}`;
    },
    minimumDate() {
      const today = new Date();
      return this.universalizeDate(today);
    },
    disableInput() {
      if (this.$route.name === "edit") {
        return true;
      }

      return false;
    },
  },

  methods: {
    universalizeDate(date) {
      const day = formatDate(date, "universal").day;
      const month = formatDate(date, "universal").month;
      const year = formatDate(date, "universal").year;

      return `${year}-${month}-${day}`;
    },
    simplifyDate(date) {
      const day = formatDate(date, "simplified").day;
      const month = formatDate(date, "simplified").month;
      const year = formatDate(date, "simplified").year;

      return `${day} ${month} ${year}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
