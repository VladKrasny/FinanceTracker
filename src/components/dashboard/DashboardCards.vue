<script>
import DashboardCard from "./DashboardCard.vue";

export default {
  name: "DashboardCards",
  components: { DashboardCard },
  props: {
    transactions: { type: Array, required: true },
  },
  computed: {
    cards() {
      return [
        { title: "Total income", type: "income" },
        { title: "Total expense", type: "expense" },
        { title: "Balance", type: "balance" },
      ];
    },
  },
};
</script>
<template>
  <div class="dashboard-cards">
    <DashboardCard
      v-for="card in cards"
      :key="card.type"
      :title="card.title"
      :type="card.type"
      :transactions="transactions"
      class="dashboard-cards__card"
    />
  </div>
</template>

<style scoped>
.dashboard-cards__card {
  flex: 1;
  min-width: 200px;
}

.dashboard-cards {
  display: flex;
  gap: 20px;
}
</style>
