import { useState } from 'react'
import { setCurrentUser, users, type Post } from './api'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import PostList from './PostList'

type View = { name: 'list' } | { name: 'detail'; id: number } | { name: 'form'; post?: Post }

export default function App() {
  const [view, setView] = useState<View>({ name: 'list' })
  const [user, setUser] = useState(users[0])

  function changeUser(next: string) {
    setCurrentUser(next)
    setUser(next)
  }

  const list = () => setView({ name: 'list' })
  const detail = (id: number) => setView({ name: 'detail', id })

  return (
    <main>
      <header>
        <h1>
          <button className="link" onClick={list}>
            게시판
          </button>
        </h1>
        <select aria-label="사용자" value={user} onChange={(e) => changeUser(e.target.value)}>
          {users.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </header>
      {view.name === 'list' && <PostList onOpen={detail} onWrite={() => setView({ name: 'form' })} />}
      {view.name === 'detail' && (
        <PostDetail id={view.id} onEdit={(post) => setView({ name: 'form', post })} onBack={list} />
      )}
      {view.name === 'form' && (
        <PostForm post={view.post} onSaved={detail} onCancel={view.post ? () => detail(view.post!.id) : list} />
      )}
    </main>
  )
}
