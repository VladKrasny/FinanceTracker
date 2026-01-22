import { defineStore } from "pinia";
import { useAppStore } from "./appStore";
import { generateId } from "@/utils/generateId";

export const useTransactionsStore = defineStore("TransactionsStore", {
  getters: {
    transactions() {
      return useAppStore().transactions;
    },

    editingTransaction() {
      return useAppStore().editingTransaction;
    },
    transactionFormTitle() {
      return this.editingTransaction ? "Edit transaction" : "Add transaction";
    },
    categoryOptions() {
      return useAppStore().categoryOptions;
    },
    transactionTypeOptions() {
      return useAppStore().transactionTypeOptions;
    },
    filterModel() {
      return useAppStore().filterModel;
    },
    categoryOptionsByTypeWithAll() {
      const filtered =
        this.filterModel.transactionType !== "All"
          ? this.categoryOptions.filter(
              (c) => c.type === this.filterModel.transactionType,
            )
          : this.categoryOptions;

      const mapped = filtered.map((c) => ({
        value: c.label,
        label: c.label,
      }));

      return [{ value: "All", label: "All" }, ...mapped];
    },
    transactionTypeOptionsWithAll() {
      return [{ value: "All", label: "All" }, ...this.transactionTypeOptions];
    },
    filteredTransactions() {
      return this.transactions.filter((t) => {
        const isTypeMatch =
          this.filterModel.transactionType === "All" ||
          t.type === this.filterModel.transactionType;
        const isCategoryMatch =
          this.filterModel.category === "All" ||
          t.category === this.filterModel.category;
        return isTypeMatch && isCategoryMatch;
      });
    },
  },
  actions: {
    setEditingTransaction(transaction) {
      useAppStore().editingTransaction = transaction;
    },
    clearEditingTransaction() {
      useAppStore().editingTransaction = null;
    },

    saveNewTransaction(newEntry) {
      const appStore = useAppStore();
      const newTransaction = {
        id: generateId("transaction"),
        ...newEntry,
      };
      appStore.transactions.push(newTransaction);
    },

    saveUpdateTransaction(update) {
      const appStore = useAppStore();

      const item = appStore.transactions.find((t) => t.id === update.id);
      if (!item) return;

      Object.assign(item, update);
      appStore.editingTransaction = null;
    },
    deleteTransaction(id) {
      const appStore = useAppStore();

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later.",
      );
      if (!confirmDelete) return;
      appStore.transactions = appStore.transactions.filter(
        (transaction) => transaction.id !== id,
      );
    },
  },
});
