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
  Recordlistjoin,
  Recordalllistjoin,
  UpdateRecord,
  checkRowExists,
  Recordlistseachjoin,
  Recordalllistsearchjoin
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
const addEditPageSeoservice = async (req, res) => {
  const token = req.body.token;

  const existingauth = await checkauth(token);


  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {

      const { id, page_name, meta_title, meta_des, meta_key } = req.body;

      if (id == undefined || !page_name) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }

      const slider = {
        page_name: page_name,
        meta_title: meta_title,

        meta_des: meta_des,
        meta_key: meta_key,


      };

      try {
        if (id == 0 || id == null) {
          const meta_titlerAlreadyExists = await checkRecordExists("servicepageseotag", "page_name", page_name);
          if (meta_titlerAlreadyExists) {
            res.status(200).json({ status: false, message: "Service Page Seo already exists" });
          } else {
            await insertRecord("servicepageseotag", slider);
            res.status(201).json({ status: true, message: "Service Page Seo created successfully!" });
          }
        } else {
          const meta_titlerAlreadyExists = await checkAllRecordExists("servicepageseotag", "page_name", page_name, id);

          if (meta_titlerAlreadyExists) {

            res.status(200).json({ status: false, message: "Service Page Seo already exists" });
          } else {
            console.log(meta_titlerAlreadyExists);

            await UpdateRecord("servicepageseotag", slider, id);
            res.status(201).json({ status: true, message: "Service Page Seo updated successfully!" });
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




const getPageSeoservice = async (req, res) => {
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
       if (search_by == 'page_name') {
        searcht = 'page_name';

      }
      if (search_by == 'meta_title') {
        searcht = 'meta_title';

      }
        const existingUserList = await Recordlistseachjoin("servicepageseotag", search_by, search,"id",perPage,pageOffset,'homeservies_new','page_name','title');
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllistsearchjoin("servicepageseotag", search_by, search,"id",'homeservies_new','page_name','title');
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id,
            page_name: element.page_name,
            meta_title: element.meta_title,

            meta_des: element.meta_des,
            meta_key: element.meta_key,

            newtitle:element.newtitle,
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
        const existingUserList = await Recordlistjoin("servicepageseotag", null, null,"id",perPage,pageOffset,'homeservies_new','page_name','title');
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllistjoin("servicepageseotag", null, null,"id",'homeservies_new','page_name','title');
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, page_name: element.page_name,
            meta_title: element.meta_title,

            meta_des: element.meta_des,
            meta_key: element.meta_key,

            newtitle:element.newtitle,
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
  addEditPageSeoservice,
  getPageSeoservice,


};