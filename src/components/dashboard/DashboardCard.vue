<template>
  <div class="dashboard-card" :class="cardClass">
    <TheTypography variant="subtitle">{{ title }}</TheTypography>
    <div class="dashboard-card__amount">${{ amount }}</div>
    <TheTypography variant="subtitle">{{ statusText }}</TheTypography>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";

export default {
  name: "DashboardCard",
  components: {
    TheTypography,
  },
  props: {
    title: { type: String, required: true },
    cardClass: { type: String, required: true },
    amount: { type: Number, required: true },
    statusText: { type: String, required: true },
  },
};
</script>

<style scoped>
.dashboard-card {
  border-style: solid;
  border-radius: 15px;
  border-width: 1px 1px 1px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: rgb(114, 114, 114);
  padding: 15px;
  min-width: 200px;
  width: 700px;
}

.dashboard-card__amount {
  font-weight: 700;
  font-size: 20px;
  margin-top: 35px;
}

.dashboard-card--income {
  border-color: green;
  color: green;
}
.dashboard-card--expense {
  border-color: red;
  color: red;
}
.dashboard-card--balance {
  border-color: blue;
  color: blue;
}
</style>
