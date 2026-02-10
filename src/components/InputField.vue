<script setup lang="ts">
import TheInput from "./TheInput.vue";
import { useField } from "vee-validate";

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

const onUpdate = (val: string) => {
  setValue(val);
};

const onBlur = () => {
  handleBlur();
};
</script>

<template>
  <TheInput
    :label
    :type
    :placeholder
    :errorMessage="errorMessage"
    :touched="meta.touched"
    :dirty="meta.dirty"
    @blur="onBlur"
    :modelValue="value"
    @update:modelValue="onUpdate"
  />
</template>
