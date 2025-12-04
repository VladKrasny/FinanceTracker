<template>
  <div class="list">
    <label for="type">{{ fieldName }}</label>

    <select class="list__options" id="type" v-model="model">
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
export default {
  name: "TheList",

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
.list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.list__options {
  width: 340px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  cursor: pointer;
  padding: 10px;
}
</style>
