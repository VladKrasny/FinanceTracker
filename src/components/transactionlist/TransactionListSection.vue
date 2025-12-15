<template>
  <div class="transaction-list-section">
    <TheTypography variant="title">Transaction List</TheTypography>
    <TheTypography>Manage and filter your transactions</TheTypography>
    <TransactionListItems :transactions="transactions" />
  </div>
</template>

<script>
import TransactionListItems from "./TransactionListItems.vue";

export default {
  name: "TransactionListSection",
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  components: { TransactionListItems },
};
</script>
<style scoped>
.transaction-list-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: auto;
  width: 1000px;
}
</style>
