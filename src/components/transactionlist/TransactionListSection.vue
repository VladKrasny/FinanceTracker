<template>
  <div class="transaction-list-section">
    <div class="transaction-list-section__header">
      <TheTypography variant="title">{{ title }}</TheTypography>
      <TheTypography variant="subtitle">
        {{ subtitle }}
      </TheTypography>
      <div class="transaction-list-section__filters">
        <div>
          <TheSelect
            class="transaction-list-section__select"
            :options="transactionTypeOptionsWithAll"
            v-model="typeModel"
          />
        </div>
        <div>
          <TheSelect
            class="transaction-list-section__select"
            :options="categoryOptionsByTypeWithAll"
            v-model="categoryModel"
          />
        </div>
      </div>
    </div>
    <div class="transaction-list-section__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheTypography from "../TheTypography.vue";
import TheSelect from "../TheSelect.vue";

export default {
  name: "TransactionListSection",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    categoryOptionsByTypeWithAll: { type: Array, required: true },
    transactionTypeOptionsWithAll: { type: Array, required: true },
  },
  components: { TheTypography, TheSelect },
  data() {
    return {
      typeModel: "All",
      categoryModel: "All",
    };
  },

  emits: ["type", "category"],
  watch: {
    typeModel() {
      this.categoryModel = "All";
      this.emitFilters();
    },
    categoryModel() {
      this.emitFilters();
    },
  },

  methods: {
    emitFilters() {
      this.$emit("type", this.typeModel);
      this.$emit("category", this.categoryModel);
    },
  },
};
</script>
<style scoped>
.transaction-list-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  height: 650px;
  max-height: 650px;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 400px;
}
.transaction-list-section__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction-list-section__content {
  height: 550px;
  max-height: 550px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.transaction-list-section__select {
  max-width: 150px;
  min-width: 150px;
}
.transaction-list-section__filters {
  gap: 15px;
  display: flex;
}
</style>
