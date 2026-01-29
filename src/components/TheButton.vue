<template>
  <button
    class="button"
    :class="{
      'button--disabled': disabled,
      'button--white': variant === 'white',
    }"
    :disabled="disabled"
    @click="emit('click')"
  >
    <span class="button__full-text">{{ label }}</span>
    <span class="button__short-label">{{ shortLabelText }}</span>
    <span class="button__symbol">{{ symbolText }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  shortLabel: {
    type: String,
    required: false,
  },
  symbol: {
    type: String,
    required: false,
  },
  variant: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const shortLabelText = computed(() => props.shortLabel || props.label);
const symbolText = computed(() => {
  if (props.symbol) return props.symbol;
  return props.shortLabel ?? props.label;
});
</script>

<style scoped>
.button {
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.button--disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.7;
}

.button--white {
  background-color: white;
  color: black;
}
@media (max-width: 450px) {
  .button {
    padding: 5px;
  }
}
</style>
