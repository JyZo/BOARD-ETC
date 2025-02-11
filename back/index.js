const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");

const mongoose = require("mongoose");

//쿠키관련 모듈
app.use(cookieParser());

//cors
app.use(express.json());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//라우트 세팅
const postRoutes = require("./src/freeboard/post.route");
const userRoutes = require("./src/user/user.route");
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("FreeBoard Server run!");
  });
}

main()
  .then(() => console.log("Mongodb connect!!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
