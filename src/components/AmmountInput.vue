<template>
  <div>
    <TheInput
      fieldName="Ammount"
      type="text"
      @update:modelValue="CheckInput"
      v-model="ammount"
      :hasError="Boolean(amountError)"
      placeholder="Enter amount"
    />
    <p v-if="amountError" class="error-message">
      {{ amountError }}
    </p>
  </div>
</template>

<script>
import TheInput from "./TheInput.vue";
export default {
  name: "AmmountInput",

  components: { TheInput },
  data() {
    return {
      ammount: "",
      amountError: "",
    };
  },
  methods: {
    CheckInput() {
      const value = this.ammount.trim();
      if (value === "") {
        this.amountError = "Amount cannot be empty";
        return;
      }

      if (isNaN(value)) {
        this.amountError = "Amount must be a number";
        return;
      }

      if (Number(value) <= 0) {
        this.amountError = "Value must be greater than 0";
        return;
      }

      this.amountError = "";
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 18px;
}
</style>
