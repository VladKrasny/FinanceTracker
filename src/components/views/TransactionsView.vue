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

      <TransactionListSection
        :categoryOptions="categoryOptionsByTypeWithAll"
        :transactionTypeOptions="transactionTypeOptionsWithAll"
        title="Transaction List"
        subtitle="Manage and filter your transactions"
        v-model:transactionType="filterModel.transactionType"
        v-model:transactionCategory="filterModel.category"
      >
        <TransactionList
          :transactions="filteredTransactions"
          @delete="deleteTransaction"
          @edit="editingTransaction = $event"
        />
      </TransactionListSection>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionListSection from "@/components/transactionlist/TransactionListSection.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";
import TheTypography from "@/components/TheTypography.vue";

export default {
  name: "TransactionsView",
  components: {
    TransactionForm,
    TransactionListSection,
    TransactionList,
    TheTypography,
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
</style>
