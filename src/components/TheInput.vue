<template>
  <div class="input">
    <label v-if="label" :for="randomId">{{ label }}</label>
    <input
      class="input__field"
      :type="type"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      @blur="emit('blur')"
      :class="{
        'input__field--error': showError,
      }"
    />
    <p v-if="showError" class="input__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { generateId } from "../utils/generateId.ts";
import { computed } from "vue";

type InputType = "text" | "date";

const {
  type = "text",
  placeholder = "",
  errorMessage = "",
  touched = false,
  dirty = false,
} = defineProps<{
  placeholder?: string;
  label?: string;
  type?: InputType;
  errorMessage?: string;
  touched?: boolean;
  dirty?: boolean;
}>();

const showError = computed(() => Boolean(errorMessage) && (touched || dirty));

const emit = defineEmits<{ blur: [] }>();

const model = defineModel<string>({ default: "" });

const randomId = generateId("input");
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input__field {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}

.input__field--error {
  border-color: red;
}

.input__error-message {
  color: red;
  font-size: 18px;
}
</style>
