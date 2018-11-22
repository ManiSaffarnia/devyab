const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  jobStatus: {
    type: String,
    required: true
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  jobExperience: {
    type: [{
      title: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }]
  },//end jobExprience
  education: {
    type: [{
      schoolTitle: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      GPA: {
        type: Number,
        required: true
      },
      location: {
        type: String
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }]
  },//end education
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },//end social
  registerDate: {
    type: Date,
    default: Date.now()
  }
});//end schema

//profile model
const Profile = mongoose.model("profile", profileSchema);

module.exports = {
  profileSchema,
  Profile
};
