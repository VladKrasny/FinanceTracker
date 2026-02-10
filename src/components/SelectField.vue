<script setup lang="ts">
import TheSelect from "./TheSelect.vue";
import { useField } from "vee-validate";
import type { TransactionType } from "../types/types.ts";

type Option = { value: string; label: string; type?: TransactionType };

const props = defineProps<{
  name: string;
  valueKey?: "value" | "label";
  label?: string;
  options: Option[];
}>();

const { value, errorMessage, handleBlur, handleChange, meta } =
  useField<string>(() => props.name, {
    validateOnChange: true,
    validateOnBlur: true,
  });

const onUpdate = (val: string) => {
  handleChange(val);
};

const onBlur = () => handleBlur();
</script>
<template>
  <TheSelect
    :valueKey
    :label
    :options
    :modelValue="value"
    @blur="onBlur"
    @update:modelValue="onUpdate"
    :errorMessage="errorMessage"
    :touched="meta.touched"
  />
</template>
