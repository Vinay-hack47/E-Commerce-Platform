const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());

const _dirname = path.resolve();

app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Connect MongoDB
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.post("/api/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100, // Stripe uses cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:5000/success",
    cancel_url: "http://localhost:5000/cancel",
  });

  res.json({ id: session.id });
});

app.get("/success", (req, res) => {
  res.send("Payment successful! Thank you for your purchase.");
});

app.get("/cancel", (req, res) => {
  res.send("Payment cancelled. You haven't been charged.");
});

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/category", require("./routes/categoryRouter"));
// app.use('/upload', require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));

app.use(express.static(path.join(_dirname, "frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
