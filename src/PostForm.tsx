import { useState, type FormEvent } from 'react'
import { api, type Post } from './api'

type Props = {
  post?: Post
  onSaved: (id: number) => void
  onCancel: () => void
}

export default function PostForm({ post, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')

  function save(e: FormEvent) {
    e.preventDefault()
    const input = { title, content }
    const saving = post ? api.update(post.id, input) : api.create(input)
    saving.then((saved) => onSaved(saved.id)).catch((e: Error) => alert(e.message))
  }

  return (
    <form className="edit" onSubmit={save}>
      <input placeholder="제목" maxLength={100} required value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        placeholder="내용"
        maxLength={4000}
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="buttons">
        <button>저장</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  )
}
