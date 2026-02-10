<template>
  <div class="text-area">
    <label v-if="label" :for="randomId">{{ label }}</label>
    <textarea
      class="text-area__input"
      ref="textArea"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      :class="{
        'text-area__input--error': showError,
      }"
      @blur="emit('blur')"
    ></textarea>
    <p v-if="showError" class="text-area__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { generateId } from "../utils/generateId.ts";
import { watch, ref, computed } from "vue";

const {
  label = "",
  placeholder = "",
  errorMessage = "",
  maxHeight = 135,
  touched = false,
  dirty = false,
} = defineProps<{
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  maxHeight?: number;
  touched?: boolean;
  dirty?: boolean;
}>();

const emit = defineEmits<{ blur: [] }>();

const model = defineModel<string>({ default: "" });

const textArea = ref<HTMLTextAreaElement | null>(null);
const randomId = generateId("textarea");

const showError = computed(() => Boolean(errorMessage));

const sizeCheck = (): void => {
  const el = textArea.value;
  if (!el) return;
  el.style.height = "auto";
  const nextHeight = el.scrollHeight;
  const clamped = Math.min(nextHeight, maxHeight);
  el.style.height = `${clamped}px`;
  el.style.overflowY = nextHeight > maxHeight ? "auto" : "hidden";
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
