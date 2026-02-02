<template>
  <div class="category-item">
    <div class="category-item__label">
      {{ label }}
    </div>
    <IconButton variant="delete" iconSymbol="delete" @click="deleteCategory" />
  </div>
</template>

<script setup>
import IconButton from "../IconButton.vue";

defineProps({
  label: { type: String, required: true },
});

const emit = defineEmits(["delete"]);

const deleteCategory = () => emit("delete");
</script>

<style scoped>
.category-item {
  display: flex;
  justify-content: space-between;
  border-width: 1px;
  border-color: gray;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  border-style: solid;
  padding: 10px;
  align-items: center;
}
.category-item__label {
  font-size: 20px;
  font-weight: 600;
}
@media (max-width: 450px) {
  .category-item {
    padding: 3px 10px 3px 10px;
  }
  .category-item__label {
    font-size: 17px;
    font-weight: 600;
  }
}
</style>
