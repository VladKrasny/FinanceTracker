<script>
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { inject } from "vue";

export default {
  name: "SettingsView",
  components: { TheTypography, NewCategoryForm, CategoryList },

  setup() {
    const transactionTypeOptions = inject("transactionTypeOptions");
    const getIncomeCategories = inject("getIncomeCategories");
    const getExpenseCategories = inject("getExpenseCategories");
    const addNewCategory = inject("addNewCategory");
    const deleteCategory = inject("deleteCategory");

    return {
      transactionTypeOptions,
      getIncomeCategories,
      getExpenseCategories,
      addNewCategory,
      deleteCategory,
    };
  },
};
</script>

<template>
  <div class="settings">
    <div>
      <TheTypography variant="title">Settings</TheTypography>
      <TheTypography variant="subtitle">
        Manage your transaction categories
      </TheTypography>
    </div>

    <NewCategoryForm
      :transactionTypeOptions="transactionTypeOptions"
      @submit="addNewCategory"
    />

    <div class="settings__category-section">
      <CategoryList
        title="Income Categories"
        subtitle="Manage income categories for your transactions"
        :categoryOptions="getIncomeCategories()"
        @delete="deleteCategory"
      />
    </div>

    <div class="settings__category-section">
      <CategoryList
        title="Expense Categories"
        subtitle="Manage expense categories for your transactions"
        :categoryOptions="getExpenseCategories()"
        @delete="deleteCategory"
      />
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.settings__category-section {
  max-width: 1420px;
  min-width: 820px;
}
</style>
