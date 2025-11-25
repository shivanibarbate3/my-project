const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
const multer = require('multer');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const {
  insertRecord,
  Recordactivelist,
  Recordactivelistlimit,
  checkRecordExistsnew,
  checkRecordExists,
  UpdateRecord,
} = require("../utils/sqlFunctions");
const {
  uploadFile,

} = require("../utils/uploadFile");


// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Your AWS access key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // Your AWS secret key
  region: process.env.AWS_DEFAULT_REGION  // Your AWS region
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function formdatechange(date, format = null) {

  const myArray = date.split("-");
  var month = myArray[1];
  var day = myArray[2];
  var year = myArray[0];


  var daten = (month + '/' + day + '/' + year);
  // if (month.length < 2) month = '0' + month;
  // if (day.length < 2) day = '0' + day;

  // if (format && format == 'Y-m-d') return [month, day, year].join('-');
  // else return [month, day, year].join('-');
  return daten;
}
const homepage = async (req, res) => {


  try {

    const homeBannerList = await Recordactivelist("sliders", "slider_status", "active", "id");
    const array = [];
    // console.log(homeBannerList);
    if (homeBannerList.length > 0) {



      homeBannerList.forEach((element) => {
        let myObject = {
          id: element.id, image: element.image,
          mobile_image: element.mobile_image,
          title: element.title,
          subtitle: element.subtitle,
          short_des: element.short_des,
          short_desnew: element.short_desnew,
        };
        array.push(myObject);
      });

    }

    const homeServicesList = await Recordactivelist("homeservies", null, null, "id");
    const homeserviesarray = [];

    if (homeServicesList.length > 0) {



      homeServicesList.forEach((element) => {
        let myObject = {
          id: element.id, image: element.image,
          title: element.title,
          short_des: element.short_des,
          image_hover: element.image_hover,
        };
        homeserviesarray.push(myObject);
      });

    }

    const servicestitleList = await Recordactivelist("hometitles", null, null, "id");
    let myObjectserv = {};
    if (servicestitleList.length > 0) {



      servicestitleList.forEach((element) => {
        myObjectserv = {
          id: element.id, projecttitle: element.projecttitle,
          servicetitle: element.servicetitle,

        };

      });

    }



    const ServicesList = await Recordactivelist("services", null, null, "id");
    const serviesarray = [];

    if (ServicesList.length > 0) {



      ServicesList.forEach((element) => {
        let myObject = {
          id: element.id, image: element.image,
          title: element.title,
          slug: element.slug,

        };
        serviesarray.push(myObject);
      });

    }



    const projectsList = await Recordactivelistlimit("projects", null, null, "home_seq");
    const projectssarray = [];

    if (projectsList.length > 0) {



      projectsList.forEach((element) => {
        let myObject = {
          id: element.id, image: element.image,
          title: element.title,
          slug: element.slug,
          short_des: element.short_des,
          video: element.video,
          video_image: element.video_image,
          home_case: element.home_case,
          


        };
        projectssarray.push(myObject);
      });

    }


    const homevisionList = await Recordactivelist("homevisision", null, null, "id");
    let myObjecthomevi = {};
    if (homevisionList.length > 0) {



      homevisionList.forEach((element) => {
        myObjecthomevi = {
          id: element.id, title: element.title,
          image: element.image,
          short_des: element.short_des,
          description: element.description,
        };

      });

    }

    const homepartnerList = await Recordactivelist("homepartners", null, null, "id");
    let myObjectpartne = {};
    if (homepartnerList.length > 0) {



      homepartnerList.forEach((element) => {
        myObjectpartne = {
          id: element.id, title: element.title,
          subtitle: element.subtitle,
          short_des: element.short_des,
          subtiltle_one: element.subtiltle_one,


        };

      });

    }

    const homeuniqueList = await Recordactivelist("homeuniques", null, null, "id");
    let myObjectunique = {};
    if (homeuniqueList.length > 0) {



      homeuniqueList.forEach((element) => {
        myObjectunique = {
          id: element.id, title: element.title,
          image: element.image,
          short_des: element.short_des,


        };

      });

    }

    res.status(200).json({
      status: true,
      "home":
      {
        "homebanner": array,
        "homeservies": homeserviesarray,
        "hometitle": myObjectserv,
        "services": serviesarray,
        "projects": projectssarray,
        "homevision": myObjecthomevi,
        "homepartner": myObjectpartne,
        "homeunique": myObjectunique,

      },

    });


  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }


};
const aboutpage = async (req, res) => {


  try {



    const aboutBannerList = await Recordactivelist("aboutbanner", null, null, "id");
    let myObjectabba = {};
    if (aboutBannerList.length > 0) {



      aboutBannerList.forEach((element) => {
        myObjectabba = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const aboutPageList = await Recordactivelist("aboutpagedetails", null, null, "id");
    let myObjectabpage = {};
    if (aboutPageList.length > 0) {



      aboutPageList.forEach((element) => {
        myObjectabpage = {
          id: element.id, page_title: element.page_title,
          image: element.image,
          page_short_des: element.page_short_des,
          page_des: element.page_des,
        };

      });

    }
    res.status(200).json({
      status: true,
      "about":
      {
        "aboutbanner": myObjectabba,
        aboutpage: myObjectabpage,
      },



    });


  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }


};
const sercasecarrcon = async (req, res) => {


  try {



    const serviceBannerList = await Recordactivelist("servicebanner", null, null, "id");
    let myObjectserv = {};
    if (serviceBannerList.length > 0) {



      serviceBannerList.forEach((element) => {
        myObjectserv = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const servicePageList = await Recordactivelist("servicepagedetails", null, null, "id");
    let myObjectserpage = {};
    if (servicePageList.length > 0) {



      servicePageList.forEach((element) => {
        myObjectserpage = {
          id: element.id, page_title: element.page_title,


        };

      });

    }

    const servicesList = await Recordactivelist("services", null, null, "id");
    const servicessarray = [];

    if (servicesList.length > 0) {



      servicesList.forEach((element) => {
        let myObject = {
          id: element.id, image: element.image,
          title: element.title,
          slug: element.slug,
          banner_title: element.banner_title,
          banner_image: element.banner_image,
          first_image: element.first_image,
          first_title: element.first_title,
          first_des: element.first_des,
          second_image: element.second_image,
          second_title: element.second_title,
          short_title_one: element.short_title_one,
          short_des: element.short_des,
          short_title_two: element.short_title_two,
          short_des_two: element.short_des_two,


        };
        servicessarray.push(myObject);
      });

    }



    const casestudieBannerList = await Recordactivelist("casestudiesbanner", null, null, "id");
    let myObjectcasev = {};
    if (casestudieBannerList.length > 0) {



      casestudieBannerList.forEach((element) => {
        myObjectcasev = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const casestudiesPageList = await Recordactivelist("casestudiespagedetails", null, null, "id");
    let myObjectcasepage = {};
    if (casestudiesPageList.length > 0) {



      casestudiesPageList.forEach((element) => {
        myObjectcasepage = {
          id: element.id, page_title: element.page_title,
          image: element.image,
          page_short_des: element.page_short_des,


        };

      });

    }

    const casestudiessList = await Recordactivelist("projects", null, null, "id");
    const casestudiesssarray = [];

    if (casestudiessList.length > 0) {



      casestudiessList.forEach((element) => {
        let myObject = {
          id: element.id,
          title: element.title,
          slug: element.slug,
          short_des: element.short_des,
          video: element.video,
          video_image: element.video_image,
          image: element.image,
          first_title: element.first_title,
          first_des: element.first_des,
          second_title: element.second_title,
          second_des: element.second_des,
          third_title: element.third_title,
          third_des: element.third_des,
          pro_case: element.pro_case,



        };
        casestudiesssarray.push(myObject);
      });

    }

    const careerBannerList = await Recordactivelist("careerbanner", null, null, "id");
    let myObjectcareerv = {};
    if (careerBannerList.length > 0) {



      careerBannerList.forEach((element) => {
        myObjectcareerv = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const careersPageList = await Recordactivelist("careerpagedetails", null, null, "id");
    let myObjectcareerpage = {};
    if (careersPageList.length > 0) {



      careersPageList.forEach((element) => {
        myObjectcareerpage = {
          id: element.id, page_title: element.page_title,


        };

      });

    }

    const careerssList = await Recordactivelist("careers", null, null, "id");
    const careersssarray = [];

    if (careerssList.length > 0) {



      careerssList.forEach((element) => {
        let myObject = {
          id: element.id,
          title: element.title,
          location: element.location,
          short_des: element.short_des,
          des: element.des,
          email: element.email,
          position: element.position,




        };
        careersssarray.push(myObject);
      });

    }


    const contactBannerList = await Recordactivelist("contactsbanner", null, null, "id");
    let myObjectcontactv = {};
    if (contactBannerList.length > 0) {



      contactBannerList.forEach((element) => {
        myObjectcontactv = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const contactsPageList = await Recordactivelist("contactpagedetails", null, null, "id");
    let myObjectcontactpage = {};
    if (contactsPageList.length > 0) {



      contactsPageList.forEach((element) => {
        myObjectcontactpage = {
          id: element.id, page_title: element.page_title,
          address: element.address,
          email: element.email,
          phone: element.phone,
          linkdin_link: element.linkdin_link,
          map: element.map,


        };

      });

    }

    const projectBannerList = await Recordactivelist("projectbanner", null, null, "id");
    let myObjectprov = {};
    if (projectBannerList.length > 0) {



      projectBannerList.forEach((element) => {
        myObjectprov = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const projectPageList = await Recordactivelist("projectpagedetails", null, null, "id");
    let myObjectpropage = {};
    if (projectPageList.length > 0) {



      projectPageList.forEach((element) => {
        myObjectpropage = {
          id: element.id, page_title: element.page_title,


        };

      });

    }

    const projectsList = await Recordactivelist("projects", null, null, "pro_seq");
    const projectssarray = [];

    if (projectsList.length > 0) {



      projectsList.forEach((element) => {
        let myObject = {
          id: element.id,
          title: element.title,
          slug: element.slug,
          short_des: element.short_des,
          video: element.video,
          video_image: element.video_image,
          image: element.image,
          first_title: element.first_title,
          first_des: element.first_des,
          second_title: element.second_title,
          second_des: element.second_des,
          third_title: element.third_title,
          third_des: element.third_des,
          short_de_pro: element.short_de_pro,
          project_link: element.project_link,
          pro_case: element.pro_case,



        };
        projectssarray.push(myObject);
      });

    }

    const privacyBannerList = await Recordactivelist("privacybanner", null, null, "id");
    let myObjectprivacyv = {};
    if (privacyBannerList.length > 0) {



      privacyBannerList.forEach((element) => {
        myObjectprivacyv = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const privacyPageList = await Recordactivelist("privacypagedetails", null, null, "id");
    let myObjectprivacypage = {};
    if (privacyPageList.length > 0) {



      privacyPageList.forEach((element) => {
        myObjectprivacypage = {
          id: element.id, page_title: element.page_title,
          image: element.image,
          page_short_des: element.page_short_des,
          page_des: element.page_des,



        };

      });

    }

    const termsBannerList = await Recordactivelist("termsbanner", null, null, "id");
    let myObjecttermsv = {};
    if (termsBannerList.length > 0) {



      termsBannerList.forEach((element) => {
        myObjecttermsv = {
          id: element.id, banner_image: element.banner_image,
          banner_mobile_image: element.banner_mobile_image,
          banner_title: element.banner_title,
          banner_title_short: element.banner_title_short,
        };

      });

    }

    const termsPageList = await Recordactivelist("termspagedetails", null, null, "id");
    let myObjecttermspage = {};
    if (termsPageList.length > 0) {



      termsPageList.forEach((element) => {
        myObjecttermspage = {
          id: element.id, page_title: element.page_title,
          image: element.image,
          page_short_des: element.page_short_des,
          page_des: element.page_des,



        };

      });

    }
    res.status(200).json({
      status: true,

      "service":
      {
        "servicebanner": myObjectserv,
        "servicepage": myObjectserpage,
        "services": servicessarray,

      },

      "casestudies":
      {
        "casestudiesbanner": myObjectcasev,
        "casestudiespage": myObjectcasepage,
        "casestudies": casestudiesssarray,

      },
      "career":
      {
        "careerbanner": myObjectcareerv,
        "careerpage": myObjectcareerpage,
        "careers": careersssarray,

      },
      "project":
      {
        "projectbanner": myObjectprov,
        "projectpage": myObjectpropage,
        "projects": projectssarray,

      },
      "contact":
      {
        "contactbanner": myObjectcontactv,
        "contactpage": myObjectcontactpage,

      },

      "privacy":
      {
        "privacybanner": myObjectprivacyv,
        "privacypage": myObjectprivacypage,

      },
      "terms":
      {
        "termsbanner": myObjecttermsv,
        "termspage": myObjecttermspage,

      },

    });


  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }


};

const contactform = async (req, res) => {

  const { name, email, message, phone, city } = req.body;
  if (!name || !email || !message) {
    res
      .status(400)
      .json({ status: false, error: "Name or email  or phone  or city or message  fields cannot be empty!" });
    return;
  } else {
    try {
      const contact = {
        name: name,
        email: email,
        message: message,
        phone: phone,
        city: city,
      };
      await insertRecord("contacts", contact);


      var transporter = nodemailer.createTransport({
        service: 'smtp',
        host: "email-smtp.us-east-1.amazonaws.com", // hostname
        secure: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
          user: 'AKIA57QWVS3TDOX72PRS',
          pass: 'BDgK6DTR0ZtZ6FV8VSFtub7agxxDghlZIonuIIMa/KGO'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      let htmlContent = `
                            <!DOCTYPE html>
          <html lang="en">

          <head>
            <title>:: Appostrophi ::</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
            <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
          </head>

          <body >
            <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
                <a href="https://www.appostrophi.com/" >
                    <img src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
                </a>
         
          <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
              <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                            color: #fff;
              font-weight: 600;
             
              position: relative;
              font-size: 15px;
              font-family: Arial, Helvetica, sans-serif;
              max-width: 500px;
              margin: 15px auto;
              display: block;
              background-color: #ffffff;
              margin-top: 15px;"
              >
                <img src="cid:bannImage" alt="${name}" style="width:100%;"/>


              <div style="margin: 10px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
              font-weight: 300; font-size: 15px; color: #666;padding-bottom: 20px; ">
              <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-size:16px;font-weight: 600;">
                You Have New Enquiry From Contact Us Page
                        </div>
          
                <div style="margin-top: 20px; font-family: Arial, Helvetica, sans-serif;color:#676666;font-size: 15px;line-height: 22px;">
                  <table style="width:100%">
                    <tr>
                      <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Name</td>
                      <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                      <td style="font-size:14px;width:66%;vertical-align: baseline;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Email</td>
                      <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                      <td style="font-size:14px;width:66%;vertical-align: baseline;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Phone Number</td>
                      <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                      <td style="font-size:14px;width:66%;vertical-align: baseline;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">City</td>
                      <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                      <td style="font-size:14px;width:66%;vertical-align: baseline;">${city}</td>
                    </tr>

                    <tr>
                      <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Message</td>
                      <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                      <td style="font-size:14px;width:66%;vertical-align: baseline;">${message}</td>
                    </tr>
                  </table>
                </div>

              </div>
              <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                    <div style="margin:11px 0px 1px 0px">
                    <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                    <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${name}" style="height: 20px;"/></a>
                    </div>
               </div>
                

           
    


            </div>


            </div>
          </body>

          </html>
    `;
      var mailOptions = {
        from: 'no-reply@appostrophi.com',
        to: 'ankita@ivdisplays.com',
        subject: 'Appostrophi Contact Query',
        html: htmlContent,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'image-mail-banne-02.png',  // The image filename
            path: __dirname + '/images/image-mail-banne-02.png',  // The local path to the image
            cid: 'bannImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };

      let htmlContentnew = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <title>:: Appostrophi ::</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
      </head>
      
      <body >
        <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
            <a href="https://www.appostrophi.com/" >
                <img  src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
            </a>
      
      <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
          <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                        color: #fff;
          font-weight: 600;
         
          position: relative;
          font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;
          max-width: 500px;
          margin: 15px auto;
          display: block;
          background-color: #ffffff;
          margin-top: 15px;"
          >
            <img  src="cid:emailathankImage" alt="${name}" style="width:100%;"/>
      
      
          <div style="margin: 30px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
          font-weight: 300; font-size: 15px; color: #666;padding-bottom: 10px; ">
          <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-weight: 400;">
            
            <p style="font-weight: 600;font-size:16px;margin:19px 0px 0px 0px">Thank you for getting in touch,</p>
            <p style="font-weight: 400;font-size:16px;margin: 12px 0px 0px 0px;">our support team is reviewing your query.</p> 
            <p  style="font-weight: 400;font-size:16px;margin: 8px 0px 0px 0px;">Expect to hear from us on the next working day.</p>
      
      
          </div>
      
          </div>
          <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
            <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                <div style="margin:11px 0px 1px 0px">
                <a href="https://www.appostrophi.com/" > <img  src="cid:webthImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinthImage" alt="${name}" style="height: 20px;"/></a>
                </div>
           </div>
            
      
       
      
      
      
        </div>
      
      
        </div>
      </body>
      
      </html>
         `;

      var mailOptionscon = {
        from: 'no-reply@appostrophi.com',
        to: email,
        subject: 'Thank you for contacting us',
        html: htmlContentnew,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'emailer_thanku-final.png',  // The image filename
            path: __dirname + '/images/emailer_thanku-final.png',  // The local path to the image
            cid: 'emailathankImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webthImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinthImage' // Same CID as in the HTML <img> tag
          }
        ]
      };

      transporter.sendMail(mailOptionscon, function (error, info) {
        if (error) {

          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);

        }
      });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "Contact send successfully!" });
        }
      });

    }
    catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

};
const applyform = async (req, res) => {

  const { name, email, phone, career_id, upload_cv } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !career_id || !upload_cv | dob) {
    res
      .status(400)
      .json({ status: false, error: "Name or email  or phone  or career_id or upload_cv  fields cannot be empty!" });
    return;
  } else {
    try {

      const upload_cvre = await uploadFile(upload_cv);;
      console.log(upload_cvre);
      // const application = {
      //   name: name,
      //   email: email,
      //   career_id: career_id,
      //   phone: phone,
      //   upload_cv: upload_cv,
      // };
      // await insertRecord("application", application);





    }
    catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

};
function getRandomFourDigit() {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
const happycontform = async (req, res) => {

  const { name, email, phone, casestudyname, contact_us, pagename, sh_date, sh_time } = req.body;
  if (!name || !email) {
    res
      .status(400)
      .json({ status: false, error: "Name or email      fields cannot be empty!" });
    return;
  } else {
    const otp = null;
    const otp_sent_at = '';
    let randomFourDigit = getRandomFourDigit();
    try {
      const connect = {
        name: name,
        email: email,
        casestudyname: casestudyname,
        pagename: pagename,
        otp: randomFourDigit,
        otp_sent_at: new Date(),
        phone: phone,
        sh_time: sh_time,
        sh_date: sh_date,
        contact_us: contact_us,

      };
      var resutlt = await insertRecord("connects", connect);
      console.log(resutlt.insertId);


      var transporter = nodemailer.createTransport({
        service: 'smtp',
        host: "email-smtp.us-east-1.amazonaws.com", // hostname
        secure: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
          user: 'AKIA57QWVS3TDOX72PRS',
          pass: 'BDgK6DTR0ZtZ6FV8VSFtub7agxxDghlZIonuIIMa/KGO'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var newdatee = '';
      if (sh_date != null && sh_date != '') {
        newdatee = formdatechange(sh_date);
      }

      let htmlContent = `
      <!DOCTYPE html>
                <html lang="en">

                <head>
                  <title>:: Appostrophi ::</title>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
                  <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
                </head>

                <body >
                  <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
                      <a href="https://www.appostrophi.com/" >
                          <img src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
                      </a>
              
                <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
                    <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                                  color: #fff;
                    font-weight: 600;
                  
                    position: relative;
                    font-size: 15px;
                    font-family: Arial, Helvetica, sans-serif;
                    max-width: 500px;
                    margin: 15px auto;
                    display: block;
                    background-color: #ffffff;
                    margin-top: 15px;"
                    >
                      <img src="cid:bannImage" alt="${name}" style="width:100%;"/>


                    <div style="margin: 10px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
                    font-weight: 300; font-size: 15px; color: #666;padding-bottom: 20px; ">
                    <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-size:16px;font-weight: 600;">
                     You Have New Enquiry From  ${pagename == 'morecasestudies' ? `Case Study Page` : ``} ${(pagename == 'bookdemo') ? `Demo Request From Case Studies page` : ``} ${pagename == 'bookdemoproject' ? `Demo Request From Project page` : ``} ${pagename == 'servicepage' ? `Service Request` : ``} ${pagename == 'talktous' ? `Talk To Us Request` : ``} ${pagename == 'getintouch' ? `Get in touch` : ``} ${pagename == 'leader' ? `Talk to our Leadership Team` : ``}  
                              </div>
                
                      <div style="margin-top: 20px; font-family: Arial, Helvetica, sans-serif;color:#676666;font-size: 15px;line-height: 22px;">
                        <table style="width:100%">
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Name</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Email</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${email}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Phone Number</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${phone}</td>
                          </tr>
                          
                        ${pagename == 'morecasestudies'

          ?
          `
                        <tr>
                          <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Case Study Name</td>
                          <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                          <td style="font-size:14px;width:66%;vertical-align: baseline;">${casestudyname}</td>
                        </tr>
                        `
          :
          ``

        }
                      ${(pagename == 'bookdemo' || pagename == 'bookdemoproject')

          ? `
                    
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Case Study Name</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${casestudyname}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Scheduled Date</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${newdatee}</td>
                      </tr>
                     
                  
                      `
          :
          ``
        }
                            ${pagename == 'servicepage'

          ?
          `
                    
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Service Name</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${casestudyname}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Contacting us for</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${contact_us}</td>
                      </tr>
                      `
          :
          ``

        }
                      
                            ${pagename == 'talktous'

          ?
          `
                      
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Contacting us for</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${contact_us}</td>
                      </tr>
                      `
          :
          ``

        }
                      
                      ${pagename == 'getintouch'
          ?
          `
                      
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Contacting us for</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${contact_us}</td>
                      </tr>
                      `
          :
          ``
        }
                      
                      ${pagename == 'leader'

          ?
          `
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Contacting us for</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${contact_us}</td>
                      </tr>
                    
                      `
          :
          ``
        } 

                        </table>
                      </div>

                    </div>
                    <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                      <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                          <div style="margin:11px 0px 1px 0px">
                    <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                    <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${name}" style="height: 20px;"/></a>
                    </div>
                    </div>
                      

                
          


                  </div>


                  </div>
                </body>

                </html>
      
      `;
      var sub = '';
      if (pagename == 'morecasestudies') {
        sub = 'Case Studies Query';
      } else if ((pagename == 'bookdemo' || pagename == 'bookdemoproject')) {
        sub = 'Demo Request Query';
      } else if (pagename == 'servicepage') {
        sub = 'Service Request Query';
      } else if (pagename == 'talktous') {
        sub = 'Talk to us Query';
      } else if (pagename == 'getintouch') {
        sub = 'Get in touch Query';
      } else if (pagename == 'leader') {
        sub = 'Talk to our Leadership Team Query';
      }
      var mailOptions = {
        from: 'no-reply@appostrophi.com',
        to: 'ankita@ivdisplays.com',
        subject: sub,
        html: htmlContent,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'image-mail-banne-02.png',  // The image filename
            path: __dirname + '/images/image-mail-banne-02.png',  // The local path to the image
            cid: 'bannImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };

      let htmlContentnew = `
                        <!DOCTYPE html>
            <html lang="en">

            <head>
              <title>:: Appostrophi ::</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
              <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
            </head>

            <body >
              <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
                  <a href="https://www.appostrophi.com/" >
                      <img src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
                  </a>

            <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
                <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                              color: #fff;
                font-weight: 600;
              
                position: relative;
                font-size: 15px;
                font-family: Arial, Helvetica, sans-serif;
                max-width: 500px;
                margin: 15px auto;
                display: block;
                background-color: #ffffff;
                margin-top: 15px;"
                >
                  <img src="cid:otpbanImage" alt="${name}" style="width:100%;"/>


                <div style="margin: 10px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
                font-weight: 300; font-size: 15px; color: #666;padding-bottom: 20px; ">
                <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-weight: 400;">
                  
                  <p style="font-weight: 600;font-size:16px;margin:19px 0px 0px 0px">Your one time authentication code  </p>
                  <p style="font-weight: 400;font-size:16px;margin: 4px 0px 0px 0px;">to verify your email is</p> 
                  <p style="font-size: 33px;letter-spacing: 10px;line-height: 20px;font-weight: 500 !important;color: #e2a008;margin: 25px 0px 9px 0px;">${randomFourDigit}</p>

                </div>

                  <div style="margin-top: 20px; font-family: Arial, Helvetica, sans-serif;color:#676666;line-height: 22px;text-align: center;">
                  ${pagename == 'morecasestudies'

          ?
          `
                    <p style="margin: 5px 0px;font-size: 14px;"> Amazing case studies being sent your way soon.</p>
                  
                    `
          :
          ``
        }

                    ${(pagename == 'bookdemo' || pagename == 'bookdemoproject')

          ?
          `
                      <p style="margin: 5px 0px;font-size: 14px;">Your demo request will be handled by our experts.</p>
                      <p style="margin: 5px 0px;font-size: 14px;">You will be hearing from us soon.</p>
                    
                      `
          :
          ``
        }
                      ${pagename == 'servicepage'

          ?
          `
                        <p style="margin: 5px 0px;font-size: 14px;">Your request will be handled by our experts.</p>
                        <p style="margin: 5px 0px;font-size: 14px;">You will be hearing from us soon.</p>
                      
                        `
          :
          ``
        }
                        ${pagename == 'talktous'

          ?
          `
                          <p style="margin: 5px 0px;font-size: 14px;">Your request will be handled by our experts.</p>
                          <p style="margin: 5px 0px;font-size: 14px;">You will be hearing from us soon.</p>
                        
                          `
          :
          ``
        }
                          ${pagename == 'getintouch'

          ?
          `
                            <p style="margin: 5px 0px;font-size: 14px;">Your request will be handled by our experts.</p>
                            <p style="margin: 5px 0px;font-size: 14px;">You will be hearing from us soon.</p>
                          
                            `
          :
          ``
        }
                            ${pagename == 'leader'

          ?
          `
                              <p style="margin: 5px 0px;font-size: 14px;">Your request will be handled by our experts.</p>
                              <p style="margin: 5px 0px;font-size: 14px;">You will be hearing from us soon.</p>
                            
                              `
          :
          ``
        }
                    <p style="margin: 5px 0px;font-size: 14px;">From the business team at Appostrophi</p>
                  </div>

                </div>
                <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                  <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                      <div style="margin:11px 0px 1px 0px">
                      <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                      <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${name}" style="height: 20px;"/></a>
                      </div>
                </div>
                  

            



              </div>


              </div>
            </body>

            </html>
      
      `;

      var mailOptionscon = {
        from: 'no-reply@appostrophi.com',
        to: email,
        subject: 'One Time Authentication Code :' + randomFourDigit,
        html: htmlContentnew,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'otp-banner.png',  // The image filename
            path: __dirname + '/images/otp-banner.png',  // The local path to the image
            cid: 'otpbanImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };
      transporter.sendMail(mailOptionscon, function (error, info) {

      });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "Connect send successfully!", lastid: resutlt.insertId });
        }
      });

    }
    catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

};
const connectotpupdate = async (req, res) => {
  const { otp, id } = req.body;
  console.log(otp);
  console.log(id);
  const otpAlreadyExists = await checkRecordExistsnew("connects", "otp", otp, id);
  console.log(otpAlreadyExists);
  if (otpAlreadyExists) {

    var status = 'approved';
    const otpval = {
      otp: otp,
      status: 'approved',
    };
    var newdatee = '';
    if (otpAlreadyExists.sh_date != null && otpAlreadyExists.sh_date != '' && (otpAlreadyExists.pagename == 'bookdemo' || otpAlreadyExists.pagename == 'bookdemoproject')) {
      const d = new Date(otpAlreadyExists.sh_date).toLocaleDateString();
      console.log(d);
      newdatee = d;
    }
    await UpdateRecord("connects", otpval, id);
    var transporter = nodemailer.createTransport({
      service: 'smtp',
      host: "email-smtp.us-east-1.amazonaws.com", // hostname
      secure: false, // use SSL
      port: 587, // port for secure SMTP
      auth: {
        user: 'AKIA57QWVS3TDOX72PRS',
        pass: 'BDgK6DTR0ZtZ6FV8VSFtub7agxxDghlZIonuIIMa/KGO'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    if (otpAlreadyExists.pagename != 'morecasestudies') {
      let htmlContentnew = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>:: Appostrophi ::</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
</head>

<body >
  <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
      <a href="https://www.appostrophi.com/" >
          <img src="cid:logoImage" alt="${otpAlreadyExists.name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
      </a>

<div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
    <div style="margin-top: 1px;box-sizing: border-box;text-align: center;color: #fff;font-weight: 600;position: relative;font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;max-width: 500px;margin: 15px auto;display: block;
    background-color: #ffffff;
    margin-top: 15px;"
    >
      <img src="cid:otpbanImage" alt="${otpAlreadyExists.name}" style="width:100%;"/>


    <div style="margin: 20px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
    font-weight: 300; font-size: 15px; color: #666;padding-bottom: 15px; ">
    <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: left;    margin-bottom: 21px;font-size:16px;font-weight: 400;">
      ${(otpAlreadyExists.pagename == 'bookdemo' || otpAlreadyExists.pagename == 'bookdemoproject')

          ?
          `
      <p style="font-size: 16px;line-height: 25px;margin:0px 0px 8px 0px">We have successfully recorded your demo request for <span style="font-weight: 600;">${otpAlreadyExists.casestudyname}</span> on <span style="font-weight: 600;">${newdatee}</span> . </p>
            <p style="font-size: 16px;line-height: 25px;margin:14px 0px">Please allow us to reconfirm the date with our technical team and revert back with a confirmation. </p>
           <p style="font-size: 16px;line-height: 25px;margin:8px 0px 8px 0px"><span style="font-weight: 600;">Please Note : </span>In case the slots are booked on your requested date , we may have to award you an alternate date slot.</p>
      <p style="margin:15px 0px 0px 0px">Thank you for opening up a possible partnership opportunity.</p>
      
      `
          :
          ``
        }
      ${(otpAlreadyExists.pagename == 'servicepage' || otpAlreadyExists.pagename == 'talktous' || otpAlreadyExists.pagename == 'getintouch' || otpAlreadyExists.pagename == 'leader')

          ?
          `
      <p style="font-size: 16px;line-height: 25px;margin:0px 0px 8px 0px">We have received your request to speak to our expert regarding <span style="font-weight: 600;">${otpAlreadyExists.contact_us}</span>. </p>
     
         ${otpAlreadyExists.contact_us == 'you need more case studies'
            ?
            `
         <p style="font-size: 16px;line-height: 25px;margin:14px 0px">We are happy to email you our amazing work that we have done so far, it will be delivered to your verified email id.</p>
     
         `
            :
            ``

          }

        ${otpAlreadyExists.contact_us == 'you want us to send you our company presentation'
            ?
            `
        <p style="font-size: 16px;line-height: 25px;margin:14px 0px">Our company profile will be emailed to your verified email id soon.</p>
    
        `
            :
            ``

          }
       ${otpAlreadyExists.contact_us == 'you want a representative to call you'
            ?
            `
       <p style="font-size: 16px;line-height: 25px;margin:14px 0px">We generally call back in the next working day, we are eager to speak to you.</p>
   
       `
            :
            ``

          }
     
      `
          :
          ``
        }


     
    </div>

     

    </div>
    <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
      <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
          <div style="margin:11px 0px 1px 0px">
          <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${otpAlreadyExists.name}" style="height: 20px; margin: 0 3px;"/></a>
          <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${otpAlreadyExists.name}" style="height: 20px;"/></a>
          </div>
     </div>
      

 



  </div>


  </div>
</body>

</html>

`;

      var mailOptionscon = {
        from: 'no-reply@appostrophi.com',
        to: otpAlreadyExists.email,
        subject: 'Thank you for contacting us',
        html: htmlContentnew,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'emailer_thanku-final.png',  // The image filename
            path: __dirname + '/images/emailer_thanku-final.png',  // The local path to the image
            cid: 'otpbanImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };
      transporter.sendMail(mailOptionscon, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "OTP is valid!" });
        }
      });
    } else {
      let encodedValue = btoa(btoa(otpAlreadyExists.id));
      let htmlContentnew = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>:: Appostrophi ::</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
</head>

<body >
  <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
      <a href="https://www.appostrophi.com/" >
          <img src="cid:logoImage" alt="${otpAlreadyExists.name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
      </a>

<div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
    <div style="margin-top: 1px;box-sizing: border-box;text-align: center;color: #fff;font-weight: 600;position: relative;font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;max-width: 500px;margin: 15px auto;display: block;
    background-color: #ffffff;
    margin-top: 15px;"
    >
      <img src="cid:otpbanImage" alt="${otpAlreadyExists.name}" style="width:100%;"/>


    <div style="margin: 20px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
    font-weight: 300; font-size: 15px; color: #666;padding-bottom: 15px; ">
    <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: left;    margin-bottom: 21px;font-size:16px;font-weight: 400;">
     
      <p style="font-size: 16px;line-height: 25px;margin:0px 0px 8px 0px">We are happy to send you more case studies, please find them attached. </p>
      <p style="font-size: 16px;line-height: 25px;margin:14px 0px">You can also book a demo for any of <a href="https://www.appostrophi.com/bookademo/${encodedValue}">our products here.</a></p>


     
    </div>

     

    </div>
    <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
      <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
          <div style="margin:11px 0px 1px 0px">
          <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${otpAlreadyExists.name}" style="height: 20px; margin: 0 3px;"/></a>
          <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${otpAlreadyExists.name}" style="height: 20px;"/></a>
          </div>
     </div>
      

 



  </div>


  </div>
</body>

</html>

`;

      var mailOptionscon = {
        from: 'no-reply@appostrophi.com',
        to: otpAlreadyExists.email,
        subject: 'Thank you for contacting us',
        html: htmlContentnew,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'emailer_thanku-final.png',  // The image filename
            path: __dirname + '/images/emailer_thanku-final.png',  // The local path to the image
            cid: 'otpbanImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'Appostrophi-Case-Studies.pdf', // File name you want to show
            path: path.join(__dirname, '/images/Appostrophi-Case-Studies.pdf') // path to the file
          }
        ]
      };
      transporter.sendMail(mailOptionscon, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "OTP is valid!" });
        }
      });
    }


  } else {
    res.status(201).json({ status: false, message: "OTP is invalid!" });
  }
}


const bookdemofrom = async (req, res) => {

  const { name, email, phone, casestudyname, pagename, sh_date, sh_time } = req.body;
  if (!name || !email) {
    res
      .status(400)
      .json({ status: false, error: "Name or email      fields cannot be empty!" });
    return;
  } else {

    try {
      const connect = {
        name: name,
        email: email,
        casestudyname: casestudyname,
        pagename: pagename,
        phone: phone,
        sh_time: sh_time,
        sh_date: sh_date,


      };
      var resutlt = await insertRecord("connects", connect);
      console.log(resutlt.insertId);


      var transporter = nodemailer.createTransport({
        service: 'smtp',
        host: "email-smtp.us-east-1.amazonaws.com", // hostname
        secure: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
          user: 'AKIA57QWVS3TDOX72PRS',
          pass: 'BDgK6DTR0ZtZ6FV8VSFtub7agxxDghlZIonuIIMa/KGO'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var newdatee = '';
      if (sh_date != null && sh_date != '') {
        newdatee = formdatechange(sh_date);
      }

      let htmlContent = `
      <!DOCTYPE html>
                <html lang="en">

                <head>
                  <title>:: Appostrophi ::</title>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
                  <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
                </head>

                <body >
                  <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
                      <a href="https://www.appostrophi.com/" >
                          <img src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
                      </a>
              
                <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
                    <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                                  color: #fff;
                    font-weight: 600;
                  
                    position: relative;
                    font-size: 15px;
                    font-family: Arial, Helvetica, sans-serif;
                    max-width: 500px;
                    margin: 15px auto;
                    display: block;
                    background-color: #ffffff;
                    margin-top: 15px;"
                    >
                      <img src="cid:bannImage" alt="${name}" style="width:100%;"/>


                    <div style="margin: 10px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
                    font-weight: 300; font-size: 15px; color: #666;padding-bottom: 20px; ">
                    <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-size:16px;font-weight: 600;">
                     You Have New Enquiry From Book a Demo page(Mail)
                              </div>
                
                      <div style="margin-top: 20px; font-family: Arial, Helvetica, sans-serif;color:#676666;font-size: 15px;line-height: 22px;">
                        <table style="width:100%">
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Name</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Email</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${email}</td>
                          </tr>
                          <tr>
                            <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Phone Number</td>
                            <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                            <td style="font-size:14px;width:66%;vertical-align: baseline;">${phone}</td>
                          </tr>
                          
           
               
                    
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Case Study Name</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${casestudyname}</td>
                      </tr>
                      <tr>
                        <td style="padding: 5px 0;width:30%;font-weight:600;color:#434343;margin-right:10px;vertical-align: top;vertical-align: baseline;">Scheduled Date</td>
                        <td style="width:3%;color:#434343;font-weight: 700;vertical-align: baseline;">:</td>
                        <td style="font-size:14px;width:66%;vertical-align: baseline;">${newdatee}</td>
                      </tr>
                      
          

                        </table>
                      </div>

                    </div>
                    <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                      <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                          <div style="margin:11px 0px 1px 0px">
                    <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                    <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${name}" style="height: 20px;"/></a>
                    </div>
                    </div>
                      

                
          


                  </div>


                  </div>
                </body>

                </html>
      
      `;
      var sub = 'Demo Request Query';

      var mailOptions = {
        from: 'no-reply@appostrophi.com',
        to: 'ankita@ivdisplays.com',
        subject: sub,
        html: htmlContent,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'image-mail-banne-02.png',  // The image filename
            path: __dirname + '/images/image-mail-banne-02.png',  // The local path to the image
            cid: 'bannImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };
      let htmlContentnew = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <title>:: Appostrophi ::</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,500,700,800" rel="stylesheet">
      </head>
      
      <body >
        <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#0078ae;padding: 30px 0px 10px;">
            <a href="https://www.appostrophi.com/" >
                <img src="cid:logoImage" alt="${name}" style="    height: 40px;padding: 0px 45px;margin: 0 auto;display: block;"/>
            </a>
      
      <div style="box-shadow: 1px 1px 15px rgba(138, 138, 138, 0.23);">
          <div style="margin-top: 1px;box-sizing: border-box;text-align: center;color: #fff;font-weight: 600;position: relative;font-size: 15px;
          font-family: Arial, Helvetica, sans-serif;max-width: 500px;margin: 15px auto;display: block;
          background-color: #ffffff;
          margin-top: 15px;"
          >
            <img src="cid:otpbanImage" alt="${name}" style="width:100%;"/>
      
      
          <div style="margin: 20px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
          font-weight: 300; font-size: 15px; color: #666;padding-bottom: 15px; ">
          <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: left;    margin-bottom: 21px;font-size:16px;font-weight: 400;">
           
            <p style="font-size: 16px;line-height: 25px;margin:0px 0px 8px 0px">We have successfully recorded your demo request for <span style="font-weight: 600;">${casestudyname}</span> on <span style="font-weight: 600;">${newdatee}</span> . </p>
            <p style="font-size: 16px;line-height: 25px;margin:14px 0px">Please allow us to reconfirm the date with our technical team and revert back with a confirmation. </p>
           <p style="font-size: 16px;line-height: 25px;margin:8px 0px 8px 0px"><span style="font-weight: 600;">Please Note : </span>In case the slots are booked on your requested date , we may have to award you an alternate date slot.</p>
            <p style="margin:15px 0px 0px 0px">Thank you for opening up a possible partnership opportunity.</p>
          
           
      
           
      
           
          </div>
      
           
      
          </div>
          <div style="display:block; margin-top: 1px; background-color: #0078ae; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
            <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                <div style="margin:11px 0px 1px 0px">
                <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="${name}" style="height: 20px; margin: 0 3px;"/></a>
                <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="${name}" style="height: 20px;"/></a>
                </div>
           </div>
            
      
       
      
      
      
        </div>
      
      
        </div>
      </body>
      
      </html>
      
      `;

      var mailOptionscon = {
        from: 'no-reply@appostrophi.com',
        to: email,
        subject: 'Thank you for contacting us',
        html: htmlContentnew,
        attachments: [
          {
            filename: 'whitelogo.png',  // The image filename
            path: __dirname + '/images/whitelogo.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'emailer_thanku-final.png',  // The image filename
            path: __dirname + '/images/emailer_thanku-final.png',  // The local path to the image
            cid: 'otpbanImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'web.png',  // The image filename
            path: __dirname + '/images/web.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin.png',  // The image filename
            path: __dirname + '/images/linkedin.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };
      transporter.sendMail(mailOptionscon, function (error, info) {

      });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "Connect send successfully!", lastid: resutlt.insertId });
        }
      });

    }
    catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

};



const checkidco = async (req, res) => {
  const { id } = req.body;

  const AlreadyExists = await checkRecordExists("connects", "id", id);
  if (AlreadyExists) {
    res.status(201).json({ status: true, data: AlreadyExists, "message":"new msg" });
  }else{
      res.status(201).json({ status: false, data: null });
  }

};
module.exports = {

  homepage,
  aboutpage,
  sercasecarrcon,
  contactform,
  applyform,
  happycontform,
  connectotpupdate,
  bookdemofrom,
  checkidco

};