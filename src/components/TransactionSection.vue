<template>
  <div class="TransactionSection">
    <TheTypography vatiant="title">{{ blockTitle }}</TheTypography>
    <TheList fieldName="Type" :options="typeOptions" v-model="selectedType" />
    <TheInput fieldName="Ammount" />
    <TheList
      fieldName="Category"
      :options="categoryOptions"
      v-model="selectedCategory"
    />
    <TheDate fieldName="Date" v-model="dateType" />
  </div>
</template>

<script>
import TheTypography from "./TheTypography.vue";
import TheList from "./TheList.vue";
import TheInput from "./TheInput.vue";
import TheDate from "./TheDate.vue";

export default {
  name: "TransactionSection",
  props: {
    blockTitle: {
      type: String,
    },
  },
  components: {
    TheTypography,
    TheList,
    TheInput,
    TheDate,
  },
  data() {
    return {
      selectedType: "expense",
      typeOptions: [
        { label: "Income", value: "income" },
        { label: "Expense", value: "expense" },
      ],
      selectedCategory: "",
      categoryOptions: [
        { label: "Groceries", value: "groceries" },
        { label: "Restaurants & Cafes", value: "restaurants" },
        { label: "Transport", value: "transport" },
        { label: "Fuel", value: "fuel" },
        { label: "Rent / Housing", value: "rent" },
        { label: "Utilities", value: "utilities" },
        { label: "Internet & Phone", value: "communication" },
        { label: "Clothing", value: "clothing" },
        { label: "Health & Pharmacy", value: "health" },
        { label: "Beauty & Care", value: "beauty" },
        { label: "Fitness & Sports", value: "fitness" },
        { label: "Entertainment", value: "entertainment" },
        { label: "Gifts", value: "gifts" },
        { label: "Travel", value: "travel" },
        { label: "Education", value: "education" },
        { label: "Home & Repairs", value: "home_repairs" },
        { label: "Electronics & Gadgets", value: "electronics" },
        { label: "Pets", value: "pets" },
        { label: "Bank Fees", value: "bank_fees" },
        { label: "Other", value: "other" },
      ],
      dateType: "",
    };
  },
};
</script>

<style scoped>
.TransactionSection {
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
