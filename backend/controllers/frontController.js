const Slider = require('../models/Slider');
const Homeintro = require('../models/Homeintro');
const Homeservice = require('../models/Homeservice');
const Homeprojectintro = require('../models/Homeprojectintro');
const Homeproject = require('../models/Homeproject');
const Homevision = require('../models/Homevision');
const Aboutbanner = require('../models/Aboutbanner');
const AboutIntro = require('../models/AboutIntro');
const Aboutdireactintro = require('../models/Aboutdireactintro');
const AboutteamIntro = require('../models/AboutteamIntro');
const Team = require('../models/Team');
const Abouttimelineintro = require('../models/Abouttimelineintro');
const Abouttimeline = require('../models/Abouttimeline');
const Servicebanner = require('../models/Servicebanner');
const Serviceintro = require('../models/Serviceintro');
const Serviceaiintro = require('../models/Serviceaiintro');
const Serviceaidata = require('../models/Serviceaidata');
const Servicecustomintro = require('../models/Servicecustomintro');
const Servicecustomdata = require('../models/Servicecustomdata');
const Servicemobilityintro = require('../models/Servicemobilityintro');
const Servicemobilitydata = require('../models/Servicemobilitydata');
const Servicesecurityintro = require('../models/Servicesecurityintro');
const Servicesecuritydata = require('../models/Servicesecuritydata');
const Servicelowersec = require('../models/Servicelowersec');

const Productbanner = require('../models/Productbanner');
const Productintro = require('../models/Productintro');
const Product = require('../models/Product');


const Productdetails = require('../models/Productdetails');
const Producteffetkey = require('../models/Producteffetkey');
const Producttangiable = require('../models/Producttangiable');
const Productimage = require('../models/Productimage');

const Blogbanner = require('../models/Blogbanner');
const Blogcategory = require('../models/Blogcategory');
const Blog = require('../models/Blog');
const Blogdetails = require('../models/Blogdetails');

const Casestudiesbanner = require('../models/Casestudiesbanner');
const Casestudiesintro = require('../models/Casestudiesintro');
const Casestudies = require('../models/Casestudies');

const Casestudieskey = require('../models/Casestudieskey');



const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const moment = require("moment-timezone");
const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure secret key
// Function to validate JWT token
exports.authenticateToken = (req, res, next) => {
  //  console.log(req.header("Authorization"));
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(403).json({ status: false, message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ status: false, message: "Unauthorized" });
    req.user = decoded;
    next();
  });
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

// Controller to get home data
exports.getHome = async (req, res) => {
  try {
    const sliders = await Slider.find();
    const homeintro = await Homeintro.findOne();
    const homeservice = await Homeservice.find();
    const homeprojectintro = await Homeprojectintro.findOne();
    const homeproject = await Homeproject.find();
    const homevision = await Homevision.findOne();

    res.status(200).json({
      status: true, "home":
      {
        sliders,homeintro,homeservice,homeprojectintro,homeproject,homevision

      }
    });
  } catch (error) {
    console.error("Error fetching home data:", error.message);
    res.status(500).json({ error: "Failed to fetch sliders!" });
  }

};

// Controller to get about data
exports.getAbout = async (req, res) => {
  try {
    const aboutbanner = await Aboutbanner.findOne();
    const aboutintro = await AboutIntro.findOne();
    const aboutdiintro = await Aboutdireactintro.findOne();
    const aboutteaminto = await AboutteamIntro.findOne();
    const teamda = await Team.find();
    const abouttimelinint = await Abouttimelineintro.findOne();
    const abouttimeline = await Abouttimeline.find();


    res.status(200).json({
      status: true, "about":
      {
    aboutbanner: aboutbanner,
    aboutintro: aboutintro,
    aboutdiintro: aboutdiintro,
    aboutteaminto: aboutteaminto,
    team: teamda,
    abouttimelinintro: abouttimelinint,
    abouttimeline: abouttimeline

      }
    });
  } catch (error) {
    console.error("Error fetching home data:", error.message);
    res.status(500).json({ error: "Failed to fetch sliders!" });
  }

};


// Controller to get service data
exports.getservice = async (req, res) => {
  try {
    const servicebanner = await Servicebanner.findOne();
    const serviceintro = await Serviceintro.findOne();

    const serviceaiintro = await Serviceaiintro.findOne();
     const serviceaidata = await Serviceaidata.find();

    const servicecustomintro = await Servicecustomintro.findOne();
    const servicecustomdata = await Servicecustomdata.find();

    const servicemobilityintro = await Servicemobilityintro.findOne();
    const servicemobilitydata = await Servicemobilitydata.find();


    const servicesecurityintro = await Servicesecurityintro.findOne();
    const servicesecuritydata = await Servicesecuritydata.find();

    const servicelowersec = await Servicelowersec.findOne();
    
    const productbanner = await Productbanner.findOne();
    const productintro = await Productintro.findOne();
    const product =  await Product.aggregate([
      {
        $lookup: {
          from: 'productdetails',
          let: { product_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$product_id', '$$product_id'] }
              }
            }
          ],
          as: 'product_details'
        }
      },
      {
        $lookup: {
          from: 'productimages',
          localField: '_id',
          foreignField: 'product_id',
          as: 'product_images'
        }
      },
      {
        $lookup: {
          from: 'producteffectkeys',
          localField: '_id',
          foreignField: 'product_id',
          as: 'product_effect_keys'
        }
      },
      {
        $lookup: {
          from: 'producttangible',
          localField: '_id',
          foreignField: 'product_id',
          as: 'product_tangible'
        }
      },
      {
        $addFields: {
          product_details: {
            $ifNull: [{ $arrayElemAt: ['$product_details', 0] }, null]
          }
        }
      },
      {
        $project: {
          title: 1,
          short_des: 1,
          image: 1,
          video_image: 1,
          video: 1,
          slug: 1,
          product_details: 1, // Include the flattened product_details
          product_images: 1, // Include the product_images array
          product_effect_keys: 1, // Include the product_effect_keys array
          product_tangible: 1 // Include the product_tangible array
        },
      },
    ]);
    const blogbanner = await Blogbanner.findOne();
    const blogcategory = await Blogcategory.find();
    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: 'blogcategories', // Name of the collection containing categories
          let: { category_id: '$category_id' }, // Local field to match
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$category_id'] } // Matching by `_id` in blogcategories
              }
            }
          ],
          as: 'blog_category' // The resulting category will be stored in this field
        }
      },
      {
        $lookup: {
          from: 'blogsdetails',
          localField: '_id',
          foreignField: 'blog_id',
          as: 'blog_details'
        }
      },
      {
        $addFields: {
          // Set blog_category to null if no matching category exists
          blog_category: {
            $ifNull: [{ $arrayElemAt: ['$blog_category', 0] }, null]
          },
          blog_details: {
            $ifNull: [{ $arrayElemAt: ['$blog_details', 0] }, null]
          }
        }
      },
      
      {
        $project: {
          title: 1,
          image: 1,
          post_date: 1,
          short_des: 1,
          slug: 1,
          blog_category: 1, // Include the category in the final result,
          blog_details: 1
        }
      }
    ]);
    const blogrecentdate = await Blog.find().sort({ post_date: -1 }).limit(3);
    res.status(200).json({
      status: true, "service":
      {
          "servicebanner": servicebanner,
          "serviceintro": serviceintro,
          "serviceaiintro": serviceaiintro,
          "serviceaidata": serviceaidata,
          "servicecustomintro": servicecustomintro,
          "servicecustomdata": servicecustomdata,
          "servicemobilityintro": servicemobilityintro,
          "servicemobilitydata": servicemobilitydata,
          "servicesecurityintro": servicesecurityintro,
          "servicesecuritydata": servicesecuritydata,
          "servicelowersec": servicelowersec
      },
      "product":
      {
        "productbanner": productbanner,
        "productintro": productintro,
        "product": product
      },
      "blog":
      {
        "blogbanner": blogbanner,
        "blogcategory": blogcategory,
        "blogs": blogs,
        "blogrecentdate": blogrecentdate
      }
    });
  } catch (error) {
    console.error("Error fetching home data:", error.message);
    res.status(500).json({ error: "Failed to fetch sliders!" });
  }

};

      
// Controller to get casestudy data
exports.getcasestudy = async (req, res) => {
  try {
    const casestudiesbanner = await Casestudiesbanner.findOne();
    const casestudiesintro = await Casestudiesintro.findOne();

   
    const casestudies = await Casestudies.aggregate([
      {
        $lookup: {
          from: 'products', // Name of the collection containing categories
          let: { product_id: '$product_id' }, // Local field to match
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$product_id'] } // Matching by `_id` in blogcategories
              }
            }
          ],
          as: 'product_details' // The resulting category will be stored in this field
        }
      },
      
      {
        $addFields: {
          // Set blog_category to null if no matching category exists
          product_details: {
            $ifNull: [{ $arrayElemAt: ['$product_details', 0] }, null]
          }
        }
      },
      {
        $lookup: {
          from: 'casestudykeybenefits',
          localField: '_id',
          foreignField: 'casestudy_id',
          as: 'casestudy_key_benefits'
        }
      },
      
      {
        $project: {
          case_image: 1,
          short_des: 1,
          banner_title: 1,
          subtitle: 1,
          watch_video: 1,
          watch_image: 1,
          short_sub_title: 1,
          short_sub_des: 1,
          short_sub_subdes: 1,
          key_title: 1,
          consult_title: 1,
          consult_sub_title: 1,
          sec_title_one: 1,
          sec_title_des_one: 1,
          sec_title_two: 1,
          sec_title_des_two: 1,
          sec_title_three: 1,
          sec_title_three: 1,
          product_details: 1, // Include the category in the final result,
          casestudy_key_benefits: 1
        
        }
      }
    ]);
   
    res.status(200).json({
      status: true, "casestudy":
      {
        casestudiesbanner: casestudiesbanner,
        casestudiesintro: casestudiesintro,
        casestudies: casestudies
      }
    });
  } catch (error) {
    console.error("Error fetching home data:", error.message);
    res.status(500).json({ error: "Failed to fetch sliders!" });
  }

};