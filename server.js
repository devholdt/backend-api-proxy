require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const app = express();
const userRoutes = require("./routes/userRoutes");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
