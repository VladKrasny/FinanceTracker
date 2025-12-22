<template>
  <CSSReset>
    <TheTypography>
      <div class="app">
        <TransactionForm
          title="Add Transaction"
          @submit="saveNewTransaction"
        ></TransactionForm>
        <TransactionListSection
          title="Transaction List"
          subtitle="Manage and filter your transactions"
        >
          <TransactionList
            :transactions="transactions"
            @delete="deleteTransaction"
        /></TransactionListSection>
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

export default {
  name: "App",
  components: {
    TheTypography,
    CSSReset,
    TransactionForm,
    TransactionListSection,
    TransactionList,
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
  },
};
</script>

<style scoped>
.app {
  display: flex;
  padding: 100px;
  gap: 20px;
}
</style>
