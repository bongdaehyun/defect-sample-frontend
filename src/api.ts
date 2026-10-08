export type Post = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export type Notice = {
  title: string
  url: string
}

export type PostInput = Pick<Post, 'title' | 'content'>

export const users = ['tester1', 'tester2', 'dev1']

let currentUser = users[0]

export function setCurrentUser(user: string) {
  currentUser = user
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', 'X-User-Id': currentUser },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? body.detail ?? `요청에 실패했습니다. (${res.status})`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  list: () => request<Post[]>('/posts'),
  search: (keyword: string, from: string, to: string) =>
    request<Post[]>(`/posts/search?${new URLSearchParams({ keyword, from, to })}`),
  get: (id: number) => request<Post>(`/posts/${id}`),
  create: (input: PostInput) => request<Post>('/posts', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: number, input: PostInput) =>
    request<Post>(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  remove: (id: number) => request<void>(`/posts/${id}`, { method: 'DELETE' }),
  notices: () => request<Notice[]>('/notices'),
}
