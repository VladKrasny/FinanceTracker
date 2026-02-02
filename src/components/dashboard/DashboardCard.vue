<template>
  <div
    class="dashboard-card"
    :class="{
      'dashboard-card--income': variant === 'income',
      'dashboard-card--expense': variant === 'expense',
      'dashboard-card--balance': variant === 'balance',
    }"
  >
    <TheTypography variant="subtitle">{{ title }}</TheTypography>
    <div class="dashboard-card__amount">${{ amount }}</div>
    <TheTypography variant="subtitle">{{ statusText }}</TheTypography>
  </div>
</template>

<script setup>
import TheTypography from "../TheTypography.vue";

defineProps({
  title: { type: String, required: true },
  variant: { type: String, required: true },
  amount: { type: Number, required: true },
  statusText: { type: String, required: true },
});
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
  max-width: 100%;
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
@media (max-width: 760px) {
  .dashboard-card {
    gap: 0;
    padding: 3px 10px 3px 10px;
  }
  .dashboard-card__amount {
    margin: 3px;
    font-size: 17px;
  }
}
</style>
