const Products = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Temporary storage for uploaded files
const {CloudinaryStorage} = require("multer-storage-cloudinary");





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



//Filter, sorting and pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagenation() {
    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1|| 1;

    const skip = (page-1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      let products;

      if(Object.keys(req.query).length === 0) {
        products = await Products.find();
      }else{
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagenation()
       products = await features.query;
      
      }
      res.json(products);
    
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createProducts: async (req, res) => {
    // console.log(req.body);
    // const result = req.file.photo;
    // cloudinary.uploader.upload(File.tempFilePath,(err,result) =>{
    //   console.log(result);
    //   if(err) console.log(err);
      
      
    // })


    //Code for cloudinary to upload image 
    // try {
      // const file = req.files.photo;


      // if (!req.file) {
      //   return res.status(400).json({ message: "No file uploaded" });
      // }
  
      // Upload the file to Cloudinary
      //  cloudinary.uploader.upload(file.tempFilePath,(err,result) =>{
      //   console.log(result);
        
      //  });
  
      // Log the result from Cloudinary
      // console.log(result);
  
    //   res.status(200).json({ message: "File uploaded successfully", data: result });
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).json({ message: "Something went wrong" });
    // }
    

    try {
      const {
        product_id,
        title,
        price,
        description,
        content, 
        category,
      } = req.body;

      let imageData = req.body.images;
      console.log(imageData);
      

      // If frontend didn't upload to Cloudinary, handle it in backend
    if ( !imageData.public_id || !imageData.url) {
      if (!req.file) {
        return res.status(400).json({ msg: "No image uploaded" });
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

      const product = await Products.findOne({ product_id });

      if (product)
        return res.status(400).json({ msg: "Product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images: imageData,
        category,
      });

      console.log(newProduct);
      
      await newProduct.save();

      res.json(newProduct);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  // deleteProducts: async (req, res) => {
  //   try {
  //     await Products.findByIdAndDelete(req.params.id);
  //     res.json({ msg: "Deleted a Product" });
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  // },

  deleteProducts: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(product.images.public_id);

      // Delete the product from the database
      await Products.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { title, price, description, content, category } = req.body;

      let imageData = req.body.images;

     // If frontend didn't upload to Cloudinary, handle it in backend
     if (!imageData || !imageData.public_id || !imageData.url) {
      if (!req.file) {
        return res.status(400).json({ msg: "No image uploaded" });
      }
    
      const result = await cloudinary.uploader.upload(req.file.path);

      imageData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images : imageData,
          category,
        }
      );
      res.json({ msg: "Updated a product" });
    } 
    catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  uploadImage: async(req, res) =>{
    try {
      const file = req.file;
      const result = await cloudinary.uploader.upload(file.path);
      res.json({url: result.secure_url});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productCtrl;
