import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { readFromLocalStorage } from "@/utils/readFromLocalStorage";
import type {
  Transaction,
  CategoryOption,
  TransactionTypeOption,
} from "../types/types";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export const useAppStore = defineStore("appStore", () => {
  const transactionTypeOptions: TransactionTypeOption[] = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const transactions = ref<Transaction[]>([]);

  watch(
    transactions,
    (newValue) => {
      localStorage.setItem(LS_DATA.transactions, JSON.stringify(newValue));
    },
    { deep: true },
  );

  const categoryOptions = ref<CategoryOption[]>([]);

  watch(
    categoryOptions,
    (newValue) => {
      localStorage.setItem(LS_DATA.categories, JSON.stringify(newValue));
    },
    { deep: true },
  );

  const sortedTransactions = computed<Transaction[]>(() => {
    return [...transactions.value].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  const isTransactionArray = (value: unknown): value is Transaction[] =>
    Array.isArray(value);

  const transactionsLS = readFromLocalStorage(
    LS_DATA.transactions,
    isTransactionArray,
  );

  if (transactionsLS) transactions.value = transactionsLS;

  const isCategoriesArray = (value: unknown): value is CategoryOption[] =>
    Array.isArray(value);

  const categoriesLS = readFromLocalStorage(
    LS_DATA.categories,
    isCategoriesArray,
  );

  if (categoriesLS) categoryOptions.value = categoriesLS;

  return {
    transactionTypeOptions,
    transactions,
    categoryOptions,
    sortedTransactions,
  };
});
