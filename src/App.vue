<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <div class="app__header">
          <router-link
            class="app__header-button"
            :class="{
              'app__header-button--active': $route.path === '/transactions',
            }"
            to="/transactions"
          >
            Transactions
          </router-link>
          <router-link
            class="app__header-button"
            :class="{
              'app__header-button--active': $route.path === '/settings',
            }"
            to="/settings"
          >
            Settings
          </router-link>
        </div>
        <hr />
        <router-view />
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script>
import { generateId } from "./utils/generateId";
import CSSReset from "./CSSReset.vue";
import TheTypography from "./components/TheTypography.vue";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export default {
  name: "App",
  components: {
    TheTypography,
    CSSReset,
  },
  data() {
    return {
      oldTransaction: null,
      filterModel: { transactionType: "All", category: "All" },
      transactionTypeOptions: [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
      ],
      transactions: [
        {
          id: 1,
          type: "income",
          amount: 100.0,
          category: "Salary",
          date: "2025-11-01",
          description: "Monthly salary",
        },
        {
          id: 2,
          type: "expense",
          amount: 25.5,
          category: "Food",
          date: "2025-11-02",
          description: "Groceries",
        },
        {
          id: 3,
          type: "expense",
          amount: 12.0,
          category: "Transport",
          date: "2025-11-03",
          description: "Bus ticket",
        },
        {
          id: 4,
          type: "expense",
          amount: 45.0,
          category: "Entertainment",
          date: "2025-11-04",
          description: "Cinema",
        },
        {
          id: 5,
          type: "income",
          amount: 300.0,
          category: "Freelance",
          date: "2025-11-05",
          description: "Side project payment",
        },
        {
          id: 6,
          type: "expense",
          amount: 60.0,
          category: "Utilities",
          date: "2025-11-06",
          description: "Electricity bill",
        },
        {
          id: 7,
          type: "expense",
          amount: 18.75,
          category: "Food",
          date: "2025-11-07",
          description: "Lunch with friends",
        },
        {
          id: 8,
          type: "income",
          amount: 50.0,
          category: "Gift",
          date: "2025-11-08",
          description: "Birthday gift",
        },
        {
          id: 9,
          type: "expense",
          amount: 120.0,
          category: "Shopping",
          date: "2025-11-09",
          description: "Clothes",
        },
        {
          id: 10,
          type: "expense",
          amount: 30.0,
          category: "Health",
          date: "2025-11-10",
          description: "Pharmacy",
        },
      ],

      categoryOptions: [
        { value: 1, label: "Food", type: "expense" },
        { value: 2, label: "Transport", type: "expense" },
        { value: 3, label: "Entertainment", type: "expense" },
        { value: 4, label: "Utilities", type: "expense" },
        { value: 5, label: "Shopping", type: "expense" },
        { value: 6, label: "Health", type: "expense" },

        { value: 7, label: "Salary", type: "income" },
        { value: 8, label: "Freelance", type: "income" },
        { value: 9, label: "Gift", type: "income" },
      ],
    };
  },

  provide() {
    return {
      getTransactions: () => this.transactions,
      getCategoryOptions: () => this.categoryOptions,
      filterModel: this.filterModel,
      getOldTransaction: () => this.oldTransaction,
      transactionTypeOptions: this.transactionTypeOptions,

      getFilteredTransactions: () => this.filteredTransactions,
      getCategoryOptionsByTypeWithAll: () => this.categoryOptionsByTypeWithAll,
      getTransactionTypeOptionsWithAll: () =>
        this.transactionTypeOptionsWithAll,
      getIncomeCategories: () => this.incomeCategories,
      getExpenseCategories: () => this.expenseCategories,
      getTitleByMode: () => this.titleByMode,

      saveNewTransaction: this.saveNewTransaction,
      saveUpdatedTransaction: this.saveUpdatedTransaction,
      deleteTransaction: this.deleteTransaction,
      addNewCategory: this.addNewCategory,
      deleteCategory: this.deleteCategory,

      cancelEdit: () => (this.oldTransaction = null),
      setOldTransaction: (t) => (this.oldTransaction = t),
    };
  },

  computed: {
    titleByMode() {
      const title = this.oldTransaction
        ? "Edit transaction"
        : "Add transaction";
      return title;
    },
    incomeCategories() {
      return this.categoryOptions.filter((c) => c.type === "income");
    },
    expenseCategories() {
      return this.categoryOptions.filter((c) => c.type === "expense");
    },
    categoryOptionsByTypeWithAll() {
      const filtered =
        this.filterModel.transactionType !== "All"
          ? this.categoryOptions.filter(
              (c) => c.type === this.filterModel.transactionType
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

  watch: {
    transactions: {
      handler(newValue) {
        localStorage.setItem("finance-transactions", JSON.stringify(newValue));
      },
      deep: true,
    },
    categoryOptions: {
      handler(newValue) {
        localStorage.setItem("finance-categories", JSON.stringify(newValue));
      },
      deep: true,
    },

    "filterModel.transactionType"(newType, oldType) {
      if (newType !== oldType) {
        this.filterModel.category = "All";
      }
    },
  },

  created() {
    this.restoreFromLocalStorage();
  },

  methods: {
    restoreFromLocalStorage() {
      try {
        const transactionsJSON = localStorage.getItem(LS_DATA.transactions);
        if (transactionsJSON) {
          const transactionsFromLS = JSON.parse(transactionsJSON);
          if (Array.isArray(transactionsFromLS)) {
            this.transactions = transactionsFromLS;
          }
        }
      } catch (e) {}

      try {
        const categoriesJSON = localStorage.getItem(LS_DATA.categories);
        if (categoriesJSON) {
          const categoriesFromLS = JSON.parse(categoriesJSON);
          if (Array.isArray(categoriesFromLS)) {
            this.categoryOptions = categoriesFromLS;
          }
        }
      } catch (e) {}
    },
    deleteTransaction(id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later."
      );
      if (!confirmDelete) return;
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== id
      );
    },
    deleteCategory({ value, label }) {
      this.categoryOptions = this.categoryOptions.filter(
        (c) => c.value !== value
      );
      this.transactions.forEach((t) => {
        if (t.category === label) t.category = "";
      });
    },

    saveUpdatedTransaction(updatedTransaction) {
      if (!updatedTransaction) return;

      const item = this.transactions.find(
        (t) => t.id === updatedTransaction.id
      );
      if (!item) return;

      Object.assign(item, updatedTransaction);
      this.oldTransaction = null;
    },
    saveNewTransaction(newEntry) {
      const newTransaction = {
        id: generateId("transaction"),
        ...newEntry,
      };
      this.transactions.push(newTransaction);
    },
    addNewCategory({ category, transactionType }) {
      const exists = this.categoryOptions.some(
        (c) =>
          c.type === transactionType &&
          c.label.toLowerCase() === category.toLowerCase()
      );
      if (exists) return;

      this.categoryOptions.push({
        value: generateId(category),
        label: category,
        type: transactionType,
      });
    },
  },
};
</script>

<style scoped>
.app {
  padding: 40px 100px 100px 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.app__header {
  display: flex;
  gap: 30px;
}

.app__header-button {
  background-color: inherit;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.app__header-button--active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
