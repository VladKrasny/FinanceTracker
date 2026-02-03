<template>
  <TheInput
    type="text"
    v-model="model"
    :hasError="Boolean(newCategoryError)"
    :error-message="newCategoryError"
    placeholder="Category Name"
  />
</template>

<script setup lang="ts">
import TheInput from "../TheInput.vue";
import { watch, ref } from "vue";

const emit = defineEmits<{ error: [string] }>();

const model = defineModel<string>({ required: true });

const newCategoryError = ref<string>("");

watch(model, (value) => {
  if (value.length === 0) {
    newCategoryError.value = "Category cannot be empty";
    return;
  }
  newCategoryError.value = "";
});

watch(newCategoryError, (value) => emit("error", value));
</script>
