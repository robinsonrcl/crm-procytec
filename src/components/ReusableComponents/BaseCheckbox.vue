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
  <div class="inputField">
    <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="fieldDos"
    />
    <label class="label" v-if="label">{{ label }}</label>
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