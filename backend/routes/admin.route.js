const express = require('express');
const { RegisterNewRoom, } = require('../controller/admin.controller')
const router = express.Router();
const dotenv = require('dotenv')
const Cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageConfig = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder: 'public',
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storageConfig })

router.post('/register-room', upload.array('roomImage', 5), RegisterNewRoom)

module.exports = router