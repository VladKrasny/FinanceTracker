import { defineStore } from "pinia";
import { useAppStore } from "./appStore";
import { generateId } from "@/utils/generateId";

export const useSettingsStore = defineStore("settingsStore", {
  getters: {
    categoryOptions() {
      return useAppStore().categoryOptions;
    },
    transactions() {
      return useAppStore().transactions;
    },
    transactionTypeOptions() {
      return useAppStore().transactionTypeOptions;
    },

    incomeCategories() {
      return this.categoryOptions.filter((c) => c.type === "income");
    },
    expenseCategories() {
      return this.categoryOptions.filter((c) => c.type === "expense");
    },
  },
  actions: {
    addNewCategory({ category, transactionType }) {
      const appStore = useAppStore();
      const exists = appStore.categoryOptions.some(
        (c) =>
          c.type === transactionType &&
          c.label.toLowerCase() === category.toLowerCase(),
      );
      if (exists) return;

      appStore.categoryOptions.push({
        value: generateId(category),
        label: category,
        type: transactionType,
      });
    },

    deleteCategory({ value, label }) {
      const appStore = useAppStore();

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this category? You won’t be able to undo this action later.",
      );
      if (!confirmDelete) return;
      appStore.categoryOptions = appStore.categoryOptions.filter(
        (c) => c.value !== value,
      );
      appStore.transactions.forEach((t) => {
        if (t.category === label) t.category = "";
      });
    },
  },
});
