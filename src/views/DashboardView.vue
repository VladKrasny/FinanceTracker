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

<script setup>
import TheTypography from "@/components/TheTypography.vue";
import TheButton from "@/components/TheButton.vue";
import DashboardCard from "@/components/dashboard/DashboardCard.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore();

const {
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
} = storeToRefs(dashboardStore);
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
