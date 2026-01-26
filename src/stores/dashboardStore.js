import { defineStore } from "pinia";
import { useAppStore } from "./appStore";

export const useDashboardStore = defineStore("dashboardStore", {
  getters: {
    transactions: () => useAppStore().transactions,

    recentTransactions() {
      return [...this.transactions].reverse().slice(0, 5);
    },

    cardTotalsByType() {
      return this.transactions.reduce(
        (acc, t) => {
          const value = Number(t.amount || 0);
          if (t.type === "income") acc.income += value;
          if (t.type === "expense") acc.expense += value;
          return acc;
        },
        { income: 0, expense: 0 },
      );
    },

    incomeAmount() {
      return this.cardTotalsByType.income;
    },

    expenseAmount() {
      return this.cardTotalsByType.expense;
    },

    balanceAmount() {
      return this.cardTotalsByType.income - this.cardTotalsByType.expense;
    },

    incomeStatus() {
      const count = this.transactions.filter((t) => t.type === "income").length;
      return `${count} transactions`;
    },

    expenseStatus() {
      const count = this.transactions.filter(
        (t) => t.type === "expense",
      ).length;
      return `${count} transactions`;
    },

    balanceStatus() {
      if (this.balanceAmount > 0) return "You are in the positive";
      if (this.balanceAmount < 0) return "You are in the negative";
      return "You are breaking even";
    },
  },
});
