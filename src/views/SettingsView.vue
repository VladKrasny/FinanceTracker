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

<script setup>
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { useSettingsStore } from "@/stores/settingsStore";
import { storeToRefs } from "pinia";

const SettingsStore = useSettingsStore();

const { incomeCategories, expenseCategories } = storeToRefs(SettingsStore);
const { addNewCategory, deleteCategory, transactionTypeOptions } =
  SettingsStore;
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
