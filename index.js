const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auths.js");
// const userRoutes = require("./routes/users.js");
// const postRoutes = require("./routes/posts.js");
// const commentRoutes = require("./routes/comments.js");
// const likeRoutes = require("./routes/likes.js");
// const messagesRoute = require("./routes/messages.js");
// const friendRuotes = require("./routes/friends.js");
// const productRuotes = require("./routes/product.js");

const app = express();

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors()
);
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './src/assets/avatar')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

// app.post('/i', upload.single('image'), (req, res) => {
//   res.send(req.file.filename)
// });

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
// app.use("/api/messages", messagesRoute);
// app.use("/api/friends", friendRuotes);

// mongoose.connect(
//   process.env.MONGO_URL,
//   {
//     writeConcern: { w: 'majority' },
//   }
// );
  
// app.use('/products', productRuotes);

const port = 7000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
});

