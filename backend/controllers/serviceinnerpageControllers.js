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
  Recordalllistsearch,
  Recordalllistsearchdeatils,
  Recordlistseachdeatils,
  Recordlistdeatils,
  Recordalllistdeatils
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
const { head } = require("../routes/authRoutes");
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
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
const addEditServiceinnerpageDetails = async (req, res) => {
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

      const { id, heading, sub_heading, det_firs_par, imp_head, imp_para, bene_head, bene_first_title, bene_first_para, bene_second_title, bene_second_para, bene_third_title, bene_third_para, talk_head, talk_para, work_head, work_para } = req.body;

      if (id == undefined || !heading) {
        res
          .status(400)
          .json({ status: false, message: "Please add the fileds!" });
        return;
      }
      const folder = 'uploads';


      const results = [];
      if (files.banner_image) {
        console.log(existingauth.id);
        const imagename = Date.now() + files.banner_image[0].originalname;
        const image = files.banner_image[0];
        const filePath = files.banner_image[0].path; // File path on local disk
        console.log(filePath);
        const imageUpload = await uploadFileToS3(filePath, image, folder, imagename);
        results.push({
          fileType: 'banner_image',
          url: imageUpload.Location,
          imgname: imagename,
        });
      }
      console.log(existingauth.id);
      if (files.banner_mob_image) {
        const mobileimagename = Date.now() + files.banner_mob_image[0].originalname;
        const mobileimage = files.banner_mob_image[0];
        const filePath = files.banner_mob_image[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'banner_mob_image',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }
      if (files.imp_img) {
        const mobileimagename = Date.now() + files.imp_img[0].originalname;
        const mobileimage = files.imp_img[0];
        const filePath = files.imp_img[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'imp_img',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }

      if (files.bene_img) {
        const mobileimagename = Date.now() + files.bene_img[0].originalname;
        const mobileimage = files.bene_img[0];
        const filePath = files.bene_img[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'bene_img',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }
      if (files.work_img) {
        const mobileimagename = Date.now() + files.work_img[0].originalname;
        const mobileimage = files.work_img[0];
        const filePath = files.work_img[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'work_img',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }
      if (files.talk_img) {
        const mobileimagename = Date.now() + files.talk_img[0].originalname;
        const mobileimage = files.talk_img[0];
        const filePath = files.talk_img[0].path; // File path on local disk
        const mobileUpload = await uploadFileToS3(filePath, mobileimage, folder, mobileimagename);
        results.push({
          fileType: 'talk_img',
          url: mobileUpload.Location,
          imgname: mobileimagename,
        });
      }

      var imgname = '';
      var mobimgname = '';
      var impimgname = '';
      var beneimgname = '';
      var workimgname = '';
      var talkimgname = '';
      const index = results.findIndex(obj => obj.fileType === 'banner_image');
      const index1 = results.findIndex(obj => obj.fileType === 'banner_mob_image');
      const index2 = results.findIndex(obj => obj.fileType === 'imp_img');
      const index3 = results.findIndex(obj => obj.fileType === 'bene_img');
      const index4 = results.findIndex(obj => obj.fileType === 'work_img');
      const index5 = results.findIndex(obj => obj.fileType === 'talk_img');
      if (results.length > 0 && index != -1) {
        imgname = results[index].imgname;
      }
      if (results.length > 0 && index1 != -1) {
        mobimgname = results[index1].imgname;
      }
      if (results.length > 0 && index2 != -1) {
        impimgname = results[index2].imgname;
      }

      if (results.length > 0 && index3 != -1) {
        beneimgname = results[index3].imgname;
      }
      if (results.length > 0 && index4 != -1) {
        workimgname = results[index4].imgname;
      }
      if (results.length > 0 && index5 != -1) {
        talkimgname = results[index5].imgname;
      }
      if (id != 0) {

        const locationrAlreadyExistsfornew = await checkRowExists("homeservies_new", id);
        console.log(locationrAlreadyExistsfornew);

        if (results.length > 0 && index != -1) {
          imgname = results[index].imgname;
        }
        else {
          imgname = locationrAlreadyExistsfornew.banner_image;
        }
        if (results.length > 0 && index1 != -1) {
          mobimgname = results[index1].imgname;
        }
        else {
          mobimgname = locationrAlreadyExistsfornew.banner_mob_image;
        }

        if (results.length > 0 && index2 != -1) {
          impimgname = results[index2].imgname;
        } else {
          impimgname = locationrAlreadyExistsfornew.imp_img;
        }

        if (results.length > 0 && index3 != -1) {
          beneimgname = results[index3].imgname;
        } else {
          beneimgname = locationrAlreadyExistsfornew.bene_img;
        }

        if (results.length > 0 && index4 != -1) {
          workimgname = results[index4].imgname;
        } else {
          workimgname = locationrAlreadyExistsfornew.work_img;
        }
        if (results.length > 0 && index5 != -1) {
          talkimgname = results[index5].imgname;
        } else {
          talkimgname = locationrAlreadyExistsfornew.talk_img;
        }


      }
      const slider = {
        heading: heading,
        sub_heading: sub_heading,

        banner_image: imgname,
        banner_mob_image: mobimgname,
        imp_img: impimgname,
        bene_img: beneimgname,
        work_img: workimgname,
        talk_img: talkimgname,
        det_firs_par: det_firs_par,
        imp_head: imp_head,
        imp_para: imp_para,
        bene_head: bene_head,
        bene_first_title: bene_first_title,
        bene_first_para: bene_first_para,
        bene_second_title: bene_second_title,
        bene_second_para: bene_second_para,
        bene_third_title: bene_third_title,
        bene_third_para: bene_third_para,
        talk_head: talk_head,
        talk_para: talk_para,
        work_head: work_head,
        work_para: work_para,




      };

      try {
        if (id == 0 || id == null) {
          const locationrAlreadyExists = await checkRecordExists("homeservies_new", "id", id);
          if (locationrAlreadyExists) {
            res.status(200).json({ status: false, message: "Service  already exists" });
          } else {
            await insertRecord("homeservies_new", slider);
            res.status(201).json({ status: true, message: "Service created successfully!" });
          }
        } else {
          const locationrAlreadyExists = await checkAllRecordExists("homeservies_new", "id", id, id);

          if (locationrAlreadyExists) {

            res.status(200).json({ status: false, message: "Service already exists" });
          } else {
            console.log(locationrAlreadyExists);

            await UpdateRecord("homeservies_new", slider, id);
            res.status(201).json({ status: true, message: "Service Details updated successfully!" });
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




const getServiceinnerpageDetails = async (req, res) => {
  const { perPage, page, search_by, search } = req.body;
  const token = req.body.token;

  const existingauth = await checkauth(token);
  console.log(existingauth);
  try {

    if (existingauth.id == undefined) {

      res
        .status(401)
        .json({ status: false, message: "Unauthorized" });
      return;
    } else {
      try {
        const pageOffset = (page * perPage) - perPage;
        if (search != '') {

          var searcht = '';
          var searchtval = '';
          if (search_by == 'title') {
            searcht = 'title';

          }
          if (search_by == 'subtitle') {
            searcht = 'subtitle';

          }
          const existingUserList = await Recordlistseachdeatils("homeservies_new", search_by, search, "id", perPage, pageOffset, "heading");
          if (existingUserList) {

            const existingUserAllList = await Recordalllistsearchdeatils("homeservies_new", search_by, search, "id", "heading");


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id,
                title: element.title,
                banner_image: element.banner_image,
                banner_mob_image: element.banner_mob_image,

                imp_img: element.imp_img,
                bene_img: element.bene_img,
                talk_img: element.talk_img,
                work_img: element.work_img,
                heading: element.heading,
                sub_heading: element.sub_heading,
                det_firs_par: element.det_firs_par,
                imp_head: element.imp_head,
                imp_para: element.imp_para,
                bene_head: element.bene_head,
                bene_first_title: element.bene_first_title,
                bene_first_para: element.bene_first_para,
                bene_second_title: element.bene_second_title,
                bene_second_para: element.bene_second_para,
                bene_third_title: element.bene_third_title,
                bene_third_para: element.bene_third_para,
                talk_head: element.talk_head,
                talk_para: element.talk_para,
                work_head: element.work_head,
                work_para: element.work_para,
              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({ status: true, message: "data not found"  , data:[],
              totalCount: 0,
              totalPage: 0,});
          }
        } else {
          const existingUserList = await Recordlistdeatils("homeservies_new", null, null, "id", perPage, pageOffset, "heading");
          if (existingUserList) {

            const existingUserAllList = await Recordalllistdeatils("homeservies_new", null, null, "id", "heading");


            const array = [];
            existingUserList.forEach((element) => {
              let myObject = {
                id: element.id,
                title: element.title,
                banner_image: element.banner_image,
                banner_mob_image: element.banner_mob_image,
                imp_img: element.imp_img,
                bene_img: element.bene_img,
                talk_img: element.talk_img,
                work_img: element.work_img,
                det_firs_par: element.det_firs_par,
                imp_head: element.imp_head,
                imp_para: element.imp_para,
                bene_head: element.bene_head,
                heading: element.heading,
                sub_heading: element.sub_heading,
                bene_first_title: element.bene_first_title,
                bene_first_para: element.bene_first_para,
                bene_second_title: element.bene_second_title,
                bene_second_para: element.bene_second_para,
                bene_third_title: element.bene_third_title,
                bene_third_para: element.bene_third_para,
                talk_head: element.talk_head,
                talk_para: element.talk_para,
                work_head: element.work_head,
                work_para: element.work_para,

                slider_status: element.slider_status,
              };
              array.push(myObject);
            });

            const totalCount = existingUserAllList.length;
            const totalPage = Math.ceil(existingUserAllList.length / perPage);


            res.status(200).json({
              status: true,
              data: array,
              totalCount: totalCount,
              totalPage: totalPage,
            });

          } else {
            res.status(200).json({ status: true, message: "data not found"  , data:[],
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
  addEditServiceinnerpageDetails,
  getServiceinnerpageDetails


};