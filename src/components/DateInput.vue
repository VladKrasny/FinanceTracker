<template>
  <TheInput fieldName="Date" type="date" v-model="date" />
</template>
<script>
import TheInput from "./TheInput.vue";

export default {
  name: "DateInput",

  components: { TheInput },

  data() {
    return {
      date: "",
    };
  },
};
</script>
