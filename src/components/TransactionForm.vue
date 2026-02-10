<template>
  <form class="transaction-form" @submit.prevent="onSubmit">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <SelectField
      label="Type"
      :options="transactionTypeOptions"
      name="typeField"
    />
    <SelectField
      label="Category"
      :options="categoryOptionsByType"
      valueKey="label"
      name="categoryField"
    />
    <InputField name="amountField" label="Amount" />
    <InputField name="dateField" type="date" label="Date" />
    <TextAreaField name="descriptionField" label="Description (optional)" />
    <TheButton
      v-if="!updateMode"
      label="Add"
      :disabled="isDisabled"
      type="submit"
    />
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
import SelectField from "./SelectField.vue";
import InputField from "./InputField.vue";
import TextAreaField from "./TextAreaField.vue";
import TheButton from "./TheButton.vue";
import TheTypography from "./TheTypography.vue";
import { ref, watch, computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import type {
  CategoryOption,
  TransactionTypeOption,
  Transaction,
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

const schema = toTypedSchema(
  z.object({
    typeField: z.enum(["income", "expense"]),
    categoryField: z.string().optional(),
    amountField: z
      .string()
      .trim()
      .min(1, "Amount cannot be empty")
      .refine((v) => !Number.isNaN(Number(v)), "Amount must be a number")
      .refine((v) => Number(v) > 0, "Value must be greater than 0"),
    dateField: z.string().min(1, "Date is required"),
    descriptionField: z.string().trim().optional(),
  }),
);

const { handleSubmit, resetForm, meta, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    typeField: "expense",
    categoryField: "",
    amountField: "",
    dateField: "",
    descriptionField: "",
  },
});

const onSubmit = handleSubmit((v) => {
  const newEntry: NewEntry = {
    type: v.typeField,
    amount: Number(v.amountField),
    category: v.categoryField ?? "",
    date: v.dateField,
    description: v.descriptionField ?? "",
  };
  emit("submit", newEntry);
  resetForm();
});

watch(
  () => editingValues,
  (data) => {
    if (!data) return;
    updateMode.value = true;

    setValues({
      typeField: data.type,
      amountField: String(data.amount),
      categoryField: data.category,
      dateField: data.date,
      descriptionField: data.description ?? "",
    });
  },
  { immediate: true },
);

const categoryOptionsByType = computed<CategoryOption[]>(() => {
  return categoryOptions.filter(
    (category) => category.type === values.typeField,
  );
});

const isDisabled = computed(() => !meta.value.valid);

watch(
  () => values.typeField,
  () => {
    setValues({ ...values, categoryField: "" });
  },
);

const cancelUpdate = () => {
  resetForm();
  updateMode.value = false;
  emit("cancel");
};

const updateTransaction = handleSubmit((v) => {
  if (!editingValues) return;

  const update: Transaction = {
    id: editingValues.id,
    type: v.typeField,
    amount: Number(v.amountField),
    category: v.categoryField ?? "",
    date: v.dateField,
    description: v.descriptionField ?? "",
  };

  emit("update", update);
  updateMode.value = false;
  resetForm();
});
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
