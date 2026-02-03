<template>
  <div class="transactions-view">
    <div class="transactions-view__header">
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

<script setup lang="ts">
import TransactionForm from "../components/TransactionForm.vue";
import TransactionList from "../components/transactionlist/TransactionList.vue";
import TheTypography from "../components/TheTypography.vue";
import TransactionListFilters from "../components/transactionlist/TransactionListFilters.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/appStore";
import { computed, watch, ref, reactive } from "vue";
import { generateId } from "../utils/generateId";
import type {
  Transaction,
  NewEntry,
  CategoryFilterOption,
  TransactionTypeFilterOption,
} from "../types/types";

type FilterModel = {
  transactionType: Transaction["type"] | "All";
  category: string | "All";
};
type TransactionId = Transaction["id"];

const appStore = useAppStore();
const { categoryOptions, transactions, sortedTransactions } =
  storeToRefs(appStore);
const { transactionTypeOptions } = appStore;

const editingTransaction = ref<Transaction | null>(null);
const filterModel = reactive<FilterModel>({
  transactionType: "All",
  category: "All",
});

watch(
  () => filterModel.transactionType,
  (newType, oldType) => {
    if (newType !== oldType) {
      filterModel.category = "All";
    }
  },
);

const transactionFormTitle = computed(() => {
  return editingTransaction.value ? "Edit transaction" : "Add transaction";
});

const categoryOptionsByTypeWithAll = computed<CategoryFilterOption[]>(() => {
  const filtered =
    filterModel.transactionType !== "All"
      ? categoryOptions.value.filter(
          (c) => c.type === filterModel.transactionType,
        )
      : categoryOptions.value;
  const mapped: CategoryFilterOption[] = filtered.map((c) => ({
    value: c.label,
    label: c.label,
  }));
  return [{ value: "All", label: "All" }, ...mapped];
});

const transactionTypeOptionsWithAll = computed<TransactionTypeFilterOption[]>(
  () => {
    return [{ value: "All", label: "All" }, ...transactionTypeOptions];
  },
);

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

const saveNewTransaction = (newEntry: NewEntry) => {
  const newTransaction: Transaction = {
    id: generateId("transaction"),
    ...newEntry,
  };
  transactions.value.push(newTransaction);
};

const saveUpdateTransaction = (update: Transaction) => {
  const item = transactions.value.find((t) => t.id === update.id);
  if (!item) return;
  Object.assign(item, update);
  editingTransaction.value = null;
};

const deleteTransaction = (id: TransactionId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction? You won’t be able to undo this action later.",
  );
  if (!confirmDelete) return;
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id,
  );
};

const setEditingTransaction = (transaction: Transaction) => {
  editingTransaction.value = transaction;
};

const clearEditingTransaction = () => {
  editingTransaction.value = null;
};
</script>

<style scoped>
.transactions-view__transaction-form {
  max-width: 400px;
  width: 100%;
  min-width: 350px;
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
@media (max-width: 768px) {
  .transactions-view__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 450px) {
  .transactions-view {
    padding: 0 5px 0 5px;
  }
  .transactions-view__header {
    display: flex;
    flex-direction: column;
    padding: 0 10px 0 10px;
  }
  .transactions-view__transactions-header {
    gap: 4px;
  }
  .transactions-view__transactions-section {
    min-width: 340px;
  }
}
</style>
