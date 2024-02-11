<template>
  <label
    :for="id"
    class="h-[90px] text-baseV text-gray-secondary dark:text-slate-secondary/80">
    <div class="flex items-center justify-between">
      <span
        class="text-sm"
        :class="meta.dirty ? (!meta.valid ? 'text-red-primary' : 'text-green-400') : ''">
        <slot name="label">
          {{ label }}
        </slot>
      </span>
      <small
        class="block text-baseV text-red-primary"
        v-show="!!errorMessage || (meta.dirty && !meta.valid)"
        >{{ errorMessage }}</small
      >
    </div>
    <slot :inputValue="inputValue.value" :meta="meta">
      <input
        :id="id"
        :name="name"
        :type="type"
        :value="inputValue"
        :inputMode="inputMode"
        :pattern="pattern"
        class="default-input"
        :class="[
          meta.touched
            ? !meta.valid
              ? 'outline outline-1 outline-red-primary'
              : 'outline outline-1 outline-green-400'
            : '',
          ic,
        ]"
        @change="handleChange"
        @blur="handleBlur" />
    </slot>
  </label>
</template>

<script>
import { toRef, watch } from "vue";
import { useField } from "vee-validate";

export default {
  name: "VCustomInput",

  props: {
    id: {
      type: String,
      required: true,
    },
    ic: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
      default: undefined,
    },
    inputMode: {
      type: String,
    },
    pattern: {
      type: String,
    },
  },

  setup(props) {
    const name = toRef(props, "name");

    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    watch(
      () => meta.touched,
      async (touched) => {
        if (touched && inputValue.value === "") {
          handleChange();
        }
      }
    );

    return {
      name,
      inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    };
  },
};
</script>
