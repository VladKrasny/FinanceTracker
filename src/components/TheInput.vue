<template>
  <div class="input">
    <label v-if="label" :for="randomId">{{ label }}</label>
    <input
      class="input__field"
      :type="type"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      :class="{ 'input__field--error': hasError && touched }"
      @input="onInput"
    />
    <p v-if="errorMessage && touched" class="input__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { generateId } from "../utils/generateId.js";
import { watch, ref } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  label: { type: String, required: false },
  type: {
    type: String,
    default: "text",
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const touched = ref(false);
const randomId = generateId("input");

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === "") {
      touched.value = false;
    }
  },
);

const onInput = () => {
  touched.value = true;
};

const model = defineModel({ default: "" });
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
