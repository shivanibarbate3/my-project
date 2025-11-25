const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkAllRecordExists,
  checkRecordExists,
  insertRecord,
  Recordlist,
  Recordalllist,
  UpdateRecord,
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
const addEditHompartner = async (req, res) => {
  const token = req.body.token;

  const existingauth = await checkauth(token);
  
  try {
  
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
  
    const { id, title,subtitle } = req.body;
   
    if (id==undefined || !title) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const homepartners = {
      title,
      subtitle,
      // short_des,
      // subtiltle_one
    };
   
    try {
      if(id==0 || id==null)  {
        const homepartnersrAlreadyExists = await checkRecordExists("homepartners_new", "title", title);
        if (homepartnersrAlreadyExists) {
          res.status(200).json({ status: false, message: "Partner With us already exists" });
        } else {
          await insertRecord("homepartners_new", homepartners);
          res.status(201).json({ status: true, message: "Partner With us created successfully!" });
        }
      }else{
        const homepartnersrAlreadyExists = await checkAllRecordExists("homepartners_new", "title", title,id);
       
        if (homepartnersrAlreadyExists) {

          res.status(200).json({ status: false, message: "Partner With us already exists" });
        } else {
          console.log(homepartnersrAlreadyExists);
          console.log(homepartners);
          await UpdateRecord("homepartners_new", homepartners,id);
          res.status(201).json({ status: true, message: "Partner With us updated successfully!" });
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




const getHompartner = async (req, res) => {
  const { perPage, page } = req.body;
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
     const existingUserList = await Recordlist("homepartners_new", null, null,"id",perPage,pageOffset);
 
     if (existingUserList) {
       const existingUserAllList = await Recordalllist("homepartners_new", null, null,"id");
 
     
       const array = [];
       existingUserList.forEach((element) => {
        let myObject = { id: element.id, title: element.title,
        subtitle: element.subtitle,
        short_des: element.short_des,
        subtiltle_one: element.subtiltle_one


         }; 
        array.push(myObject);
    });
     
       const   totalCount= existingUserAllList.length;
       const  totalPage = Math.ceil(existingUserAllList.length / perPage);
   
     
         res.status(200).json({
           status: true, 
           data:array[0],
           totalCount: totalCount,
           totalPage: totalPage,
         });
      
     } else {
       res.status(200).json({status: true,  message: "data not found"   , data:[],
        totalCount: 0,
        totalPage: 0, });
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

const addEditHompartnerTalk = async (req, res) => {
  const token = req.body.token;

  const existingauth = await checkauth(token);
  
  try {
  
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
  
    const { id, short_des ,subtiltle_one} = req.body;
   
    if (id==undefined || !short_des) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const homepartners = {
      // title,
      // subtitle,
       short_des,
      subtiltle_one
    };
   
    try {
      if(id==0 || id==null)  {
        const homepartnersrAlreadyExists = await checkRecordExists("homepartners_new", "short_des", short_des);
        if (homepartnersrAlreadyExists) {short_des
          res.status(200).json({ status: false, message: "Talk to us already exists" });
        } else {
          await insertRecord("homepartners_new", homepartners);
          res.status(201).json({ status: true, message: "Talk to us created successfully!" });
        }
      }else{
        const homepartnersrAlreadyExists = await checkAllRecordExists("homepartners_new", "short_des", short_des,id);
       
        if (homepartnersrAlreadyExists) {

          res.status(200).json({ status: false, message: "Talk to us  already exists" });
        } else {
          console.log(homepartnersrAlreadyExists);
          console.log(homepartners);
          await UpdateRecord("homepartners_new", homepartners,id);
          res.status(201).json({ status: true, message: "Talk to us updated successfully!" });
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

module.exports = {
  addEditHompartner,
  getHompartner,
  addEditHompartnerTalk,
 
};