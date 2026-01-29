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

const model = defineModel({ default: "" });
</script>
