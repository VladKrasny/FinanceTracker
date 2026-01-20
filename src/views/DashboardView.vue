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
        type="income"
        title="Total income"
        :transactions="transactions"
      />
      <DashboardCard
        type="expense"
        title="Total expense"
        :transactions="transactions"
      />
      <DashboardCard
        type="balance"
        title="Balance"
        :transactions="transactions"
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
        :isFull="false"
        :transactions="dashboardFilteredTransactions"
      />
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import TheTypography from "@/components/TheTypography.vue";
import TheButton from "@/components/TheButton.vue";
import DashboardCard from "@/components/dashboard/DashboardCard.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";

export default {
  name: "DashboardView",
  components: { TheTypography, TheButton, DashboardCard, TransactionList },
  setup() {
    const dashboardFilteredTransactions = inject(
      "dashboardFilteredTransactions",
    );

    const transactions = inject("transactions");
    return {
      transactions,
      dashboardFilteredTransactions,
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
}
</style>
