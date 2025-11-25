const Slider = require('../models/Slider');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const moment = require("moment-timezone");
const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key
// Function to validate JWT token
exports.authenticateToken = (req, res, next) => {
  //  console.log(req.header("Authorization"));
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(403).json({ status: false, message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ status: false, message: "Unauthorized" });
    req.user = decoded;
    next();
  });
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
// Controller to add a new slider
exports.addSlider = async (req, res) => {
  //  console.log(moment().tz("America/Indiana/Marengo").format("YYYY-MM-DD HH:mm:ss"));
  //  return false;
  try {
    const { banner_title, banner_title_short_one, banner_title_short_two } = req.body;
    const files = req.files;

  

    const folder = 'uploads';


    const results = [];
    if (files.banner_image) {
      
      const imagename = Date.now() + files.banner_image[0].originalname;
      const image = files.banner_image[0];
      const filePath = files.banner_image[0].path; // File path on local disk
      console.log(filePath);
      const imageUpload = await uploadFileToS3(filePath, image, folder, imagename);
      results.push({
        fileType: 'banner_image',
        url: imageUpload.Location,
        imgname: imagename,
      });
    }

    if (files.banner_mobile_image) {
      const mobileimagename = Date.now() + files.banner_mobile_image[0].originalname;
      const mobileimage = files.banner_mobile_image[0];
      const filePath = files.banner_mobile_image[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'banner_mobile_image',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }

    var imgname = '';
    var mobimgname = '';
    const index = results.findIndex(obj => obj.fileType === 'banner_image');
    const index1 = results.findIndex(obj => obj.fileType === 'banner_mobile_image');
    if (results.length > 0 && index != -1) {
      imgname = results[index].imgname;
    }
    if (results.length > 0 && index1 != -1) {
      mobimgname = results[index1].imgname;
    }


    const newSlider = {
      banner_title,
      banner_title_short_one,
      banner_title_short_two,
      banner_image: imgname,
      banner_mobile_image: mobimgname,
      created_at:  moment().tz("America/Indiana/Marengo").format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment().tz("America/Indiana/Marengo").format("YYYY-MM-DD HH:mm:ss"),
      deleted_at: null,
    };
 
    // // console.log(mobimgname);
    const slider = await Slider.create(newSlider);
    // await newSlider.save().then((savedSlider) => {
    //   const { __v, ...sliderWithoutV } = savedSlider.toObject(); // Exclude __v field
    //   console.log(sliderWithoutV);
    // });
    res.status(201).json({ message: "Slider added successfully!", slider: slider ,status: true});
  } catch (error) {
    res.status(500).json({ error: "Failed to add slider!" });
  }
};


// Controller to edit a slider
exports.editSlider = async (req, res) => {

  const { banner_title, banner_title_short_one, banner_title_short_two,id } = req.body;
  const files = req.files;

  try {
    const files = req.files;


    const folder = 'uploads';


    const results = [];
    if (files.banner_image) {
    
      const imagename = Date.now() + files.banner_image[0].originalname;
      const image = files.banner_image[0];
      const filePath = files.banner_image[0].path; // File path on local disk
      console.log(filePath);
      const imageUpload = await uploadFileToS3(filePath, image, folder, imagename);
      results.push({
        fileType: 'banner_image',
        url: imageUpload.Location,
        imgname: imagename,
      });
    }

    if (files.banner_mobile_image) {
      const mobileimagename = Date.now() + files.banner_mobile_image[0].originalname;
      const mobileimage = files.banner_mobile_image[0];
      const filePath = files.banner_mobile_image[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'banner_mobile_image',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }

    var imgname = '';
    var mobimgname = '';
    const index = results.findIndex(obj => obj.fileType === 'banner_image');
    const index1 = results.findIndex(obj => obj.fileType === 'banner_mobile_image');
    if (results.length > 0 && index != -1) {
      imgname = results[index].imgname;
    }
    if (results.length > 0 && index1 != -1) {
      mobimgname = results[index1].imgname;
    }
    const slider = await Slider.findById(id);
   
      
        if (results.length > 0 && index != -1) {
          imgname = results[index].imgname;
        }
        else {
          imgname = slider.banner_image;
        }
        if (results.length > 0 && index1 != -1) {
          mobimgname = results[index1].imgname;
        }
        else {
          mobimgname = slider.banner_mobile_image;
        }

    const updatedSlider = await Slider.findByIdAndUpdate(
      id,
      { banner_title,
      banner_title_short_one,
      banner_title_short_two,
      banner_image: imgname,
      banner_mobile_image: mobimgname,
      updated_at: moment().tz("America/Indiana/Marengo").format("YYYY-MM-DD HH:mm:ss") },
      { new: true } // Return the updated document
    );

    if (!updatedSlider) {
      return res.status(404).json({ error: "Slider not found!" });
    }

    res.status(200).json({ message: "Slider updated successfully!", slider: updatedSlider,status: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update slider!" });
  }
};

// Controller to get all sliders
exports.getSlider = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json({ sliders,status: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sliders!" });
  }

};
