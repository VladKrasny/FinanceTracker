<template>
  <form class="new-category-form" @submit.prevent="onSubmit">
    <TheTypography variant="title">Add new category</TheTypography>
    <TheTypography variant="subtitle"
      >Create a custom category for your transaction</TheTypography
    >
    <div class="new-category-form__content">
      <div class="new-category-form__input">
        <InputField
          name="newCategory"
          type="text"
          placeholder="Enter new category name"
        />
      </div>
      <div class="new-category-form__select">
        <SelectField :options="transactionTypeOptions" name="transactionType" />
      </div>
      <div class="new-category-form__button">
        <TheButton type="submit" label="Add Category" />
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import TheTypography from "../TheTypography.vue";
import TheButton from "../TheButton.vue";
import SelectField from "../SelectField.vue";
import InputField from "../InputField.vue";
import type { TransactionTypeOption, TransactionType } from "@/types/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

type Submit = {
  category: string;
  transactionType: TransactionType;
};

defineProps<{ transactionTypeOptions: TransactionTypeOption[] }>();

const emit = defineEmits<{
  submit: [Submit];
}>();

const schema = toTypedSchema(
  z.object({
    newCategory: z.string().trim().min(1, "Category cannot be empty"),
    transactionType: z.enum(["income", "expense"]),
  }),
);

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    newCategory: "",
    transactionType: "expense",
  },
});

const onSubmit = handleSubmit((values) => {
  if (!meta.value.valid) return;
  emit("submit", {
    category: values.newCategory,
    transactionType: values.transactionType,
  });
  resetForm();
});
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
  min-width: 240px;
  gap: 20px;
  justify-content: space-between;
  height: auto;
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
