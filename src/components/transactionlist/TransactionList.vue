<template>
  <ul class="transaction-list">
    <li
      class="transaction-list__item"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      <TransactionItem
        :isReadOnly
        :type="transaction.type"
        :amount="transaction.amount"
        :category="transaction.category"
        :date="transaction.date"
        :description="transaction.description"
        @delete="emit('delete', transaction.id)"
        @edit="emit('edit', transaction)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TransactionItem from "./TransactionItem.vue";
import type { Transaction } from "../../types/types";

defineProps<{ isReadOnly: boolean; transactions: Transaction[] }>();

const emit = defineEmits<{ delete: [string]; edit: [Transaction] }>();
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
  height: auto;
}
@media (max-width: 450px) {
  .transaction-list__item {
    padding: 10px;
  }
  .transaction-list {
    gap: 7px;
  }
}
</style>
