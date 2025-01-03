const express = require("express");
const Post = require("./post.model");
const {
  registPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  updateViewCnt,
} = require("./post.controller");
const router = express.Router();

//regist Post
router.post("/postregist", registPost);

//get all post
router.get("/allpost", getAllPosts);

//get one post
router.get("/post-detail/:id", getOnePost);

//update post
router.put("/update-post/:id", updatePost);

router.put("/update-viewcnt/:id", updateViewCnt);

//delete post
router.delete("/delete-post/:id", deletePost);

module.exports = router;
