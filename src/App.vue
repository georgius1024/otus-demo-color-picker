<script setup lang="ts">
import { ref } from 'vue';
import ColorPicker from './components/ColorPicker';
const color = ref('#cc0000');
</script>

<template>
  <div class="container vh-100" :style="{backgroundColor: color}">
    <div class="d-flex flex-column gap-4 bg-white">
      <h1>Color picker</h1>
      <ColorPicker v-model="color" />
      <hr />
      {{color}}
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
