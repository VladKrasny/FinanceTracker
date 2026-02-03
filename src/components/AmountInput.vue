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

<script setup lang="ts">
import { watch, ref } from "vue";
import TheInput from "./TheInput.vue";

const emit = defineEmits<{ error: [string] }>();

const model = defineModel<string>({ default: "" });

watch(model, (value) => {
  const val = value.trim();

  if (val === "") {
    amountError.value = "Amount cannot be empty";
    return;
  }

  const num = Number(val);
  if (Number.isNaN(num)) {
    amountError.value = "Amount must be a number";
    return;
  }

  if (Number(num) <= 0) {
    amountError.value = "Value must be greater than 0";
    return;
  }

  amountError.value = "";
});

const amountError = ref<string>("");

watch(amountError, (value) => {
  emit("error", value);
});
</script>
