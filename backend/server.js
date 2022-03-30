const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const { chats } = require("./data/data");
const connectDB = require("./config/db");

connectDB();

app.get("/", (req, res) => {
	res.send("api running ");
});

app.get("/api/chat", (req, res) => {
	res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
	// console.log(req.params.id);
	const singleChat = chats.find((c) => c._id === req.params.id);
	res.send(singleChat);
});

const PORT = process.env.PORT;

app.listen(5000, () => {
	console.log(`server stated at port ${PORT}`);
});
