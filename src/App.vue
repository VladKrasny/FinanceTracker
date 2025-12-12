<template>
  <CSSReset>
    <TransactionForm blockTitle="Add Transaction"></TransactionForm>
  </CSSReset>
</template>

<script>
import CSSReset from "./CSSReset.vue";
import TransactionForm from "./components/TransactionForm.vue";
export default {
  name: "App",
  components: { CSSReset, TransactionForm },
};
</script>
