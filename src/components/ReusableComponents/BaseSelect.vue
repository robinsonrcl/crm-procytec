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
  options: {
    type: Array,
    required: true
  }
})

const uuid = UniqueID().getID().toString

</script>
<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <label :for="uuid" v-if="label">{{ label }}</label>
  </div>
  <select 
    :id="uuid"
    :value="modelValue"
    class="field"
    v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value)}
    }"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >{{ option }}</option>
  </select>
  
</template>

<style lang="scss" scoped></style>