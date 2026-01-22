<template>
  <div
    :class="{
      typography: true,
      [`typography--${variant}`]: Boolean(variant),
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.typography {
  font-family: "Arial", sans-serif;
  color: #333;
  font-size: 16px;
}
.typography--title {
  font-size: 24px;
  font-weight: bold;
}

.typography--subtitle {
  font-size: 16px;
  color: gray;
}
</style>
