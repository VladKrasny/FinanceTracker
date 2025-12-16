<template>
  <TheTextArea
    v-model="model"
    placeholder="Add notes..."
    fieldName="Add notes"
  />
</template>

<script>
import TheTextArea from "./TheTextArea.vue";

export default {
  name: "DescriptionTextArea",
  components: { TheTextArea },

  props: {
    modelValue: {
      type: String,
      default: "",
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
.description-text-area {
  height: 135px;
  overflow: hidden;
  border-radius: 15px;
}
</style>
