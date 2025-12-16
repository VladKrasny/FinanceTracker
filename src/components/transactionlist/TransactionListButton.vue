<template>
  <button
    :class="{
      'transaction-list-button': true,
      [`transaction-list-button--${variant}`]: Boolean(variant),
    }"
    @click="$emit('action')"
  >
    <span class="material-symbols-outlined">
      {{ symbol }}
    </span>
  </button>
</template>

<script>
export default {
  name: "TransactionListButton",
  emits: ["click"],
  props: {
    variant: {
      type: String,
      default: "",
    },
    symbol: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.transaction-list-button {
  color: gray;
  height: 40px;
  background-color: inherit;
  border-width: 0px;
  cursor: pointer;
}
.transaction-list-button--edit {
  color: #848c95;
}
.transaction-list-button--delete {
  color: #dc3545;
}
</style>
