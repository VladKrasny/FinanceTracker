<template>
  <div class="transaction-list-section">
    <div class="transaction-list-section__header">
      <TheTypography variant="title">{{ title }}</TheTypography>
      <TheTypography variant="subtitle">
        {{ subtitle }}
      </TheTypography>
    </div>
    <div class="transaction-list-section__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";

export default {
  name: "TransactionListSection",
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
.transaction-list-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 650px;
  max-height: 650px;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}
.transaction-list-section__header {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.transaction-list-section__content {
  height: 550px;
  max-height: 550px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
