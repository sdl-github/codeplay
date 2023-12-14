<script setup lang="ts">
import type { CodeSnippet, CodeSnippetPageParams } from '~/api'

const templates = [
  {
    title: 'HTML基础模板',
    description: '包含HTML、JS、CSS',
    style: {
      background: 'linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%)',
    },
    options: {
      openConsole: true,
      appType: 'html',
    },
  },
  {
    title: 'Vue2模板',
    description: '包含Vue2 Elementui',
    style: {
      background: 'linear-gradient(rgb(245, 254, 242) 0%, rgb(230, 254, 238) 100%)',
    },
    options: {
      openConsole: true,
      appType: 'vue2',
    },
  },
  {
    title: 'Vue3模板',
    description: '包含Vue3 arco-design',
    style: {
      background: 'linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%)',
    },
    options: {
      openConsole: true,
      appType: 'vue3',
    },
  },
  {
    title: 'React+Antd模板',
    description: '包含React Antd TSX',
    style: {
      background: 'linear-gradient(rgb(247, 247, 255) 0%, rgb(236, 236, 255) 100%)',
    },
    options: {
      openConsole: true,
      appType: 'react',
    },
  },
]
const data = ref<CodeSnippet[]>([])
const hasNextPage = ref(true)
const loading = ref(true)

const params = reactive<CodeSnippetPageParams>({
  pageNo: 1,
  pageSize: 10,
})

function goRunCode(item: any) {
  const url = `/code?options=${JSON.stringify(item.options)}`
  window.open(url, '_blank')
}

function goRunCodeSnippet(item: CodeSnippet) {
  const url = `/code?id=${item.id}&${item.queryParams}`
  window.open(url, '_blank')
}

queryData()

async function queryData() {
  loading.value = true
  const { rows, hasNextPage: has } = await queryCodeSnippetPage(params)
  data.value = rows
  hasNextPage.value = !!has
  loading.value = false
}
</script>

<template>
  <div class="h-screen">
    <div class="radient-background" />
    <div class="h-[50px] flex items-center bg-white px-4">
      <div class="text-black">
        Code Snipets
      </div>
    </div>
    <div class="min-h-[calc(100vh-50px)] p-8">
      <div class="w-full flex justify-center">
        <div class="w-full rounded-[7px] bg-white p-6">
          <div>默认模板</div>
          <div class="mt-6 flex">
            <ACard
              v-for="(item, index) in templates" :key="index" hoverable class="mx-4 w-[300px]"
              @click="goRunCode(item)"
            >
              <template #cover>
                <div class="h-[100px]" :style="item.style" />
              </template>
              <a-card-meta :title="item.title" :description="item.description" />
            </ACard>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center">
        <div class="w-full rounded-[7px] bg-white p-6">
          <div class="flex items-center">
            <div>在线Code Snipets</div>
            <ATooltip placement="top" @click="queryData">
              <template #title>
                <span>刷新</span>
              </template>
              <AButton class="ml-2 flex items-center justify-center" :loading="loading" type="text">
                <template #icon>
                  <div class="i-carbon-renew" />
                </template>
              </AButton>
            </ATooltip>
          </div>
          <div class="mt-6 flex flex-wrap">
            <div v-if="loading" class="min-h-[400px] w-full">
              <a-skeleton active />
            </div>
            <template v-else>
              <ACard
                v-for="(item, index) in data" :key="index" hoverable class="mx-4 mb-4 w-[300px]"
                @click="goRunCodeSnippet(item)"
              >
                <template #cover>
                  <img
                    class="object-cover"
                    :alt="item.desc"
                    :src="item.thumbnail"
                  >
                </template>
                <a-card-meta :title="item.title" :description="item.desc" />
              </ACard>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.radient-background {
  background-image: radial-gradient(rgba(255, 255, 255, .25), rgba(255, 255, 255, 0) 40%), radial-gradient(hsla(44, 100%, 66%, 1) 30%, hsla(338, 68%, 65%, 1), hsla(338, 68%, 65%, .4) 41%, transparent 52%), radial-gradient(hsla(272, 100%, 60%, 1) 37%, transparent 46%), linear-gradient(155deg, transparent 65%, hsla(142, 70%, 49%, 1) 95%), linear-gradient(45deg, hsla(213, 100%, 44%, 1), hsla(209, 100%, 53%, 1));
  background-position: bottom left, 109% 68%, 109% 68%, center, center;
  background-size: 200% 200%, 285% 500%, 285% 500%, cover, cover;
  background-repeat: no-repeat;
  opacity: .08;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
