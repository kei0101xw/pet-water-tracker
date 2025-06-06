const User = require("../models/User");
const Pet = require("../models/Pet");
const SensorToken = require("../models/SensorToken");
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

    // ペットIDを取得してクッキーに保存
    const pet = await Pet.findOne({ userId: user._id });
    if (pet) {
      res.cookie("petId", pet._id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "ログイン成功",
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.clearCookie("petId", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "ログアウトしました" });
};

//センサ用のトークン発行
const generateSensorToken = async (req, res) => {
  try {
    const petId = req.cookies.petId;

    const pet = await Pet.findById(petId);
    if (!pet || pet.userId.toString() !== req.user.id) {
      return res.status(403).json("あなたのペットではありません");
    }

    // 既存のセンサートークンを検索
    const existingToken = await SensorToken.findOne({
      userId: req.user.id,
      petId: pet._id,
      isValid: true, // 無効化されていない
    });

    if (existingToken) {
      return res.status(200).json({
        message: "水飲み皿用トークンは1ユーザーにつき1回までです。",
        token: existingToken.token,
      });
    }

    // 新しいトークンを作成
    const token = jwt.sign(
      {
        userId: req.user.id,
        petId: pet._id,
        isSensor: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10y" }
    );

    const now = new Date();

    // DBに保存
    await SensorToken.create({
      userId: req.user.id,
      petId: pet._id,
      token,
      issuedAt: now,
      isValid: true,
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("センサトークン生成エラー:", err);
    res.status(500).json("センサトークンの生成に失敗しました");
  }
};

const getMyInfo = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  generateSensorToken,
  getMyInfo,
};
