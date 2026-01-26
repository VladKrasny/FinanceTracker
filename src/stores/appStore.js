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

  ////computed transactions
  const transactionFormTitle = computed(() => {
    return editingTransaction.value ? "Edit transaction" : "Add transaction";
  });

  const transactionTypeOptionsWithAll = computed(() => {
    return [{ value: "All", label: "All" }, ...transactionTypeOptions];
  });

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

  const recentTransactions = computed(() => {
    return [...transactions.value].reverse().slice(0, 5);
  });

  ////computed categories
  const categoryOptionsByTypeWithAll = computed(() => {
    const filtered =
      filterModel.transactionType !== "All"
        ? categoryOptions.value.filter(
            (c) => c.type === filterModel.transactionType,
          )
        : categoryOptions.value;
    const mapped = filtered.map((c) => ({
      value: c.label,
      label: c.label,
    }));
    return [{ value: "All", label: "All" }, ...mapped];
  });

  const incomeCategories = computed(() =>
    categoryOptions.value.filter((c) => c.type === "income"),
  );

  const expenseCategories = computed(() =>
    categoryOptions.value.filter((c) => c.type === "expense"),
  );

  ////computed cards
  const cardTotalsByType = computed(() => {
    return transactions.value.reduce(
      (acc, t) => {
        const value = Number(t.amount || 0);
        if (t.type === "income") acc.income += value;
        else if (t.type === "expense") acc.expense += value;
        return acc;
      },
      { income: 0, expense: 0 },
    );
  });

  const incomeAmount = computed(() => {
    return cardTotalsByType.value.income;
  });

  const expenseAmount = computed(() => {
    return cardTotalsByType.value.expense;
  });

  const balanceAmount = computed(() => {
    return cardTotalsByType.value.income - cardTotalsByType.value.expense;
  });

  const incomeStatus = computed(() => {
    const count = transactions.value.filter((t) => t.type === "income").length;
    return `${count} transactions`;
  });

  const expenseStatus = computed(() => {
    const count = transactions.value.filter((t) => t.type === "expense").length;
    return `${count} transactions`;
  });

  const balanceStatus = computed(() => {
    if (balanceAmount.value > 0) return "You are in the positive";
    if (balanceAmount.value < 0) return "You are in the negative";
    return "You are breaking even";
  });

  ////actions  transactions

  function setEditingTransaction(transaction) {
    editingTransaction.value = transaction;
  }

  function clearEditingTransaction() {
    editingTransaction.value = null;
  }

  function saveNewTransaction(newEntry) {
    const newTransaction = {
      id: generateId("transaction"),
      ...newEntry,
    };
    transactions.value.push(newTransaction);
  }

  function saveUpdateTransaction(update) {
    const item = transactions.value.find((t) => t.id === update.id);
    if (!item) return;
    Object.assign(item, update);
    editingTransaction.value = null;
  }

  function deleteTransaction(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction? You won’t be able to undo this action later.",
    );
    if (!confirmDelete) return;
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== id,
    );
  }

  ////actions category
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

  ////watchers
  function initWatchers() {
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

    watch(
      () => filterModel.transactionType,
      (newType, oldType) => {
        if (newType !== oldType) {
          filterModel.category = "All";
        }
      },
    );
  }

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

  return {
    transactionFormTitle,
    transactionTypeOptionsWithAll,
    filteredTransactions,
    setEditingTransaction,
    clearEditingTransaction,
    saveNewTransaction,
    saveUpdateTransaction,
    deleteTransaction,
    editingTransaction,
    transactionTypeOptions,
    transactions,
    recentTransactions,

    categoryOptionsByTypeWithAll,
    categoryOptions,
    incomeCategories,
    expenseCategories,
    addNewCategory,
    deleteCategory,

    filterModel,
    initWatchers,
    restoreFromLocalStorage,

    cardTotalsByType,
    incomeAmount,
    expenseAmount,
    balanceAmount,
    incomeStatus,
    expenseStatus,
    balanceStatus,
  };
});
