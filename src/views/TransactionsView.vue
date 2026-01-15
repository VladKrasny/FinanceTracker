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
    TransactionList,
    TransactionListSection,
    TheTypography,
  },

  setup() {
    const getTitleByMode = inject("getTitleByMode");
    const getCategoryOptions = inject("getCategoryOptions");
    const transactionTypeOptions = inject("transactionTypeOptions");
    const getOldTransaction = inject("getOldTransaction");
    const filterModel = inject("filterModel");

    const getCategoryOptionsByTypeWithAll = inject(
      "getCategoryOptionsByTypeWithAll"
    );
    const getTransactionTypeOptionsWithAll = inject(
      "getTransactionTypeOptionsWithAll"
    );
    const getFilteredTransactions = inject("getFilteredTransactions");

    const saveNewTransaction = inject("saveNewTransaction");
    const saveUpdatedTransaction = inject("saveUpdatedTransaction");
    const deleteTransaction = inject("deleteTransaction");

    const cancelEdit = inject("cancelEdit");
    const setOldTransaction = inject("setOldTransaction");

    return {
      getTitleByMode,
      getCategoryOptions,
      transactionTypeOptions,
      getOldTransaction,
      filterModel,
      getCategoryOptionsByTypeWithAll,
      getTransactionTypeOptionsWithAll,
      getFilteredTransactions,
      saveNewTransaction,
      saveUpdatedTransaction,
      deleteTransaction,
      cancelEdit,
      setOldTransaction,
    };
  },
};
</script>

<template>
  <div class="transactions">
    <div>
      <TheTypography variant="title">Transactions</TheTypography>
      <TheTypography variant="subtitle">
        Add, edit, or manage your transactions
      </TheTypography>
    </div>

    <div class="transactions__content">
      <TransactionForm
        :title="getTitleByMode()"
        :oldTransaction="getOldTransaction()"
        :categoryOptions="getCategoryOptions()"
        :transactionTypeOptions="transactionTypeOptions"
        @submit="saveNewTransaction"
        @updatedTransaction="saveUpdatedTransaction"
        @cancel="cancelEdit"
      />

      <TransactionListSection
        :categoryOptions="getCategoryOptionsByTypeWithAll()"
        :transactionTypeOptions="getTransactionTypeOptionsWithAll()"
        title="Transaction List"
        subtitle="Manage and filter your transactions"
        v-model:transactionType="filterModel.transactionType"
        v-model:transactionCategory="filterModel.category"
      >
        <TransactionList
          :transactions="getFilteredTransactions()"
          @delete="deleteTransaction"
          @editTransaction="setOldTransaction"
        />
      </TransactionListSection>
    </div>
  </div>
</template>

<style scoped>
.transactions__content {
  display: flex;
  gap: 20px;
}
.transactions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
