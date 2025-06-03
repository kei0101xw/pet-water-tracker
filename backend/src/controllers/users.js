const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//ユーザー情報の更新
//後でJWT認証を使ってトークンを検証するようにする
const updateUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("ユーザー情報が更新されました");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

//ユーザーの削除
const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("ユーザー情報が削除されました");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
