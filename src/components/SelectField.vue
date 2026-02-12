<script setup lang="ts" generic="T extends { value: string; label: string }">
import { computed } from "vue";
import TheSelect from "./TheSelect.vue";
import { useField } from "vee-validate";

type BaseKey = "value" | "label";

const { valueKey = "value", ...props } = defineProps<{
  name: string;
  valueKey?: BaseKey;
  label?: string;
  options: T[];
}>();

const { value, errorMessage, handleBlur, handleChange, meta } =
  useField<string>(() => props.name, {
    validateOnChange: true,
    validateOnBlur: true,
  });

const isError = computed(
  () => Boolean(errorMessage.value) && (meta.touched || meta.dirty),
);
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
