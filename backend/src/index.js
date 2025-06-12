const express = require("express");
const app = express();
const cors = require("cors");
const petRoute = require("./routes/pets");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const waterBowlRoute = require("./routes/waterBowl");
const waterLogRoute = require("./routes/waterLog");
const sensorMode = require("./routes/sensorMode");
const connectDB = require("./config/connect");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5050", //または172.20.10.9:5050
    credentials: true,
  })
);

const PORT = process.env.PORT;

app.use("/api/v1/pets", petRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/water-bowl", waterBowlRoute);
app.use("/api/v1/water-log", waterLogRoute);
app.use("/api/v1/sensor-mode", sensorMode);

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
