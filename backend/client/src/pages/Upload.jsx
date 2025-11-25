import React, { useEffect, useState } from 'react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime']

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const BACKGROUNDS = [
  { id: 'random', label: 'Random' },
  { id: 'mint', label: 'Mint Gradient', css: 'linear-gradient(135deg,#a8ff78 0%,#78ffd6 100%)' },
  { id: 'sunset', label: 'Sunset', css: 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)' },
  { id: 'ocean', label: 'Ocean', css: 'linear-gradient(135deg,#5ee7df 0%,#b490ca 100%)' },
  { id: 'slate', label: 'Slate', css: 'linear-gradient(135deg,#3a7bd5 0%,#00d2ff 100%)' }
]

export default function Upload() {
  const [file, setFile] = useState(null)
  const [owner, setOwner] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [bg, setBg] = useState('random')
  const [bgCss, setBgCss] = useState('')

  useEffect(() => {
    const choose = (id) => {
      if (id === 'random') {
        const opts = BACKGROUNDS.filter(b => b.css)
        const pick = opts[Math.floor(Math.random() * opts.length)]
        setBgCss(pick.css)
      } else {
        const sel = BACKGROUNDS.find(b => b.id === id)
        setBgCss(sel && sel.css ? sel.css : '')
      }
    }
    choose(bg)
  }, [bg])

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0]
    setResult(null)
    setError(null)
    setProgress(0)
    if (!f) return setFile(null)
    // client-side validations
    if (!ALLOWED_TYPES.includes(f.type)) return setError('Unsupported file type')
    if (f.size > MAX_FILE_SIZE) return setError('File too large (max 5MB)')
    setFile(f)
    if (f.type.startsWith('image/')) setPreviewUrl(URL.createObjectURL(f))
    else setPreviewUrl(null)
  }

  const uploadFile = () => {
    setError(null)
    setResult(null)
    setProgress(0)
    if (!file) return setError('Select a file first')

    const form = new FormData()
    form.append('file', file)
    if (owner) form.append('ownerId', owner)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
    }

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText || '{}')
        if (xhr.status >= 200 && xhr.status < 300 && json.status) setResult(json)
        else setError(json.error || `Upload failed: ${xhr.status}`)
      } catch (err) {
        setError('Invalid response from server')
      }
    }

    xhr.onerror = () => setError('Network error during upload')
    xhr.send(form)
  }

  const containerStyle = {
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }

  const cardStyle = {
    width: '100%',
    maxWidth: 820,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 8px 30px rgba(2,6,23,0.08)',
    padding: 20,
    boxSizing: 'border-box'
  }

  const headerStyle = { margin: 0, marginBottom: 12 }

  return (
    <div style={{ ...containerStyle, background: bgCss || '#f7fafc' }}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Upload File</h2>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          <input type="file" onChange={handleFile} />
          <input
            placeholder="ownerId (optional, Mongo _id or username)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            style={{ padding: 8, minWidth: 200 }}
          />
          <div style={{ flex: '1 1 auto' }} />
          <button onClick={uploadFile} style={{ padding: '8px 16px' }}>Upload</button>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 200px' }}>
            {file ? (
              <div>
                <div style={{ fontWeight: 600 }}>{file.name}</div>
                <div style={{ color: '#666' }}>{formatBytes(file.size)}</div>
                {previewUrl && <img src={previewUrl} alt="preview" style={{ width: '100%', marginTop: 8, borderRadius: 6 }} />}
              </div>
            ) : (
              <div style={{ color: '#666' }}>No file selected</div>
            )}
          </div>

          <div style={{ flex: '1 1 300px' }}>
            <div>Progress: {progress}%</div>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

            {result && (
              <div style={{ marginTop: 12, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Upload result</div>
                <div><strong>Filename:</strong> {result.file.originalName || result.file.key}</div>
                <div><strong>Size:</strong> {result.file.size ? formatBytes(result.file.size) : 'N/A'}</div>
                <div><strong>MIME:</strong> {result.file.mime}</div>
                <div style={{ marginTop: 8 }}>
                  {result.file.url ? (
                    <a href={result.file.url} target="_blank" rel="noreferrer">Open uploaded file</a>
                  ) : (
                    <span>No URL available</span>
                  )}
                </div>
                {result.file.storedLocally && (
                  <div style={{ marginTop: 8, color: '#b45309' }}>
                    Note: upload to S3 failed — a local copy was saved on the server.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
