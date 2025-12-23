<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <div class="app__top">
          <TransactionForm
            title="Add Transaction"
            @submit="saveNewTransaction"
            :categoryOptions="categoryOptions"
          ></TransactionForm>
          <TransactionListSection
            title="Transaction List"
            subtitle="Manage and filter your transactions"
          >
            <TransactionList
              :transactions="transactions"
              @delete="deleteTransaction"
            />
          </TransactionListSection>
        </div>
        <div class="app__bottom">
          <NewCategoryCreate
            title="Add new category"
            subtitle="Create a custom category for your transaction"
            @submit="addNewCategory"
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
import NewCategoryCreate from "./components/newtransaction/NewCategoryCreate.vue";

export default {
  name: "App",
  components: {
    TheTypography,
    CSSReset,
    TransactionForm,
    TransactionListSection,
    TransactionList,
    NewCategoryCreate,
  },
  data() {
    return {
      transactions: [
        {
          id: 1,
          type: "income",
          amount: 100.0,
          category: "Other Income",
          date: "2025-11-28",
          description: "Salary",
        },
        {
          id: 2,
          type: "expense",
          amount: 10.0,
          category: "Food",
          date: "2025-11-29",
          description: "Lunch",
        },
        {
          id: 3,
          type: "expense",
          amount: 15.0,
          category: "Transport",
          date: "2025-11-29",
          description: "Taxi back home",
        },
        {
          id: 4,
          type: "income",
          amount: 50.0,
          category: "Gift",
          date: "2025-11-27",
          description: "Birthday gift",
        },
      ],
      categoryOptions: [
        { value: "Food", label: "Food" },
        { value: "Salary", label: "Salary" },
        { value: "Transport", label: "Transport" },
      ],
    };
  },
  methods: {
    deleteTransaction(id) {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== id
      );
    },
    saveNewTransaction(newEntry) {
      const newTransaction = {
        id: generateId("transaction"),
        ...newEntry,
      };
      this.transactions.push(newTransaction);
    },
    addNewCategory(Category) {
      const name = String(Category).trim();
      if (!name) return;

      const exists = this.categoryOptions.some(
        (c) => c.value.toLowerCase() === name.toLowerCase()
      );
      if (exists) return;

      this.categoryOptions.push({ value: name, label: name });
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
</style>
