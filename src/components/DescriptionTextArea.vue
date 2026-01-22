<template>
  <TheTextArea
    v-model="model"
    placeholder="Add notes..."
    label="Add notes"
    :maxHeight="135"
  />
</template>

<script setup>
import TheTextArea from "./TheTextArea.vue";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
