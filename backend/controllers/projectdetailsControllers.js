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
const addEditProjectDetails = async (req, res) => {
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
 
    const { id, page_title, page_short_des,page_des,page_des_new } = req.body;
   
    if (id==undefined || !page_title) {
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
    if (files.image_second) {
      const  mobileimagename = Date.now() + files.image_second[0].originalname;
      const mobileimage = files.image_second[0];
      const filePath =  files.image_second[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'image_second',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }
    
    if (files.image_third) {
      const  mobileimagename = Date.now() + files.image_third[0].originalname;
      const mobileimage = files.image_third[0];
      const filePath =  files.image_third[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileimage, folder, mobileimagename);
      results.push({
        fileType: 'image_third',
        url: mobileUpload.Location,
        imgname: mobileimagename,
      });
    }
    
   
    console.log("dd");
    var imgname = '';
    var mobimgname='';
    var mobimgthriname='';
    const index = results.findIndex(obj => obj.fileType === 'image');
    const index1 = results.findIndex(obj => obj.fileType === 'image_second');
    const index2 = results.findIndex(obj => obj.fileType === 'image_third');
    console.log(index2);
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    if(results.length>0 && index1!=-1){
      mobimgname = results[index1].imgname;
    }
    if(results.length>0 && index2!=-1){
      mobimgthriname = results[index2].imgname;
    }
     console.log(index2);
     console.log("dd");
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("projectpagedetails_new", id);
     //  console.log(locationrAlreadyExistsfornew);
      
      console.log(index2);
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
        mobimgname = locationrAlreadyExistsfornew.image_second;
      }

      if(results.length>0 && index2!=-1){
        mobimgthriname = results[index2].imgname;
      }
      else{
        mobimgthriname = locationrAlreadyExistsfornew.image_third;
      }
    }
     console.log(mobimgthriname);
      //console.log(results);
      console.log('ddd');
      console.log(imgname);
      console.log(mobimgname);
    const projectpagedetails_new = {
      page_des_new: page_des_new,
      page_des: page_des,
      page_title: page_title,
      page_short_des: page_short_des,
    
      image: imgname,
      image_second: mobimgname,
      image_third: mobimgthriname,
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("projectpagedetails_new", "page_title", page_title);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Project Details already exists" });
        } else {
          await insertRecord("projectpagedetails_new", projectpagedetails_new);
          res.status(201).json({ status: true, message: "Project Details created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("projectpagedetails_new", "page_title", page_title,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Project Details already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("projectpagedetails_new", projectpagedetails_new,id);
          res.status(201).json({ status: true, message: "Project Details updated successfully!" });
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




const getProjectDetails = async (req, res) => {
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
        if(search_by=='page_title'){
         searcht='page_title';
      
        }
        if(search_by=='page_short_des'){
         searcht='page_short_des';
         
        }
      
        const existingUserList = await Recordlistseach("projectpagedetails_new", search_by, search,"id",perPage,pageOffset);
       
        if (existingUserList) {
          const existingUserAllList = await Recordalllistsearch("projectpagedetails_new", search_by, search,"id");
      
        
          const array = [];
          console.log(existingUserList);
          existingUserList.forEach((element) => {
           let myObject = { id: element.id,   page_des_new:element.page_des_new,
            page_des: element.page_des,
            page_title: element.page_title,
            page_short_des: element.page_short_des,
          
            image: element.image,
            image_second: element.image_second,
            image_third: element.image_third,
          
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
          res.status(200).json({status: true,  message: "data not found"  , data:[],
            totalCount: 0,
            totalPage: 0,});
        }
      }else{
        const existingUserList = await Recordlist("projectpagedetails_new", null, null,"id",perPage,pageOffset);
       
           if (existingUserList) {
             const existingUserAllList = await Recordalllist("projectpagedetails_new", null, null,"id");
       
           
             const array = [];
             console.log(existingUserList);
             existingUserList.forEach((element) => {
              let myObject = { id: element.id,  page_des_new:element.page_des_new,
                page_des: element.page_des,
                page_title: element.page_title,
                page_short_des: element.page_short_des,
              
                image: element.image,
                image_second: element.image_second,
                image_third: element.image_third,
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
  addEditProjectDetails,
  getProjectDetails,

 
};