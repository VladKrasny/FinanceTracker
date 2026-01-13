<template>
  <div class="dashboard-transactions-list-section">
    <div class="dashboard-transactions-list-section__header">
      <TheTypography variant="title">{{ title }}</TheTypography>
      <TheTypography variant="subtitle">
        {{ subtitle }}
      </TheTypography>
    </div>
    <div class="dashboard-transactions-list-section__content">
      <slot />
    </div>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";

export default {
  name: "DashboardTransactionsListSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  components: { TheTypography },
};
</script>

<style scoped>
.dashboard-transactions-list-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dashboard-transactions-list-section__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dashboard-transactions-list-section__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
