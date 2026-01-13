<script>
export default {
  name: "DashboardCard",
  props: {
    title: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    transactions: { type: Array, required: true },
  },

  computed: {
    cardClass() {
      return {
        "dashboard-card--income": this.type === "income",
        "dashboard-card--expense": this.type === "expense",
        "dashboard-card--balance": this.type === "balance",
      };
    },

    totals() {
      return this.transactions.reduce(
        (acc, t) => {
          if (t.type === "income") acc.income += t.amount;
          if (t.type === "expense") acc.expense += t.amount;
          return acc;
        },
        { income: 0, expense: 0 }
      );
    },

    amount() {
      if (this.type === "income") return this.totals.income;
      if (this.type === "expense") return this.totals.expense;
      return this.totals.income - this.totals.expense;
    },

    formattedAmount() {
      return Number(this.amount || 0).toFixed(2);
    },

    footerText() {
      if (this.type === "balance") {
        if (this.amount > 0) return "You are in the positive";
        if (this.amount < 0) return "You are in the negative";
        return "You are breaking even";
      }

      const count = this.transactions.filter(
        (t) => t.type === this.type
      ).length;
      return `${count} transactions`;
    },
  },
};
</script>

<template>
  <div class="dashboard-card" :class="cardClass">
    <div class="dashboard-card__title">{{ title }}</div>

    <div class="dashboard-card__amount">${{ formattedAmount }}</div>

    <div class="dashboard-card__number-of-transactions">
      {{ footerText }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 20px;
  border-width: 1px 1px 1px 4px;
  border-color: gray;
  border-style: solid;
  border-radius: 15px;
}

.dashboard-card__title {
  color: gray;
  margin-bottom: 40px;
  font-size: 12px;
}

.dashboard-card__amount {
  font-weight: bold;
  font-size: 20px;
}

.dashboard-card__number-of-transactions {
  color: gray;
  font-size: 12px;
}

.dashboard-card--income {
  border-left-color: green;
}
.dashboard-card--expense {
  border-left-color: red;
}
.dashboard-card--balance {
  border-left-color: blue;
}

.dashboard-card--income .dashboard-card__amount {
  color: green;
}
.dashboard-card--expense .dashboard-card__amount {
  color: red;
}
.dashboard-card--balance .dashboard-card__amount {
  color: blue;
}
</style>
