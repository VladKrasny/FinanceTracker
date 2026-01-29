<template>
  <div class="category-list">
    <TheTypography v-if="title" variant="title">{{ title }}</TheTypography>
    <TheTypography v-if="subtitle" variant="subtitle">{{
      subtitle
    }}</TheTypography>

    <ul v-if="!isEmpty" class="category-list__list">
      <li v-for="category in categoryOptions" :key="category.value">
        <CategoryItem
          :label="category.label"
          @delete="emit('delete', category)"
        />
      </li>
    </ul>
    <div v-else>No categories yet. Add one to get started.</div>
  </div>
</template>

<script setup>
import TheTypography from "../TheTypography.vue";
import CategoryItem from "./CategoryItem.vue";
import { computed } from "vue";

const props = defineProps({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  categoryOptions: { type: Array, required: true },
});
const emit = defineEmits(["delete"]);

const isEmpty = computed(() => props.categoryOptions.length === 0);
</script>

<style scoped>
.category-list {
  padding: 20px;
  border: 1px solid rgb(229, 229, 229);
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-list__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  width: 100%;
  padding: 0;
}
@media (max-width: 450px) {
  .category-list__list {
    gap: 5px;
  }
}
</style>
