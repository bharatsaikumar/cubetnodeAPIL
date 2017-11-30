var express = require('express');
router = express.Router();
//Include Controller

var jsonCtrl = require('../../controllers/apiv1/jsonController/jsonCtrl');


		router.post('/uploadJson',jsonCtrl.uploadJson_post);
		router.get('/getUsrDtls',jsonCtrl.getUsrDtls_get);		

module.exports = router
