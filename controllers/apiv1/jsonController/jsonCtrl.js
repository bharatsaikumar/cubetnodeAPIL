// Model Inclusionsff
var jsonMdl = require('../../../models/jsonModel/jsonMdl');

/**************************************************************************************
* Controller     : uploadJson_post
* Parameters     : 
* Description    : Checks email,Profile Data and inserts data into the table
* 30/11/2017    - Bharat K  - Initial Function
*
***************************************************************************************/
exports.uploadJson_post = function (req, res) {
    var cnt = 0;
    var trpData = req.body;
    for (i = 0; i < trpData.users.length; i++) {
        if ((trpData.users[i].email == undefined || trpData.users[i].email == null || trpData.users[i].email == '') || (trpData.users[i].profile.length < 3)) {
            res.send({ "status": 400, "message": "Json Does not contains email or profile data" })
        }
        cnt = cnt + 1;
        if (cnt == trpData.users.length) {
            jsonMdl.UploadJsonUsers(req.body, function (err, results) {

                if (err) { console.log("err " + err); res.send({ "status": 400, "message": "error", "data": [] }); return; }
                if (results) {

                    jsonMdl.UploadJsonProfile(req.body, function (err, results) {
                        if (err) { console.log("err " + err); res.send({ "status": 400, "message": "error", "data": [] }); return; }
                        if (results) {
                            res.send({ "status": 200, "message": "success", "data": results });

                        } else {
                            res.send({ "status": 400, "message": "error", "data": results });

                        }

                    });
                }
            });
        }
    }

}
/**************************************************************************************
* Controller     : getUsrDtls_get
* Parameters     : 
* Description    : get the user details data from users and profile table
* 30/11/2017    - Bharat K  - Initial Function
*
***************************************************************************************/
exports.getUsrDtls_get = function (req, res) {
    jsonMdl.getUsrDtls(function (err, results) {
        if (err) { console.log("err " + err); res.send({ "status": 400, "message": "error", "data": [] }); return; }
        if (results) {
            console.log("**********************************")
            console.log(results)
            res.send({ "status": 200, "message": "success", "data": results });

        }
    });
}
