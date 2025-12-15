<template>
  <div class="item">
    <div class="item__left-part typography">
      <div class="item__category">{{ transaction.category }}</div>
      <div class="item__date">{{ transaction.date }}</div>
      <div class="item__description">{{ transaction.description }}</div>
    </div>

    <div class="item__right-part">
      <div :class="ammountColor" class="item__amount">
        {{ "$" + transaction.amount }}
      </div>
    </div>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";

export default {
  name: "TransactionListItem",
  components: { TheTypography },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ammountColor() {
      return this.transaction.type === "income"
        ? "item__amount--income"
        : "item__amount--expense";
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
}

.item {
  display: flex;
  justify-content: space-between;
}
</style>
