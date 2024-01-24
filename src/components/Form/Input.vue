<template>
  <label :for="id" :class="$attrs.lc" class="text-baseV text-gray-secondary">
    {{ $attrs.label }}
    <input
      ref="inputRef"
      :type="type"
      :id="id"
      :name="$attrs.name ?? id"
      :class="`${defaultInputClasses} ${$attrs.ic ?? ''}`"
      v-bind="$attrs"
      @click="onClickEvents"
      @change="dispatchEmitters($event)" />
  </label>
</template>

<script>
export default {
  name: "formInput",

  emits: [
    // order emits
    "update:price",
    "update:quantity",
    "update:item",

    // invoice emits
    "update:selected-date",

    // address emits
    "update:street",
    "update:city",
    "update:post-code",
    "update:country",

    // client emits
    "update:client-name",
    "update:client-email",
  ],

  inheritAttrs: false,

  inject: ["formData", "updateFormData", "defaultInputClasses"],

  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["text", "number", "email", "date"].includes(value);
      },
    },
    id: {
      type: String,
      required: true,
    },
  },

  methods: {
    dispatchEmitters(e) {
      const eventTypeMap = {
        price: "update:price",
        quantity: "update:quantity",
        item: "update:item",
        street: "update:street",
        city: "update:city",
        country: "update:country",
        postCode: "update:post-code",
        clientName: "update:client-name",
        clientEmail: "update:client-email",
        selectedDate: "update:selected-date",
        description: "update:description",
      };

      switch (true) {
        case this.id === "invoice__date":
          {
            this.$emit(eventTypeMap["selectedDate"], e.target.value);
            this.updateFormData("invoiceDate", e.target.value);
          }
          break;

        case this.id === "invoice__description":
          {
            this.$emit(eventTypeMap["description"], e.target.value);
            this.updateFormData("invoiceDescription", e.target.value);
          }
          break;

        case this.id === "order__name":
          {
            this.$emit(eventTypeMap["item"], e.target.value);
            this.updateFormData("orderItem", e.target.value);
          }
          break;

        case this.id === "order__price":
          {
            this.$emit(eventTypeMap["price"], e.target.value);
            this.updateFormData("orderPrice", e.target.value);
          }
          break;

        case this.id === "order__quantity":
          {
            this.$emit(eventTypeMap["quantity"], e.target.value);
            this.updateFormData("orderQuantity", e.target.value);
          }
          break;

        case this.id === "client__name":
          {
            this.$emit(eventTypeMap["clientName"], e.target.value);
            this.updateFormData("clientName", e.target.value);
          }
          break;

        case this.id === "client__email":
          {
            this.$emit(eventTypeMap["clientEmail"], e.target.value);
            this.updateFormData("clientEmail", e.target.value);
          }
          break;

        case this.id === "sender__street" || this.id === "client__street":
          {
            this.$emit(eventTypeMap["street"], e.target.value);

            if (this.id === "sender__street")
              this.updateFormData("senderStreet", e.target.value);

            if (this.id === "client__street")
              this.updateFormData("clientStreet", e.target.value);
          }
          break;

        case this.id === "sender__city" || this.id === "client__city":
          {
            this.$emit(eventTypeMap["city"], e.target.value);

            if (this.id === "sender__city")
              this.updateFormData("senderCity", e.target.value);

            if (this.id === "client__city")
              this.updateFormData("clientCity", e.target.value);
          }
          break;

        case this.id === "sender__country" || this.id === "client__country":
          {
            this.$emit(eventTypeMap["country"], e.target.value);

            if (this.id === "sender__country")
              this.updateFormData("senderCountry", e.target.value);

            if (this.id === "client__country")
              this.updateFormData("clientCountry", e.target.value);
          }
          break;

        case this.id === "sender__postCode" || this.id === "client__postCode":
          {
            this.$emit(eventTypeMap["postCode"], e.target.value);

            if (this.id === "sender__postCode")
              this.updateFormData("senderPostCode", e.target.value);

            if (this.id === "client__postCode")
              this.updateFormData("clientPostCode", e.target.value);
          }
          break;

        default:
          console.error(`Invalid event type`);
          break;
      }
    },

    onClickEvents() {
      if (this.type === "date") {
        this.$refs.inputRef.showPicker();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
