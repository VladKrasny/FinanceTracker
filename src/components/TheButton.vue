<template>
  <button
    :class="{
      button: true,
      [`button--${variant}`]: Boolean(variant),
      'button--disabled': disabled,
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
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
}
.button--disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
