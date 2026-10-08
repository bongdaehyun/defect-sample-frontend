import { useEffect, useState } from 'react'
import { api, type Post } from './api'
import { formatDate } from './format'

type Props = {
  id: number
  onEdit: (post: Post) => void
  onBack: () => void
}

export default function PostDetail({ id, onEdit, onBack }: Props) {
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    api.get(id).then(setPost).catch((e: Error) => alert(e.message))
  }, [id])

  function remove() {
    if (!confirm('삭제하시겠습니까?')) return
    api.remove(id).then(onBack).catch((e: Error) => alert(e.message))
  }

  if (!post) return null

  return (
    <article>
      <h2>{post.title}</h2>
      <p>
        {post.author} · {formatDate(post.createdAt)}
      </p>
      <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
      <div className="buttons">
        <button onClick={() => onEdit(post)}>수정</button>
        <button onClick={remove}>삭제</button>
        <button onClick={onBack}>목록</button>
      </div>
    </article>
  )
}
