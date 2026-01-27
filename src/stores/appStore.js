import { defineStore } from "pinia";
import { reactive, ref, watch, computed } from "vue";
import { generateId } from "@/utils/generateId";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export const useAppStore = defineStore("appStore", () => {
  ////states
  const editingTransaction = ref(null);

  const filterModel = reactive({ transactionType: "All", category: "All" });

  const transactionTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const transactions = ref([]);

  const categoryOptions = ref([]);

  ////watchers
  watch(
    transactions,
    (newValue) => {
      localStorage.setItem(LS_DATA.transactions, JSON.stringify(newValue));
    },
    { deep: true },
  );

  watch(
    categoryOptions,
    (newValue) => {
      localStorage.setItem(LS_DATA.categories, JSON.stringify(newValue));
    },
    { deep: true },
  );

  ////localStorage
  function restoreFromLocalStorage() {
    try {
      const transactionsFromLS = localStorage.getItem(LS_DATA.transactions);
      if (transactionsFromLS) {
        const transactionsJSON = JSON.parse(transactionsFromLS);
        if (Array.isArray(transactionsJSON)) {
          transactions.value = transactionsJSON;
        } else {
          throw new Error("invalid transactions format");
        }
      }
    } catch {
      console.warn(
        "Failed to parse transactions from localStorage. Resetting to default.",
      );
      localStorage.removeItem(LS_DATA.transactions);
    }

    try {
      const categoriesFromLS = localStorage.getItem(LS_DATA.categories);
      if (categoriesFromLS) {
        const categoriesJSON = JSON.parse(categoriesFromLS);
        if (Array.isArray(categoriesJSON)) {
          categoryOptions.value = categoriesJSON;
        } else {
          throw new Error(" Invalid categories format");
        }
      }
    } catch {
      console.warn(
        "Failed to parse categories from localStorage. Resetting to default.",
      );
      localStorage.removeItem(LS_DATA.categories);
    }
  }

  restoreFromLocalStorage();

  return {
    editingTransaction,
    transactionTypeOptions,
    transactions,
    categoryOptions,
    filterModel,
    restoreFromLocalStorage,
  };
});
