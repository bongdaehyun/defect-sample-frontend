import { useEffect, useState, type FormEvent } from 'react'
import { api, type Post } from './api'
import { formatDate } from './format'
import NoticeBanner from './NoticeBanner'

type Props = {
  onOpen: (id: number) => void
  onWrite: () => void
}

export default function PostList({ onOpen, onWrite }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [keyword, setKeyword] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    api.list().then(setPosts).catch((e: Error) => alert(e.message))
  }, [])

  function search(e: FormEvent) {
    e.preventDefault()
    api.search(keyword, from, to).then(setPosts).catch((e: Error) => alert(e.message))
  }

  return (
    <section>
      <NoticeBanner />
      <form className="search" onSubmit={search}>
        <input placeholder="제목" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <input type="date" aria-label="작성일 시작" value={from} onChange={(e) => setFrom(e.target.value)} />
        ~
        <input type="date" aria-label="작성일 끝" value={to} onChange={(e) => setTo(e.target.value)} />
        <button>검색</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <button className="link" onClick={() => onOpen(post.id)}>
                  {post.title}
                </button>
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
          {posts.length === 0 && (
            <tr>
              <td colSpan={4}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={onWrite}>글쓰기</button>
      </div>
    </section>
  )
}
