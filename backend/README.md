Shivani CMS — S3 Uploader

Overview

This README documents the server-side S3 upload feature added to the backend. The implementation lets clients POST files to the Node/Express API; the server validates the file, uploads it to an S3 bucket, persists metadata in MongoDB, and returns the resulting object information.

Key features
- Server-side upload endpoint: `POST /api/upload` (multipart form, field `file`)
- In-memory `multer` middleware for request parsing (suitable for small/medium files)
- S3 upload helper (`utils/s3Upload.js`) that returns a Promise
- Metadata persisted to MongoDB (`models/Media.js`)
- Owner support: accepts a MongoDB ObjectId or a plain `ownerId` string (stored in `ownerIdentifier`)
- Global error handling and request logging already present in `server.js`

Environment variables

Add the following variables to your `.env` (do NOT commit secrets):

- `MONGO_URI` - MongoDB connection string
- `PORT` - server port (default 5000)
- `AWS_ACCESS_KEY_ID` - AWS access key (for testing only; prefer IAM roles in production)
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., `ap-south-1`)
- `AWS_BUCKET` or `AWS_S3_BUCKET` or `AWS_BUCKET_NAME` - the S3 bucket name to upload to

Note: For local testing without real AWS credentials you can skip S3 config and enable the local fallback (see Local testing section).

How to test (server-side upload)

1) Start the backend

```bash
npm install
npm run dev
```

2) Upload a file using `curl` (example)

```bash
curl -v -X POST http://localhost/api/upload \
  -F "file=@/path/to/photo.jpg" \
  -F "ownerId=kanishke_db_user"
```

- Response on success:

```json
{
  "status": true,
  "file": {
    "id": "<mongo-id>",
    "key": "uploads/1700000000000-photo.jpg",
    "url": "https://your-bucket.s3.region.amazonaws.com/uploads/170000...-photo.jpg",
    "size": 12345,
    "mime": "image/jpeg",
    "etag": "\"...\""
  }
}
```

Local testing (no AWS credentials)

If you do not want to configure real AWS credentials yet, use the local fallback: the controller supports saving a local copy to the `uploads/` directory when no S3 bucket env var is set. This lets you test end-to-end without contacting AWS.

Files added/modified for the S3 uploader

- Added: `utils/s3Upload.js` — Promise-based S3 helper using `aws-sdk` v2
- Added: `models/Media.js` — Mongoose model to persist media metadata (owner, ownerIdentifier, key, url, mime, size, tags)
- Added: `controllers/uploadController.js` — validates, uploads to S3, saves metadata
- Added: `routes/uploadRoutes.js` — route `POST /api/upload` using multer memory storage
- Modified: `server.js` — mounted upload routes and included request logging and error handler

Data flow diagram

See `docs/data-flow-diagram.md` for an ASCII + Mermaid diagram describing the request flow.

Security & production notes

- Do NOT commit `.env` with credentials. Add `.env.example` with placeholders instead.
- For production, prefer assigning an IAM role to the host (EC2/ECS/EKS/Lambda) instead of environment access keys.
- Add bucket policy limiting `PutObject` to a specific prefix (e.g., `uploads/*`) and principal.
- Configure S3 CORS only when implementing direct browser uploads (presigned flow).
- Use SSE (S3-encryption) and enable CloudTrail / S3 access logs for auditing.
- For very large uploads (videos), switch from in-memory multer to disk streaming or implement presigned multipart uploads.

Next steps and optional enhancements

- Add presigned-URL endpoints to allow direct client -> S3 uploads (scales better)
- Add server-side image processing (thumbnails) via S3 events + Lambda or a worker
- Add lifecycle rules for object expiry/archival to control storage costs

Contact

The `client/` app includes a small upload demo page at `/upload` which demonstrates the server-side upload flow.

If you want additional work I can:
- Add a `.env.example` file with placeholders for MongoDB and AWS config.
- Implement the presigned-URL flow and provide example IAM/bucket policy for production.

Tell me which of these you'd like next.
