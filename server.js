require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread");

const password = process.env.MONGO_DB_PASSWORD;

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    `mongodb+srv://ysato3:${password}@cluster0.wkosrnz.mongodb.net/threads?retryWrites=true&w=majority`
)
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

app.get("/api/v1/threads", async (req, res) => {
    try {
      const allThreads = await Thread.find({});
      res.status(200).json(allThreads);
    } catch (err) {
      console.log(err);
    }
});

app.post("/api/v1/thread", async (req, res) => {
    try {
      console.log("post");
      const createThread = await Thread.create(req.body);
      res.status(200).json(createThread);
    } catch (err) {
      console.log(err);
    }
});

app.listen(PORT, console.log("server running"));

