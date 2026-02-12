<template>
  <form class="transaction-form" @submit.prevent="onSubmit">
    <TheTypography variant="title">{{ title }}</TheTypography>
    <SelectField label="Type" :options="transactionTypeOptions" name="type" />
    <SelectField
      label="Category"
      :options="categoryOptionsByType"
      valueKey="label"
      name="category"
    />
    <InputField name="amount" label="Amount" />
    <InputField name="date" type="date" label="Date" />
    <TextAreaField name="description" label="Description (optional)" />
    <TheButton v-if="!updateMode" label="Add" type="submit" />
    <div v-else class="transaction-form__update-mode">
      <TheButton
        class="transaction-form__update-button"
        label="Update"
        @click="updateTransaction"
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
    type: z.enum(["income", "expense"]),
    category: z.string().optional(),
    amount: z.coerce
      .number({
        invalid_type_error: "Amount must be a number",
      })
      .min(1, "Value must be greater than 0"),
    date: z.string().min(1, "Date is required"),
    description: z.string().trim().optional(),
  }),
);

const { handleSubmit, resetForm, meta, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    type: "expense",
    category: "",
    amount: undefined,
    date: "",
    description: "",
  },
});

const onSubmit = handleSubmit((v) => {
  const newEntry: NewEntry = {
    type: v.type,
    amount: v.amount,
    category: v.category ?? "",
    date: v.date,
    description: v.description ?? "",
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
      type: data.type,
      amount: data.amount,
      category: data.category,
      date: data.date,
      description: data.description ?? "",
    });
  },
  { immediate: true },
);

const categoryOptionsByType = computed<CategoryOption[]>(() => {
  return categoryOptions.filter((category) => category.type === values.type);
});

watch(
  () => values.type,
  () => {
    setValues({ ...values, category: "" });
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
    type: v.type,
    amount: v.amount,
    category: v.category ?? "",
    date: v.date,
    description: v.description ?? "",
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
