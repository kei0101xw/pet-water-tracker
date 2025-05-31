const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./config/connect");
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/v1/", taskRoute);

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
