<template>
  <p class="text-base text-gray-secondary dark:text-slate-secondary">
    {{ address.street }}<br />
    {{ address.city }} <br />
    {{ address.postCode }} <br />
    {{ address.country }} <br />
  </p>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    if (!this.address.street)
      console.warn(`street is missing in address:${JSON.stringify(this.address)}`);
    if (!this.address.city)
      console.warn(`city is missing in address:${JSON.stringify(this.address)}`);
    if (!this.address.postCode)
      console.warn(`postCode is missing in address:${JSON.stringify(this.address)}`);
    if (!this.address.country)
      console.warn(`country is missing in address:${JSON.stringify(this.address)}`);
  },
};
</script>

<style lang="scss" scoped></style>
