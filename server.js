const http = require("http");
const express = require("express");
const cors = require("cors");
const userRouter = require("./userController");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on http://localhost:${server.address().port}`);
});
