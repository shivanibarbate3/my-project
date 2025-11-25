#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { uploadToS3 } = require('../utils/s3Upload');

const Media = require('../models/Media');

async function main() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.error('Uploads directory does not exist:', uploadsDir);
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const files = fs.readdirSync(uploadsDir).filter(f => !f.startsWith('.'));
  if (files.length === 0) {
    console.log('No files to upload in', uploadsDir);
    process.exit(0);
  }

  for (const file of files) {
    const localPath = path.join(uploadsDir, file);
    const stat = fs.statSync(localPath);
    if (!stat.isFile()) continue;

    const key = `uploads/${file}`;
    console.log('Uploading', localPath, 'to S3 key', key);

    try {
      const stream = fs.createReadStream(localPath);
      const s3res = await uploadToS3({ Body: stream, Key: key });
      console.log('Uploaded to S3:', s3res.Location || `(key: ${s3res.Key})`);

      // Update Media document(s) referencing local file
      const localUrl = `/uploads/${file}`;
      const doc = await Media.findOneAndUpdate(
        { $or: [{ url: localUrl }, { key: key }], status: 'stored_local' },
        { $set: { url: s3res.Location || `https://${process.env.AWS_BUCKET || process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`, status: 'uploaded' } },
        { new: true }
      );
      if (doc) console.log('Updated Media doc:', doc._id.toString());

      // Remove local file
      fs.unlinkSync(localPath);
      console.log('Removed local file:', localPath);
    } catch (err) {
      console.error('Failed to upload', localPath, err && err.message ? err.message : err);
    }
  }

  await mongoose.disconnect();
  console.log('Done');
}

main().catch(err => {
  console.error('Sync failed:', err && err.stack ? err.stack : err);
  process.exit(1);
});
