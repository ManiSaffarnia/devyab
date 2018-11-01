const express = require("express");
const router = express.Router();
const _ = require('lodash');
const obejectID = require('mongoose').Types.ObjectId;
const authorization = require('../middleware/authorization');
const { Post } = require('../models/Post');
const { User } = require('../models/User');
const asynchMiddleware = require('../middleware/asynchMiddleware');
const postValidation = require('../validation/post');

//@route   GET api/posts/test
//@desc    Tests kardan functionality in route
//@access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Posts test page works!"
  });
});


//=========================================================================================================
//                                                BLOG Post 
//=========================================================================================================
/*FETCH ALL POSTS(blog post) */
//@route   GET api/posts
//@desc    get all posts
//@access  Public
router.get("/", asynchMiddleware(async (req, res) => {
  //pagination - TODO- kamel beshe کامل نیست
  let pageNumber, pageSize;
  try {
    pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
    pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  } catch (ex) {
    req.status(400).send('اعداد غلطه')
  }

  //fetch data
  const allPosts = await Post.find().sort({ data: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize);
  if (!allPosts) return res.status(404).json({ errorMessage: 'هیچ پستی یافت نشد' });

  //send response to user
  res.json(allPosts);
}));//END GET ALL



/*FETCH a BLOG POST(blog post) */
//@route   GET api/posts/:id
//@desc    get a post
//@access  Public
router.get("/:postID", asynchMiddleware(async (req, res) => {
  //get post id and validate it
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  //fetch data
  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ errorMessage: 'هیچ پستی با این مشخصات یافت نشد' });

  //send response to user
  res.json(post);
}));//END GET ALL



/*ADD BLOG POST */
//@route   POST api/posts
//@desc    add a new post
//@access  Private
router.post("/", authorization, asynchMiddleware(async (req, res) => {
  const input = _.pick(req.body, ['text', 'name', 'avatar']);
  input.userID = req.user.id;

  //input validation
  const { errors, isValid } = postValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors });

  //create a new post
  const newPostdata = {
    user: {
      id: input.userID,
      name: input.name,
      avatar: input.avatar
    },
    text: input.text
  }
  const newPost = new Post(newPostdata);

  //save to database
  await newPost.save();

  //send response
  res.json(newPost);
}));


/*UPDATE BLOG POST */
//@route   PUT api/posts/:postID
//@desc    update a post
//@access  Private
router.put("/:postID", authorization, asynchMiddleware(async (req, res) => {
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  const input = _.pick(req.body, ['text']);
  input.user = req.user.id;

  //input validation
  const { errors, isValid } = postValidation(input);
  if (!isValid) res.status(400).json({ errorMessage: errors });

  //create updated post object
  const updatedPostData = { text: input.text };

  //update database with new information
  //Post.findByIdAndUpdate
  //send response

}));


/*DELETE BLOG POST */
//@route   DELETE api/posts/:postID
//@desc    delete a post
//@access  Private
router.delete("/:postID", authorization, asynchMiddleware(async (req, res) => {
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  //find this user
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ errorMessage: 'چنین کاربری وجود ندارد' });


  //find the post 
  const post = await Post.findById(postID);
  if (!post) return res.status(400).json({ errorMessage: 'چنین پستی وجود ندارد' });

  //check if the post belongs to the user?
  if (user.id.toString() !== post.user.id.toString()) return res.status(401).json({ errorMessage: 'شما اجازه چنین عملیاتی را ندارید' });

  //delete from database
  const deletedPost = await post.remove();
  if (!deletedPost) return res.status(404).json({ errorMessage: 'چنین پستی برای پاک کردن موجود نیست' });

  //send response
  res.json({ success: 'پست مورد نظر با موفقیت پاک شد' });
}));

//=========================================================================================================
//                                                COMMENT
//=========================================================================================================

//=========================================================================================================
//                                                Likes
//=========================================================================================================



module.exports = router;
