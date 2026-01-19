<template>
  <div class="settings-view">
    <div>
      <TheTypography variant="title">Settings</TheTypography>
      <TheTypography variant="subtitle">
        Manage your transaction categories
      </TheTypography>
    </div>
    <NewCategoryForm
      @submit="addNewCategory"
      :transactionTypeOptions="transactionTypeOptions"
    />
    <CategoryList
      title="Income Categories"
      subtitle="Manage income categories for your transactions"
      :categoryOptions="incomeCategories"
      @delete="deleteCategory"
    />
    <CategoryList
      title="Expense Categories"
      subtitle="Manage expense categories for your transactions"
      :categoryOptions="expenseCategories"
      @delete="deleteCategory"
    />
  </div>
</template>

<script>
import { inject } from "vue";
import TheTypography from "../TheTypography.vue";
import NewCategoryForm from "../newCategory/NewCategoryForm.vue";
import CategoryList from "../newCategory/CategoryList.vue";

export default {
  name: "SettingsView",
  components: { TheTypography, NewCategoryForm, CategoryList },
  setup() {
    const addNewCategory = inject("addNewCategory");
    const transactionTypeOptions = inject("transactionTypeOptions");
    const incomeCategories = inject("incomeCategories");
    const expenseCategories = inject("expenseCategories");
    const deleteCategory = inject("deleteCategory");
    return {
      addNewCategory,
      transactionTypeOptions,
      incomeCategories,
      expenseCategories,
      deleteCategory,
    };
  },
};
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1420px;
  min-width: 820px;
}
</style>
