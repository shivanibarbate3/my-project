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
const addEditWidet = async (req, res) => {
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
 
    const { id, short_desc } = req.body;
   
    if (id==undefined || !short_desc) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const folder = 'uploads';

 
    const results = [];
    if (files.header_logo) {
      console.log(existingauth.id);
      const  header_logoname = Date.now() + files.header_logo[0].originalname;
      const header_logo = files.header_logo[0];
      const filePath =  files.header_logo[0].path; // File path on local disk
      const header_logoUpload = await uploadFileToS3(filePath,header_logo, folder, header_logoname);
      results.push({
        fileType: 'header_logo',
        url: header_logoUpload.Location,
        imgname: header_logoname,
      });
    }
    console.log(existingauth.id);
    if (files.footer_logo) {
      const  mobileheader_logoname = Date.now() + files.footer_logo[0].originalname;
      const mobileheader_logo = files.footer_logo[0];
      const filePath =  files.footer_logo[0].path; // File path on local disk
      const mobileUpload = await uploadFileToS3(filePath,mobileheader_logo, folder, mobileheader_logoname);
      results.push({
        fileType: 'footer_logo',
        url: mobileUpload.Location,
        imgname: mobileheader_logoname,
      });
    }
    
    var imgname = '';
    var mobimgname='';
    const index = results.findIndex(obj => obj.fileType === 'header_logo');
    const index1 = results.findIndex(obj => obj.fileType === 'footer_logo');
    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    if(results.length>0 && index1!=-1){
      mobimgname = results[index1].imgname;
    }
    
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("widget", id);
       console.log(locationrAlreadyExistsfornew);
       
       if(results.length>0 && index!=-1){
        imgname = results[index].imgname;
      }
      else{
        imgname = locationrAlreadyExistsfornew.header_logo;
      }
      if(results.length>0 && index1!=-1){
        mobimgname = results[index1].imgname;
      }
      else{
        mobimgname = locationrAlreadyExistsfornew.footer_logo;
      }
    }
    const widget = {
      short_desc: short_desc,

    
      header_logo: imgname,
      footer_logo: mobimgname
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("widget", "id", id);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Widget already exists" });
        } else {
          await insertRecord("widget", widget);
          res.status(201).json({ status: true, message: "Widget created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("widget", "id", id,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Widget already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("widget", widget,id);
          res.status(201).json({ status: true, message: "Widget updated successfully!" });
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




const getWidet = async (req, res) => {
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
        if(search_by=='short_desc'){
         searcht='short_desc';
      
        }
        if(search_by=='short_desc_short'){
         searcht='short_desc_short';
         
        }
      
        const existingUserList = await Recordlistseach("widget", search_by, search,"id",perPage,pageOffset);
       
        if (existingUserList) {
          const existingUserAllList = await Recordalllistsearch("widget", search_by, search,"id");
      
        
          const array = [];
          console.log(existingUserList);
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, short_desc: element.short_desc,
          
            
             header_logo: element.header_logo,
             footer_logo: element.footer_logo
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
        const existingUserList = await Recordlist("widget", null, null,"id",perPage,pageOffset);
       
           if (existingUserList) {
             const existingUserAllList = await Recordalllist("widget", null, null,"id");
       
           
             const array = [];
             console.log(existingUserList);
             existingUserList.forEach((element) => {
              let myObject = { id: element.id,  short_desc: element.short_desc,
          
                short_desc_short: element.short_desc_short,
                header_logo: element.header_logo,
                footer_logo: element.footer_logo
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
             res.status(200).json({status: false,  message: "data not found" , data:[],
              totalCount: 0,
              totalPage: 0, });
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
  addEditWidet,
  getWidet,

 
};