<template>
  <div>
    <slot name="label">
      <label :for="labelFor ?? name" class="text-baseV text-gray-secondary">{{
        label
      }}</label>
    </slot>
    <input
      :name="name"
      :type="type"
      class="mt-1 px-5 block w-full h-12 rounded border border-slate-secondary" />
  </div>
</template>

<script>
export default {
  name: "formInput",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["text", "number", "email"].includes(value);
      },
    },
    labelFor: {
      type: String,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
