<template>
  <div class="transaction-item">
    <div class="transaction-item__left-part">
      <div class="transaction-item__category">
        {{ category }}
      </div>
      <div class="transaction-item__date">{{ date }}</div>
      <div class="transaction-item__description">
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
        @click="emit('delete')"
        iconSymbol="delete"
      ></IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from "../IconButton.vue";
import { computed } from "vue";
import type { TransactionType } from "../../types/types";

const props = defineProps<{
  isReadOnly: boolean;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
}>();

const emit = defineEmits<{ delete: []; edit: [] }>();

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
@media (max-width: 450px) {
  .transaction-item__right-part {
    gap: 5px;
  }
  .transaction-item__amount {
    font-size: 20px;
  }
  .transaction-item__category {
    font-size: 15px;
  }
  .transaction-item__date {
    font-size: 13px;
  }
  .transaction-item__description {
    font-size: 13px;
  }
}
</style>
