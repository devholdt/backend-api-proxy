const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./userController");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/user", userController);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
