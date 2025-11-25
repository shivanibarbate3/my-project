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
const addEditBlogtiltle = async (req, res) => {
  const token = req.body.token;

  const existingauth = await checkauth(token);
  
  try {
  
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
  
    const { id, page_title } = req.body;
   
    if (id==undefined || !page_title) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const hometile = {
      page_title,
    };
   
    try {
      if(id==0 || id==null)  {
        const hometilerAlreadyExists = await checkRecordExists("blogtitles", "page_title", page_title);
        if (hometilerAlreadyExists) {
          res.status(200).json({ status: false, message: "Blog Page title already exists" });
        } else {
          await insertRecord("blogtitles", hometile);
          res.status(201).json({ status: true, message: "Blog Page title created successfully!" });
        }
      }else{
        const hometilerAlreadyExists = await checkAllRecordExists("blogtitles", "page_title", page_title,id);
       
        if (hometilerAlreadyExists) {

          res.status(200).json({ status: false, message: "Blog Page title already exists" });
        } else {
          console.log(hometilerAlreadyExists);
          console.log(hometile);
          await UpdateRecord("blogtitles", hometile,id);
          res.status(201).json({ status: true, message: "Blog Page title updated successfully!" });
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




const getBlogtiltle = async (req, res) => {
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
     const existingUserList = await Recordlist("blogtitles", null, null,"id",perPage,pageOffset);
 
     if (existingUserList) {
       const existingUserAllList = await Recordalllist("blogtitles", null, null,"id");
 
     
       const array = [];
       existingUserList.forEach((element) => {
        let myObject = { id: element.id, page_title: element.page_title }; 
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
       res.status(200).json({status: true,  message: "data not found"  , data:[],
        totalCount: 0,
        totalPage: 0,});
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
  addEditBlogtiltle,
  getBlogtiltle,
 
};