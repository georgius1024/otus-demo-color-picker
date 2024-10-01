<template>
  <div class="otus-color-picker otus-color-picker__wrapper" ref="widgetRef">
    <ColorSample />
    <Input class="otus-color-picker__input" @focus="popupOpen = true" />
    <Popup :open="popupOpen">
      <HuePicker />
      <SaturationBrightnessPicker />
    </Popup>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Popup from './Popup.vue';
import Input from './Input.vue';
import HuePicker from './HuePicker.vue';
import ColorSample from './ColorSample.vue';
import SaturationBrightnessPicker from './SaturationBrightnessPicker.vue';

const props = defineProps({
  modelValue: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);
const popupOpen = ref(false);
const widgetRef = ref(null);

const colorValue = ref(props.modelValue);
const colorUpdate = (value: string) => {
  emit('update:modelValue', value);
  colorValue.value = value;
};

onClickOutside(widgetRef, () => (popupOpen.value = false));

provide<Ref<string>>('ColorValue', colorValue);
provide<(value: string) => void>('ColorUpdate', colorUpdate);
</script>

<style lang="scss">
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
.otus-color-picker__color-sample {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
.otus-color-picker__hue-picker {
  height: 24px;
  display: block;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
  position: relative;
}
.otus-color-picker__lightness-and-saturation-picker {
  height: 240px;
  overflow: visible;
  border-radius: 4px;
  position: relative;
  display: block;
  .otus-color-picker__lightness-picker {
    position: absolute;
    background: linear-gradient(to top, #000, #0000);
    inset: 0;
  }
  .otus-color-picker__saturation-picker {
    position: absolute;
    background: linear-gradient(to right, #fff, #fff0);
    inset: 0;
  }
}
.otus-color-picker__marker {
  height: 16px;
  width: 16px;
  border-radius: 100%;
  border: 1px double #fff;
  box-shadow: 1px 1px 2px #333;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
