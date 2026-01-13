<script>
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";

export default {
  name: "SettingsView",
  components: { TheTypography, NewCategoryForm, CategoryList },

  inject: [
    "transactionTypeOptions",
    "getIncomeCategories",
    "getExpenseCategories",
    "addNewCategory",
    "deleteCategory",
  ],
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
