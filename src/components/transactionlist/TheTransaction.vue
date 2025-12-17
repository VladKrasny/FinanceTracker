<template>
  <div class="transaction">
    <div class="transaction__left-part">
      <div class="transaction__category">
        {{ category }}
      </div>
      <div class="transaction__date">{{ date }}</div>
      <div class="transaction__description">
        {{ description }}
      </div>
    </div>

    <div class="transaction__right-part">
      <div class="transaction__amount" :class="amountClass">
        {{ formattedAmount }}
      </div>

      <TransactionAction
        variant="delete"
        @click="deleteItem"
        iconSymbol="delete"
      ></TransactionAction>
    </div>
  </div>
</template>

<script>
import TransactionAction from "./TransactionAction.vue";

export default {
  name: "TheTransaction",
  emits: ["delete"],
  components: { TransactionAction },
  props: {
    id: { type: [String, Number], required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: [String, Number], required: true },
    description: { type: String, required: true },
  },
  methods: {
    deleteItem() {
      this.$emit("delete", this.id);
    },
  },

  computed: {
    amountClass() {
      return this.type === "income"
        ? "transaction__amount--income"
        : "transaction__amount--expense";
    },
    formattedAmount() {
      const sign = this.type === "income" ? "+" : "-";
      const value = Number(this.amount) || 0;

      return `${sign}$${value}`;
    },
  },
};
</script>

<style scoped>
.transaction__amount--income {
  color: green;
}
.transaction__amount--expense {
  color: red;
}

.transaction__amount {
  font-size: 25px;
  font-weight: 600;
}

.transaction {
  display: flex;
  justify-content: space-between;
}

.transaction__category {
  font-weight: bold;
  font-size: 18px;
}

.transaction__description {
  font-style: italic;
  color: gray;
}
.transaction__date {
  color: gray;
}

.transaction__right-part {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>
