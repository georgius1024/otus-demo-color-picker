<template>
  <div class="otus-color-picker otus-color-picker__wrapper" ref="widgetRef">
    <ColorSwatch />
    <input
      class="otus-color-picker__input"
      :value="colorValue"
      @focus="popupOpen = true"
      @change="onChange"
    />
    <div class="otus-color-picker__popup" :class="{ open: popupOpen }">
      <HuePicker />
      <LightnessAndSaturationPicker />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, computed, Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ColorSwatch from './ColorSwatch.vue';
import HuePicker from './HuePicker.vue';
import LightnessAndSaturationPicker from './LightnessAndSaturationPicker.vue';
const props = defineProps({
  modelValue: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);
const popupOpen = ref(false);
const widgetRef = ref(null);

const colorValue = computed<string>(() => props.modelValue)
const colorUpdate = (value: string) => {
  emit('update:modelValue', value);
};
provide<Ref<string>>('ColorValue', colorValue);
provide<(value: string)=>void>('ColorUpdate', colorUpdate);

onClickOutside(widgetRef, () => (popupOpen.value = false));

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  colorUpdate(value);
};
</script>

<style lang="scss" scoped>
.otus-color-picker__wrapper {
  box-sizing: border-box;
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
  &:focus-within {
    outline: 2px solid navy;
    outline-offset: 0px;
  }
}

.otus-color-picker__input {
  border: none;
  outline: none;
  flex-grow: 1;
}

.otus-color-picker__popup {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  border: 1px solid #cccccc;
  box-shadow: 2px 2px 2px #cccccc;
  overflow: hidden;
  background-color: white;
  opacity: 0;
  height: 0;
  transition: 200ms all ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  &.open {
    opacity: 1;
    height: 250px;
    z-index: 1;
  }
}
</style>
