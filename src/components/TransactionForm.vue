<template>
  <form class="transaction-form" @submit.prevent="submitAndReset">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <TheSelect
      label="Type"
      :options="transactionTypeOptions"
      v-model="typeModel"
      @update:modelValue="onTypeChange"
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

<script setup lang="ts">
import TheSelect from "./TheSelect.vue";
import AmountInput from "./AmountInput.vue";
import TheInput from "./TheInput.vue";
import DescriptionTextArea from "./DescriptionTextArea.vue";
import TheButton from "./TheButton.vue";
import TheTypography from "./TheTypography.vue";
import { ref, watch, computed } from "vue";
import type {
  CategoryOption,
  TransactionTypeOption,
  Transaction,
  TransactionType,
  NewEntry,
} from "../types/types";

const { editingValues = null, categoryOptions } = defineProps<{
  editingValues?: Transaction | null;
  title: string;
  categoryOptions: CategoryOption[];
  transactionTypeOptions: TransactionTypeOption[];
}>();

const emit = defineEmits<{
  cancel: [];
  update: [Transaction];
  submit: [NewEntry];
}>();

const updateMode = ref<boolean>(false);
const typeModel = ref<TransactionType>("expense");
const dateModel = ref<string>("");
const categoryModel = ref<string>("");
const amountModel = ref<string>("");
const descriptionModel = ref<string>("");
const amountError = ref<string>("");

watch(
  () => editingValues,
  (data) => {
    if (!data) return;
    updateMode.value = true;
    typeModel.value = data.type;
    categoryModel.value = data.category;
    amountModel.value = String(data.amount);
    dateModel.value = data.date;
    descriptionModel.value = data.description;
  },
  { immediate: true },
);

const categoryOptionsByType = computed<CategoryOption[]>(() => {
  return categoryOptions.filter(
    (category) => category.type === typeModel.value,
  );
});

const isDisabled = computed(() => {
  const areFieldsValid = Boolean(dateModel.value);

  const hasErrors = Boolean(amountError.value);

  return !areFieldsValid || hasErrors;
});

const onTypeChange = () => (categoryModel.value = "");

const cancelUpdate = () => {
  resetForm();
  updateMode.value = false;
  emit("cancel");
};

const entryPayload = computed<NewEntry>(() => ({
  type: typeModel.value,
  amount: Number(amountModel.value),
  category: categoryModel.value,
  date: dateModel.value,
  description: descriptionModel.value,
}));

const updateTransaction = () => {
  if (!editingValues) return;
  const update: Transaction = {
    id: editingValues.id,
    ...entryPayload.value,
  };
  emit("update", update);
  updateMode.value = false;
  resetForm();
};

const submitAndReset = () => {
  emit("submit", entryPayload.value);
  resetForm();
};

const resetForm = () => {
  typeModel.value = "expense";
  amountModel.value = "";
  categoryModel.value = "";
  dateModel.value = "";
  descriptionModel.value = "";
};
</script>

<style scoped>
.transaction-form {
  padding: 20px;
  background-color: rgb(210, 209, 209);
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
@media (max-width: 450px) {
  .transaction-form {
    gap: 10px;
  }
}
</style>
