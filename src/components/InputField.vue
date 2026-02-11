<script setup lang="ts">
import TheInput from "./TheInput.vue";
import { useField } from "vee-validate";
import { computed } from "vue";

type InputType = "text" | "date";

const props = defineProps<{
  type?: InputType;
  placeholder?: string;
  name: string;
  label?: string;
}>();

const { value, meta, errorMessage, handleBlur, setValue } = useField<string>(
  () => props.name,
  { validateOnInput: true, validateOnBlur: true },
);

const isError = computed(
  () => Boolean(errorMessage.value) && (meta.dirty || meta.touched),
);
</script>

<template>
  <TheInput
    :error="isError"
    :label
    :type
    :placeholder
    :errorMessage="errorMessage"
    @blur="handleBlur"
    :modelValue="value"
    @update:modelValue="setValue"
  />
</template>
