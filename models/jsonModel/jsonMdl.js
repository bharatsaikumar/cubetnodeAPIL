
// Standard Inclusions

var sqldb = require('../../config/dbconnect');
var mod_name = "JSon";
/*****************************************************************************
* Function      : UploadJsonUsers
* Description   : Inserts the data into the usr_lst_t table
* Arguments     : callback function
* 30/11/2017   - Bharat K - Initial Function
******************************************************************************/
exports.UploadJsonUsers = function (trpData, callback) {
  var cnt = 0;
  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { console.log(err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); return err; }          // Handle Error   
    for (i = 0; i < trpData.users.length; i++) {
      var QRY_TO_EXEC = "INSERT into usr_lst_t(usr_nm,usr_age ,usr_email) values('" + trpData.users[i].name + "','" + trpData.users[i].age + "','" + trpData.users[i].email + "')";
      connection.query(QRY_TO_EXEC, function (err, rows) {
        cnt = cnt + 1;
        if (cnt == trpData.users.length) {
          connection.release();                      // Release connection back to Pool
          if (err) { console.log(err); callback(err, null); return; }     // Handle Query Errors
          callback(false, rows);
        }               // Send the results back       
      });
    }
  });
};

/*****************************************************************************
* Function      : UploadJsonProfile
* Description   : inserts the data into the profile_dtl_t 
* Arguments     : callback function
* 30/11/2017   - Bharat K - Initial Function
*
******************************************************************************/
exports.UploadJsonProfile = function (trpData, callback) {
  var cnt = 0;
  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { console.log(err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); return err; }          // Handle Error   
    for (i = 0; i < trpData.users.length; i++) {
      var QRY_TO_EXEC = "INSERT into profile_dtl_t(prsn_addr,prsn_ph ,prsn_bldgrp,prsn_fnm,prsn_id) values('" + trpData.users[i].profile.address + "','" + trpData.users[i].profile.phone_number + "','" + trpData.users[i].profile.blood_group + "','" + trpData.users[i].profile.full_name + "',(select prsn_id from usr_lst_t where usr_email='" + trpData.users[i].email + "'))";
      connection.query(QRY_TO_EXEC, function (err, rows) {
        cnt = cnt + 1;
        if (cnt == trpData.users.length) {
          connection.release();                      // Release connection back to Pool
          if (err) { console.log(err); callback(err, null); return; }     // Handle Query Errors
          callback(false, rows);  // Send the results back   
        }
      });
    }
  });
};

/*****************************************************************************
* Function      : getUsrDtls
* Description   : Retriving the user details from profile and users table
* Arguments     : callback function
* 30/11/2017   - Bharat K - Initial Function
*
******************************************************************************/
exports.getUsrDtls = function (callback) {

  var QRY_TO_EXEC = "SELECT u.prsn_id,usr_nm,usr_email,usr_age,prsn_addr,prsn_ph,prsn_bldgrp,prsn_fnm from usr_lst_t u join profile_dtl_t p on p.prsn_id=u.prsn_id";
  sqldb.MySQLConPool.getConnection(function (err, connection) {    // get connection from Connection Pool 
    if (err) { console.log(err.code + "QRY_TO_EXEC :: " + QRY_TO_EXEC); return err; }          // Handle Error   
    // Execute the query
    connection.query(QRY_TO_EXEC, function (err, rows) {
      connection.release();                      // Release connection back to Pool
      if (err) { console.log(err); callback(err, null); return; }     // Handle Query Errors
      callback(false, rows);                 // Send the results back       
    });
  });
};