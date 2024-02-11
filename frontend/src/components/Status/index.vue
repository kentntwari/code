<template>
  <div
    class="w-[104px] h-10 flex items-center justify-center gap-2 capitalize rounded-lg"
    :class="wrapperClass">
    <div class="w-2 h-2 rounded-full" :class="dotClass"></div>
    {{ status }}
  </div>
</template>

<script>
export default {
  name: "Status",
  computed: {
    wrapperClass() {
      switch (this.status.toLowerCase()) {
        case "pending":
          return "bg-status-pending/10 text-status-pending";

        case "paid":
          return "bg-status-paid/10 text-status-paid";

        default:
          return "bg-status-draft/10 dark:bg-status-draft/70 text-status-draft dark:text-slate-secondary";
      }
    },
    dotClass() {
      switch (this.status.toLowerCase()) {
        case "pending":
          return "bg-status-pending";

        case "paid":
          return "bg-status-paid";

        default:
          return "bg-status-draft dark:bg-slate-secondary";
      }
    },
  },
  props: {
    status: {
      type: String,
      default: "draft",
      validator: (value) => {
        return ["draft", "pending", "paid"].includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
