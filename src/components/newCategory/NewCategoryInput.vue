<template>
  <TheInput
    type="text"
    v-model="model"
    :hasError="Boolean(newCategoryError)"
    :error-message="newCategoryError"
    placeholder="Category Name"
  />
</template>

<script setup>
import TheInput from "../TheInput.vue";
import { watch, ref } from "vue";

const newCategoryError = ref("");

const emit = defineEmits(["error"]);

const model = defineModel({ required: true });

watch(newCategoryError, (value) => emit("error", value));

watch(model, (value) => {
  if (value.length === 0) {
    newCategoryError.value = "Category cannot be empty";
    return;
  }
  newCategoryError.value = "";
});
</script>
