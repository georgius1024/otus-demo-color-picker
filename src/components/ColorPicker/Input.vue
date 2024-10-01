<template>
  <input
    class="otus-color-picker__input"
    :value="colorValue"
    @focus="emit('focus')"
    @change="onChange"
  />
</template>
<script setup lang="ts">
import { inject, Ref } from 'vue';
const colorValue = inject<Ref<string>>('ColorValue');
const colorUpdate = inject<(value: string) => void>('ColorUpdate');
const emit = defineEmits(['focus'])
const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  colorUpdate && colorUpdate(value);
};

</script>
