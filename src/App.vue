<template>
  <div class="first">hhhhh</div>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCounterStore } from '@/stores/index'
</script>

<style lang="scss" scoped>
.first {
  width: 600px;
  height: 400px;
  background: blue;
}
</style>
