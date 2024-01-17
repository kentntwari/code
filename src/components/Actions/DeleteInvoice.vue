<template>
  <AlertDialogRoot>
    <AlertDialogTrigger>
      <button
        type="button"
        class="w-[93px] h-12 bg-red-primary flex items-center justify-center font-bold text-baseV text-white rounded-full">
        Delete
      </button>
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogContent> sxsxs </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script>
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
} from "radix-vue";

export default {
  inject: ["isDelete"],
  components: {
    AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
  },
};
</script>

<style lang="scss" scoped></style>
