<template>
  <ul class="transaction-list">
    <li
      class="transaction-list__item"
      v-for="transaction in sortedTransactions"
      :key="transaction.id"
    >
      <TransactionItem
        :id="transaction.id"
        :type="transaction.type"
        :amount="transaction.amount"
        :category="transaction.category"
        :date="transaction.date"
        :description="transaction.description"
        @delete="$emit('delete', transaction.id)"
        @edit="editTransaction(transaction)"
      />
    </li>
  </ul>
</template>

<script>
import TransactionItem from "./TransactionItem.vue";

export default {
  name: "TransactionList",

  components: { TransactionItem },
  emits: ["delete", "edit"],

  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  methods: {
    editTransaction(transaction) {
      const defaultValues = {
        id: transaction.id,
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
      };
      this.$emit("edit", defaultValues);
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
