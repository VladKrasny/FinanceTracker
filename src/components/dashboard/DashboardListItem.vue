<template>
  <div class="dashboard-list-item">
    <div class="dashboard-list-item__left-part">
      <div class="dashboard-list-item__category">
        {{ category }}
      </div>
      <div class="dashboard-list-item__date">{{ date }}</div>
    </div>

    <div class="dashboard-list-item__right-part">
      <div class="dashboard-list-item__amount" :class="amountClass">
        {{ formattedAmount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardListItem",
  props: {
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
  },

  computed: {
    amountClass() {
      return {
        "dashboard-list-item__amount--income": this.type === "income",
        "dashboard-list-item__amount--expense": this.type === "expense",
      };
    },
    formattedAmount() {
      const sign = this.type === "income" ? "+" : "-";
      const value = this.amount || 0;
      return `${sign}$${value}`;
    },
  },
};
</script>

<style scoped>
.dashboard-list-item__amount--income {
  color: green;
}
.dashboard-list-item__amount--expense {
  color: red;
}

.dashboard-list-item__amount {
  font-size: 25px;
  font-weight: 600;
}

.dashboard-list-item {
  display: flex;
  justify-content: space-between;
}

.dashboard-list-item__category {
  font-weight: bold;
  font-size: 18px;
}
.dashboard-list-item__date {
  color: gray;
}

.dashboard-list-item__right-part {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
</style>
