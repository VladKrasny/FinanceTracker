<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <nav class="app__nav">
          <RouterLink
            to="/transactions"
            class="app__router"
            :class="{ 'app__router--active': $route.path === '/transactions' }"
            >Transaction</RouterLink
          >
          <RouterLink
            to="/settings"
            class="app__router"
            :class="{ 'app__router--active': $route.path === '/settings' }"
            >Settings</RouterLink
          >
        </nav>
        <router-view />
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script>
import { computed, ref, reactive, watch, provide, onMounted } from "vue";
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

  setup() {
    const editingTransaction = ref(null);

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

    const transactionFormTitle = computed(() =>
      editingTransaction.value ? "Edit transaction" : "Add transaction"
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
          else localStorage.removeItem(LS_DATA.transactions);
        }
      } catch {
        localStorage.removeItem(LS_DATA.transactions);
      }

      try {
        const json = localStorage.getItem(LS_DATA.categories);
        if (json) {
          const parsed = JSON.parse(json);
          if (Array.isArray(parsed)) categoryOptions.value = parsed;
          else localStorage.removeItem(LS_DATA.categories);
        }
      } catch {
        localStorage.removeItem(LS_DATA.categories);
      }
    }

    function deleteTransaction(id) {
      const ok = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later."
      );
      if (!ok) return;
      transactions.value = transactions.value.filter((t) => t.id !== id);
    }

    function deleteCategory({ value, label }) {
      const ok = window.confirm(
        "Are you sure you want to delete this category? You won’t be able to undo this action later."
      );
      if (!ok) return;

      categoryOptions.value = categoryOptions.value.filter(
        (c) => c.value !== value
      );
      transactions.value = transactions.value.map((t) =>
        t.category === label ? { ...t, category: "" } : t
      );
    }

    function saveUpdateTransaction(update) {
      if (!update) return;
      const item = transactions.value.find((t) => t.id === update.id);
      if (!item) return;

      Object.assign(item, update);
      editingTransaction.value = null;
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

    function setEditingTransaction(t) {
      editingTransaction.value = t;
    }

    function cancelEdit() {
      editingTransaction.value = null;
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

    provide("transactions", transactions);
    provide("categoryOptions", categoryOptions);
    provide("filterModel", filterModel);
    provide("editingTransaction", editingTransaction);

    provide("transactionTypeOptions", transactionTypeOptions);
    provide("transactionTypeOptionsWithAll", transactionTypeOptionsWithAll);
    provide("categoryOptionsByTypeWithAll", categoryOptionsByTypeWithAll);
    provide("incomeCategories", incomeCategories);
    provide("expenseCategories", expenseCategories);
    provide("filteredTransactions", filteredTransactions);
    provide("transactionFormTitle", transactionFormTitle);

    provide("restoreFromLocalStorage", restoreFromLocalStorage);
    provide("deleteTransaction", deleteTransaction);
    provide("deleteCategory", deleteCategory);
    provide("saveUpdateTransaction", saveUpdateTransaction);
    provide("saveNewTransaction", saveNewTransaction);
    provide("addNewCategory", addNewCategory);
    provide("setEditingTransaction", setEditingTransaction);
    provide("cancelEdit", cancelEdit);

    return {};
  },
};
</script>

<style scoped>
.app__nav {
  display: flex;
  gap: 30px;
}

.app__router {
  background-color: inherit;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.app {
  padding: 50px 100px 100px 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.app__router--active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
