const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
  });
  
  module.exports = mongoose.model("Comment", CommentSchema);
  