<template>
  <button
    :type="type"
    class="button"
    :class="{
      'button--disabled': disabled,
      'button--white': variant === 'white',
    }"
    :disabled="disabled"
    @click="!disabled && emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const { type = "button" } = defineProps<{
  type?: "button" | "submit" | "reset";
  label: string;
  variant?: "white";
  disabled?: boolean;
}>();

const emit = defineEmits<{ click: [] }>();
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
