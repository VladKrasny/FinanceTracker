<template>
  <div class="categories-view">
    <div>
      <TheTypography variant="title">Categories</TheTypography>
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

<script setup lang="ts">
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { generateId } from "@/utils/generateId";
import type { TransactionType, CategoryOption } from "../types/types";

type AddNewCategoryType = {
  category: string;
  transactionType: TransactionType;
};

type DeleteCategoryType = Pick<CategoryOption, "value" | "label">;

const appStore = useAppStore();
const { categoryOptions, transactions } = storeToRefs(appStore);
const { transactionTypeOptions } = appStore;

const incomeCategories = computed<CategoryOption[]>(() =>
  categoryOptions.value.filter((c) => c.type === "income"),
);

const expenseCategories = computed<CategoryOption[]>(() =>
  categoryOptions.value.filter((c) => c.type === "expense"),
);

const addNewCategory = ({ category, transactionType }: AddNewCategoryType) => {
  const exists = categoryOptions.value.some(
    (c) =>
      c.type === transactionType &&
      c.label.toLowerCase() === category.toLowerCase(),
  );
  if (exists) return;
  categoryOptions.value.push({
    value: generateId(category),
    label: category,
    type: transactionType,
  });
};

const deleteCategory = ({ value, label }: DeleteCategoryType) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category? You won’t be able to undo this action later.",
  );
  if (!confirmDelete) return;
  categoryOptions.value = categoryOptions.value.filter(
    (c) => c.value !== value,
  );
  transactions.value.forEach((t) => {
    if (t.category === label) t.category = "";
  });
};
</script>

<style scoped>
.categories-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1620px;
  min-width: 340px;
}
@media (max-width: 450px) {
  .categories-view {
    padding: 0 5px 0 5px;
  }
}
</style>
