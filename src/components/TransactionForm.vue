<template>
  <div class="transaction-form">
    <TheTypography variant="title">{{ blockTitle }}</TheTypography>
    <TheSelect fieldName="Type" :options="typeOptions" v-model="selectedType" />
    <AmmountInput />
    <CategoryInput />
    <!-- <TheSelect
      fieldName="Category"
      :options="categoryOptions"
      v-model="selectedCategory"
    /> -->
    <TheInput fieldName="Date" type="date" v-model="date" />
  </div>
</template>

<script>
import TheTypography from "./TheTypography.vue";
import TheSelect from "./TheSelect.vue";
import AmmountInput from "./AmmountInput.vue";
// import DateInput from "./DateInput.vue";
import { typeOptions } from "./options-data.js";
import { categoryOptions } from "./options-data.js";
import CategoryInput from "./CategoryInput.vue";
import TheInput from "./TheInput.vue";

export default {
  name: "TransactionForm",
  props: {
    blockTitle: {
      type: String,
    },
  },
  components: {
    CategoryInput,
    TheTypography,
    TheSelect,
    AmmountInput,
    // DateInput,
    TheInput,
  },
  data() {
    return {
      selectedType: "expense",
      typeOptions: typeOptions,
      selectedCategory: "",
      categoryOptions: categoryOptions,
      dateType: "",
      date: "",
    };
  },
};
</script>

<style scoped>
.transaction-form {
  padding: 20px;
  background-color: rgb(210, 209, 209);
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 20px;
}
</style>
