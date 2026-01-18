<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <div class="app__header">
          <button
            class="app__tab"
            :class="{
              'app__tab--active': activeTab === 'transactions',
            }"
            @click="activeTab = 'transactions'"
          >
            Transactions
          </button>

          <button
            class="app__tab"
            :class="{ 'app__tab--active': activeTab === 'settings' }"
            @click="activeTab = 'settings'"
          >
            Settings
          </button>
        </div>
        <!-- TRANSACTIONS -->
        <TransactionsView v-if="activeTab === 'transactions'" />
        <!-- SETTINGS -->
        <SettingsView v-if="activeTab === 'settings'" />
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script>
import { generateId } from "./utils/generateId";
import CSSReset from "./CSSReset.vue";
import TheTypography from "./components/TheTypography.vue";
import SettingsView from "./components/views/SettingsView.vue";
import TransactionsView from "./components/views/TransactionsView.vue";
import { ref, computed, onMounted, provide, watch } from "vue";

const LS_DATA = {
  transactions: "finance-transactions",
  categories: "finance-categories",
};

export default {
  name: "App",
  components: {
    TheTypography,
    CSSReset,
    SettingsView,
    TransactionsView,
  },

  setup() {
    const activeTab = ref("transactions");
    const editingTransaction = ref(null);
    const filterModel = ref({ transactionType: "All", category: "All" });
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

    const transactionFormTitle = computed(() => {
      return editingTransaction.value ? "Edit transaction" : "Add transaction";
    });
    const incomeCategories = computed(() => {
      return categoryOptions.value.filter((c) => c.type === "income");
    });
    const expenseCategories = computed(() => {
      return categoryOptions.value.filter((c) => c.type === "expense");
    });
    const categoryOptionsByTypeWithAll = computed(() => {
      const filtered =
        filterModel.value.transactionType !== "All"
          ? categoryOptions.value.filter(
              (c) => c.type === filterModel.value.transactionType,
            )
          : categoryOptions.value;

      const mapped = filtered.map((c) => ({
        value: c.label,
        label: c.label,
      }));

      return [{ value: "All", label: "All" }, ...mapped];
    });
    const transactionTypeOptionsWithAll = computed(() => {
      return [{ value: "All", label: "All" }, ...transactionTypeOptions];
    });
    const filteredTransactions = computed(() => {
      return transactions.value.filter((t) => {
        const isTypeMatch =
          filterModel.value.transactionType === "All" ||
          t.type === filterModel.value.transactionType;
        const isCategoryMatch =
          filterModel.value.category === "All" ||
          t.category === filterModel.value.category;
        return isTypeMatch && isCategoryMatch;
      });
    });

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
      () => filterModel.value.transactionType,
      (newType, oldType) => {
        if (newType !== oldType) {
          filterModel.value.category = "All";
        }
      },
    );

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
    function deleteTransaction(id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later.",
      );
      if (!confirmDelete) return;
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id,
      );
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

    function saveUpdateTransaction(update) {
      const item = transactions.value.find((t) => t.id === update.id);
      if (!item) return;

      Object.assign(item, update);
      editingTransaction.value = null;
    }
    function saveNewTransaction(newEntry) {
      const newTransaction = {
        id: generateId("transaction"),
        ...newEntry,
      };
      transactions.value.push(newTransaction);
    }
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
    onMounted(restoreFromLocalStorage);

    provide("activeTab", activeTab);
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

    return { activeTab };
  },
};
</script>

<style scoped>
.app {
  padding: 50px 100px 100px 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.app__header {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid black;
  padding: 0 0 10px 0;
}

.app__tab {
  background-color: inherit;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
}

.app__tab--active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
