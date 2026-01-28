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
<script setup>
import TheSelect from "@/components/TheSelect.vue";
import { computed } from "vue";

const emit = defineEmits([
  "update:transactionType",
  "update:transactionCategory",
]);
const props = defineProps({
  transactionTypeOptions: { type: Array, required: true },
  transactionType: { type: String, required: true },
  categoryOptions: { type: Array, required: true },
  transactionCategory: { type: String, required: true },
});
const transactionsTypeModel = computed({
  get: () => props.transactionType,
  set: (value) => emit("update:transactionType", value),
});
const transactionCategoryModel = computed({
  get: () => props.transactionCategory,
  set: (value) => emit("update:transactionCategory", value),
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
