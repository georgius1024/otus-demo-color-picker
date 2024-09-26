<template>
  <input
    class="otus-color-picker__input"
    :value="color"
    @focus="emit('focus')"
    @change="onChange"
  />
</template>
<script setup lang="ts">
defineProps({
  color: { type: String, required: true }
});
const emit = defineEmits(['change', 'focus']);

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('change', value);
};

</script>
