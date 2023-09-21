const express = require('express')
const router = express.Router();

const {videoUpload} = require("../Controllers/fileUpload");

//api route
router.post("/videoUpload", videoUpload);

module.exports = router;

