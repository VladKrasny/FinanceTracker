<template>
  <form class="new-category-form" @submit.prevent="submit">
    <TheTypography variant="title">Add new category</TheTypography>
    <TheTypography variant="subtitle"
      >Create a custom category for your transaction</TheTypography
    >

    <div class="new-category-form__content">
      <div class="new-category-form__input">
        <NewCategoryInput
          v-model="newCategoryModel"
          @error="newCategoryError = $event"
        />
      </div>
      <div class="new-category-form__controls">
        <div class="new-category-form__select">
          <TheSelect :options="transactionTypeOptions" v-model="typeModel" />
        </div>
        <div class="new-category-form__button">
          <TheButton
            type="submit"
            label="Add Category"
            :disabled="Boolean(newCategoryError || !typeModel)"
          />
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import TheTypography from "../TheTypography.vue";
import TheButton from "../TheButton.vue";
import NewCategoryInput from "./NewCategoryInput.vue";
import TheSelect from "../TheSelect.vue";
import { ref } from "vue";

const props = defineProps({
  transactionTypeOptions: { type: Array, required: true },
});

const emit = defineEmits(["submit"]);

const newCategoryModel = ref("");
const newCategoryError = ref("");
const typeModel = ref("");

function submit() {
  if (!newCategoryModel.value || newCategoryError.value) return;
  emit("submit", {
    category: newCategoryModel.value,
    transactionType: typeModel.value,
  });
  newCategoryModel.value = "";
}
</script>

<style scoped>
.new-category-form {
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 229, 229);
}

.new-category-form__content {
  display: flex;
  flex-direction: row;
  max-width: 1370px;
  min-width: 500px;
  gap: 20px;
  justify-content: space-between;
}
.new-category-form__input {
  width: 75%;
}
.new-category-form__button {
  width: 50%;
}
.new-category-form__select {
  width: 50%;
}

.new-category-form__controls {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 25%;
}
</style>
