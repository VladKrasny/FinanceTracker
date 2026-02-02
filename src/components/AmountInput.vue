<template>
  <TheInput
    label="Amount"
    type="text"
    v-model="model"
    :hasError="Boolean(amountError)"
    :errorMessage="amountError"
    placeholder="Enter amount"
  />
</template>

<script setup>
import { watch, ref } from "vue";
import TheInput from "./TheInput.vue";

const emit = defineEmits(["error"]);

const model = defineModel({ default: "" });

watch(model, (value) => {
  const val = value.trim();

  if (val === "") {
    amountError.value = "Amount cannot be empty";
    return;
  }

  if (isNaN(val)) {
    amountError.value = "Amount must be a number";
    return;
  }

  if (Number(val) <= 0) {
    amountError.value = "Value must be greater than 0";
    return;
  }

  amountError.value = "";
});

const amountError = ref("");

watch(amountError, (value) => {
  emit("error", value);
});
</script>
