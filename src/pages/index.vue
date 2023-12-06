<script setup lang="ts">
import type { CodePlayerOptions } from 'codeplayer'
import CodePlayer from 'codeplayer'
import 'codeplayer/dist/style.css'

const options: CodePlayerOptions = {
  appType: 'vue3',
}
</script>

<template>
  <div>
    <CodePlayer :options="options" class="codeplayer-container" />
  </div>
</template>

<style scoped>
  .codeplayer-container {
    max-height: 100vh;
    height: 100vh;
  }
</style>
