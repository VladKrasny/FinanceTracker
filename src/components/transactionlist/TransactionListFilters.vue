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
<script>
import TheSelect from "@/components/TheSelect.vue";
import { computed } from "vue";

export default {
  name: "TransactionListFilters",
  components: {
    TheSelect,
  },

  emits: ["update:transactionType", "update:transactionCategory"],
  props: {
    transactionTypeOptions: { type: Array, required: true },
    transactionType: { type: String, required: true },
    categoryOptions: { type: Array, required: true },
    transactionCategory: { type: String, required: true },
  },
  setup(props, { emit }) {
    const transactionsTypeModel = computed({
      get: () => props.transactionType,
      set: (value) => emit("update:transactionType", value),
    });
    const transactionCategoryModel = computed({
      get: () => props.transactionCategory,
      set: (value) => emit("update:transactionCategory", value),
    });
    return {
      transactionsTypeModel,
      transactionCategoryModel,
    };
  },
};
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
