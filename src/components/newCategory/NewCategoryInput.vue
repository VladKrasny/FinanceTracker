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
import { watch, ref, computed } from "vue";

const props = defineProps({
  modelValue: { type: String, required: true },
});

const newCategoryError = ref("");

const emit = defineEmits(["update:modelValue", "error"]);

const model = computed({
  get: () => props.modelValue,

  set: (value) => emit("update:modelValue", value.trim()),
});

watch(
  () => newCategoryError.value,
  (value) => emit("error", value),
);

watch(
  () => model.value,
  (value) => {
    if (value.length === 0) {
      newCategoryError.value = "Category cannot be empty";
      return;
    }
    newCategoryError.value = "";
  },
);
</script>
