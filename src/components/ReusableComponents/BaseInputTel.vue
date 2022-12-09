<script setup lang="ts">
import { UniqueID } from '../../utils/utilidades'

defineProps({
  label:{
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const uuid = UniqueID().getID().toString

</script>

<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
  <div>
    <label :for="uuid" v-if="label" class="label">{{ label }}</label>
  </div>
    <input
      v-bind="$attrs"
      :placeholder="label"
      class="field, inputNew"
      :id="uuid"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="tel"
    >
  </div>
</template>

<style lang="css" scoped>
.label {
  font-size: small;
}
.inputNew {
  border-radius: 5px !important;
}
</style>