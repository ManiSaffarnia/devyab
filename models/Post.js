const mongoose = require("mongoose");
const { Schema } = mongoose;

/**post schema:
 * user => type: schema
 *         id,name,avatar
 * text => string, required
 * comments => array
 * likes => array
 * date => date
 */

const postSchema = new Schema({
  user: {
    type: new Schema({
      id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
      },
      avatar: {
        type: String
      },
      _id: false
    }),
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250
  },
  comment: [
    {
      text: {
        type: String,
        trim: true,
        required: true,
        maxlength: 150
      },
      user: {
        type: new Schema({
          id: {
            type: Schema.Types.ObjectId,
            ref: 'user'
          },
          name: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 50
          },
          avatar: {
            type: String
          },
          _id: false
        })
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      _id: false
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

//post model
const Post = mongoose.model("post", postSchema);

module.exports = {
  postSchema,
  Post
};
