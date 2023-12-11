<script setup lang="ts">
import type { CodePlayerOptions } from '@sdl-life/runcode'
import CodePlayer from '@sdl-life/runcode'
import '@sdl-life/runcode/dist/style.css'
import { JsTemplate } from '~/templates/javascript'

const options: CodePlayerOptions = {
  appType: 'vue3',
  initFiles: JsTemplate,
  openConsole: true,
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
