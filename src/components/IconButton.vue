<template>
  <button
    :class="{
      'icon-button': true,
      [`icon-button--${variant}`]: Boolean(variant),
    }"
    @click="emit('click')"
  >
    <span class="material-symbols-outlined">
      {{ iconSymbol }}
    </span>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  variant: {
    type: String,
    default: "",
  },
  iconSymbol: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.icon-button {
  color: gray;
  height: 40px;
  background-color: inherit;
  border-width: 0px;
  cursor: pointer;
}
.icon-button--edit {
  color: #848c95;
}
.icon-button--delete {
  color: #dc3545;
}
</style>
