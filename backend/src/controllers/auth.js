const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("ユーザーが見つかりません");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("パスワードが違います");

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
