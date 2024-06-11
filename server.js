const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userController = require("./userController");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());
app.use("/user", userController);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
