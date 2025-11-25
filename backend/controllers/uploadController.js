const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { uploadToS3 } = require('../utils/s3Upload');

exports.uploadFile = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ status: false, error: 'No file provided' });

    // Basic validation - allow images and mp4 videos
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime'];
    if (!allowed.includes(file.mimetype)) return res.status(400).json({ status: false, error: 'Unsupported file type' });

    // Build a safe key (uploads/<timestamp>-basename)
    const basename = path.basename(file.originalname).replace(/\s+/g, '_');
    const key = `uploads/${Date.now()}-${basename}`;

    // Upload buffer to S3. If S3 upload fails, save the file locally in ./uploads and record that.
    let s3res = null;
    let url = null;
    let storedLocally = false;
    try {
      s3res = await uploadToS3({ Body: file.buffer, Key: key, ContentType: file.mimetype });
      url = s3res.Location || `https://${process.env.AWS_BUCKET || process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (uploadErr) {
      console.error('S3 upload failed, saving locally:', uploadErr && uploadErr.message ? uploadErr.message : uploadErr);
      // Ensure uploads directory exists
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      // Local filename: preserve original basename
      const localName = `${Date.now()}-${basename}`;
      const localPath = path.join(uploadsDir, localName);
      fs.writeFileSync(localPath, file.buffer);
      storedLocally = true;
      url = `/uploads/${localName}`; // served statically by server
      // continue to persist metadata below with status stored_local
    }

    // Determine owner: accept either a MongoDB ObjectId or a plain identifier string
    let owner = null;
    let ownerIdentifier = null;
    if (req.body.ownerId) {
      const mongoose = require('mongoose');
      if (mongoose.Types.ObjectId.isValid(req.body.ownerId)) {
        owner = req.body.ownerId;
      } else {
        // store raw identifier (e.g., username) in ownerIdentifier
        ownerIdentifier = String(req.body.ownerId);
      }
    }

    // Persist metadata
    const doc = await Media.create({
      owner: owner,
      ownerIdentifier: ownerIdentifier,
      key: s3res.Key || key,
      url,
      mime: file.mimetype,
      size: file.size,
      tags: req.body.tags ? String(req.body.tags).split(',').map(t => t.trim()) : [],
      status: storedLocally ? 'stored_local' : 'uploaded'
    });
    // Return friendly structured response including original filename
    const response = {
      status: true,
      file: {
        id: doc._id,
        originalName: file.originalname,
        key: doc.key,
        url: doc.url,
        size: doc.size,
        mime: doc.mime,
        etag: s3res ? s3res.ETag : null,
        storedLocally
      }
    };
    return res.json(response);
  } catch (err) {
    next(err);
  }
};
