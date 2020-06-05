const mongoose = require("mongoose"); //We are requiring mongoose.

const Schema = mongoose.Schema; //Schema is mongoose's Schema.

const userSchema = new Schema(
  {
    username: {
      //This is a field. userSchema only has a unique field in this case
      type: String,
      minlength: 3,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
