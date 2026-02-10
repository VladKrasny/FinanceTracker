<script setup lang="ts">
import TheTextArea from "./TheTextArea.vue";
import { useField } from "vee-validate";

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
const onBlur = () => handleBlur();
const onUpdate = (value: string) => setValue(value);
</script>
<template>
  <TheTextArea
    :label
    :placeholder
    :maxHeight
    :modelValue="value"
    :touched="meta.touched"
    :dirty="meta.dirty"
    @blur="onBlur"
    @update:modelValue="onUpdate"
    :errorMessage="errorMessage"
  />
</template>
