<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <nav class="app__header">
          <RouterLink
            class="app__tab"
            :class="{
              'app__tab--active': $route.path === '/transactions',
            }"
            to="/transactions"
          >
            Transactions
          </RouterLink>
          <RouterLink
            class="app__tab"
            :class="{ 'app__tab--active': $route.path === '/settings' }"
            to="/settings"
          >
            Settings
          </RouterLink>
        </nav>
        <router-view />
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script>
import { generateId } from "./utils/generateId";
import CSSReset from "./CSSReset.vue";
import TheTypography from "./components/TheTypography.vue";
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
  },

  setup() {
    const editingTransaction = ref(null);
    const filterModel = ref({ transactionType: "All", category: "All" });
    const transactionTypeOptions = [
      { value: "income", label: "Income" },
      { value: "expense", label: "Expense" },
    ];
    const transactions = ref([]);

    const categoryOptions = ref([]);

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

    return {};
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
}

.app__tab {
  background-color: inherit;
  border-width: 0;
  font-size: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.app__tab--active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
