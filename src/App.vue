<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <div class="app__top">
          <TransactionForm
            title="Add Transaction"
            @submit="saveNewTransaction"
            :categoryOptions="categoryOptions"
            :transactionTypeOptions="transactionTypeOptions"
          ></TransactionForm>
          <TransactionListSection
            :categoryOptions="categoryOptionsByTypeWithAll"
            :transactionTypeOptions="transactionTypeOptionsWithAll"
            title="Transaction List"
            subtitle="Manage and filter your transactions"
            v-model:transactionType="filterModel.transactionType"
            v-model:transactionCategory="filterModel.category"
          >
            <TransactionList
              :transactions="filteredTransactions"
              @delete="deleteTransaction"
            />
          </TransactionListSection>
        </div>
        <div class="app__bottom">
          <NewCategoryForm
            @submit="addNewCategory"
            :transactionTypeOptions="transactionTypeOptions"
          />
          <CategoryList
            title="Income Categories"
            subtitle="Manage income categories for your transactions"
            :categories="incomeCategories"
            @delete="deleteCategory"
          />
          <CategoryList
            title="Expense Categories"
            subtitle="Manage expense categories for your transactions"
            :categories="expenseCategories"
            @delete="deleteCategory"
          />
        </div>
      </div>
    </TheTypography>
  </CSSReset>
</template>

<script>
import { generateId } from "./utils/generateId";
import CSSReset from "./CSSReset.vue";
import TransactionForm from "./components/TransactionForm.vue";
import TransactionListSection from "./components/transactionlist/TransactionListSection.vue";
import TheTypography from "./components/TheTypography.vue";
import TransactionList from "./components/transactionlist/TransactionList.vue";
import NewCategoryForm from "./components/newCategory/NewCategoryForm.vue";
import CategoryList from "./components/newCategory/CategoryList.vue";

export default {
  name: "App",
  components: {
    TheTypography,
    CSSReset,
    TransactionForm,
    TransactionListSection,
    TransactionList,
    NewCategoryForm,
    CategoryList,
  },
  data() {
    return {
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
  computed: {
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
    "filterModel.transactionType"(newType, oldType) {
      if (newType !== oldType) {
        this.filterModel.category = "All";
      }
    },
  },

    incomeCategories() {
      return this.categoryOptions.filter((c) => c.type === "income");
    },
    expenseCategories() {
      return this.categoryOptions.filter((c) => c.type === "expense");
    },
  },
  methods: {
    deleteTransaction(id) {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== id
      );
    },
    deleteCategory({ id, name }) {
      this.categoryOptions = this.categoryOptions.filter((c) => c.id !== id);
      this.transactions = this.transactions.filter((t) => t.category !== name);
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
  padding: 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.app__top {
  display: flex;
  gap: 20px;
}
.app__bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
