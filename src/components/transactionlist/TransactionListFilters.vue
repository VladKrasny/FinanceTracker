<template>
  <div class="transaction-list-filters">
    <TheSelect
      class="transaction-list-filters__select"
      :options="transactionTypeOptions"
      v-model="transactionsTypeModel"
    />
    <TheSelect
      class="transaction-list-filters__select"
      :options="categoryOptions"
      v-model="transactionCategoryModel"
    />
  </div>
</template>
<script setup lang="ts">
import TheSelect from "@/components/TheSelect.vue";
import type {
  TransactionTypeFilter,
  CategoryFilterOption,
  TransactionTypeFilterOption,
} from "@/types/types";

const props = defineProps<{
  transactionTypeOptions: TransactionTypeFilterOption[];
  categoryOptions: CategoryFilterOption[];
}>();

const transactionsTypeModel = defineModel<TransactionTypeFilter>(
  "transactionType",
  {
    required: true,
  },
);

const transactionCategoryModel = defineModel<string>("transactionCategory", {
  required: true,
});
</script>

<style scoped>
.transaction-list-filters {
  display: flex;
  gap: 20px;
}
.transaction-list-filters__select {
  width: 150px;
  min-width: 150px;
}
</style>
