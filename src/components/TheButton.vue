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
  width: 100%;
}
.button--disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
  opacity: 0.7;
  width: 100%;
  height: 100%;
}
</style>
