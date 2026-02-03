<template>
  <div class="dashboard-view">
    <div class="dashboard-view__header">
      <div>
        <TheTypography variant="title">Dashboard</TheTypography>
        <TheTypography variant="subtitle"
          >Welcome back! Here's your financial overview.</TheTypography
        >
      </div>
      <TheButton
        class="dashboard-view__button"
        label="+ Add transaction"
        @click="router.push('/transactions')"
      />
    </div>
    <div class="dashboard-view__cards">
      <DashboardCard
        title="Total income"
        variant="income"
        :amount="incomeAmount"
        :statusText="incomeStatus"
      />
      <DashboardCard
        title="Total expense"
        variant="expense"
        :amount="expenseAmount"
        :statusText="expenseStatus"
      />
      <DashboardCard
        title="Balance"
        variant="balance"
        :amount="balanceAmount"
        :statusText="balanceStatus"
      />
    </div>
    <div class="dashboard-view__transactions">
      <div>
        <TheTypography variant="title">Recent Transactions</TheTypography>
        <TheTypography variant="subtitle"
          >Your latest financial activity</TheTypography
        >
      </div>

      <TransactionList :isReadOnly="true" :transactions="recentTransactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheTypography from "../components/TheTypography.vue";
import TheButton from "../components/TheButton.vue";
import DashboardCard from "../components/dashboard/DashboardCard.vue";
import TransactionList from "../components/transactionlist/TransactionList.vue";
import { useAppStore } from "../stores/appStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { Transaction } from "../types/types";

type CardTotals = { income: number; expense: number };

const router = useRouter();

const appStore = useAppStore();
const { transactions, sortedTransactions } = storeToRefs(appStore);

const recentTransactions = computed<Transaction[]>(() => {
  return sortedTransactions.value.slice(0, 5);
});

const cardTotalsByType = computed<CardTotals>(() => {
  return transactions.value.reduce<CardTotals>(
    (acc, t) => {
      if (t.type === "income") acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
});

const incomeAmount = computed(() => cardTotalsByType.value.income);

const expenseAmount = computed(() => cardTotalsByType.value.expense);

const balanceAmount = computed(
  () => cardTotalsByType.value.income - cardTotalsByType.value.expense,
);

const incomeStatus = computed(() => {
  const count = transactions.value.filter((t) => t.type === "income").length;
  return `${count} transactions`;
});

const expenseStatus = computed(() => {
  const count = transactions.value.filter((t) => t.type === "expense").length;
  return `${count} transactions`;
});

const balanceStatus = computed(() => {
  if (balanceAmount.value > 0) return "You are in the positive";
  if (balanceAmount.value < 0) return "You are in the negative";
  return "You are breaking even";
});
</script>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.dashboard-view__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dashboard-view__button {
  width: 200px;
  height: 40px;
}
.dashboard-view__cards {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.dashboard-view__transactions {
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 340px;
  max-width: 100%;
}
@media (max-width: 1024px) {
  .dashboard-view {
    padding: 20px;
  }
  .dashboard-view__cards {
    gap: 10px;
  }
}

@media (max-width: 760px) {
  .dashboard-view__cards {
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
  .dashboard-view {
    padding: 0 5px 0 5px;
  }
  .dashboard-view__button {
    width: 170px;
  }
}
@media (max-width: 450px) {
  .dashboard-view__button {
    width: 100px;
  }
}
</style>
