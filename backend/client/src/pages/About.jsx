import React, { useEffect, useState } from 'react'

export default function About() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/about')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const ct = res.headers.get('content-type') || ''
        if (ct.includes('application/json')) return res.json()
        const text = await res.text()
        throw new Error('Expected JSON but got: ' + (text ? text.slice(0, 300) : '<empty response>'))
      })
      .then(setData)
      .catch(err => setError(err.message || String(err)))
  }, [])

  return (
    <div>
      <h2>About</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre style={{ whiteSpace: 'pre-wrap' }}>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  )
}
