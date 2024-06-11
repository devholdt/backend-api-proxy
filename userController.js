const express = require("express");
const { registerUser, loginUser, logoutUser } = require("./userService");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = await registerUser(username, email, password);
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const { token, user } = await loginUser(email, password);
		res
			.status(200)
			.json({ message: "User logged in successfully", token, user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/logout", authenticateToken, (req, res) => {
	try {
		const { username } = req.user;
		logoutUser(username);
		res.status(200).json({ message: "User logged out successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
