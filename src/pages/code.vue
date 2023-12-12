<script setup lang="ts">
import qs from 'query-string'
import type { CodePlayerOptions } from '@sdl-life/runcode'
import CodePlayer from '@sdl-life/runcode'
import '@sdl-life/runcode/dist/style.css'
import { message } from 'ant-design-vue'
import html2canvas from 'html2canvas'
import useSWRV from 'swrv'
import { HtmlTemplate } from '~/templates/javascript'
import type { CodeSnippet } from '~/api'

const route = useRoute()
const saveLoading = ref(false)
const open = ref(false)
const codePlayerRef = ref()

const formRef = ref()
const id = computed(() => route.query.id as string)

const { data } = useSWRV(`queryCodeSnippet/${id.value}`, () => queryCodeSnippet(id.value))
const dataLoading = computed(() => id.value && !data)
const form = ref<CodeSnippet>({})

watchEffect(() => {
  if (data.value && data.value.id) {
    form.value.id = data.value.id
    form.value.title = data.value.title
    form.value.desc = data.value.desc
  }
})

const rules = {
  title: [
    {
      required: true,
      message: '标题不能为空',
    },
  ],
}

const options = computed<CodePlayerOptions>(() => {
  let obj = {
    openConsole: true,
    initFiles: HtmlTemplate,
  }
  if (route.hash)
    return { }

  if (route.query.options)
    obj = JSON.parse(route.query.options as string)

  return obj
})
function handleCopy() {
  const url = window.location.href
  copy(url, () => {
    message.success('复制成功')
  })
}

// 获取缩略图
function getIframeThumbnail(): Promise<string> {
  return new Promise((resolve, reject) => {
    const iframe = document.querySelector('.codeplayer-iframe') as HTMLIFrameElement
    const iframeWin = iframe.contentWindow
    const iframeContent = iframeWin?.document.querySelector('body')
    html2canvas(iframeContent as HTMLElement, {
      useCORS: true,
      width: 500,
      height: 500,
    }).then((canvas) => {
      const res = canvas.toDataURL('image/png', 0.6)
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

function handleOk() {
  formRef.value?.validate()
    .then(async () => {
      try {
        saveLoading.value = true
        const thumbnail = await getIframeThumbnail()
        const data = {
          ...form.value,
          thumbnail,
          queryParams: `${qs.stringify(route.query as any)}/${route.hash}`,
        }
        const api = form.value.id ? updateCodeSnippet : createCodeSnippet
        const { id } = await api(data)
        if (!form.value.id)
          form.value.id = id
        message.success('保存成功')
        open.value = false
        saveLoading.value = false
      }
      catch (err) {
        saveLoading.value = false
      }
    })
}
</script>

<template>
  <div>
    <AModal
      v-model:open="open" ok-text="保存" cancel-text="取消" :confirm-loading="saveLoading" :closable="false" :title="data?.id ? '更新' : '保存'"
      @ok="handleOk"
    >
      <AForm ref="formRef" :model="form" :rules="rules" class="mt-4">
        <AFormItem name="title">
          <AInput v-model:value="form.title" placeholder="标题" allow-clear />
        </AFormItem>
        <AFormItem name="desc">
          <AInput v-model:value="form.desc" placeholder="描述" allow-clear />
        </AFormItem>
      </AForm>
    </AModal>
    <div v-if="dataLoading">
      <ASpin />
    </div>
    <CodePlayer v-else ref="codePlayerRef" :options="options" class="codeplayer-container">
      <template #toolbar>
        <div class="h-[50px] flex items-center justify-between border-b border-gray-200 px-4">
          <div class="flex items-center">
            <div>Code Snipets</div>

            <ATooltip placement="top" @click="() => open = true">
              <template #title>
                <span>保存</span>
              </template>
              <AButton class="ml-6 flex items-center justify-center" :loading="saveLoading" type="text">
                <template #icon>
                  <div class="i-carbon-save" />
                </template>
              </AButton>
            </ATooltip>

            <ATooltip placement="top">
              <template #title>
                <span>复制完整分享链接</span>
              </template>
              <AButton type="text" class="ml-1 flex items-center justify-center" @click="handleCopy">
                <template #icon>
                  <div class="i-carbon-copy" />
                </template>
              </AButton>
            </ATooltip>
          </div>
        </div>
      </template>
    </CodePlayer>
  </div>
</template>

<style scoped>
.codeplayer-container {
  max-height: 100vh;
  height: 100vh;
}
</style>
