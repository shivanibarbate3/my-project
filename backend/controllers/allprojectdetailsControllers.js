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
function slugify(text) {
  return text
      .toString()                  // Convert to string (in case it's not)
      .toLowerCase()               // Convert to lowercase
      .trim()                      // Trim whitespace from both ends
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
      .replace(/\-\-+/g, '-');     // Replace multiple hyphens with a single hyphen
}

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
const addEditAllProjectDetails = async (req, res) => {
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
 
    const { id, title, short_des } = req.body;
   
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
    if (files.video) {
      const  mobileimagename = Date.now() + files.video[0].originalname;
      const mobileimage = files.video[0];
      const filePath =  files.video[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'video',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }
    
    if (files.video_image) {
      const  mobileimagename = Date.now() + files.video_image[0].originalname;
      const mobileimage = files.video_image[0];
      const filePath =  files.video_image[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'video_image',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }
    


    var imgname = '';
    var mobimgname='';
    var mobimgthriname='';
    const index = results.findIndex(obj => obj.fileType === 'image');
    const index1 = results.findIndex(obj => obj.fileType === 'video');
    const index2 = results.findIndex(obj => obj.fileType === 'video_image');
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    if(results.length>0 && index1!=-1){
      mobimgname = results[index1].imgname;
    }
    if(results.length>0 && index2!=-1){
      mobimgthriname = results[index2].imgname;
    }
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("projects_new", id);
       console.log(locationrAlreadyExistsfornew);
       if(results.length>0 && index!=-1){
        imgname = results[index].imgname;
      }
      else{
        imgname = locationrAlreadyExistsfornew.image;
      }
      if(results.length>0 && index1!=-1){
        mobimgname = results[index1].imgname;
      }
      else{
        mobimgname = locationrAlreadyExistsfornew.video;
      }
      if(results.length>0 && index2!=-1){
        mobimgthriname = results[index2].imgname;
      }
      else{
        mobimgthriname = locationrAlreadyExistsfornew.video_image;
      }
    }
    const slug = slugify(title);
    const projects_new = {
     
      title: title,
      short_des: short_des,
    
      image: imgname,
      video: mobimgname,
      video_image: mobimgthriname,
      slug:slug
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("projects_new", "title", title);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Project already exists" });
        } else {
          await insertRecord("projects_new", projects_new);
          res.status(201).json({ status: true, message: "Project created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("projects_new", "title", title,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Project already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("projects_new", projects_new,id);
          res.status(201).json({ status: true, message: "Project updated successfully!" });
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




const getAllProjectDetails = async (req, res) => {
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
        if(search_by=='title'){
         searcht='title';
      
        }
        if(search_by=='short_des'){
         searcht='short_des';
         
        }
      
        const existingUserList = await Recordlistseach("projects_new", search_by, search,"id",perPage,pageOffset);
       
        if (existingUserList) {
          const existingUserAllList = await Recordalllistsearch("projects_new", search_by, search,"id");
      
        
          const array = [];
          console.log(existingUserList);
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, 
            title: element.title,
            short_des: element.short_des,
            project_status:element.project_status,
            image: element.image,
            video: element.video,
            video_image: element.video_image,
          
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
          res.status(200).json({status: false,  message: "data not found"  , data:[],
            totalCount: 0,
            totalPage: 0,});
        }
      }else{
        const existingUserList = await Recordlist("projects_new", null, null,"id",perPage,pageOffset);
       
           if (existingUserList) {
             const existingUserAllList = await Recordalllist("projects_new", null, null,"id");
       
           
             const array = [];
             console.log(existingUserList);
             existingUserList.forEach((element) => {
              let myObject = { id: element.id,  
                title: element.title,
                short_des: element.short_des,
                project_status:element.project_status,
                image: element.image,
                video: element.video,
                video_image: element.video_image,
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
const statusAllProjectDetails = async (req, res) => {
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
 
    const { id, project_status } = req.body;
   
    if (id==undefined || !project_status) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
   
    const slider = {
      id: id,
      project_status: project_status,
 
     
    };
   
    try {
    
      
         
         
          await UpdateRecord("projects_new", slider,id);
          res.status(201).json({ status: true, message: "Slider updated successfully!" });
        
      
     
     
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
const DeleteAllProjectDetails = async (req, res) => {
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
 
    const { id } = req.body;
   
    if (id==undefined ) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
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
    
      
         
         
          await UpdateRecord("projects_new", slider,id);
          res.status(201).json({ status: true, message: "Service updated successfully!" });
        
      
     
     
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
module.exports = {
  addEditAllProjectDetails,
  getAllProjectDetails,
  statusAllProjectDetails,
  DeleteAllProjectDetails

 
};