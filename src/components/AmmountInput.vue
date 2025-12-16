<template>
  <TheInput
    fieldName="ammount"
    type="text"
    v-model="model"
    :hasError="Boolean(ammountError)"
    :errorMessage="ammountError"
    placeholder="Enter ammount"
  />
</template>

<script>
import TheInput from "./TheInput.vue";

export default {
  name: "ammountInput",

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
      ammountError: "",
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
        this.ammountError = "ammount cannot be empty";
        return;
      }

      if (isNaN(val)) {
        this.ammountError = "ammount must be a number";
        return;
      }

      if (Number(val) <= 0) {
        this.ammountError = "Value must be greater than 0";
        return;
      }

      this.ammountError = "";
    },
  },
};
</script>
