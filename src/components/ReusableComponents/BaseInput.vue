<script setup lang="ts">

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

</script>

<template>
  <div>
    <label>{{ label }}</label>
      <input
      v-bind="$attrs"
        :placeholder="label"
        class="field"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
  </div>
</template>

<style lang="css" scoped>
</style>