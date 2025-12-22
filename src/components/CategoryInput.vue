<template>
  <TheInput
    label="Category"
    type="text"
    v-model="model"
    :hasError="Boolean(categoryError)"
    placeholder="Enter category"
    :errorMessage="categoryError"
  />
</template>

<script>
import TheInput from "./TheInput.vue";

export default {
  name: "CategoryInput",
  components: { TheInput },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["modelValue", "error"],

  data() {
    return {
      categoryError: "",
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
    categoryError(value) {
      this.$emit("error", value);
    },

    model(value) {
      const val = value.trim();

      if (value === "") {
        this.categoryError = "";
        return;
      }

      if (!/^[A-Za-z\s]+$/.test(val)) {
        this.categoryError = "Category must contain only letters and spaces";
        return;
      }

      this.categoryError = "";
    },
  },
};
</script>
