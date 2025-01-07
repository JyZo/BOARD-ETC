const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//게시글 스키마 생성
const postSchema = new mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createuser: {
      type: String,
      required: true,
    },
    viewcount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//게시글 신규 생성시 시퀀스 증가값 모듈 세팅
postSchema.plugin(AutoIncrement, { inc_field: "id" });
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
