<template>
  <div
    class="typography"
    :class="{
      'typography--title': variant === 'title',
      'typography--subtitle': variant === 'subtitle',
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type TypographyVariant = "title" | "subtitle";

defineProps<{ variant?: TypographyVariant }>();
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
@media (max-width: 450px) {
  .typography--title {
    font-size: 22px;
  }
  .typography--subtitle {
    font-size: 14px;
    color: gray;
  }
}
</style>
