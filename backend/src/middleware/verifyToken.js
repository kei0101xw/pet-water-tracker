const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("無効なトークンです");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("トークンがありません");
  }
};

const verifySensorToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json("トークンが必要です");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // センサー専用トークンであることを確認
    if (!decoded.isSensor) {
      return res.status(403).json("無効なセンサー認証トークンです");
    }

    req.user = {
      id: decoded.userId,
      isAdmin: false,
    };

    next();
  } catch (err) {
    console.error("センサートークン認証エラー:", err);
    return res.status(403).json("トークン認証に失敗しました");
  }
};

module.exports = { verifyToken, verifySensorToken };
