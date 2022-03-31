const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const { chats } = require("./data/data");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("api running ");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
	console.log(`server stated at port ${PORT}`);
});

const io = require("socket.io")(server, {
	pingTimeOut,
	cors: {
		origin: "http://localhost:3000",
	},
});
