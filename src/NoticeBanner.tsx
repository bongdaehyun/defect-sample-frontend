import { useEffect, useState } from 'react'
import { api, type Notice } from './api'

export default function NoticeBanner() {
  const [notices, setNotices] = useState<Notice[]>()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    api
      .notices()
      .then(setNotices)
      .catch(() => setFailed(true))
  }, [])

  if (failed) return <p className="notice">공지를 불러오지 못했습니다.</p>
  if (!notices) return <p className="notice">공지를 불러오는 중입니다...</p>
  return (
    <ul className="notice">
      {notices.map((notice) => (
        <li key={notice.url}>
          <a href={notice.url}>{notice.title}</a>
        </li>
      ))}
    </ul>
  )
}
