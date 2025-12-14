<template>
  <TheInput
    fieldName="Amount"
    type="text"
    v-model="model"
    :hasError="Boolean(amountError)"
    :errorMessage="amountError"
    placeholder="Enter amount"
  />
</template>

<script>
import TheInput from "./TheInput.vue";

export default {
  name: "AmountInput",

  components: { TheInput },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "error"],

  data() {
    return {
      amountError: "",
    };
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  watch: {
    ammountError(value) {
      this.$emit("error", value);
    },

    model(value) {
      const val = value.trim();

      if (val === "") {
        this.amountError = "Amount cannot be empty";
        this.$emit("error", this.amountError);
        return;
      }

      if (isNaN(val)) {
        this.amountError = "Amount must be a number";
        this.$emit("error", this.amountError);
        return;
      }

      if (Number(val) < 0) {
        this.amountError = "Value must be greater than 0";
        this.$emit("error", this.amountError);
        return;
      }

      this.amountError = "";
      this.$emit("error", "");
    },
  },
};
</script>
