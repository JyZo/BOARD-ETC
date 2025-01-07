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

//게시글 등록
router.post("/postregist", registPost);

//전체 게시글 가져오기
router.get("/allpost", getAllPosts);

//게시글 상세 조회
router.get("/post-detail/:id", getOnePost);

//게시글 수정
router.put("/update-post/:id", updatePost);

//조회수 증가
router.put("/update-viewcnt/:id", updateViewCnt);

//게시글 삭제
router.delete("/delete-post/:id", deletePost);

module.exports = router;
