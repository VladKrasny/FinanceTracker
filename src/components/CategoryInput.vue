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
    categotryError(value) {
      this.$emit("error", value);
    },

    model(value) {
      const val = value.trim();

      if (val === "") {
        this.categoryError = "Category cannot be empty";
        return;
      }

      if (val.length < 3) {
        this.categoryError = "Category must be at least 3 characters long";
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
