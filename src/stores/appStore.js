import { defineStore } from "pinia";
import { ref, watch, reactive, computed } from "vue";
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

  const filterModel = reactive({ transactionType: "All", category: "All" });

  ////computed
  const filteredTransactions = computed(() => {
    return transactions.value.filter((t) => {
      const isTypeMatch =
        filterModel.transactionType === "All" ||
        t.type === filterModel.transactionType;
      const isCategoryMatch =
        filterModel.category === "All" || t.category === filterModel.category;
      return isTypeMatch && isCategoryMatch;
    });
  });

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
    filterModel,
    filteredTransactions,
    transactionTypeOptions,
    transactions,
    categoryOptions,
  };
});
