<template>
  <TheInput
    fieldName="Category"
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
      category: "",
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
    model(value) {
      const val = value.trim();

      if (val === "") {
        this.categoryError = "Category cannot be empty";
        this.$emit("error", this.categoryError);
        return;
      }

      if (val.length < 3) {
        this.categoryError = "Category must be at least 3 characters long";
        this.$emit("error", this.categoryError);
        return;
      }

      if (!/^[A-Za-z\s]+$/.test(val)) {
        this.categoryError = "Category must contain only letters and spaces";
        this.$emit("error", this.categoryError);

        return;
      }

      this.categoryError = "";
      this.$emit("error", "");
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 18px;
}
</style>
