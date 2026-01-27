import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";

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
  const transactionsLS = readFromLocalStorage(
    LS_DATA.transactions,
    Array.isArray,
  );
  if (transactionsLS) transactions.value = transactionsLS;

  const categoriesLS = readFromLocalStorage(LS_DATA.categories, Array.isArray);
  if (categoriesLS) categoryOptions.value = categoriesLS;
  return {
    readFromLocalStorage,
    transactionTypeOptions,
    transactions,
    categoryOptions,
  };
});
