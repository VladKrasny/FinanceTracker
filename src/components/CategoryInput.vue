<template>
  <TheInput
    fieldName="Category"
    type="text"
    v-model="category"
    @update:modelValue="checkInput"
    :hasError="Boolean(categoryError)"
    placeholder="Enter category"
  />
  <p v-if="categoryError" class="error-message">{{ categoryError }}</p>
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
  methods: {
    checkInput() {
      const value = this.category.trim();

      if (value === "") {
        this.categoryError = "Category cannot be empty";
        return;
      }

      if (value.length < 3) {
        this.categoryError = "Category must be at least 3 characters long";
        return;
      }

      // Проверка на буквы + пробелы
      if (!/^[A-Za-z\s]+$/.test(value)) {
        this.categoryError = "Category must contain only letters and spaces";
        return;
      }

      this.categoryError = "";
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
