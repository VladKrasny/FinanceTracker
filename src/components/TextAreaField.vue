<script setup lang="ts">
import TheTextArea from "./TheTextArea.vue";
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  maxHeight?: number;
  name: string;
}>();

const { value, meta, handleBlur, setValue, errorMessage } = useField<string>(
  () => props.name,
  { validateOnInput: true, validateOnBlur: true },
);

const isError = computed(
  () => Boolean(errorMessage.value) && (meta.touched || meta.dirty),
);
</script>
<template>
  <TheTextArea
    :error="isError"
    :label
    :placeholder
    :maxHeight
    :modelValue="value"
    @blur="handleBlur"
    @update:modelValue="setValue"
    :errorMessage="errorMessage"
  />
</template>
