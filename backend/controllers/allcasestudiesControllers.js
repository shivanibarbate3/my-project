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
  Recordlistseachdeatils,
  Recordalllistsearchdeatils,
  UpdateRecord,
  checkRowExists,
  Recordlistdeatils,
  Recordalllistdeatils
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
const addEditAllcaseStudies = async (req, res) => {
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
 
    const { id, first_title, first_des } = req.body;
   
    if (id==undefined || !first_title) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const folder = 'uploads';

 
    const results = [];
    if (files.project_details_image) {
      console.log(existingauth.id);
      const  project_details_imagename = Date.now() + files.project_details_image[0].originalname;
      const project_details_image = files.project_details_image[0];
      const filePath =  files.project_details_image[0].path; // File path on local disk
      const project_details_imageUpload = await uploadFileToS3(filePath,project_details_image, folder, project_details_imagename);
      results.push({
        fileType: 'project_details_image',
        url: project_details_imageUpload.Location,
        imgname: project_details_imagename,
      });
    }
    console.log(existingauth.id);
    if (files.project_video_thumbnail) {
      const  mobileproject_details_imagename = Date.now() + files.project_video_thumbnail[0].originalname;
      const mobileproject_details_image = files.project_video_thumbnail[0];
      const filePath =  files.project_video_thumbnail[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileproject_details_image, folder, mobileproject_details_imagename);
      results.push({
        fileType: 'project_video_thumbnail',
        url: mobileUpload.Location,
        imgname: mobileproject_details_imagename,
      });
    }
  


    var imgname = '';
    var mobimgname='';
    var mobimgthriname='';
    const index = results.findIndex(obj => obj.fileType === 'project_details_image');
    const index1 = results.findIndex(obj => obj.fileType === 'project_video_thumbnail');
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    if(results.length>0 && index1!=-1){
      mobimgname = results[index1].imgname;
    }
 
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("projects_new", id);
       console.log(locationrAlreadyExistsfornew);
       
       if(results.length>0 && index!=-1){
        imgname = results[index].imgname;
      }
      else{
        imgname = locationrAlreadyExistsfornew.project_details_image;
      }
      if(results.length>0 && index1!=-1){
        mobimgname = results[index1].imgname;
      }
      else{
        mobimgname = locationrAlreadyExistsfornew.project_video_thumbnail;
      }

   
    }
    const projects_new = {
      first_des: first_des,
      first_title: first_title,
  
      project_details_image: imgname,
      project_video_thumbnail: mobimgname,
     
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("projects_new", "id", id);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Case Studies Details already exists" });
        } else {
          await insertRecord("projects_new", projects_new);
          res.status(201).json({ status: true, message: "Case Studies Details created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("projects_new", "id", id,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Case Studies Details already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("projects_new", projects_new,id);
          res.status(201).json({ status: true, message: "Case Studies Details updated successfully!" });
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




const getAllcaseStudies = async (req, res) => {
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
        if(search_by=='first_title'){
         searcht='first_title';
      
        }
        if(search_by=='title'){
         searcht='title';
         
        }
      
        const existingUserList = await Recordlistseachdeatils("projects_new", search_by, search, "id", perPage, pageOffset, "first_title");
        if (existingUserList) {

          const existingUserAllList = await Recordalllistsearchdeatils("projects_new", search_by, search, "id", "first_title");


        
          const array = [];
          console.log(existingUserList);
          existingUserList.forEach((element) => {
           let myObject = { id: element.id,   first_title:element.first_title,
            first_des: element.first_des,
            title: element.title,
            project_details_image: element.project_details_image,
          
            project_video_thumbnail: element.project_video_thumbnail,
          
          
            }; 
           array.push(myObject);
       });
        
          const   totalCount= existingUserAllList.length;
          const  totalPage = Math.ceil(existingUserAllList.length / perPage);
      
        
            res.status(200).json({
              status: true, 
              data:array,
              
              totalCount: totalCount,
              totalPage: totalPage,
            });
         
        } else {
          res.status(200).json({status: true,  message: "data not found"  , data:[],
            totalCount: 0,
            totalPage: 0,});
        }
      }else{
        const existingUserList = await Recordlistdeatils("projects_new", null, null, "id", perPage, pageOffset, "first_title");
        if (existingUserList) {

          const existingUserAllList = await Recordalllistdeatils("projects_new", null, null, "id", "first_title");

           
             const array = [];
             console.log(existingUserList);
             existingUserList.forEach((element) => {
              let myObject = {  id: element.id,   first_title:element.first_title,
                first_des: element.first_des,
                title: element.title,
                project_details_image: element.project_details_image,
              
                project_video_thumbnail: element.project_video_thumbnail,
              
               }; 
              array.push(myObject);
          });
           
             const   totalCount= existingUserAllList.length;
             const  totalPage = Math.ceil(existingUserAllList.length / perPage);
         
           
               res.status(200).json({
                 status: true, 
                 data:array,
                 totalCount: totalCount,
                 totalPage: totalPage,
               
               });
            
           } else {
             res.status(200).json({status: true,  message: "data not found"  , data:[],
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
  addEditAllcaseStudies,
  getAllcaseStudies,

 
};