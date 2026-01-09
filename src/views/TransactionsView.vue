<script>
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

  inject: [
    "getTitleByMode",
    "getCategoryOptions",
    "transactionTypeOptions",
    "oldTransaction",
    "filterModel",
    "getCategoryOptionsByTypeWithAll",
    "getTransactionTypeOptionsWithAll",
    "getFilteredTransactions",
    "saveNewTransaction",
    "saveUpdatedTransaction",
    "deleteTransaction",
    "cancelEdit",
    "setOldTransaction",
  ],
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
        :oldTransaction="oldTransaction"
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
