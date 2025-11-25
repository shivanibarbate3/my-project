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




const getcontactslist = async (req, res) => {
  const { perPage, page,search_by,search } = req.body;
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
      if(search!=''){
        
       var  searcht='';
       var searchtval='';
     
      if (search_by == 'name') {
        searcht = 'name';

      }

      if (search_by == 'name') {
        searcht = 'name';

      }

      if (search_by == 'email') {
        searcht = 'email';

      }
     
      const existingUserList = await Recordlistseach("contacts_new", search_by, search,"id",perPage,pageOffset);
       
      if (existingUserList) {
        const existingUserAllList = await Recordalllistsearch("contacts_new", search_by, search,"id");
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id,
            phone: element.phone,
            name: element.name,

            email: element.email,
            message: element.message,
            city: element.city,
            cr_date: element.cr_date,
         
            }; 
           array.push(myObject);
       });
        
          const   totalCount= existingUserAllList.length;
          const  totalPage = Math.ceil(existingUserAllList.length / perPage);
      
        
            res.status(200).json({
              status: true, 
              data:array,
              dataall:existingUserAllList,
              totalCount: totalCount,
              totalPage: totalPage,
            });
         
        } else {
          res.status(200).json({status: true,  message: "data not found"  , data:[],
            dataall:[],
            totalCount: 0,
            totalPage: 0,});
        }
      }else{
        const existingUserList = await Recordlist("contacts_new", null, null,"id",perPage,pageOffset);
       
        if (existingUserList) {
          const existingUserAllList = await Recordalllist("contacts_new", null, null,"id");
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, 
            phone: element.phone,
            name: element.name,

            email: element.email,
            message: element.message,
            city: element.city,
            cr_date: element.cr_date,
            }; 
           array.push(myObject);
       });
        
          const   totalCount= existingUserAllList.length;
          const  totalPage = Math.ceil(existingUserAllList.length / perPage);
      
        
            res.status(200).json({
              status: true, 
              data:array,
              dataall:existingUserAllList,
              totalCount: totalCount,
              totalPage: totalPage,
            });
         
        } else {
          res.status(200).json({status: true,  message: "data not found"  , data:[],
            dataall:[],
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
const statuscontactslist = async (req, res) => {

  const token = req.body.token;

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
    
      
         
         
          await UpdateRecord("contacts_new", slider,id);
          res.status(201).json({ status: true, message: "contacts updated successfully!" });
        
      
     
     
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
  
  getcontactslist,
  statuscontactslist,

};