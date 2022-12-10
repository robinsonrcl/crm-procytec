<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

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

function changeSelect(event) {
  // ($event) => { $emit('update:modelValue', $event.target.value)}
  const label = event.target.selectedOptions[0]._value.flag;
  const name = event.target.selectedOptions[0]._value.name;
  // event.target.selectedOptions[0].label = label;

  // alert(name)
  emit('update:modelValue', event.target.value)
}

</script>
<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div>
    <label v-if="label">{{ label }}</label>
  </div>
  <select 
    :value="modelValue"
    class="field"
    v-bind="{
      ...$attrs,
      onChange: changeSelect
    }"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option.name === modelValue"
    >{{ option.flag }}{{ option.name}}</option>
  </select>
  
</template>

<style lang="scss" scoped></style>
