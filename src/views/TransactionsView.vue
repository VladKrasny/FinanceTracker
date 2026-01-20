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
        @cancel="editingTransaction = null"
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

        <TheFilters
          :transactionTypeOptions="transactionTypeOptionsWithAll"
          :categoryOptions="categoryOptionsByTypeWithAll"
          v-model:transactionType="filterModel.transactionType"
          v-model:transactionCategory="filterModel.category"
        />

        <TransactionList
          class="transactions-view__transactions-content"
          :transactions="filteredTransactions"
          @delete="deleteTransaction"
          @edit="editingTransaction = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";
import TheTypography from "@/components/TheTypography.vue";
import TheFilters from "@/components/TheFilters.vue";

export default {
  name: "TransactionsView",
  components: {
    TransactionForm,
    TransactionList,
    TheTypography,
    TheFilters,
  },

  setup() {
    const transactionFormTitle = inject("transactionFormTitle");
    const saveNewTransaction = inject("saveNewTransaction");
    const saveUpdateTransaction = inject("saveUpdateTransaction");
    const editingTransaction = inject("editingTransaction");
    const categoryOptions = inject("categoryOptions");
    const transactionTypeOptions = inject("transactionTypeOptions");
    const categoryOptionsByTypeWithAll = inject("categoryOptionsByTypeWithAll");
    const transactionTypeOptionsWithAll = inject(
      "transactionTypeOptionsWithAll",
    );
    const filterModel = inject("filterModel");
    const filteredTransactions = inject("filteredTransactions");
    const deleteTransaction = inject("deleteTransaction");

    return {
      transactionFormTitle,
      saveNewTransaction,
      saveUpdateTransaction,
      editingTransaction,
      categoryOptions,
      transactionTypeOptions,
      categoryOptionsByTypeWithAll,
      transactionTypeOptionsWithAll,
      filterModel,
      filteredTransactions,
      deleteTransaction,
    };
  },
};
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
