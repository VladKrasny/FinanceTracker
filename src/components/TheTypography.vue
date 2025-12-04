<template>
  <div :class="['typography', variant ? 'typography--' + variant : '']">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TheTypography",
};
</script>

<style scoped>
.typography {
  font-family: "Arial", sans-serif;
  color: #333;
}
.typography--title {
  font-size: 24px;
  font-weight: bold;
}
</style>
