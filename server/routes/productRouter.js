const router = require("express").Router()
const productCtrl = require("../controllers/productCtrl")
const multer = require("multer")
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Products = require("../models/productModel");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dwmzks75t",
  api_key:"925336688717912",
  api_secret: "5sM8DPuWQn4oe4OlUloAjXciiis",
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder name
    format: async (req, file) => file.mimetype.split('/')[1] || 'jpg', // Dynamically get the file format
    public_id: (req, file) => Date.now() + '-' + file.originalname, // File name
  },
});

const upload = multer({ storage: storage });

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './uploads/'); // Directory to store uploaded files
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); // Unique filenames
//   }
// });

// const upload = multer({ storage: storage });

router.route("/products")
.get(productCtrl.getProducts)
.post(auth, authAdmin, productCtrl.createProducts);

// ✅ Get product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/upload", auth, authAdmin, upload.single("file"), productCtrl.uploadImage);

// router.post("/create-product", upload.single("photo"), productCtrl.createProducts);


router.route("/products/:id")

.delete(auth, authAdmin,productCtrl.deleteProducts)

.put(auth, authAdmin, productCtrl.updateProducts);

module.exports = router;