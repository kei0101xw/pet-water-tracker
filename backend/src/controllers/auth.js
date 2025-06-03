const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// トークン生成
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin || false,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = generateToken(newUser);
    res.status(200).json({
      message: "ユーザー登録完了",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      token: token,
    });
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

    const token = generateToken(user);

    return res.status(200).json({
      message: "ログイン成功",
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
