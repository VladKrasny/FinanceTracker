<template>
  <div class="transaction-list-section">
    <div class="transaction-list-section__header">
      <div class="transaction-list-section__title">{{ fieldName }}</div>
      <div class="transaction-list-section__subtitle">
        {{ sectionDescription }}
      </div>
    </div>
    <div class="transaction-list-section__content">
      <TransactionList
        :transactions="transactions"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script>
import TransactionList from "./TransactionList.vue";

export default {
  name: "TransactionListSection",
  emits: ["delete"],
  props: {
    transactions: {
      type: Array,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    sectionDescription: {
      type: String,
      default: "",
    },
  },
  components: { TransactionList },
};
</script>
<style scoped>
.transaction-list-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 650px;
  max-height: 650px;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}
.transaction-list-section__header {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.transaction-list-section__content {
  height: 550px;
  max-height: 550px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.transaction-list-section__title {
  font-size: 24px;
  font-weight: bold;
}

.transaction-list-section__subtitle {
  font-size: 16px;
  color: gray;
}
</style>
