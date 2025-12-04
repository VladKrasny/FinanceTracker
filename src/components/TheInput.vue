<template>
  <div class="inputField">
    <label for="amountInput">{{ fieldName }}</label>
    <input
      type="text"
      id="amountInput"
      v-model="amount"
      @input="checkInput"
      :class="{ error: amountError }"
      placeholder="Enter ammount"
    />
    <p v-if="amountError" class="error-message">
      {{ amountError }}
    </p>
  </div>
</template>

<script>
export default {
  name: "TheInput",

  props: {
    fieldName: String,
  },

  data() {
    return {
      amountError: "",
      amount: "",
    };
  },

  methods: {
    checkInput() {
      const value = this.amount.trim();

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
.inputField {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input {
  width: 340px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}

input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 18px;
}
</style>
