<template>
  <div class="category-item">
    <div class="category-item__label">
      {{ label }}
    </div>
    <IconButton variant="delete" iconSymbol="delete" @click="deleteCategory" />
  </div>
</template>

<script>
import IconButton from "../transactionlist/IconButton.vue";

export default {
  name: "CategoryItem",
  components: { IconButton },
  props: {
    id: { type: [String, Number], required: true },
    label: { type: String, required: true },
  },
  emits: ["delete"],
  methods: {
    deleteCategory() {
      this.$emit("delete", this.id);
    },
  },
};
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
</style>
