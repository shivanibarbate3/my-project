const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
const {
  createTable,
  checkRecordExists,
  insertRecord,
  Recordlist,
  Recordalllist,

} = require("../utils/sqlFunctions");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { algorithm: 'HS256' });
};
const checkauth = (token) => {
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        return decoded;
      }
    });;
    // Verify the token using jwt.verify method
    //  const decode = jwt.verify(token, 'JWT_SECRET');

    //  Return response with decode data

  } else {
    return false;


  }
};
const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ status: false, error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    email,
    password: hashedPassword,
  };
  try {

    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ status: false, error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      res.status(201).json({ status: true, message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ status: false, error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ status: false, error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        res.status(200).json({
          status: true,
          id: existingUser.id,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.id),
        });
      } else {
        res.status(401).json({ status: false, error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ status: false, error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};


const getlist = async (req, res) => {
  const { perPage, page } = req.body;
  const token = req.body.token;

  const existingauth = await checkauth(token);

  try {

    if (existingauth.id == undefined) {
      res
        .status(401)
        .json({ status: false, error: "Unauthorized" });
      return;
    } else {
      try {
        const pageOffset = (page * perPage) - perPage;
        const existingUserList = await Recordlist("users", null, null, "id", perPage, pageOffset);

        if (existingUserList) {
          const existingUserAllList = await Recordalllist("users", null, null, "id");

          const array = [];
          existingUserList.forEach((element) => {
            let myObject = { id: element.id, email: element.email, password: element.password };
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
          res.status(200).json({ status: true, error: "data not found" });
        }
      } catch (error) {
        res.status(500).json({ status: false, error: error.message });
      }
    }
  }
  catch (error) {
    res
      .status(401)
      .json({ status: false, error: "Unauthorized" });
    return;
  }
};
const foegetpasword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res
      .status(400)
      .json({ status: false, error: "Email field cannot be empty!" });
    return;
  } else {
    try {
      const contact = {
        email: email,

      };
      const locationrAlreadyExists = await checkRecordExists("users", "email", email);
      if (locationrAlreadyExists) {
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
            <div style="max-width: 600px; width: 100%; margin: 0 auto;background-color:#ececec;padding: 30px 0px 10px;">
                <a href="https://www.appostrophi.com/" >
                    <img  src="cid:logoImage" alt="logoImage" style="    height: 26px;padding: 0px 45px;margin: 0 auto;display: block;"/>
                </a>
         
          <div >
              <div style="margin-top: 1px;box-sizing: border-box;text-align: center;
                            color: #fff;
              font-weight: 600;
             
              position: relative;
              font-size: 15px;
              font-family: Arial, Helvetica, sans-serif;
              max-width: 500px;
              margin: 15px auto 0px auto;
              display: block;
              background-color: #ffffff;
              margin-top: 15px;padding-top: 35px;"
              >
                <img src="cid:bannImage" alt="bannImage" style="height: 70px;"/>


              <div style="margin: 10px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
              font-weight: 300; font-size: 15px; color: #666;padding-bottom: 0px; ">
              <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-size:16px;font-weight: 600;">
                We have you covered !!
                        </div>
          
                        <div style="margin: 30px 0 10px 0;width: 100%; padding: 0 25px; box-sizing: border-box; text-align: left; font-family: Arial, Helvetica, sans-serif;
                        font-weight: 300; font-size: 15px; color: #666;padding-bottom: 10px; ">
                        <div style="margin-top: 15px; font-family: Arial, Helvetica, sans-serif;color:#676666;text-align: center;    margin-bottom: 21px;font-weight: 400;">
                          
                          <p style="font-weight: 600;font-size:16px;margin:19px 0px 0px 0px">Hi <span style="color:#ee9b0c;">Admin,</span></p>
                          <p style="font-weight: 400;font-size:16px;margin: 12px 0px 0px 0px;">Not to worry !! Here is your password : <span style="color:#0d2f4b;font-weight: 600;">${locationrAlreadyExists.password_act}.</span></p> 
                        
                    
                    
                        </div>
                    
                        </div>
              </div>
              <div style="display:block; margin-top: 1px; background-color: #0D2F4B; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
                <p style="margin:11px 0px 15px 0px">Copyright © 2024 Appostrophi</p>
                  
               </div>
             
                
                

           
    


            </div>

            <div style="max-width:500;display:block; margin-top: 1px; background-color: transparent; box-sizing: border-box; text-align: center; width: 100%; color: #fff; font-weight:600; padding: 4px 0px; position: relative; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">
             
                <div style="margin:11px 0px 1px 0px">
                 <a href="https://www.appostrophi.com/" > <img src="cid:webImage" alt="webImage" style="height:30px; margin: 0 3px;"/></a>
                 <a href="https://www.linkedin.com/company/appostrophi/" ><img src="cid:linkedinImage" alt="linkedinImage" style="height: 27px;    position: relative;
    top: -2px;"/></a>
                 </div>
 
                 </div>


            </div>
          </body>

          </html>
        `;
      var mailOptions = {
        from: 'no-reply@appostrophi.com',
        to: 'ankita@ivdisplays.com',
        subject: 'Forgot Password',
        html: htmlContent,
        attachments: [
          {
            filename: 'logo235.png',  // The image filename
            path: __dirname + '/images/logo235.png',  // The local path to the image
            cid: 'logoImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'psd-img.png',  // The image filename
            path: __dirname + '/images/psd-img.png',  // The local path to the image
            cid: 'bannImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'webbrowse.png',  // The image filename
            path: __dirname + '/images/webbrowse.png',  // The local path to the image
            cid: 'webImage' // Same CID as in the HTML <img> tag
          },
          {
            filename: 'linkedin1.png',  // The image filename
            path: __dirname + '/images/linkedin1.png',  // The local path to the image
            cid: 'linkedinImage' // Same CID as in the HTML <img> tag
          }
        ]
      };




      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ status: false, error: error });
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ status: true, message: "Mail send successfully!" });
        }
      });
    }else{
      res.status(200).json({ status: false, message: 'Invalid email id' });
    }
    }
    catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
};
module.exports = {
  register,
  login,
  getlist,

  foegetpasword
};