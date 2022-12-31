<script setup lang="ts">
import { UniqueID } from '../../utils/utilidades'

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Boolean): void
}>()

function changeValue(event) {
  emit('update:modelValue', event.target.checked)
}

const uuid = UniqueID().getID()

</script>

<template>
  <div class="inputField">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      @change="changeValue"
      :id="uuid"
      class="fieldDos"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    />
    <label :for="uuid" class="label" v-if="label">{{ label }}</label>
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
.fieldDos {
  vertical-align: text-top !important;
  margin-right: 3px;
}
.label {
  text-decoration: underline;
}
</style>