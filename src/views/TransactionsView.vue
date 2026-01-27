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

<script>
import TransactionForm from "@/components/TransactionForm.vue";
import TransactionList from "@/components/transactionlist/TransactionList.vue";
import TheTypography from "@/components/TheTypography.vue";
import TransactionListFilters from "@/components/transactionlist/TransactionListFilters.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/appStore";
import { computed, watch, ref, reactive } from "vue";
import { generateId } from "@/utils/generateId";

export default {
  name: "TransactionsView",
  components: {
    TransactionForm,
    TransactionList,
    TheTypography,
    TransactionListFilters,
  },

  setup() {
    const appStore = useAppStore();
    const editingTransaction = ref(null);
    const filterModel = reactive({ transactionType: "All", category: "All" });
    const { categoryOptions, transactions, sortedTransactions } =
      storeToRefs(appStore);
    const { transactionTypeOptions } = appStore;

    const transactionFormTitle = computed(() => {
      return editingTransaction.value ? "Edit transaction" : "Add transaction";
    });

    const categoryOptionsByTypeWithAll = computed(() => {
      const filtered =
        filterModel.transactionType !== "All"
          ? categoryOptions.value.filter(
              (c) => c.type === filterModel.transactionType,
            )
          : categoryOptions.value;
      const mapped = filtered.map((c) => ({
        value: c.label,
        label: c.label,
      }));
      return [{ value: "All", label: "All" }, ...mapped];
    });

    const transactionTypeOptionsWithAll = computed(() => {
      return [{ value: "All", label: "All" }, ...transactionTypeOptions];
    });

    const filteredTransactions = computed(() => {
      return sortedTransactions.value.filter((t) => {
        const isTypeMatch =
          filterModel.transactionType === "All" ||
          t.type === filterModel.transactionType;
        const isCategoryMatch =
          filterModel.category === "All" || t.category === filterModel.category;
        return isTypeMatch && isCategoryMatch;
      });
    });

    function saveNewTransaction(newEntry) {
      const newTransaction = {
        id: generateId("transaction"),
        ...newEntry,
      };
      transactions.value.push(newTransaction);
    }

    function saveUpdateTransaction(update) {
      const item = transactions.value.find((t) => t.id === update.id);
      if (!item) return;
      Object.assign(item, update);
      editingTransaction.value = null;
    }

    function deleteTransaction(id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this transaction? You won’t be able to undo this action later.",
      );
      if (!confirmDelete) return;
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id,
      );
    }

    function setEditingTransaction(transaction) {
      editingTransaction.value = transaction;
    }

    function clearEditingTransaction() {
      editingTransaction.value = null;
    }

    watch(
      () => filterModel.transactionType,
      (newType, oldType) => {
        if (newType !== oldType) {
          filterModel.category = "All";
        }
      },
    );

    return {
      clearEditingTransaction,
      setEditingTransaction,
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
