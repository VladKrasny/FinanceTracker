<template>
  <div class="select">
    <label v-if="label" :for="randomId">{{ label }}</label>

    <select class="select__options" :id="randomId" v-model="model">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueKey]"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { generateId } from "../utils/generateId.ts";
import type { TransactionType } from "../types/types.ts";

type Option = { value: string; label: string; type?: TransactionType };

const { valueKey = "value" } = defineProps<{
  valueKey?: "value" | "label";
  label?: string;
  options: Option[];
}>();

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
</style>
