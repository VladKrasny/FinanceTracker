<template>
  <div class="wrapper"><slot></slot></div>
</template>
<script>
export default {
  name: "TheWrapper",
};
</script>
<style scoped>
.wrapper {
  display: flex;
  padding: 100px;
  gap: 20px;
}
</style>
