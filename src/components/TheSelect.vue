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

<script setup>
import { generateId } from "../utils/generateId.js";
import { computed } from "vue";

const props = defineProps({
  valueKey: { type: String, default: "value" },
  label: { type: String, required: false },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const randomId = generateId("select");

const model = computed({
  get: () => props.modelValue,

  set: (value) => emit("update:modelValue", value),
});
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
