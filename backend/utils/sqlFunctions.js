const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
 console.log(query);  
    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
       
        resolve(results);
      }
    });
  });
};


const Recordlist = (tableName, column, value,order,perPage,pageOffset) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null order by ${order} desc limit ${perPage} offset ${pageOffset}`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where deleted_at is Null order by ${order} desc  limit ${perPage} offset ${pageOffset}`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const Recordalllist = (tableName, column, value,order) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null order by ${order} desc`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null order by ${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};

const checkAllRecordExists = (tableName, column, value,valueid) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and id!= ${valueid}`;
 
    pool.query(query, [value], (err, results) => {
      console.log(query);
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};
const checkRecordExistsnew = (tableName, column, value,valueid) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and  status='pending' and id= ${valueid}`;
 
    pool.query(query, [value], (err, results) => {
     console.log(query);
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};
const UpdateRecord = (tableName, record, id) => {
  return new Promise((resolve, reject) => {
    const query = `Update  ${tableName} SET ? WHERE id = ${id}`;
   
    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const Recordactivelist = (tableName, column, value,order) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null order by ${order} asc`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null order by ${order} asc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};

const Recordactivelistlimit = (tableName, column, value,order) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null  and home_seq!=0  order by ${order} asc limit 0,4`;
      pool.query(query, [value], (err, results) => {
        console.log(query);
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null  and home_seq!=0 order by ${order} asc  limit 0,4`;
      pool.query(query,  (err, results) => {
       console.log(query);
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const checkRowExists = (tableName, valueid) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE id= ${valueid}`;
 
    pool.query(query,  (err, results) => {
     
      if (err) {
        reject(err);
      } else {
        console.log(results);
        resolve(results.length ? results[0] : null);
      }
    });
  });
};
const Recordlistseach = (tableName, column, value,order,perPage,pageOffset) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} like '%${value}%' order by ${order} and deleted_at is Null desc limit ${perPage} offset ${pageOffset}`;
       console.log(query);
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null order by ${order} desc  limit ${perPage} offset ${pageOffset}`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const Recordalllistsearch = (tableName, column, value,order) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} like '%${value}%' and deleted_at is Null  order by ${order} desc`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null order by ${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};

const Recordlistdeatils = (tableName, column, value,order,perPage,pageOffset,serv) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null and ${serv} is not null order by ${order} desc limit ${perPage} offset ${pageOffset}`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where deleted_at is Null and ${serv} is not null order by ${order} desc  limit ${perPage} offset ${pageOffset}`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const Recordalllistdeatils = (tableName, column, value,order,serv) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} = ? and deleted_at is Null and ${serv} is not null order by ${order} desc`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null and ${serv} is not null order by ${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};

const Recordalllistsearchdeatils = (tableName, column, value,order,serv) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} like '%${value}%' and deleted_at is Null  and ${serv} is not null order by ${order} desc`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null and ${serv} is not null order by ${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};

const Recordlistseachdeatils = (tableName, column, value,order,perPage,pageOffset,serv) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT * FROM ${tableName} WHERE ${column} like '%${value}%' and ${serv} is not null  order by ${order} and deleted_at is Null desc limit ${perPage} offset ${pageOffset}`;
       console.log(query);
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT * FROM ${tableName} where  deleted_at is Null and ${serv} is not null  order by ${order} desc  limit ${perPage} offset ${pageOffset}`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};


const Recordlistseachjoin = (tableName, column, value,order,perPage,pageOffset,tableNamenew,newid,newcol) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle FROM ${tableName}  INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id WHERE ${tableName}.${column} like '%${value}%' order by ${tableName}.${order} and ${tableName}.deleted_at is Null desc limit ${perPage} offset ${pageOffset}`;
       console.log(query);
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT ${tableName}.*,${tableNamenew}.title as newtitle FROM ${tableName} INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id where  ${tableName}.deleted_at is Null order by ${tableName}.${order} desc  limit ${perPage} offset ${pageOffset}`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const Recordalllistsearchjoin = (tableName, column, value,order,tableNamenew,newid,newcol) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle  FROM ${tableName}  INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id WHERE ${tableName}.${column} like '%${value}%' and ${tableName}.deleted_at is Null  order by ${tableName}.${order} desc`;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle  FROM ${tableName}  INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id where  ${tableName}.deleted_at is Null order by ${tableName}.${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};


const Recordlistjoin = (tableName, column, value,order,perPage,pageOffset,tableNamenew,newid,newcol) => {

  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle  FROM ${tableName}  INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id WHERE ${tableName}.${column} = ? and ${tableName}.deleted_at is Null order by ${tableName}.${order} desc limit ${perPage} offset ${pageOffset}`;
      console.log(query);
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
       
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle  FROM ${tableName}  INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id where ${tableName}.deleted_at is Null order by ${tableName}.${order} desc  limit ${perPage} offset ${pageOffset}`;
      console.log(query);
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
         
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
const Recordalllistjoin = (tableName, column, value,order,tableNamenew,newid,newcol) => {
 
  return new Promise((resolve, reject) => {
    
    if(column!=null){
      const query = `SELECT ${tableName}.* ,${tableNamenew}.title as newtitle FROM ${tableName} INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id WHERE ${tableName}.${column} = ? and ${tableName}.deleted_at is Null order by ${tableName}.${order} desc`;
      pool.query(query, [value], (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results.length ? results : null);
        }
      });
    }else{
      const query = `SELECT  ${tableName}.*,${tableNamenew}.title as newtitle FROM ${tableName}   INNER JOIN ${tableNamenew} ON  ${tableName}.${newid}=${tableNamenew}.id where ${tableName}.deleted_at is Null order by  ${tableName}.${order} desc  `;
      pool.query(query,  (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length ? results : null);
        }
      });
    }
    
    
  });
};
module.exports = {
  createTable,
  checkRecordExists,
  checkAllRecordExists,
  insertRecord,
  Recordlist,
  Recordalllist,
  UpdateRecord,
  Recordactivelist,
  Recordactivelistlimit,
  checkRecordExistsnew,
  checkRowExists,
  Recordalllistsearch,
  Recordlistseach,
  Recordlistdeatils,
  Recordalllistdeatils,
  Recordalllistsearchdeatils,
  Recordlistseachdeatils,
  Recordlistseachjoin,
  Recordalllistsearchjoin,
  Recordlistjoin,
  Recordalllistjoin
};