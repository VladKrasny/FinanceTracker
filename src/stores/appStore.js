import { defineStore } from "pinia";
import { watch } from "vue";
const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export const useAppStore = defineStore("appStore", {
  state: () => ({
    editingTransaction: null,
    filterModel: { transactionType: "All", category: "All" },
    transactionTypeOptions: [
      { value: "income", label: "Income" },
      { value: "expense", label: "Expense" },
    ],
    transactions: [],
    categoryOptions: [],
  }),

  actions: {
    initWatchers() {
      watch(
        () => this.transactions,
        (newValue) => {
          localStorage.setItem(LS_DATA.transactions, JSON.stringify(newValue));
        },
        { deep: true },
      );
      watch(
        () => this.categoryOptions,
        (newValue) => {
          localStorage.setItem(LS_DATA.categories, JSON.stringify(newValue));
        },
        { deep: true },
      );

      watch(
        () => this.filterModel.transactionType,
        (newType, oldType) => {
          if (newType !== oldType) {
            this.filterModel.category = "All";
          }
        },
      );
    },

    restoreFromLocalStorage() {
      try {
        const transactionsFromLS = localStorage.getItem(LS_DATA.transactions);
        if (transactionsFromLS) {
          const transactionsJSON = JSON.parse(transactionsFromLS);
          if (Array.isArray(transactionsJSON)) {
            this.transactions = transactionsJSON;
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
            this.categoryOptions = categoriesJSON;
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
    },
  },
});
