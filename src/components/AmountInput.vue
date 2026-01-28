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
import { watch, computed, ref } from "vue";
import TheInput from "./TheInput.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "error"]);

const amountError = ref("");

const model = computed({
  get: () => props.modelValue,

  set: (value) => emit("update:modelValue", value),
});

watch(
  () => amountError.value,
  (value) => {
    emit("error", value);
  },
);

watch(
  () => model.value,
  (value) => {
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
  },
);
</script>
