const Pet = require("../models/Pet");

const createPet = async (req, res) => {
  try {
    const existingPet = await Pet.findOne({ userId: req.user.id });
    if (existingPet) {
      return res.status(400).json("既にペットが登録されています");
    }

    const newPet = await Pet.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(200).json(newPet);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const getMyPet = async (req, res) => {
  try {
    const pet = await Pet.findOne({ userId: req.user.id });
    if (!pet) return res.status(404).json("登録されたペットが見つかりません");

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json("サーバーエラーが発生しました");
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({ userId: req.user.id });
    if (!pet) return res.status(404).json("登録された情報が見つかりません");

    const { userId, ...updateData } = req.body;

    const updatedPet = await Pet.findOneAndUpdate(
      { userId: req.user.id },
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      message: "ペットの情報が更新されました",
      pet: updatedPet,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({ userId: req.user.id });
    if (!pet) return res.status(404).json("登録された情報が見つかりません");

    await Pet.deleteOne({ userId: req.user.id });

    res.status(200).json("ペットの情報が削除されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  createPet,
  getMyPet,
  updatePet,
  deletePet,
};
