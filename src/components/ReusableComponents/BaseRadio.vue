<script setup lang="ts">
import { UniqueID } from '../../utils/utilidades'

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  value: {
    type: [String, Number],
    required: true
  }
})

const uuid = UniqueID().getID().toString

</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
    <input
      :id="uuid"
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
      v-bind="$attrs"
    />
    <label :for="uuid" v-if="label">{{ label }}</label>
</template>

<style lang="css" scoped></style>