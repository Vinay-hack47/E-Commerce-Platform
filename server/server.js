const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(cors());


app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(fileUpload({
  useTempFiles: true
}));

// Routes
app.use('/user', require("./routes/userRouter"));
app.use('/category', require("./routes/categoryRouter"));
// app.use('/upload', require("./routes/upload"));
app.use('/api', require("./routes/productRouter"));

app.get("/", (req, res) => {
  res.json({ msg: "This is Example" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect MongoDB
const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});
