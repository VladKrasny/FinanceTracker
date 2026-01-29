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

const props = defineProps({
  transactionTypeOptions: { type: Array, required: true },
  categoryOptions: { type: Array, required: true },
});
const transactionsTypeModel = defineModel("transactionType", {
  required: true,
});
const transactionCategoryModel = defineModel("transactionCategory", {
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
