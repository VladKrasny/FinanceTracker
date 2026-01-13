<template>
  <div>
    <div
      v-if="recentTransactions.length === 0"
      class="dashboard-transactions-list__empty"
    >
      No transactions yet. Add your first transaction to get started!
    </div>

    <ul v-else class="dashboard-transactions-list">
      <li
        class="dashboard-transactions-list__item"
        v-for="transaction in recentTransactions"
        :key="transaction.id"
      >
        <DashboardListItem
          :type="transaction.type"
          :amount="transaction.amount"
          :category="transaction.category"
          :date="transaction.date"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import DashboardListItem from "./DashboardListItem.vue";

export default {
  name: "DashboardTransactionsList",

  components: { DashboardListItem },

  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  computed: {
    recentTransactions() {
      return [...this.transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    },
  },
};
</script>

<style scoped>
.dashboard-transactions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dashboard-transactions-list__item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-color: rgb(202, 198, 198);
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  width: 100%;
}
.dashboard-transactions-list__empty {
  text-align: center;
  font-size: 20px;
}
</style>
