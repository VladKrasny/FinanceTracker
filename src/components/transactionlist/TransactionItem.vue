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
        variant="edit"
        @click="$emit('edit')"
        iconSymbol="edit"
      ></IconButton>
      <IconButton
        variant="delete"
        @click="deleteItem"
        iconSymbol="delete"
      ></IconButton>
    </div>
  </div>
</template>

<script>
import IconButton from "../IconButton.vue";

export default {
  name: "TransactionItem",
  emits: ["delete", "edit"],
  components: { IconButton },
  props: {
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: [String, Number], required: true },
    description: { type: String, required: true },
  },
  methods: {
    deleteItem() {
      this.$emit("delete");
    },
  },

  computed: {
    amountClass() {
      return this.type === "income"
        ? "transaction-item__amount--income"
        : "transaction-item__amount--expense";
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
