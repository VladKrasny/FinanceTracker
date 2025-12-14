<template>
  <div class="text-area">
    <label :for="randomId">{{ fieldName }}</label>
    <textarea
      class="text-area__input"
      ref="textArea"
      :id="randomId"
      v-model="model"
      :placeholder="placeholder"
      :class="{ 'text-area__input--error': hasError }"
      @input="sizeCheck"
    ></textarea>
    <p v-if="errorMessage" class="text-area__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { generateId } from "../utils/generateId.js";

export default {
  name: "TheTextArea",

  props: {
    placeholder: {
      type: String,
      default: "",
    },
    fieldName: String,
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
      randomId: generateId("textarea"),
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

  methods: {
    sizeCheck() {
      const el = this.$refs.textArea;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    },
  },

  watch: {
    model: {
      handler() {
        this.sizeCheck();
      },
      immediate: true,
      flush: "post",
    },
  },
};
</script>

<style scoped>
.text-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-area__input {
  width: 100%;
  min-height: 80px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}
.text-area__input--error {
  border-color: red;
}
.text-area__error-message {
  color: red;
  font-size: 18px;
}
</style>
