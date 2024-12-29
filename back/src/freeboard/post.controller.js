const Post = require("./post.model");

const registPost = async (req, res) => {
  try {
    const newPost = await Post({ ...req.body });

    await newPost.save();
    return res.status(200).send({ message: "Post regist!", post: newPost });
  } catch (error) {
    console.error("Error regist Post", error);
    return res.status(500).send({ message: "Error regist Post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ id: -1 });
    return res.status(200).send(posts);
  } catch (error) {
    console.error("Fail get All Posts", error);
    return res.status(500).send({ message: "Fail get All Posts" });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ id: id });
    if (!post) {
      console.log("post not found");
      return res.redirect("/freeboard");
    }
    return res.status(200).send(post);
  } catch (error) {
    console.error(`Error get Post`, error);
    return res.status(500).send({ message: `Error get Post` });
  }
};

// update post data
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    if (!updatePost) {
      return res.status(404).send({ message: `Post not Found` });
    }
    return res.status(200).send({
      message: "Post Update suc",
      post: updatePost,
    });
  } catch (error) {
    console.error("Error update Post", error);
    return res.status(500).send({ message: `Error update Post` });
  }
};

// update view Count
const updateViewCnt = async (req, res) => {
  try {
    const { id } = req.params;
    const getViewCnt = await Post.findOne({ id: id });
    const updateViewCnt = await Post.findOneAndUpdate(
      { id: id },
      { viewcount: getViewCnt.viewcount + 1 },
      {
        new: true,
      }
    );
    if (!updateViewCnt) {
      return res.status(404).send({ message: `Post not Found` });
    }
    return res.status(200).send({
      message: "ViewCnt Update suc",
      post: updateViewCnt,
    });
  } catch (error) {
    console.error("Error update ViewCnt", error);
    return res.status(500).send({ message: `Error update ViewCnt` });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findOneAndDelete({ id: id });
    if (!deletePost) {
      console.log("delete");
      return res.status(404).send({ message: `Post not Found` });
    } else {
      return res.status(200).send({
        message: "Post deleted suc",
        post: deletePost,
      });
    }
  } catch (error) {
    console.error("Error delete Post", error);
    return res.status(500).send({ message: `Error delete Post` });
  }
};

module.exports = {
  registPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  updateViewCnt,
};
