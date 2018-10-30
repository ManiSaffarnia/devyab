const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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
      Type: String
    },
    linkedin: {
      Type: String
    },
    facebook: {
      Type: String
    },
    twitter: {
      Type: String
    },
    instagram: {
      Type: String
    }
  },//end social
  registerDate: {
    type: Date,
    default: Date.now()
  }
});//end schema

//profile validation
const profileValidation = (input) => {
  const jobExperienceSchema = {
    title: Joi.string().required(),
    companyName: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    current: Joi.boolean().required(),
    description: Joi.string(),
  };
  const educationSchema = {
    schoolTitle: Joi.string().required(),
    degree: Joi.string().required(),
    fieldOfStudy: Joi.string().required(),
    GPA: Joi.number().required(),
    location: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    current: Joi.boolean().required(),
    description: Joi.string(),
  };
  const social = {
    youtube: Joi.string(),
    linkedin: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
    instagram: Joi.string()
  };
  const profileSchema = {
    user: Joi.objectId().required(),
    handle: Joi.string().max(40).required(),
    company: Joi.string(),
    location: Joi.string(),
    jobStatus: Joi.string().required(),
    skills: Joi.array().items(Joi.string()),
    bio: Joi.string(),
    github: Joi.string(),
    jobExperience: Joi.array().items(Joi.object(jobExperienceSchema)),
    education: Joi.array().items(Joi.object(educationSchema)),
    social: Joi.object(social)
  }

  return Joi.validate(input, profileSchema, { abortEarly: false });
}

//profile model
const Profile = mongoose.model("profile", profileSchema);

module.exports = {
  profileSchema,
  Profile,
  profileValidation
};
