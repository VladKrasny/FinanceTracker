<template>
  <div class="transaction-item">
    <div class="transaction-item__left-part">
      <div class="transaction-item__category">
        {{ category }}
      </div>
      <div class="transaction-item__date">{{ date }}</div>
      <div v-if="!isReadOnly" class="transaction-item__description">
        {{ description }}
      </div>
    </div>

    <div class="transaction-item__right-part">
      <div class="transaction-item__amount" :class="amountClass">
        {{ formattedAmount }}
      </div>
      <IconButton
        v-if="!isReadOnly"
        variant="edit"
        @click="emit('edit')"
        iconSymbol="edit"
      ></IconButton>
      <IconButton
        v-if="!isReadOnly"
        variant="delete"
        @click="deleteItem"
        iconSymbol="delete"
      ></IconButton>
    </div>
  </div>
</template>

<script setup>
import IconButton from "../IconButton.vue";
import { computed } from "vue";

const emit = defineEmits(["delete", "edit"]);

const props = defineProps({
  isReadOnly: { type: Boolean, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: [String, Number], required: true },
  description: { type: String, required: false },
});

function deleteItem() {
  emit("delete");
}

const amountClass = computed(() => {
  return props.type === "income"
    ? "transaction-item__amount--income"
    : "transaction-item__amount--expense";
});
const formattedAmount = computed(() => {
  const sign = props.type === "income" ? "+" : "-";
  const value = Number(props.amount) || 0;
  return `${sign}$${value}`;
});
</script>

<style scoped>
.transaction-item__amount--income {
  color: green;
}
.transaction-item__amount--expense {
  color: red;
}

.transaction-item__amount {
  font-size: 25px;
  font-weight: 600;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
}

.transaction-item__category {
  font-weight: bold;
  font-size: 18px;
}

.transaction-item__description {
  font-style: italic;
  color: gray;
}
.transaction-item__date {
  color: gray;
}

.transaction-item__right-part {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>
