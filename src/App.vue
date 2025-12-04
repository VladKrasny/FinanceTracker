<template>
  <CSSReset>
    <TransactionSection blockTitle="Add Transaction"></TransactionSection>
  </CSSReset>
</template>

<script>
import CSSReset from "./CSSReset.vue";
import TransactionSection from "./components/TransactionSection.vue";
export default {
  name: "App",
  components: { CSSReset, TransactionSection },
};
</script>
