const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const { chats } = require("./data/data");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("api running ");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`server stated at port ${PORT}`);
});
