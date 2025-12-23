<template>
  <form class="new-category-form" @submit.prevent="submit">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <TheTypography variant="subtitle">{{ subtitle }}</TheTypography>

    <div class="new-category-form__input-button">
      <div class="new-category-form__input">
        <NewCategoryInput
          v-model="newCategoryModel"
          @error="newCategoryError = $event"
        />
      </div>

      <div class="new-category-form__button">
        <TheButton
          type="submit"
          label="Add Category"
          :disabled="Boolean(newCategoryError)"
        />
      </div>
    </div>
  </form>
</template>
<script>
import TheTypography from "../TheTypography.vue";
import TheButton from "../TheButton.vue";
import NewCategoryInput from "./NewCategoryInput.vue";

export default {
  name: "NewCategoryForm",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  emits: ["submit"],
  data() {
    return {
      newCategoryModel: "",
      newCategoryError: "",
    };
  },
  components: {
    TheTypography,
    NewCategoryInput,
    TheButton,
  },
  methods: {
    submit() {
      const trimmedCategory = this.newCategoryModel.trim();
      if (!trimmedCategory || this.newCategoryError) return;
      this.$emit("submit", trimmedCategory);
      this.newCategoryModel = "";
    },
  },
};
</script>

<style scoped>
.new-category-form {
  max-width: 1420px;
  height: 200px;
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

.new-category-form__input-button {
  display: flex;
  flex-direction: row;
  max-width: 1370px;
  min-width: 500px;
  gap: 20px;
  justify-content: space-between;
}
.new-category-form__input {
  width: 100%;
  height: 45px;
}
.new-category-form__button {
  width: 300px;
  height: 45px;
}
</style>
