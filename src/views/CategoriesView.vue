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

<script>
import TheTypography from "@/components/TheTypography.vue";
import NewCategoryForm from "@/components/newCategory/NewCategoryForm.vue";
import CategoryList from "@/components/newCategory/CategoryList.vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { generateId } from "@/utils/generateId";

export default {
  name: "CategoriesView",
  components: { TheTypography, NewCategoryForm, CategoryList },
  setup() {
    const appStore = useAppStore();
    const { categoryOptions, transactions } = storeToRefs(appStore);
    const { transactionTypeOptions } = appStore;

    const incomeCategories = computed(() =>
      categoryOptions.value.filter((c) => c.type === "income"),
    );

    const expenseCategories = computed(() =>
      categoryOptions.value.filter((c) => c.type === "expense"),
    );

    function addNewCategory({ category, transactionType }) {
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
    }

    function deleteCategory({ value, label }) {
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
    }

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
.categories-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1620px;
  min-width: 820px;
}
</style>
