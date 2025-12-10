<template>
  <div class="input-field">
    <label for="Input">{{ fieldName }}</label>
    <input
      :type="type"
      id="Input"
      v-model="model"
      :placeholder
      :class="{ error: hasError }"
    />
  </div>
</template>

<script>
export default {
  name: "TheInput",

  props: {
    placeholder: {
      type: String,
      default: "Enter ammount",
    },
    fieldName: String,
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],

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
.input-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input {
  width: 340px;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}

input.error {
  border-color: red;
}
</style>
