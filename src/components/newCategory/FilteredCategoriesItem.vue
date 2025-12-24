<template>
  <div class="filtered-categories-item">
    <div class="filtered-categories-item__label">
      {{ category.label }}
    </div>

    <div class="filtered-categories-item__actions">
      <TransactionAction
        variant="delete"
        iconSymbol="delete"
        @click="$emit('delete', category.id)"
      />
    </div>
  </div>
</template>

<script>
import TransactionAction from "../transactionlist/TransactionAction.vue";

export default {
  name: "FilteredCategoriesItem",
  components: { TransactionAction },
  props: {
    category: { type: Object, required: true },
  },
  emits: ["delete"],
};
</script>

<style scoped>
.filtered-categories-item {
  display: flex;
  justify-content: space-between;
  border-width: 1px;
  border-color: gray;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  border-style: solid;
  padding: 10px;
  align-items: center;
}
.filtered-categories-item__label {
  font-size: 20px;
  font-weight: 600;
}
</style>
