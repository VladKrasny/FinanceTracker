<template>
  <div class="input">
    <label :for="randomId">{{ label }}</label>
    <input
      class="input__field"
      :type="type"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      :class="{ 'input__field--error': hasError }"
    />
    <p v-if="errorMessage" class="input__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { generateId } from "../utils/generateId.js";

export default {
  name: "TheInput",

  props: {
    placeholder: {
      type: String,
      default: "",
    },
    label: { type: String, reuqired: true },
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
    errorMessage: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      randomId: generateId("input"),
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
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input__field {
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}

.input__field--error {
  border-color: red;
}

.input__error-message {
  color: red;
  font-size: 18px;
}
</style>
