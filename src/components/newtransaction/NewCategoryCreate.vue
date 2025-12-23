<template>
  <div class="new-transaction">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <TheTypography variant="subtitle">{{ subtitle }}</TheTypography>
    <div class="new-transaction__input-button">
      <div class="new-transaction__input">
        <NewCategoryInput
          v-model="newCategoryModel"
          @error="newCategoryError = $event"
        />
      </div>
      <div class="new-transaction__button">
        <TheButton
          label="Add Category"
          :disabled="Boolean(newCategoryError) || !newCategoryModel.trim()"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TheTypography from "../TheTypography.vue";
import TheButton from "../TheButton.vue";
import NewCategoryInput from "./NewCategoryInput.vue";

export default {
  name: "NewCategoryCreate",
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
      const addCategory = this.newCategoryModel.trim();
      if (!addCategory || this.newCategoryError) return;
      this.$emit("submit", addCategory);
      this.newCategoryModel = "";
    },
  },
};
</script>

<style scoped>
.new-transaction {
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

.new-transaction__input-button {
  display: flex;
  flex-direction: row;
  max-width: 1370px;
  min-width: 500px;
  gap: 20px;
  justify-content: space-between;
}
.new-transaction__input {
  width: 100%;
  height: 45px;
}
.new-transaction__button {
  width: 300px;
  height: 45px;
}
</style>
