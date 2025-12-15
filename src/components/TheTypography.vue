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
<script>
export default {
  name: "TheTypography",
  props: {
    variant: {
      type: String,
      default: "",
    },
  },
};
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
</style>
