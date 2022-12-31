<script setup lang="ts">

defineProps({
  options: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  vertical: {
    type: Boolean,
    default: false
  }
})

</script>
<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <component 
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span' "
    :class="{ horizontal: !vertical }"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
</template>

<style lang="css" scoped>
.horizontal {
  margin-right: 20px;
}
</style>