<script setup lang="ts">
import type { CodePlayerOptions } from '@sdl-life/runcode'
import CodePlayer from '@sdl-life/runcode'
import '@sdl-life/runcode/dist/style.css'
import { HtmlTemplate } from '~/templates/javascript'

const route = useRoute()
const loading = ref(true)

const options = computed<CodePlayerOptions>(() => {
  let obj = {
    openConsole: true,
    initFiles: HtmlTemplate,
  }
  if (route.query.options) {
    obj = JSON.parse(route.query.options as string)
    loading.value = false
  }
  return obj
})
</script>

<template>
  <div>
    <div v-if="loading">
      <ASpin />
    </div>
    <CodePlayer :options="options" class="codeplayer-container" />
  </div>
</template>

<style scoped>
  .codeplayer-container {
    max-height: 100vh;
    height: 100vh;
  }
</style>
