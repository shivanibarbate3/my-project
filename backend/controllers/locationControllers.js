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
const addEditLocation = async (req, res) => {
  const token = req.body.token;

  const existingauth = await checkauth(token);
  
  try {
  
  if (existingauth.id==undefined) {
    res
      .status(401)
      .json({ status: false, message: "Unauthorized" });
    return;
  }else{
  
    const { id, location_name } = req.body;
   
    if (id==undefined || !location_name) {
      res
        .status(400)
        .json({status: false, message: "Please add the fileds!" });
      return;
    }
    const location = {
      location_name,
    };
   
    try {
      if(id==0 || id==null)  {
        const locationrAlreadyExists = await checkRecordExists("locations", "location_name", location_name);
        if (locationrAlreadyExists) {
          res.status(200).json({ status: false, message: "Lcation already exists" });
        } else {
          await insertRecord("locations", location);
          res.status(201).json({ status: true, message: "Location created successfully!" });
        }
      }else{
        const locationrAlreadyExists = await checkAllRecordExists("locations", "location_name", location_name,id);
       
        if (locationrAlreadyExists) {

          res.status(200).json({ status: false, message: "Location already exists" });
        } else {
          console.log(locationrAlreadyExists);
          console.log(location);
          await UpdateRecord("locations", location,id);
          res.status(201).json({ status: true, message: "Location updated successfully!" });
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




const getLocation = async (req, res) => {
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
     const existingUserList = await Recordlist("locations", null, null,"id",perPage,pageOffset);
 
     if (existingUserList) {
       const existingUserAllList = await Recordalllist("locations", null, null,"id");
 
     
       const array = [];
       existingUserList.forEach((element) => {
        let myObject = { id: element.id, location_name: element.location_name }; 
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
       res.status(200).json({status: false,  message: "data not found"  , data:[],
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
  addEditLocation,
  getLocation,
 
};