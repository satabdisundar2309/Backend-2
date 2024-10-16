const express = require('express')
const router = express.Router();


const {localFileupload, imageUpload, videoUpload, imageSizeReduceUpload} = require('../controllers/fileController');

router.post("/localFileupload", localFileupload)
router.post("/imageUpload", imageUpload)
router.post("/videoUpload", videoUpload)
router.post("/imageSizeReduceUpload", imageSizeReduceUpload)
module.exports = router;