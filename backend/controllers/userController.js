let User = require("../models/user.model");

exports.getAllUser = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addAUser = (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteAUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((res) => res.json("User deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};
