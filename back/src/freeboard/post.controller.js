const Post = require("./post.model");

const registPost = async (req, res) => {
  try {
    const newPost = await Post({ ...req.body });
    await newPost.save();
    res.status(200).send({ message: "Post regist!", post: newPost });
  } catch (error) {
    console.error("Error regist Post", error);
    res.status(500).send({ message: "Error regist Post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (error) {
    console.error("Fail get All Posts", error);
    res.status(500).send({ message: "Fail get All Posts" });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    console.error(`[${id}] Error get Post`, error);
    res.status(500).send({ message: `[${id}] Error get Post` });
  }
};

// update post data
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatePost) {
      res.status(404).send({ message: `[${id}] Post not Found` });
    }
    res.status(200).send({
      message: "Post Update suc",
      post: updatePost,
    });
  } catch (error) {
    console.error("Error update Post", error);
    res.status(500).send({ message: `[${id}] Error update Post` });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      res.status(404).send({ message: `[${id}] Post not Found` });
    }
    res.status(200).send({
      message: "Post deleted suc",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error delete Post", error);
    res.status(500).send({ message: `[${id}] Error delete Post` });
  }
};

module.exports = {
  registPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
};
