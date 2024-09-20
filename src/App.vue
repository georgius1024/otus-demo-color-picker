<script setup lang="ts">
import { ref } from 'vue';
import ColorPicker from './components/ColorPicker';
const color = ref('#cc0000');
</script>

<template>
  <div class="container vh-100">
    <div class="d-flex flex-column gap-4 bg-white">
      <label>
        Color picker
        <ColorPicker v-model="color" />
      </label>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
