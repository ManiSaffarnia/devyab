const express = require("express");
const router = express.Router();
const _ = require('lodash');
const obejectID = require('mongoose').Types.ObjectId;
const authorization = require('../middleware/authorization');
const { Post } = require('../models/Post');
const { User } = require('../models/User');
const asynchMiddleware = require('../middleware/asynchMiddleware');
const postValidation = require('../validation/post');
const commentValidation = require('../validation/comment');

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

  //get inputs
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
/*ADD COMMENT */
//@route   POST api/posts/comment/:postID
//@desc    add comment to a post with certain id
//@access  Private
router.post("/comment/:postID", authorization, asynchMiddleware(async (req, res) => {
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  //get inputs
  const input = _.pick(req.body, ['text', 'name', 'avatar']);
  input.userID = req.user.id;

  //input validation
  const { errors, isValid } = commentValidation(input);
  if (!isValid) return res.status(400).json({ errorMessage: errors });

  //find the post
  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ errorMessage: "چنین پستی یافت نشد" });

  //create new comment object
  const commentData = {
    text: input.text,
    user: {
      id: input.userID,
      name: input.name,
      avatar: input.avatar
    }
  };

  //add new comment to the post's comment array
  post.comment.push(commentData);

  //save to database
  await post.save();

  //send response
  res.json(post);
}));//END ADD COMMENT



/*REMOVE COMMENT */
//@route   DELETE api/posts/comment/:postID/:commentID
//@desc    remove comment with a certain id from a post with certain id
//@access  Private
router.delete("/comment/:postID/:commentID", authorization, asynchMiddleware(async (req, res) => {
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  const commentID = req.params.commentID
  if (!commentID || !obejectID.isValid(commentID)) return res.status(400).json({ errorMessage: "آیدی کامنت مربوطه ارسال نشده و یا غیر معتبر است" });

  //find the post
  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ errorMessage: "چنین پستی یافت نشد" });

  //find the user
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ errorMessage: "چنین کاربری یافت نشد" });

  //find the comment in comments array
  const targetComment = post.comment.findIndex((eachcomment) => {
    return eachcomment.id.toString() === commentID
  });

  //check if this comment exist in this post comments array
  if (targetComment === -1) return res.status(404).json({ errorMessage: 'چنین کامنتی یافت نشد' });

  //check if user is the owner of the comment //TODO or the owner of the post*********
  if (post.comment[targetComment].user.id.toString() !== req.user.id) return res.status(401).json({ errorMessage: 'شما امکان پاک کردن این کامنت را ندارید' });

  //remove commetn from comments array
  post.comment.splice(targetComment, 1);

  //save to database
  await post.save();

  //send response
  res.json(post);
}));//END ADD COMMENT



//=========================================================================================================
//                                                Likes
//=========================================================================================================
/*ADD/REMOVE LIKE */
//@route   POST api/posts/like/:postID
//@desc    add/Remove like to a post with certain id
//@access  Private
router.post("/like/:postID", authorization, asynchMiddleware(async (req, res) => {
  const postID = req.params.postID;
  if (!postID || !obejectID.isValid(postID)) return res.status(400).json({ errorMessage: "آیدی پست مربوطه ارسال نشده و یا غیر معتبر است" });

  const userID = req.user.id;
  if (!userID || !obejectID.isValid(userID)) return res.status(400).json({ errorMessage: "آیدی کاربری که میخواد لایک کنه ارسال نشده و یا غیر معتبر است" });

  //find the post
  const post = await Post.findById(postID);
  if (!post) return res.status(404).json({ errorMessage: "چنین پستی یافت نشد" });

  //check if this user like this post before or not
  const likeIndex = post.likes.findIndex((like) => {
    return like.user.toString() === userID;
  });

  //check if this user like this post before or not
  if (likeIndex !== -1) {
    //yani ghablan like karde. alan unlike mikonim
    post.likes.splice(likeIndex, 1);
    await post.save();
    return res.json(post);
  }

  //yani ghablan like nakarde va alan mikhad like kone
  //add to likes array
  post.likes.push({ user: userID });

  //save to database
  await post.save();

  //send response
  res.json(post);
}));




//export
module.exports = router;
