<template>
  <ul class="transaction-list">
    <li
      class="transaction-list__item"
      v-for="transaction in sortedTransactions"
      :key="transaction.id"
    >
      <ListItem
        :id="transaction.id"
        :type="transaction.type"
        :amount="transaction.amount"
        :category="transaction.category"
        :date="transaction.date"
        :description="transaction.description"
        @delete="$emit('delete', $event)"
      />
    </li>
  </ul>
</template>

<script>
import ListItem from "./ListItem.vue";

export default {
  name: "TransactionList",

  components: { ListItem },
  emits: ["delete"],

  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  computed: {
    sortedTransactions() {
      return [...this.transactions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
};
</script>

<style scoped>
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.transaction-list__item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-color: rgb(202, 198, 198);
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  width: 100%;
}
</style>
