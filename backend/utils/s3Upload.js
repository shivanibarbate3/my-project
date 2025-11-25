const AWS = require('aws-sdk');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Upload a Buffer or Stream to S3 and return the upload data (Location, Key, ETag)
 * @param {Object} options
 * @param {Buffer|Stream} options.Body
 * @param {string} options.Key - object key in S3
 * @param {string} [options.ContentType]
 * @returns {Promise<Object>} resolves to S3 upload response
 */
function uploadToS3({ Body, Key, ContentType }) {
  const params = {
    Bucket: process.env.AWS_BUCKET || process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME,
    Key,
    Body,
  };
  if (ContentType) params.ContentType = ContentType;

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) return reject(err);
      // data contains Location, Key, Bucket, ETag
      resolve(data);
    });
  });
}

module.exports = { uploadToS3 };
