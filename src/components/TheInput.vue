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

<script setup lang="ts">
import { generateId } from "../utils/generateId.ts";
import { watch, ref } from "vue";

type InputType = "text" | "date";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    label?: string;
    type?: InputType;
    hasError?: boolean;
    errorMessage?: string;
  }>(),
  {
    type: "text",
    placeholder: "",
    hasError: false,
    errorMessage: "",
  },
);

const model = defineModel<string>({ default: "" });

const touched = ref<boolean>(false);
const randomId = generateId("input");

watch(model, (newValue) => {
  if (newValue === "") touched.value = false;
});

const onInput = (): void => {
  touched.value = true;
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
