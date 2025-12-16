<template>
  <ul class="transaction-list-items">
    <li
      class="transaction-list-items__item"
      v-for="item in sortedTransactions"
      :key="item.id"
    >
      <TransactionListItem
        :transaction="item"
        @delete="$emit('delete', $event)"
      />
    </li>
  </ul>
</template>

<script>
import TransactionListItem from "./TransactionListItem.vue";

export default {
  name: "TransactionListItems",

  components: { TransactionListItem },
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
.transaction-list-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.transaction-list-items__item {
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
