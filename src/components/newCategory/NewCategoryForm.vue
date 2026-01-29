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
      <div class="new-category-form__select">
        <TheSelect :options="transactionTypeOptions" v-model="typeModel" />
      </div>
      <div class="new-category-form__button">
        <TheButton
          short-label="Add..."
          symbol="+"
          type="submit"
          label="Add Category"
          :disabled="Boolean(newCategoryError || !typeModel)"
        />
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

defineProps({
  transactionTypeOptions: { type: Array, required: true },
});

const emit = defineEmits(["submit"]);

const newCategoryModel = ref("");
const newCategoryError = ref("");
const typeModel = ref("");

const submit = () => {
  if (!newCategoryModel.value || newCategoryError.value) return;
  emit("submit", {
    category: newCategoryModel.value,
    transactionType: typeModel.value,
  });
  newCategoryModel.value = "";
};
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
  min-width: 340px;
}

.new-category-form__content {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 340px;
  gap: 20px;
  justify-content: space-between;
  height: 40px;
}
.new-category-form__input {
  width: 100%;
}
.new-category-form__button {
  min-width: 180px;
}
.new-category-form__select {
  min-width: 180px;
}
@media (max-width: 768px) {
  .new-category-form__content {
    gap: 10px;
  }
  .new-category-form__button {
    min-width: 100px;
  }
  .new-category-form__select {
    min-width: 105px;
  }
}
@media (max-width: 450px) {
  .new-category-form__button {
    min-width: 50px;
  }
  .new-category-form__content {
    gap: 5px;
  }
}
</style>
