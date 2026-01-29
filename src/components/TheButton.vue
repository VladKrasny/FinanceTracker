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
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
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
</style>
