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
const addEditOurteam = async (req, res) => {
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
 
    const { id, name, designation ,face_url,twitter_url} = req.body;
   
    if (id==undefined || !name) {
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
       console.log(filePath);
      const imageUpload = await uploadFileToS3(filePath,image, folder, imagename);
      results.push({
        fileType: 'image',
        url: imageUpload.Location,
        imgname: imagename,
      });
    }
    console.log(existingauth.id);
    // if (files.mobile_image) {
    //   const  mobileimagename = Date.now() + files.mobile_image[0].originalname;
    //   const mobileimage = files.mobile_image[0];
    //   const filePath =  files.mobile_image[0].path; // File path on local disk
    //   const mobileUpload = await uploadFileToS3(filePath,mobileimage, folder, mobileimagename);
    //   results.push({
    //     fileType: 'mobile_image',
    //     url: mobileUpload.Location,
    //     imgname: mobileimagename,
    //   });
    // }
    
    var imgname = '';
    var mobimgname='';
    const index = results.findIndex(obj => obj.fileType === 'image');

    if(results.length>0 && index!=-1){
      imgname = results[index].imgname;
    }
    // if(results.length>0 && results[1] && results[1].fileType=='mobile_image'){
    //   mobimgname = results[1].imgname;
    // }
    
    if(id!=0){
     
      const locationrAlreadyExistsfornew = await checkRowExists("team", id);
       console.log(locationrAlreadyExistsfornew);
       
       if(results.length>0 && index!=-1){
        imgname = results[index].imgname;
      }
      else{
        imgname = locationrAlreadyExistsfornew.image;
      }
      // if(results.length>0 && results[1] && results[1].fileType=='mobile_image'){
      //   mobimgname = results[1].imgname;
      // }
      // else{
      //   mobimgname = locationrAlreadyExistsfornew.mobile_image;
      // }
    }
    const slider = {
      name: name,
      designation: designation,
      face_url: face_url,
      twitter_url: twitter_url,
 
      image: imgname,
      // mobile_image: mobimgname
    
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("team", "name", name);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Team already exists" });
        } else {
          await insertRecord("team", slider);
          res.status(201).json({ status: true, message: "Team created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("team", "name", name,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Team already exists" });
        } else {
          console.log(locationrAlreadyExists);
         
          await UpdateRecord("team", slider,id);
          res.status(201).json({ status: true, message: "Team updated successfully!" });
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




const getOurteam = async (req, res) => {
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
       if(search_by=='name'){
        searcht='name';

       }
       if(search_by=='designation'){
        searcht='designation';
        
       }
        const existingUserList = await Recordlistseach("team", search_by, search,"id",perPage,pageOffset);
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllistsearch("team", search_by, search,"id");
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, image: element.image,
            //  mobile_image: element.mobile_image,
             name: element.name, 
             designation: element.designation,
            
              face_url: element.face_url,
              twitter_url: element.twitter_url,
              team_status: element.team_status,
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
        const existingUserList = await Recordlist("team", null, null,"id",perPage,pageOffset);
        if (existingUserList) {
      
          const existingUserAllList = await Recordalllist("team", null, null,"id");
    
        
          const array = [];
          existingUserList.forEach((element) => {
           let myObject = { id: element.id, image: element.image,
            //  mobile_image: element.mobile_image,
             name: element.name, 
             designation: element.designation,
             face_url: element.face_url,
             twitter_url: element.twitter_url,
             team_status: element.team_status,
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
const DeleteOurteam = async (req, res) => {
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
    
      
         
         
          await UpdateRecord("team", slider,id);
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
module.exports = {
  addEditOurteam,
  getOurteam,
  DeleteOurteam
 
};