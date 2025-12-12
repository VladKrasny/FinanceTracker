<template>
  <form class="transaction-form">
    <TheTypography variant="title">{{ FormTitle }}</TheTypography>
    <TheSelect fieldName="Type" :options="typeOptions" v-model="typeModel" />
    <AmmountInput v-model="ammountModel" @error="amountError = $event" />
    <CategoryInput v-model="categoryModel" @error="categoryError = $event" />
    <TheInput fieldName="Date" type="date" v-model="dateModel" />
    <FormTextArea
      fieldName="Discription (optional)"
      v-model="descriptionModel"
      @error="textAreaError = $event"
    />
    <TheButton label="Add" :disabled="isActive" @click="saveData" />
  </form>
</template>

<script>
import TheTypography from "./TheTypography.vue";
import TheSelect from "./TheSelect.vue";
import AmmountInput from "./AmmountInput.vue";
import { typeOptions } from "./options-data.js";
import CategoryInput from "./CategoryInput.vue";
import TheInput from "./TheInput.vue";
import FormTextArea from "./FormTextArea.vue";
import TheButton from "./TheButton.vue";

export default {
  name: "TransactionForm",
  props: {
    FormTitle: {
      type: String,
    },
  },
  components: {
    CategoryInput,
    TheTypography,
    TheSelect,
    AmmountInput,
    TheInput,
    FormTextArea,
    TheButton,
  },
  data() {
    return {
      typeOptions: typeOptions,

      typeModel: "expense",
      dateModel: "",
      categoryModel: "",
      ammountModel: "",
      descriptionModel: "",

      amountError: "",
      textAreaError: "",
      categoryError: "",
    };
  },
  methods: {
    saveData() {
      const newEntry = {
        type: this.typeModel,
        amount: this.ammountModel,
        category: this.categoryModel,
        date: this.dateModel,
        description: this.descriptionModel,
      };

      console.log("Saved Data:", newEntry);
    },
  },
  computed: {
    isActive() {
      const fieldsValid =
        this.ammountModel && this.categoryModel && this.dateModel;

      const hasErrors =
        this.amountError && this.categoryError && this.descriptionError;

      if (fieldsValid && !hasErrors) {
        return false;
      } else {
        return true;
      }
    },
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
