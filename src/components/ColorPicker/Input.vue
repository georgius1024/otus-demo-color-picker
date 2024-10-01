<template>
  <input
    class="otus-color-picker__input"
    :value="colorValue"
    @focus="emit('focus')"
    @change="onChange"
  />
</template>
<script setup lang="ts">
import useColorContext from './ColorContext';
const {colorValue, colorUpdate} = useColorContext()

const emit = defineEmits(['focus'])
const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  colorUpdate && colorUpdate(value);
};

</script>
