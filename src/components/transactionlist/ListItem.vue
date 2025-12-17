<template>
  <div class="list-item">
    <div class="list-item__left-part">
      <div class="list-item__category">
        {{ category }}
      </div>
      <div class="list-item__date">{{ date }}</div>
      <div class="list-item__description">
        {{ description }}
      </div>
    </div>

    <div class="list-item__right-part">
      <div class="list-item__amount" :class="amountClass">
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
  name: "ListItem",
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
        ? "list-item__amount--income"
        : "list-item__amount--expense";
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
.list-item__amount--income {
  color: green;
}
.list-item__amount--expense {
  color: red;
}

.list-item__amount {
  font-size: 25px;
  font-weight: 600;
}

.list-item {
  display: flex;
  justify-content: space-between;
}

.list-item__category {
  font-weight: bold;
  font-size: 18px;
}

.list-item__description {
  font-style: italic;
  color: gray;
}
.list-item__date {
  color: gray;
}

.list-item__right-part {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>
