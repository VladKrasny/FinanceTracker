<script setup lang="ts" generic="T extends string">
import { computed } from "vue";
import TheSelect from "./TheSelect.vue";
import { useField } from "vee-validate";

type Option = { value: string; label: string; type?: T };

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

const isError = computed(() => Boolean(errorMessage.value) && meta.touched);
</script>
<template>
  <TheSelect
    :error="isError"
    :valueKey
    :label
    :options
    :modelValue="value"
    @blur="handleBlur"
    @update:modelValue="handleChange"
    :errorMessage="errorMessage"
  />
</template>
