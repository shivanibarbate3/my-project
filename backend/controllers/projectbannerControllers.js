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
  Recordalllistsearch,
  Recordlistseach
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
const { Console } = require("console");
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
const addEditProjectBanner = async (req, res) => {
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
 
    const { id, banner_title, banner_title_short } = req.body;
   
    if (id==undefined || !banner_title) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const folder = 'uploads';

 
    const results = [];
    if (files.banner_image) {
      console.log(existingauth.id);
      const  banner_imagename = Date.now() + files.banner_image[0].originalname;
      const banner_image = files.banner_image[0];
      const filePath =  files.banner_image[0].path; // File path on local disk
      const banner_imageUpload = await uploadFileToS3(filePath,banner_image, folder, banner_imagename);
      results.push({
        fileType: 'banner_image',
        url: banner_imageUpload.Location,
        imgname: banner_imagename,
      });
    }
    console.log(existingauth.id);
    if (files.banner_mobile_image) {
      const  mobilebanner_imagename = Date.now() + files.banner_mobile_image[0].originalname;
      const mobilebanner_image = files.banner_mobile_image[0];
      const filePath =  files.banner_mobile_image[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobilebanner_image, folder, mobilebanner_imagename);
      results.push({
        fileType: 'banner_mobile_image',
        url: mobileUpload.Location,
        imgname: mobilebanner_imagename,
      });
    }
    
    var imgname = '';
    var mobimgname='';
    const index = results.findIndex(obj => obj.fileType === 'banner_image');
    const index1 = results.findIndex(obj => obj.fileType === 'banner_mobile_image');
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    if(results.length>0 && index1!=-1){
      mobimgname = results[index1].imgname;
    }
    
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("projectbanner_new", id);
       console.log(locationrAlreadyExistsfornew);
       
       if(results.length>0 && index!=-1){
        imgname = results[index].imgname;
      }
      else{
        imgname = locationrAlreadyExistsfornew.banner_image;
      }
      if(results.length>0 && index1!=-1){
        mobimgname = results[index1].imgname;
      }
      else{
        mobimgname = locationrAlreadyExistsfornew.banner_mobile_image;
      }
    }
    const projectbanner_new = {
      banner_title: banner_title,
      banner_title_short: banner_title_short,
    
      banner_image: imgname,
      banner_mobile_image: mobimgname
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("projectbanner_new", "banner_title", banner_title);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Banner already exists" });
        } else {
          await insertRecord("projectbanner_new", projectbanner_new);
          res.status(201).json({ status: true, message: "Banner created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("projectbanner_new", "banner_title", banner_title,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Banner already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("projectbanner_new", projectbanner_new,id);
          res.status(201).json({ status: true, message: "Banner updated successfully!" });
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




const getProjectBanner = async (req, res) => {
  const { perPage, page,search_by,search } = req.body;
  const token = req.body.token;

  const existingauth = await checkauth(token);

  try {
 
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
    try {
      const pageOffset= (page * perPage) - perPage;
     
      if(search!=''){
        
        var  searcht='';
        var searchtval='';
        if(search_by=='banner_title'){
         searcht='banner_title';
      
        }
        if(search_by=='banner_title_short'){
         searcht='banner_title_short';
         
        }
      
        const existingUserList = await Recordlistseach("projectbanner_new", search_by, search,"id",perPage,pageOffset);
       
        if (existingUserList) {
          const existingUserAllList = await Recordalllistsearch("projectbanner_new", search_by, search,"id");
      
        
          const array = [];
          console.log(existingUserList);
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, banner_title: element.banner_title,
          
             banner_title_short: element.banner_title_short,
             banner_image: element.banner_image,
             banner_mobile_image: element.banner_mobile_image
            }; 
           array.push(myObject);
       });
        
          const   totalCount= existingUserAllList.length;
          const  totalPage = Math.ceil(existingUserAllList.length / perPage);
      
        
            res.status(200).json({
              status: true, 
              data:array[0]
             
            });
         
        } else {
          res.status(200).json({status: true,  message: "data not found" , data:[],
            totalCount: 0,
            totalPage: 0, });
        }
      }else{
        const existingUserList = await Recordlist("projectbanner_new", null, null,"id",perPage,pageOffset);
       
           if (existingUserList) {
             const existingUserAllList = await Recordalllist("projectbanner_new", null, null,"id");
       
           
             const array = [];
             console.log(existingUserList);
             existingUserList.forEach((element) => {
              let myObject = { id: element.id,  banner_title: element.banner_title,
          
                banner_title_short: element.banner_title_short,
                banner_image: element.banner_image,
                banner_mobile_image: element.banner_mobile_image
               }; 
              array.push(myObject);
          });
           
             const   totalCount= existingUserAllList.length;
             const  totalPage = Math.ceil(existingUserAllList.length / perPage);
         
           
               res.status(200).json({
                 status: true, 
                 data:array[0]
               
               });
            
           } else {
             res.status(200).json({status: false,  message: "data not found"  , data:[],
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

module.exports = {
  addEditProjectBanner,
  getProjectBanner,

 
};