<template>
  <label :for="randomId">{{ fieldName }}</label>
  <textarea
    class="text-area"
    ref="textArea"
    :id="randomId"
    v-model="model"
    :placeholder="placeholder"
    :class="{ 'text-area--error': hasError }"
    @input="sizeCheck"
  ></textarea>
  <p v-if="errorMessage" class="text-area__error-message">
    {{ errorMessage }}
  </p>
</template>

<script>
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
      randomId: `textarea-${Math.random().toString(36).slice(2, 9)}`,
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
    model(value) {
      this.$nextTick(() => {
        this.sizeCheck();
      });
    },
  },
  mounted() {
    this.sizeCheck();
  },
};
</script>

<style scoped>
.text-area {
  width: 100%;
  min-height: 80px;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 10px;
}
.text-area--error {
  border-color: red;
}
.text-area__error-message {
  color: red;
  font-size: 18px;
}
</style>
