<template>
  <div class="text-area">
    <label :for="randomId">{{ label }}</label>
    <textarea
      class="text-area__input"
      ref="textArea"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      :class="{ 'text-area__input--error': hasError }"
    ></textarea>
    <p v-if="errorMessage" class="text-area__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { generateId } from "../utils/generateId.js";
import { watch, ref } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  maxHeight: {
    type: Number,
    required: true,
  },
});

const textArea = ref(null);
const randomId = generateId("textarea");

const model = defineModel({ default: "" });

const sizeCheck = () => {
  const el = textArea.value;
  if (!el) return;
  el.style.height = "auto";
  const nextHeight = el.scrollHeight;
  const clamped = Math.min(nextHeight, props.maxHeight);
  el.style.height = `${clamped}px`;
  el.style.overflowY = nextHeight > props.maxHeight ? "auto" : "hidden";
};

watch(
  model,
  () => {
    sizeCheck();
  },
  { immediate: true, flush: "post" },
);
</script>

<style scoped>
.text-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-area__input {
  width: 100%;
  min-height: 80px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
  resize: none;
}
.text-area__input--error {
  border-color: red;
}
.text-area__error-message {
  color: red;
  font-size: 18px;
}
</style>
