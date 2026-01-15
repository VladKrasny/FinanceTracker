<script>
import { computed, reactive, ref, watch, provide, onMounted } from "vue";
import { generateId } from "./utils/generateId";
import CSSReset from "./CSSReset.vue";
import TheTypography from "./components/TheTypography.vue";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export default {
  name: "App",
  components: { TheTypography, CSSReset },

  setup() {
    const oldTransaction = ref(null);

    const filterModel = reactive({
      transactionType: "All",
      category: "All",
    });

    const transactionTypeOptions = [
      { value: "income", label: "Income" },
      { value: "expense", label: "Expense" },
    ];

    const transactions = ref([
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
    ]);

    const categoryOptions = ref([
      { value: 1, label: "Food", type: "expense" },
      { value: 2, label: "Transport", type: "expense" },
      { value: 3, label: "Entertainment", type: "expense" },
      { value: 4, label: "Utilities", type: "expense" },
      { value: 5, label: "Shopping", type: "expense" },
      { value: 6, label: "Health", type: "expense" },
      { value: 7, label: "Salary", type: "income" },
      { value: 8, label: "Freelance", type: "income" },
      { value: 9, label: "Gift", type: "income" },
    ]);

    const titleByMode = computed(() =>
      oldTransaction.value ? "Edit transaction" : "Add transaction"
    );

    const incomeCategories = computed(() =>
      categoryOptions.value.filter((c) => c.type === "income")
    );

    const expenseCategories = computed(() =>
      categoryOptions.value.filter((c) => c.type === "expense")
    );

    const categoryOptionsByTypeWithAll = computed(() => {
      const filtered =
        filterModel.transactionType !== "All"
          ? categoryOptions.value.filter(
              (c) => c.type === filterModel.transactionType
            )
          : categoryOptions.value;

      const mapped = filtered.map((c) => ({ value: c.label, label: c.label }));
      return [{ value: "All", label: "All" }, ...mapped];
    });

    const transactionTypeOptionsWithAll = computed(() => [
      { value: "All", label: "All" },
      ...transactionTypeOptions,
    ]);

    const filteredTransactions = computed(() =>
      transactions.value.filter((t) => {
        const isTypeMatch =
          filterModel.transactionType === "All" ||
          t.type === filterModel.transactionType;
        const isCategoryMatch =
          filterModel.category === "All" || t.category === filterModel.category;
        return isTypeMatch && isCategoryMatch;
      })
    );

    function restoreFromLocalStorage() {
      try {
        const json = localStorage.getItem(LS_DATA.transactions);
        if (json) {
          const parsed = JSON.parse(json);
          if (Array.isArray(parsed)) transactions.value = parsed;
        }
      } catch {}

      try {
        const json = localStorage.getItem(LS_DATA.categories);
        if (json) {
          const parsed = JSON.parse(json);
          if (Array.isArray(parsed)) categoryOptions.value = parsed;
        }
      } catch {}
    }

    function deleteTransaction(id) {
      const ok = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later."
      );
      if (!ok) return;
      transactions.value = transactions.value.filter((t) => t.id !== id);
    }

    function deleteCategory({ value, label }) {
      categoryOptions.value = categoryOptions.value.filter(
        (c) => c.value !== value
      );
      transactions.value.forEach((t) => {
        if (t.category === label) t.category = "";
      });
    }

    function saveUpdatedTransaction(updatedTransaction) {
      if (!updatedTransaction) return;
      const item = transactions.value.find(
        (t) => t.id === updatedTransaction.id
      );
      if (!item) return;
      Object.assign(item, updatedTransaction);
      oldTransaction.value = null;
    }

    function saveNewTransaction(newEntry) {
      transactions.value.push({
        id: generateId("transaction"),
        ...newEntry,
      });
    }

    function addNewCategory({ category, transactionType }) {
      const exists = categoryOptions.value.some(
        (c) =>
          c.type === transactionType &&
          c.label.toLowerCase() === category.toLowerCase()
      );
      if (exists) return;

      categoryOptions.value.push({
        value: generateId(category),
        label: category,
        type: transactionType,
      });
    }

    function cancelEdit() {
      oldTransaction.value = null;
    }

    function setOldTransaction(t) {
      oldTransaction.value = t;
    }

    watch(
      transactions,
      (v) => localStorage.setItem(LS_DATA.transactions, JSON.stringify(v)),
      { deep: true }
    );

    watch(
      categoryOptions,
      (v) => localStorage.setItem(LS_DATA.categories, JSON.stringify(v)),
      { deep: true }
    );

    watch(
      () => filterModel.transactionType,
      (newType, oldType) => {
        if (newType !== oldType) filterModel.category = "All";
      }
    );

    onMounted(restoreFromLocalStorage);

    provide("getTransactions", () => transactions.value);
    provide("getCategoryOptions", () => categoryOptions.value);
    provide("filterModel", filterModel);
    provide("getOldTransaction", () => oldTransaction.value);
    provide("transactionTypeOptions", transactionTypeOptions);

    provide("getFilteredTransactions", () => filteredTransactions.value);
    provide(
      "getCategoryOptionsByTypeWithAll",
      () => categoryOptionsByTypeWithAll.value
    );
    provide(
      "getTransactionTypeOptionsWithAll",
      () => transactionTypeOptionsWithAll.value
    );
    provide("getIncomeCategories", () => incomeCategories.value);
    provide("getExpenseCategories", () => expenseCategories.value);
    provide("getTitleByMode", () => titleByMode.value);

    provide("saveNewTransaction", saveNewTransaction);
    provide("saveUpdatedTransaction", saveUpdatedTransaction);
    provide("deleteTransaction", deleteTransaction);
    provide("addNewCategory", addNewCategory);
    provide("deleteCategory", deleteCategory);

    provide("cancelEdit", cancelEdit);
    provide("setOldTransaction", setOldTransaction);
    return {};
  },
};
</script>

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
