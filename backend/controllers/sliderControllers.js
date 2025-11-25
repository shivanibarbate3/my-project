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
  Recordlist,
  Recordalllist,
  UpdateRecord,
  checkRowExists,
  Recordlistseach,
  Recordalllistsearch
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
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
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
const addEditSlider = async (req, res) => {
  const token = req.body.token;

  const files = req.files;
  const existingauth = await checkauth(token);


  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {

      const { id, title, subtitle } = req.body;

      if (id == undefined || !title) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }
      const folder = 'uploads';


      const results = [];
      if (files.image) {
        console.log(existingauth.id);
        const imagename = Date.now() + files.image[0].originalname;
        const image = files.image[0];
        const filePath = files.image[0].path; // File path on local disk
        console.log(filePath);
        const imageUpload = await uploadFileToS3(filePath, image, folder, imagename);
        results.push({
          fileType: 'image',
          url: imageUpload.Location,
          imgname: imagename,
        });
      }
      console.log(existingauth.id);
      if (files.mobile_image) {
        const mobileimagename = Date.now() + files.mobile_image[0].originalname;
        const mobileimage = files.mobile_image[0];
        const filePath = files.mobile_image[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'mobile_image',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }

      var imgname = '';
      var mobimgname = '';
      const index = results.findIndex(obj => obj.fileType === 'image');
      const index1 = results.findIndex(obj => obj.fileType === 'mobile_image');
      if (results.length > 0 && index != -1) {
        imgname = results[index].imgname;
      }
      if (results.length > 0 && index1 != -1) {
        mobimgname = results[index1].imgname;
      }

      if (id != 0) {

        const locationrAlreadyExistsfornew = await checkRowExists("sliders_new", id);
        console.log(locationrAlreadyExistsfornew);

        if (results.length > 0 && index != -1) {
          imgname = results[index].imgname;
        }
        else {
          imgname = locationrAlreadyExistsfornew.image;
        }
        if (results.length > 0 && index1 != -1) {
          mobimgname = results[index1].imgname;
        }
        else {
          mobimgname = locationrAlreadyExistsfornew.mobile_image;
        }
      }
      const slider = {
        title: title,
        subtitle: subtitle,

        image: imgname,
        mobile_image: mobimgname

      };

      try {
        if (id == 0 || id == null) {
          const locationrAlreadyExists = await checkRecordExists("sliders_new", "title", title);
          if (locationrAlreadyExists) {
            res.status(200).json({ status: false, message: "Banner already exists" });
          } else {
            await insertRecord("sliders_new", slider);
            res.status(201).json({ status: true, message: "Banner created successfully!" });
          }
        } else {
          const locationrAlreadyExists = await checkAllRecordExists("sliders_new", "title", title, id);

          if (locationrAlreadyExists) {

            res.status(200).json({ status: false, message: "Banner already exists" });
          } else {
            console.log(locationrAlreadyExists);

            await UpdateRecord("sliders_new", slider, id);
            res.status(201).json({ status: true, message: "Banner updated successfully!" });
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




const getSlider = async (req, res) => {
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
          if (search_by == 'title') {
            searcht = 'title';

          }
          if (search_by == 'subtitle') {
            searcht = 'subtitle';

          }
          const existingUserList = await Recordlistseach("sliders_new", search_by, search, "id", perPage, pageOffset);
          if (existingUserList) {

            const existingUserAllList = await Recordalllistsearch("sliders_new", search_by, search, "id");


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id, image: element.image,
                mobile_image: element.mobile_image,
                title: element.title,
                subtitle: element.subtitle,

                slider_status: element.slider_status,
              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({ status: true, message: "data not found" , data:[],
              totalCount: 0,
              totalPage: 0, });
          }
        } else {
          const existingUserList = await Recordlist("sliders_new", null, null, "id", perPage, pageOffset);
          if (existingUserList) {

            const existingUserAllList = await Recordalllist("sliders_new", null, null, "id");


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id, image: element.image,
                mobile_image: element.mobile_image,
                title: element.title,
                subtitle: element.subtitle,

                slider_status: element.slider_status,
              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({ status: true, message: "data not found"  , data:[],
              totalCount: 0,
              totalPage: 0,});
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
const statusSlider = async (req, res) => {
  const token = req.body.token;

  const files = req.files;
  const existingauth = await checkauth(token);


  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {

      const { id, slider_status } = req.body;

      if (id == undefined || !slider_status) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }

      const slider = {
        id: id,
        slider_status: slider_status,


      };

      try {




        await UpdateRecord("sliders_new", slider, id);
        res.status(201).json({ status: true, message: "Slider updated successfully!" });




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
module.exports = {
  addEditSlider,
  getSlider,
  statusSlider

};