const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({});

//post validation

//post model
const Post = mongoose.model("post", postSchema);

module.exports = {
  postSchema,
  Post
};
