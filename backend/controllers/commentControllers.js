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




const getcommentlist = async (req, res) => {
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
       if (search_by == 'blog_id') {
        searcht = 'blog_id';

      }
      if (search_by == 'name') {
        searcht = 'name';

      }

      if (search_by == 'name') {
        searcht = 'name';

      }

      if (search_by == 'email') {
        searcht = 'email';

      }
      if (search_by == 'status') {
        searcht = 'status';

      }
        const existingUserList = await Recordlistseachjoin("comments", search_by, search,"id",perPage,pageOffset,'blog','blog_id','title');
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllistsearchjoin("comments", search_by, search,"id",'blog','blog_id','title');
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id,
            blog_id: element.blog_id,
            name: element.name,

            email: element.email,
            message: element.message,
            status: element.status,
            cr_date: element.cr_date,
            newtitle:element.newtitle,
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
        const existingUserList = await Recordlistjoin("comments", null, null,"id",perPage,pageOffset,'blog','blog_id','title');
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllistjoin("comments", null, null,"id",'blog','blog_id','title');
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, 
            blog_id: element.blog_id,
            name: element.name,

            email: element.email,
            message: element.message,
            status: element.status,
            cr_date: element.cr_date,
            newtitle:element.newtitle,
           
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
const statuscommentlist = async (req, res) => {
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

      const { id, status } = req.body;

      if (id == undefined || !status) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }

      const Comment = {
        id: id,
        status: status,


      };

      try {




        await UpdateRecord("comments", Comment, id);
        res.status(201).json({ status: true, message: "Comment updated successfully!" });




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
  
  getcommentlist,
  statuscommentlist,

};