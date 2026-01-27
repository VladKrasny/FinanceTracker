import { defineStore } from "pinia";
import { ref, watch } from "vue";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export const useAppStore = defineStore("appStore", () => {
  ////states
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
  function restoreFromLocalStorage(key, target) {
    try {
      const dataFromLS = localStorage.getItem(LS_DATA[key]);
      if (dataFromLS) {
        const dataJSON = JSON.parse(dataFromLS);
        if (Array.isArray(dataJSON)) {
          target.value = dataJSON;
        } else {
          throw new Error(`invalid ${key} format`);
        }
      }
    } catch {
      console.warn(
        `Failed to parse ${key} from localStorage. Resetting to default.`,
      );
      localStorage.removeItem(LS_DATA[key]);
    }
  }

  restoreFromLocalStorage("transactions", transactions);
  restoreFromLocalStorage("categories", categoryOptions);

  return {
    transactionTypeOptions,
    transactions,
    categoryOptions,
    restoreFromLocalStorage,
  };
});
