<script setup lang="ts">

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <input
   type="checkbox"
   :checked="modelValue"
   @change="$emit('update:modelValue', $event.target.checked)"
   class="field"
  />
  <label v-if="label">{{ label }}</label>
</template>

<style lang="css" scoped>

</style>