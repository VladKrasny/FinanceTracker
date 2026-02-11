<template>
  <div class="select">
    <label v-if="label" :for="randomId">{{ label }}</label>
    <select
      class="select__options"
      :class="{ 'select__options--error': error }"
      :id="randomId"
      v-model="model"
      @blur="emit('blur')"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueKey]"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
import { generateId } from "../utils/generateId.ts";

type Option = { value: string; label: string; type?: T };

const { valueKey = "value", error = false } = defineProps<{
  valueKey?: "value" | "label";
  label?: string;
  options: Option[];
  errorMessage?: string;
  error?: boolean;
}>();

const emit = defineEmits<{ blur: [] }>();

const model = defineModel<string>({ default: "" });

const randomId = generateId("select");
</script>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.select__options {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  cursor: pointer;
  padding: 10px;
}
.select__options--error {
  border-color: red;
}
</style>
