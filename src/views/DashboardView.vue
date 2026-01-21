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
        @click="$router.push('/transactions')"
      />
    </div>
    <div class="dashboard-view__cards">
      <DashboardCard
        title="Total income"
        :cardClass="incomeCardClass"
        :amount="incomeAmount"
        :statusText="incomeStatus"
      />
      <DashboardCard
        title="Total expense"
        :cardClass="expenseCardClass"
        :amount="expenseAmount"
        :statusText="expenseStatus"
      />
      <DashboardCard
        title="Balance"
        :cardClass="balanceCardClass"
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

      <TransactionList
        :isReadOnly="true"
        :transactions="dashboardRecentTransactions"
      />
    </div>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import TheTypography from "@/components/TheTypography.vue";
import TheButton from "@/components/TheButton.vue";
import DashboardCard from "@/components/dashboard/DashboardCard.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";

export default {
  name: "DashboardView",
  components: { TheTypography, TheButton, DashboardCard, TransactionList },
  setup() {
    const transactions = inject("transactions");

    const dashboardRecentTransactions = computed(() => {
      return transactions.value.slice(0, 5);
    });

    const cardTotalsByType = computed(() => {
      return transactions.value.reduce(
        (acc, t) => {
          const value = Number(t.amount || 0);
          if (t.type === "income") acc.income += value;
          if (t.type === "expense") acc.expense += value;
          return acc;
        },
        { income: 0, expense: 0 },
      );
    });

    const incomeAmount = computed(() => {
      return cardTotalsByType.value.income;
    });

    const expenseAmount = computed(() => {
      return cardTotalsByType.value.expense;
    });

    const balanceAmount = computed(() => {
      return cardTotalsByType.value.income - cardTotalsByType.value.expense;
    });

    const incomeStatus = computed(() => {
      const count = transactions.value.filter(
        (t) => t.type === "income",
      ).length;
      return `${count} transactions`;
    });

    const expenseStatus = computed(() => {
      const count = transactions.value.filter(
        (t) => t.type === "expense",
      ).length;
      return `${count} transactions`;
    });

    const balanceStatus = computed(() => {
      if (balanceAmount.value > 0) return "You are in the positive";
      if (balanceAmount.value < 0) return "You are in the negative";
      return "You are breaking even";
    });

    const incomeCardClass = "dashboard-card--income";
    const expenseCardClass = "dashboard-card--expense";
    const balanceCardClass = "dashboard-card--balance";

    return {
      dashboardRecentTransactions,

      incomeAmount,
      expenseAmount,
      balanceAmount,

      incomeStatus,
      expenseStatus,
      balanceStatus,

      incomeCardClass,
      expenseCardClass,
      balanceCardClass,
    };
  },
};
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
  min-width: 660px;
}
</style>
