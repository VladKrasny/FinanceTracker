import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export const useAppStore = defineStore("appStore", () => {
  const transactionTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const transactions = ref([]);
  const categoryOptions = ref([]);

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

  const sortedTransactions = computed(() => {
    return [...transactions.value].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  const transactionsLS = readFromLocalStorage(
    LS_DATA.transactions,
    Array.isArray,
  );
  if (transactionsLS) transactions.value = transactionsLS;

  const categoriesLS = readFromLocalStorage(LS_DATA.categories, Array.isArray);
  if (categoriesLS) categoryOptions.value = categoriesLS;
  return {
    transactionTypeOptions,
    transactions,
    categoryOptions,
    sortedTransactions,
  };
});
