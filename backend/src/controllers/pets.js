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
    console.log("ユーザーID");
    console.log(req.user.id);
    const pet = await Pet.findOne({ userId: req.user.id });
    if (!pet) return res.status(404).json("登録されたペットが見つかりません");

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json("サーバーエラーが発生しました");
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json("登録された情報が見つかりません");

    if (pet.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const { userId, ...updateData } = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json("ペットの情報が更新されました");
  } catch (err) {
    console.error(err);
    res.status(500).json("サーバーエラーが発生しました");
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json("登録された情報が見つかりません");

    if (pet.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json("あなたはこの操作を許可されていません");
    }

    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json("ペットの情報が削除されました");
  } catch (err) {
    return res.status(500).json("サーバーエラーが発生しました");
  }
};

module.exports = {
  createPet,
  getMyPet,
  updatePet,
  deletePet,
};
