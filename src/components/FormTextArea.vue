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
  name: "FormTextArea",
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
    model(value) {
      const val = value.trim();
      if (val.length > 200) {
        this.textAreaError = "Description cannot exceed 200 characters.";
        this.$emit("error", this.textAreaError);
        return;
      }

      this.textAreaError = "";
      this.$emit("error", "");
    },
  },
};
</script>

<style scoped></style>
