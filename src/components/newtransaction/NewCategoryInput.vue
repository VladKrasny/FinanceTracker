<template>
  <TheInput
    type="text"
    v-model="model"
    :hasError="Boolean(newCategoryError)"
    :error-message="newCategoryError"
    placeholder="Category Name"
  />
</template>
<script>
import TheInput from "../TheInput.vue";

export default {
  name: "NewCategoryInput",
  props: {
    modelValue: { type: String, default: "" },
  },
  components: {
    TheInput,
  },
  data() {
    return {
      newCategoryError: "",
    };
  },
  emits: ["update:modelValue", "error"],
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
    newCategoryError(value) {
      return this.$emit("error", value);
    },
    model(value) {
      const val = value.trim();

      if (val.length === 0) {
        this.newCategoryError = "Category cannot be empty";
        return;
      }
      this.newCategoryError = "";
    },
  },
};
</script>

<style scoped></style>
