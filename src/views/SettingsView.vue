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
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";

export default {
  name: "SettingsView",
  components: { TheTypography, NewCategoryForm, CategoryList },
  setup() {
    const appStore = useAppStore();

    const { incomeCategories, expenseCategories } = storeToRefs(appStore);

    const { addNewCategory, deleteCategory, transactionTypeOptions } = appStore;

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
  max-width: 1620px;
  min-width: 820px;
}
</style>
