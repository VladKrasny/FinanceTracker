<template>
  <div class="dashboard-card" :class="cardClass">
    <TheTypography variant="subtitle">{{ title }}</TheTypography>
    <div class="dashboard-card__amount">${{ displayAmount }}</div>
    <TheTypography variant="subtitle">{{ statusText }}</TheTypography>
  </div>
</template>

<script>
import { computed } from "vue";
import TheTypography from "../TheTypography.vue";

export default {
  name: "DashboardCard",
  components: {
    TheTypography,
  },
  props: {
    type: { type: String, required: true },
    title: { type: String, required: true },
    transactions: { type: Array, required: true },
  },
  setup(props) {
    const totalsByType = computed(() => {
      return props.transactions.reduce(
        (acc, t) => {
          const value = Number(t.amount || 0);
          if (t.type === "income") acc.income += value;
          if (t.type === "expense") acc.expense += value;
          return acc;
        },
        { income: 0, expense: 0 },
      );
    });

    const displayAmount = computed(() => {
      if (props.type === "income") return totalsByType.value.income;
      if (props.type === "expense") return totalsByType.value.expense;
      if (props.type === "balance")
        return totalsByType.value.income - totalsByType.value.expense;
      return 0;
    });

    const statusText = computed(() => {
      if (props.type === "balance") {
        if (displayAmount.value > 0) return "You are in the positive";
        if (displayAmount.value < 0) return "You are in the negative";
        return "You are breaking even";
      }
      const count = props.transactions.filter(
        (t) => t.type === props.type,
      ).length;
      return `${count} transactions`;
    });

    const cardClass = computed(() => ({
      "dashboard-card--income": props.type === "income",
      "dashboard-card--expense": props.type === "expense",
      "dashboard-card--balance": props.type === "balance",
    }));
    return {
      displayAmount,
      statusText,
      cardClass,
    };
  },
};
</script>

<style scoped>
.dashboard-card {
  border-style: solid;
  border-radius: 15px;
  border-width: 1px 1px 1px 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: rgb(114, 114, 114);
  padding: 15px;
  min-width: 300px;
  width: 700px;
}

.dashboard-card__amount {
  font-weight: 700;
  font-size: 20px;
  margin-top: 35px;
}

.dashboard-card--income {
  border-color: green;
  color: green;
}
.dashboard-card--expense {
  border-color: red;
  color: red;
}
.dashboard-card--balance {
  border-color: blue;
  color: blue;
}
</style>
