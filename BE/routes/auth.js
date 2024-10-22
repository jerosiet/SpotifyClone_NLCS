const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res) => {
  const {emailNguoiDung, password, tenNguoiDung, username, sdtNguoiDung, avatarNguoiDung} =
    req.body;
  if (!emailNguoiDung || !password || !tenNguoiDung || !username || !sdtNguoiDung) {
    return res.status(400).json({error: "Missing required fields"});
  }

  const user = await User.findOne({emailNguoiDung: emailNguoiDung});
  if (user) {
    return res.status(403).json({error: "A user with this email already exists"});
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    emailNguoiDung,
    password: hashedPassword,
    tenNguoiDung,
    username,
    sdtNguoiDung,
    avatarNguoiDung,
  };

  const newUser = await User.create(newUserData);

  const token = await getToken(emailNguoiDung, newUser);

  const userToReturn = {...newUser.toJSON(), token};

  delete userToReturn.password;

  return res.status(200).json({user: userToReturn});
});

router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).json({err: "Missing email or password"});
  }
  const user = await User.findOne({username});
  if (!user) {
    return res.status(403).json({err: "Invalid credentials"});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({err: "Invalid credentials"});
  }
  const token = await getToken(user.username, user);
  const userToReturn = {...user.toJSON(), token};
  delete userToReturn.password;
  return res.status(200).json({user: userToReturn});
});

module.exports = router;
