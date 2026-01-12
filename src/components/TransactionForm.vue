<template>
  <form class="transaction-form" @submit.prevent="submitAndReset">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <TheSelect
      label="Type"
      :options="transactionTypeOptions"
      v-model="typeModel"
    />
    <AmountInput v-model="amountModel" @error="amountError = $event" />
    <TheSelect
      label="Category"
      :options="categoryOptionsByType"
      v-model="categoryModel"
      valueKey="label"
    />
    <TheInput label="Date" type="date" v-model="dateModel" />
    <DescriptionTextArea
      label="Description (optional)"
      v-model="descriptionModel"
    />
    <TheButton v-if="!updateMode" label="Add" :disabled="isDisabled" />
    <div v-else class="transaction-form__update-mode">
      <TheButton
        class="transaction-form__update-button"
        label="Update"
        @click="updateTransaction"
        :disabled="isDisabled"
      />
      <TheButton
        class="transaction-form__cancel-button"
        label="Cancel"
        variant="white"
        @click="cancelUpdate"
      />
    </div>
  </form>
</template>

<script>
import TheSelect from "./TheSelect.vue";
import AmountInput from "./AmountInput.vue";
import TheInput from "./TheInput.vue";
import DescriptionTextArea from "./DescriptionTextArea.vue";
import TheButton from "./TheButton.vue";
import TheTypography from "./TheTypography.vue";

export default {
  name: "TransactionForm",
  props: {
    defaultValues: { type: Object, default: null },
    title: {
      type: String,
      required: true,
    },
    categoryOptions: { type: Array, required: true },
    transactionTypeOptions: { type: Array, required: true },
  },

  emits: ["submit", "updatedTransaction", "cancel"],
  components: {
    TheSelect,
    AmountInput,
    TheInput,
    DescriptionTextArea,
    TheButton,
    TheTypography,
  },
  data() {
    return {
      updateMode: false,
      typeModel: "expense",
      dateModel: "",
      categoryModel: "",
      amountModel: "",
      descriptionModel: "",
      amountError: "",
    };
  },
  methods: {
    cancelUpdate() {
      this.resetForm();
      this.updateMode = false;
      this.$emit("cancel");
    },

    updateTransaction() {
      if (!this.defaultValues) return;
      const updatedTransaction = {
        id: this.defaultValues.id,
        type: this.typeModel,
        amount: Number(this.amountModel),
        category: this.categoryModel,
        date: this.dateModel,
        description: this.descriptionModel,
      };
      this.$emit("updatedTransaction", updatedTransaction);
      this.updateMode = false;
      this.resetForm();
    },

    submitAndReset() {
      const newEntry = {
        type: this.typeModel,
        amount: this.amountModel,
        category: this.categoryModel,
        date: this.dateModel,
        description: this.descriptionModel,
      };

      this.$emit("submit", newEntry);
      this.resetForm();
    },
    resetForm() {
      this.typeModel = "expense";
      this.amountModel = "";
      this.categoryModel = "";
      this.dateModel = "";
      this.descriptionModel = "";
    },
  },
  computed: {
    categoryOptionsByType() {
      return this.categoryOptions.filter(
        (category) => category.type === this.typeModel
      );
    },

    isDisabled() {
      const areFieldsValid = Boolean(this.dateModel);

      const hasErrors = Boolean(this.amountError);

      return !areFieldsValid || hasErrors;
    },
  },
  watch: {
    defaultValues: {
      handler(data) {
        if (!data) return;
        this.updateMode = true;
        this.typeModel = data.type;
        this.categoryModel = data.category;
        this.amountModel = String(data.amount);
        this.dateModel = data.date;
        this.descriptionModel = data.description;
      },
      immediate: true,
    },
    typeModel() {
      if (this.updateMode) return;
      this.categoryModel = "";
    },
  },
};
</script>

<style scoped>
.transaction-form {
  padding: 20px;
  background-color: rgb(210, 209, 209);
  width: 400px;
  min-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  gap: 20px;
}

.transaction-form__update-mode {
  display: flex;
  gap: 10px;
}

.transaction-form__update-button {
  flex: 7;
}
.transaction-form__cancel-button {
  flex: 3;
}
</style>
