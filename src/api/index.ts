export interface IPage<O> {
  hasNextPage?: boolean
  rows: O[]
  total: number
  pageNo?: number
  pageSize?: number
}
export interface CodeSnippet {
  id?: string
  userId?: string
  title?: string
  desc?: string
  queryParams?: string
  template?: string
  thumbnail?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}

export function createCodeSnippet(data: CodeSnippet): Promise<{ id: string }> {
  return request({
    url: '/codeSnippet',
    method: 'post',
    data,
  })
}

export function updateCodeSnippet(data: CodeSnippet): Promise<{ id: string }> {
  return request({
    url: '/codeSnippet',
    method: 'put',
    data,
  })
}

export interface CodeSnippetPageParams {
  pageNo?: number
  pageSize?: number
  title?: string
  desc?: string
  userId?: string
}

export function queryCodeSnippetPage(params?: CodeSnippetPageParams): Promise<IPage<CodeSnippet>> {
  return request({
    url: '/codeSnippet',
    method: 'get',
    params,
  })
}

export function queryCodeSnippet(id: string): Promise<CodeSnippet> {
  return request({
    url: `/codeSnippet/${id}`,
    method: 'get',
  })
}
