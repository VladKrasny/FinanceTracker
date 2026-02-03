<template>
  <button
    class="icon-button"
    :class="{
      'icon-button--edit': variant === 'edit',
      'icon-button--delete': variant === 'delete',
    }"
    @click="emit('click')"
  >
    <span class="material-symbols-outlined">
      {{ iconSymbol }}
    </span>
  </button>
</template>

<script setup lang="ts">
export type IcoVariant = "edit" | "delete";

defineProps<{ variant?: IcoVariant; iconSymbol: string }>();

const emit = defineEmits<{ click: [] }>();
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
