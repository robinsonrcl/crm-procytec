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
  },
  error: {
    type: String,
    default: ''
  }
})

const uuid = UniqueID().getID()

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
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    >
    <p
      v-if="error"
      class="errorMessage"
      :id="`${uuid}-error`"
      aria-live="assertive"
    >
      {{ error }}
    </p>
  </div>
</template>

<style lang="css" scoped>
.label {
  font-size: small;
}
.inputNew {
  border-radius: 5px !important;
  line-height: normal;
}
</style>