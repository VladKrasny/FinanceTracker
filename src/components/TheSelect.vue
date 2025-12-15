<template>
  <div class="select">
    <label :for="randomId">{{ fieldName }}</label>

    <select class="select__options" :id="randomId" v-model="model">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { generateId } from "../utils/generateId.js";

export default {
  name: "TheSelect",

  props: {
    fieldName: String,
    options: {
      type: Array,
      require: true,
    },
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      randomId: generateId("select"),
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
.select {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.select__options {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  cursor: pointer;
  padding: 10px;
}
</style>
