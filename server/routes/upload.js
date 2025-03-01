// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const productCtrl = require('../controllers/productCtrl');
// const auth = require('../middleware/auth');
// const authAdmin = require('../middleware/authAdmin');

// const router = express.Router();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// // Configure multer-storage-cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Cloudinary folder name
//     format: async (req, file) => file.mimetype.split('/')[1] || 'jpg', // Dynamically get the file format
//     public_id: (req, file) => Date.now() + path.extname(file.originalname), // File name
//   },
// });

// // File filter for images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('Not an image! Please upload an image.'), false); // Reject file
//   }
// };

// // Multer upload setup
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   fileFilter: fileFilter,
// });

// // POST endpoint for image upload
// router.post('/upload', auth, authAdmin, upload.single('file'), productCtrl.uploadImage);

// module.exports = router;