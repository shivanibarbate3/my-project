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
} = require("../utils/sqlFunctions");

const checkauth = (token) => {
 
  if(token){
   
    return jwt.verify(token,  process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
       
        return err;
      } else {
       
        return decoded;
      }
    });;

}else{
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

const uploadFileToS3 = async (filePath,file, folder, imagename) => {
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
const addEditQunique = async (req, res) => {
  const token = req.body.token;
       
  const files = req.files;
  const existingauth = await checkauth(token);
  
  try {
 
  if (existingauth.id==undefined) {
   
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
 
    const { id, title,short_des,description } = req.body;
   
    if (id==undefined || !title) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const folder = 'uploads';

 
    const results = [];
    if (files.image) {
      console.log(existingauth.id);
      const  imagename = Date.now() + files.image[0].originalname;
      const image = files.image[0];
      const filePath =  files.image[0].path; // File path on local disk
      const imageUpload = await uploadFileToS3(filePath,image, folder, imagename);
      results.push({
        fileType: 'image',
        url: imageUpload.Location,
        imgname: imagename,
      });
    }
    console.log(existingauth.id);
    
    
    var imgname = '';
    const index = results.findIndex(obj => obj.fileType === 'image');
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
   
    
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("homeuniques_new", id);
       console.log(locationrAlreadyExistsfornew);
       
     if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
      else{
        imgname = locationrAlreadyExistsfornew.image;
      }
     
    }
    const homeuniques= {
      title: title,

      short_des: short_des,
      
      image: imgname,

    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("homeuniques_new", "title", title);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Unique already exists" });
        } else {
          await insertRecord("homeuniques_new", homeuniques);
          res.status(201).json({ status: true, message: "Unique created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("homeuniques_new", "title", title,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Unique already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("homeuniques_new", homeuniques,id);
          res.status(201).json({ status: true, message: "Unique updated successfully!" });
        }
      }
     
     
    } catch (error) {
      res.status(500).json({   status: false, message: error.message });
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




const getQunique = async (req, res) => {
  const { perPage, page } = req.body;
  const token = req.body.token;

  const existingauth = await checkauth(token);
  console.log(existingauth);
  try {
 
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
    try {
      const pageOffset= (page * perPage) - perPage;
     const existingUserList = await Recordlist("homeuniques_new", null, null,"id",perPage,pageOffset);
 
     if (existingUserList) {
       const existingUserAllList = await Recordalllist("homeuniques_new", null, null,"id");
 
     
       const array = [];
       existingUserList.forEach((element) => {
        let myObject = { id: element.id, image: element.image,
       
          title: element.title, 
          short_des: element.short_des,
         
     
         }; 
        array.push(myObject);
    });
     
       const   totalCount= existingUserAllList.length;
       const  totalPage = Math.ceil(existingUserAllList.length / perPage);
   
     
         res.status(200).json({
           status: true, 
           data:array[0],
           totalCount: totalCount,
           totalPage: totalPage,
         });
      
     } else {
       res.status(200).json({status: true,  message: "data not found"  , data:[],
        totalCount: 0,
        totalPage: 0,});
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
module.exports = {
  addEditQunique,
  getQunique,
 
};