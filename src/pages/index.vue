<script setup lang="ts">
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
]

function goRunCode(item: any) {
  const url = `/code?options=${JSON.stringify(item.options)}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="h-screen">
    <div class="radient-background" />
    <div class="h-[50px] flex items-center bg-white px-4">
      <div class="text-black">
        Run Code
      </div>
    </div>
    <div class="min-h-[calc(100vh-50px)] p-8">
      <div class="w-full flex justify-center">
        <div class="w-full rounded-[7px] bg-white p-6">
          <div>默认模板</div>
          <div class="mt-6 flex">
            <ACard v-for="(item, index) in templates" :key="index" hoverable style="width: 300px">
              <template #cover>
                <div class="h-[100px]" :style="item.style" />
              </template>
              <template #actions>
                <AButton @click="goRunCode(item)">
                  打开
                </AButton>
              </template>
              <a-card-meta :title="item.title" :description="item.description" />
            </ACard>
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
