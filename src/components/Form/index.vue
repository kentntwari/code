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

const defaultInputClasses = `relative mt-2 px-5 block w-full h-12 font-bold text-black-site
  rounded border border-slate-secondary`;

const inputDate__beforePseudoElementClasses = `before:absolute before:top-0
        before:left-0 before:[content:attr(data-date)] before:px-5 before:w-full
        before:h-full before:flex before:items-center before:bg-white
        before:pointer-events-none`;
const inputDate__afterPseudoElementClasses = `after:absolute after:top-0
        after:right-0 after:[content:var(--calendar-uri)] after:z-50
        after:px-5 after:w-full after:h-full after:flex after:items-center
        after:justify-end after:pointer-events-none`;

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
      defaultInputClasses,
      inputDate__beforePseudoElementClasses,
      inputDate__afterPseudoElementClasses,
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
