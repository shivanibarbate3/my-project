const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
const multer = require('multer');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const {
  createTable,
  checkAllRecordExists,
  checkRecordExists,
  insertRecord,
  Recordlistseachjoin,
  Recordalllistsearchjoin,
  UpdateRecord,
  checkRowExists,
  Recordlistjoin,
  Recordalllistjoin
} = require("../utils/sqlFunctions");

const checkauth = (token) => {

  if (token) {

    return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {

        return err;
      } else {

        return decoded;
      }
    });;

  } else {
    return false;


  }
};

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Your AWS access key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // Your AWS secret key
  region: process.env.AWS_DEFAULT_REGION  // Your AWS region
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('myFile');

// Create uploads folder if it doesn't exist
const fs = require('fs');
const { Console } = require("console");
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
function slugify(text) {
  return text
    .toString()                  // Convert to string (in case it's not)
    .toLowerCase()               // Convert to lowercase
    .trim()                      // Trim whitespace from both ends
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-');     // Replace multiple hyphens with a single hyphen
}
const uploadFileToS3 = async (filePath, file, folder, imagename) => {
  console.log(file.buffer);

  const fileStream = fs.createReadStream(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${folder}/${imagename}`, // Folder + unique filename
    Body: fileStream,
    ContentType: file.mimetype,
  };
  console.log(params);
  return s3.upload(params).promise();
};



const getcareerlist = async (req, res) => {
  const { perPage, page, search_by, search } = req.body;
  const token = req.body.token;

  const existingauth = await checkauth(token);
  console.log(existingauth);
  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {
      try {
        const pageOffset = (page * perPage) - perPage;
        if (search != '') {

          var searcht = '';
          var searchtval = '';
          if (search_by == 'job_id') {
            searcht = 'job_id';

          }
          if (search_by == 'name') {
            searcht = 'name';

          }

          if (search_by == 'name') {
            searcht = 'name';

          }

          if (search_by == 'email') {
            searcht = 'email';

          }
          if (search_by == 'status') {
            searcht = 'status';

          }
          const existingUserList = await Recordlistseachjoin("careerde_new", search_by, search, "id", perPage, pageOffset, 'careers_new', 'job_id', 'title');
          if (existingUserList) {

            const existingUserAllList = await Recordalllistsearchjoin("careerde_new", search_by, search, "id", 'careers_new', 'job_id', 'title');


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id,
                job_id: element.job_id,
                name: element.name,
                location: element.location,
                email: element.email,
                phone: element.phone,
                resume: element.resume,
                cr_date: element.cr_date,
                newtitle: element.newtitle,
              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              dataall: existingUserAllList,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({
              status: true, message: "data not found", data: [],
              dataall: [],
              totalCount: 0,
              totalPage: 0,
            });
          }
        } else {
          const existingUserList = await Recordlistjoin("careerde_new", null, null, "id", perPage, pageOffset, 'careers_new', 'job_id', 'title');
          if (existingUserList) {

            const existingUserAllList = await Recordalllistjoin("careerde_new", null, null, "id", 'careers_new', 'job_id', 'title');


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id,
                job_id: element.job_id,
                name: element.name,
                location: element.location,
                email: element.email,
                phone: element.phone,
                resume: element.resume,
                cr_date: element.cr_date,
                newtitle: element.newtitle,


              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              dataall: existingUserAllList,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({
              status: true, message: "data not found", data: [],
              dataall: [],
              totalCount: 0,
              totalPage: 0,
            });
          }

        }


      } catch (error) {
        res.status(500).json({ status: false, message: error.message });
      }
    }
  }
  catch (error) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }
};
const statuscareerlist = async (req, res) => {

  const token = req.body.token;

  const existingauth = await checkauth(token);


  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {

      const { id } = req.body;

      if (id == undefined) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }
      const now = new Date();
      const formattedTimestamp = now.getFullYear() + "-"
        + String(now.getMonth() + 1).padStart(2, '0') + "-"
        + String(now.getDate()).padStart(2, '0') + " "
        + String(now.getHours()).padStart(2, '0') + ":"
        + String(now.getMinutes()).padStart(2, '0') + ":"
        + String(now.getSeconds()).padStart(2, '0');


      const slider = {
        id: id,
        deleted_at: formattedTimestamp,


      };

      try {




        await UpdateRecord("careerde_new", slider, id);
        res.status(201).json({ status: true, message: "Applicant  updated successfully!" });




      } catch (error) {
        res.status(500).json({ status: false, message: error.message });
      }
    }
  }
  catch (error) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }
};
const getdownloadresume = async (req, res) => {
  const idnew = req.params.id;
  console.log(idnew);
  const bucketName = process.env.AWS_BUCKET;
  const folder = 'uploads';
  const locationrAlreadyExists = await checkRecordExists("careerde_new", "id", idnew);
           console.log(locationrAlreadyExists);
  if (locationrAlreadyExists) {
    const keyName = folder + '/' + locationrAlreadyExists.resume; // Pass the file key dynamically as needed
    console.log(keyName);
    const params = {
      Bucket: bucketName,
      Key: keyName,
    };
    try {
      // Generate the file stream
      const fileStream = s3.getObject(params).createReadStream();
    const  fileName =locationrAlreadyExists.resume;
      // Set headers for file download
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/octet-stream');

      // Pipe the file stream to the response
      fileStream.pipe(res);
    } catch (error) {
      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    }
  } else {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
  }

};
module.exports = {

  getcareerlist,
  statuscareerlist,
  getdownloadresume

};