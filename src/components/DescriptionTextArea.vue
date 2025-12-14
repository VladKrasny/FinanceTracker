<template>
  <TheTextArea
    v-model="model"
    placeholder="Add notes..."
    :hasError="Boolean(textAreaError)"
    :errorMessage="textAreaError"
    fieldName="Add notes"
  />
</template>

<script>
import TheTextArea from "./TheTextArea.vue";

export default {
  name: "DescriptionTextArea",
  components: { TheTextArea },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "error"],

  data() {
    return {
      textAreaError: "",
    };
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  watch: {
    textAreaError(value) {
      this.$emit("error", value);
    },
  },
};
</script>
