<template>
  <div class="filtered-categories">
    <TheTypography v-if="title" variant="title">{{ title }}</TheTypography>
    <TheTypography v-if="subtitle" variant="subtitle">{{
      subtitle
    }}</TheTypography>

    <ul class="filtered-categories__list">
      <li v-for="category in categories" :key="category.id">
        <FilteredCategoriesItem
          :category="category"
          @delete="$emit('delete', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";
import FilteredCategoriesItem from "./FilteredCategoriesItem.vue";

export default {
  name: "FilteredCategories",
  components: { TheTypography, FilteredCategoriesItem },
  props: {
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
    categories: { type: Array, required: true },
  },
  emits: ["delete"],
};
</script>

<style scoped>
.filtered-categories {
  max-width: 1420px;
  height: auto;
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 229, 229);
  min-width: 820px;
}

.filtered-categories__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  width: 100%;
  padding: 0;
}
</style>
