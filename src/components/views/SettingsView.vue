<script>
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { inject } from "vue";

export default {
  name: "SettingsView",

  components: {
    TheTypography,
    NewCategoryForm,
    CategoryList,
  },

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
<template>
  <div class="settings">
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

    <div class="settings__category-section">
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
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.settings__category-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1420px;
  min-width: 820px;
}
</style>
