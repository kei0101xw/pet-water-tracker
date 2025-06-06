const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// ユーザー情報の更新
const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updateData = { ...rest };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json("ユーザー情報が更新されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

// ユーザーの削除
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json("ユーザー情報が削除されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
