<template>
  <div class="otus-color-picker otus-color-picker__wrapper" ref="widgetRef">
    <div
      class="otus-color-picker__color-swatch"
      :style="{ backgroundColor: colorValue }"
    ></div>
    <input
      class="otus-color-picker__input"
      :value="colorValue"
      @focus="popupOpen = true"
      @change="onChange"
    />
    <div class="otus-color-picker__popup" :class="{ open: popupOpen }">
      <div class="otus-color-picker__hue-picker" @click="hueClick">
        <div
          class="otus-color-picker__marker"
          :style="{ left: `${hueX}%`, top: `${50}%` }"
        />
      </div>
      <div
        class="otus-color-picker__lightness-and-saturation-picker"
        :style="{ backgroundColor: baseColor }"
        @click="saturationHandler"
      >
        <div class="otus-color-picker__saturation-picker"></div>
        <div class="otus-color-picker__lightness-picker"></div>
        <div
          class="otus-color-picker__marker"
          :style="{ left: `${saturationX}%`, top: `${saturationY}%` }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import tinycolor2 from 'tinycolor2';

type HSV = tinycolor2.ColorFormats.HSV;

const props = defineProps({
  modelValue: { type: String, required: true }
});
const emit = defineEmits(['update:modelValue']);
const popupOpen = ref(false);
const widgetRef = ref(null);

const colorValue = ref(props.modelValue);
const onUpdate = (value: string) => {
  emit('update:modelValue', value);
  colorValue.value = value;
};
provide('ColorValue', colorValue);
provide('ColorUpdate', onUpdate);

const getHSV = (): HSV => tinycolor2(colorValue?.value).toHsv();
const fromHSV = (value: HSV): string => tinycolor2(value).toHexString();
const colorHSV = computed({
  get: getHSV,
  set: (value: HSV) => onUpdate(fromHSV(value))
});
const baseColor = computed<string>(() =>
  tinycolor2({ ...colorHSV.value, s: 1, v: 1 }).toHexString()
);

onClickOutside(widgetRef, () => (popupOpen.value = false));

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  onUpdate(value);
};

const hueClick = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, width } = (e.target as HTMLDivElement).getBoundingClientRect();
  const clickX = e.clientX - left;
  const angle = (clickX / width) * 360;
  colorHSV.value = { ...colorHSV.value, h: angle };
};

const saturationHandler = (e: MouseEvent) => {
  e.stopPropagation();
  const { left, top, width, height } = (
    e.target as HTMLDivElement
  ).getBoundingClientRect();
  const clickX = e.clientX - left;
  const clickY = e.clientY - top;
  const saturation = clickX / width;
  const brightness = 1 - clickY / height;
  colorHSV.value = {
    ...colorHSV.value,
    s: saturation,
    v: brightness
  };
};

const hueX = computed(() => {
  return (colorHSV.value.h / 360) * 100;
});

const saturationX = computed(() => {
  return colorHSV.value.s * 100;
});

const saturationY = computed(() => {
  return 100 - colorHSV.value.v * 100;
});
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
.otus-color-picker__color-swatch {
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