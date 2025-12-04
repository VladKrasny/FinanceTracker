<template>
  <div class="dataField">
    <label for="dateInput">{{ fieldName }}</label
    ><input class="date" type="date" id="dateInput" v-model="model" />
  </div>
</template>
<script>
export default {
  name: "TheDate",

  props: {
    fieldName: String,
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      date: "",
    };
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.dataField {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.date {
  width: 340px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}
</style>
