<script setup lang="ts">
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

</script>
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select 
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
  </div>
</template>

<style lang="scss" scoped></style>