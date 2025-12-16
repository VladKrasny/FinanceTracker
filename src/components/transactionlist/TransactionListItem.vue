<template>
  <div class="item">
    <div class="item__left-part">
      <div class="item__category">{{ transaction.category }}</div>
      <div class="item__date">{{ transaction.date }}</div>
      <div class="item__description">{{ transaction.description }}</div>
    </div>

    <div class="item__right-part">
      <div class="item__amount" :class="amountColor">
        {{ formattedAmount }}
      </div>

      <TransactionListButton
        variant="delete"
        @action="deleteItem"
        symbol="delete"
      ></TransactionListButton>
    </div>
  </div>
</template>

<script>
import TransactionListButton from "./TransactionListButton.vue";

export default {
  name: "TransactionListItem",
  emits: ["delete"],
  components: { TransactionListButton },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.$emit("delete", this.transaction.id);
    },
  },

  computed: {
    amountColor() {
      return this.transaction.type === "income"
        ? "item__amount--income"
        : "item__amount--expense";
    },
    formattedAmount() {
      const sign = this.transaction.type === "income" ? "+" : "-";
      const value = Number(this.transaction.amount) || 0;

      return `${sign}$${value}`;
    },
  },
};
</script>

<style scoped>
.item__amount--income {
  color: green;
}
.item__amount--expense {
  color: red;
}

.item__amount {
  font-size: 25px;
  font-weight: 600;
}

.item {
  display: flex;
  justify-content: space-between;
}

.item__category {
  font-weight: bold;
  font-size: 18px;
}

.item__description {
  font-style: italic;
  color: gray;
}
.item__date {
  color: gray;
}

.item__right-part {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>
