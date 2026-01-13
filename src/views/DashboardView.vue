<script>
import TheTypography from "@/components/TheTypography.vue";
import TheButton from "@/components/TheButton.vue";
import DashboardCards from "@/components/dashboard/DashboardCards.vue";
import DashboardTransactionsListSection from "@/components/dashboard/DashboardTransactionsListSection.vue";
import DashboardTransactionsList from "@/components/dashboard/DashboardTransactionsList.vue";
export default {
  name: "DashboardView",
  components: {
    TheTypography,
    TheButton,
    DashboardCards,
    DashboardTransactionsListSection,
    DashboardTransactionsList,
  },
  inject: ["getTransactions"],
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <div>
        <TheTypography variant="title"> Dashboard</TheTypography>
        <TheTypography variant="gray-text">
          Welcome back! Here's your financial overview.
        </TheTypography>
      </div>

      <TheButton
        class="dashboard__button"
        label="+ Add transaction"
        @click="$router.push('/transactions')"
      />
    </div>
    <div>
      <DashboardCards :transactions="getTransactions()" />
    </div>
    <div class="dashboard__list">
      <DashboardTransactionsListSection
        title="Recent transactions"
        subtitle="Your latest financial activity"
      >
        <DashboardTransactionsList :transactions="getTransactions()" />
      </DashboardTransactionsListSection>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.dashboard__header {
  display: flex;
  justify-content: space-between;
}
.dashboard__button {
  align-items: center;
  max-width: 200px;
  height: 40px;
}

.dashboard__list {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  border-color: gray;
  padding: 15px;
}
</style>
