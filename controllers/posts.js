const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  // GET /profile 
  getProfile: async (req, res) => {
    try {
      // find the Post with the user ID and save in the variable posts
      const posts = await Post.find({ user: req.user.id })
      
      // render the profile.ejs 
      res.render("profile.ejs", { posts: posts, user: req.user ,});
    } catch (err) {
      console.log(err);
    }
  },

  // GET /addRecipe
  getaddRecipe: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });

      // renders the addRecipe.ejs
      res.render("addRecipe.ejs",);
    } catch (err) {
      console.log(err);
    }
  },

  // GET /feed
  getFeed: async (req, res) => {
    try {
      // find and sort all posts in decsending order
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();

      // renders posts in /feed 
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  // GET /post
  getPost: async (req, res) => {
    try {

      // find post by id parameters 
      const post = await Post.findById(req.params.id);

      // find comments and sort in descending order
      const comments = await Comment.find({post:req.params.id}).sort({ createdAt: "desc" }).lean();

      // renders post,user,and comments to /post
      res.render("post.ejs", { post: post, user: req.user , comments: comments });
    } catch (err) {
      console.log(err);
    }
  },

  // CREATE /post
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      // creates a new postSchema document in the database
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption.replace(/(<([^>]+)>)/gi, ""),
        likes: 0,
        user: req.user.id,
      });
      


      console.log("Post has been added!");

      // redirects data to /profile
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  // UPDATE(like) /post 
  likePost: async (req, res) => {
    try {

      // finds post and update +1 like
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");

      // redirects +1 likes to post id
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  // DELETE /post
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");

      // redirect to /profile
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
