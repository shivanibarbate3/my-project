Shivani CMS - Upload Data Flow

ASCII overview

Client (browser / mobile / curl)
  └─ POST /api/upload (multipart/form-data, field `file`)
      └─ Express server (`/routes/uploadRoutes.js`) with `multer` middleware
          └─ `controllers/uploadController.uploadFile`
              ├─ validate file type/size
              ├─ generate S3 key (uploads/<timestamp>-basename)
              ├─ `utils/s3Upload.uploadToS3` uploads buffer to S3
              ├─ receive S3 response (Location, Key, ETag)
              ├─ persist metadata to MongoDB (`models/Media`)
              └─ return JSON response to client

Mermaid diagram

```mermaid
flowchart LR
  A[Client] -- POST /api/upload --> B[Express + multer]
  B --> C[uploadController.uploadFile]
  C --> D{Validate file}
  D -->|ok| E[uploadToS3]
  E --> F[S3 Bucket]
  F --> G[S3 returns Location/ETag]
  G --> H[Persist Media document in MongoDB]
  H --> I[Response: {key,url,size,mime,etag}]
  D -->|bad| J[400 error]
  E -->|fail| K[500 error]
```

Notes
- For presigned flow, the path differs: client requests presigned URL from server → client PUTs directly to S3 → client notifies server to persist metadata.
- For large video uploads use multipart uploads or presigned multipart to reduce server memory/bandwidth usage.
