const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

postSchema.plugin(AutoIncrement, { inc_field: "id" });
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
