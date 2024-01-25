<template>
  <form ref="formRef" class="mt-6 grid grid-cols-1 gap-6" @submit.prevent>
    <slot></slot>
    <div
      class="fixed bottom-0 left-0 z-100 px-6 py-5 w-full bg-white flex justify-end items-center gap-2 shadow-[-6px_-2px_40px_rgba(0,0,0,.16)]">
      <button
        id="button"
        class="min-w-20 p-2 h-12 bg-[#f9faf9] text-SV text-gray-secondary rounded-full">
        {{ $route.name === "edit" ? "Discard" : "Cancel" }}
      </button>
      <button
        v-if="$route.name === 'edit'"
        id="submit"
        class="min-w-20 p-2 h-12 bg-slate-primary text-SV text-gray-secondary rounded-full">
        Save as Draft
      </button>
      <button
        ref="submitterRef"
        id="submit"
        class="min-w-20 p-2 h-12 bg-violet-primary text-SV text-white rounded-full"
        @click="test">
        {{ $route.name === "edit" ? "Save & Send" : "Save Changes" }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FormWrapper",

  setup() {
    const formRef = ref();
    const submitterRef = ref();

    return { formRef, submitterRef };
  },

  data() {
    return {
      formData: null,
    };
  },

  mounted() {
    this.formData = new FormData();
  },

  provide() {
    return {
      formData: this.formData,
      updateFormData: (key, value) => this.formData.append(key, value),
    };
  },

  methods: {
    test() {
      for (const value of this.formData.values()) {
        console.log(value);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
