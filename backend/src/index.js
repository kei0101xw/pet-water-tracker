const express = require("express");
const app = express();
const connectDB = require("./config/connect");
require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(
      PORT,
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
