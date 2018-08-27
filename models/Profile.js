const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({});

//profile validation

//profile model
const Profile = mongoose.model("profile", profileSchema);

module.exports = {
  profileSchema,
  Profile
};
