<template>
  <button
    type="button"
    class="w-[150px] h-12 flex items-center justify-center font-bold text-baseV text-white rounded-full"
    :disabled="isConfirmingPaid"
    :class="
      isConfirmedPaid
        ? 'bg-violet-secondary opacity-60 line-through'
        : 'bg-violet-primary'
    "
    @click="!isConfirmedPaid ? confirmPaid() : null">
    <div class="loader" v-if="isConfirmingPaid"></div>
    <span v-else> Mark as Paid </span>
  </button>
</template>

<script>
export default {
  inject: ["isConfirmedPaid", "isConfirmingPaid", "confirmPaid"],
};
</script>

<style lang="scss" scoped></style>
