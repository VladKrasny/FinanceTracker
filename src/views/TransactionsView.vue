<template>
  <div class="transactions-view">
    <div>
      <TheTypography variant="title">Transactions</TheTypography>
      <TheTypography variant="subtitle">
        Add, edit, or manage your transactions
      </TheTypography>
    </div>

    <div class="transactions-view__content">
      <TransactionForm
        class="transactions-view__transaction-form"
        :title="transactionFormTitle"
        @submit="saveNewTransaction"
        @update="saveUpdateTransaction"
        @cancel="clearEditingTransaction"
        :editingValues="editingTransaction"
        :categoryOptions="categoryOptions"
        :transactionTypeOptions="transactionTypeOptions"
      />

      <div class="transactions-view__transactions-section">
        <div class="transactions-view__transactions-header">
          <TheTypography variant="title">Transaction List</TheTypography>
          <TheTypography variant="subtitle">
            Manage and filter your transactions
          </TheTypography>
        </div>

        <TransactionListFilters
          :transactionTypeOptions="transactionTypeOptionsWithAll"
          :categoryOptions="categoryOptionsByTypeWithAll"
          v-model:transactionType="filterModel.transactionType"
          v-model:transactionCategory="filterModel.category"
        />

        <TransactionList
          :isReadOnly="false"
          class="transactions-view__transactions-content"
          :transactions="filteredTransactions"
          @delete="deleteTransaction"
          @edit="setEditingTransaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";
import TheTypography from "@/components/TheTypography.vue";
import TransactionListFilters from "@/components/transactionlist/TransactionListFilters.vue";
import { useTransactionsStore } from "@/stores/transactionsStore";
import { storeToRefs } from "pinia";

const TransactionsStore = useTransactionsStore();

const {
  transactionFormTitle,
  editingTransaction,
  categoryOptions,
  transactionTypeOptions,
  categoryOptionsByTypeWithAll,
  transactionTypeOptionsWithAll,
  filterModel,
  filteredTransactions,
} = storeToRefs(TransactionsStore);

const {
  saveNewTransaction,
  saveUpdateTransaction,
  deleteTransaction,
  clearEditingTransaction,
  setEditingTransaction,
} = TransactionsStore;
</script>

<style scoped>
.transactions-view__transaction-form {
  width: 400px;
  min-width: 400px;
}

.transactions-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.transactions-view__content {
  display: flex;
  gap: 20px;
}

.transactions-view__transactions-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.transactions-view__transactions-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transactions-view__transactions-content {
  height: 450px;
  max-height: 550px;
  overflow-y: auto;
}
</style>
