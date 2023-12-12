export function copy(content: string, callback?: () => void) {
  // 创建输入框元素
  const input = document.createElement('input')// 不会保留文本格式
  // 如果要保留文本格式，比如保留换行符，或者多行文本，可以使用  textarea 标签，再配和模板字符串 ` `
  // const input = document.createElement('textarea')
  // 将想要复制的值
  input.value = content
  // 页面底部追加输入框
  document.body.appendChild(input)
  // 选中输入框
  input.select()
  // 执行浏览器复制命令
  document.execCommand('Copy')
  // 弹出复制成功信息
  callback && callback()
  // 复制后移除输入框
  input.remove()
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
