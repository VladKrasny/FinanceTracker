<template>
  <div class="category-list">
    <TheTypography v-if="title" variant="title">{{ title }}</TheTypography>
    <TheTypography v-if="subtitle" variant="subtitle">{{
      subtitle
    }}</TheTypography>

    <ul v-if="!isEmpty" class="category-list__list">
      <li v-for="category in categories" :key="category.id">
        <CategoryItem
          :id="category.id"
          :label="category.label"
          @delete="$emit('delete', { id: category.id, name: category.value })"
        />
      </li>
    </ul>
    <div v-else>No categories yet. Add one to get started.</div>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";
import CategoryItem from "./CategoryItem.vue";

export default {
  name: "CategoryList",
  components: { TheTypography, CategoryItem },
  props: {
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
    categories: { type: Array, required: true },
  },
  emits: ["delete"],
  computed: {
    isEmpty() {
      return this.categories.length === 0;
    },
  },
};
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
</style>
