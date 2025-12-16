<template>
  <form class="transaction-form">
    <TheTypography variant="title">{{ formTitle }}</TheTypography>
    <TheSelect fieldName="Type" :options="typeOptions" v-model="typeModel" />
    <amountInput v-model="amountModel" @error="amountError = $event" />
    <CategoryInput v-model="categoryModel" @error="categoryError = $event" />
    <TheInput fieldName="Date" type="date" v-model="dateModel" />
    <DescriptionTextArea
      fieldName="Discription (optional)"
      v-model="descriptionModel"
    />
    <TheButton label="Add" :disabled="isDisabled" @click="saveData" />
  </form>
</template>

<script>
import TheTypography from "./TheTypography.vue";
import TheSelect from "./TheSelect.vue";
import amountInput from "./amountInput.vue";
import CategoryInput from "./CategoryInput.vue";
import TheInput from "./TheInput.vue";
import DescriptionTextArea from "./DescriptionTextArea.vue";
import TheButton from "./TheButton.vue";

export default {
  name: "TransactionForm",
  props: {
    formTitle: {
      type: String,
    },
  },
  components: {
    CategoryInput,
    TheTypography,
    TheSelect,
    amountInput,
    TheInput,
    DescriptionTextArea,
    TheButton,
  },
  data() {
    return {
      typeOptions: [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
      ],
      typeModel: "expense",
      dateModel: "",
      categoryModel: "",
      amountModel: "",
      descriptionModel: "",

      amountError: "",
      categoryError: "",
    };
  },
  methods: {
    saveData() {
      const newEntry = {
        type: this.typeModel,
        amount: this.amountModel,
        category: this.categoryModel,
        date: this.dateModel,
        description: this.descriptionModel,
      };

      transactions.push(newEntry);
    },
  },
  computed: {
    isDisabled() {
      const areFieldsValid = Boolean(
        this.amountModel && this.categoryModel && this.dateModel
      );

      const hasErrors = Boolean(this.amountError || this.categoryError);

      return !areFieldsValid || hasErrors;
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
  min-width: 400px;
}
</style>
