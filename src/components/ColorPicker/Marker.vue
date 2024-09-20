<template>
    <div
    class="otus-color-picker__marker"
    :style="{ left: `${x}%`, top: `${y ?? 50}%` }"
  >
  </div>
</template>
<script setup lang="ts">

defineProps({
  x: {type: Number},
  y: {type: Number}
})
</script>
<style lang="scss" scoped>
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