const axios = require("axios");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../utils/jwt");

const apiBaseUrl = process.env.API_BASE_URL;

exports.registerUser = async (req, res) => {
	const { name, email, password, avatar } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: "Name, email, and password are required." });
	}

	try {
		const registrationData = { name, email, password };
		if (avatar) {
			registrationData.avatar = avatar;
		}

		const registerResponse = await axios.post(
			`${apiBaseUrl}/auth/register`,
			registrationData
		);

		if (registerResponse.status === 201) {
			const loginResponse = await axios.post(`${apiBaseUrl}/auth/login`, {
				email,
				password,
			});

			if (loginResponse.status === 200) {
				const loginUser = loginResponse.data;

				const token = generateToken(loginUser);

				const newUser = new User({
					name: loginUser.name,
					email: loginUser.email,
					password,
					avatar,
					accessToken: token,
				});

				await newUser.save();

				return res.status(200).json({
					message: "User registration and login successful",
					token,
				});
			} else {
				return res
					.status(400)
					.json({ message: "Login failed", error: loginResponse.data });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Registration failed", error: registerResponse.data });
		}
	} catch (error) {
		console.error(
			"Error registering user:",
			error.response ? error.response.data : error.message
		);
		return res.status(500).json({
			message: "Error registering user",
			error: error.response ? error.response.data : error.message,
		});
	}
};

exports.getUserProfile = async (req, res) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	const decoded = verifyToken(token);
	if (!decoded) {
		return res.status(401).json({ message: "Failed to authenticate token" });
	}

	try {
		const user = await User.findOne({ _id: decoded.id });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({ user });
	} catch (error) {
		console.error("Error fetching user profile:", error.message);
		res
			.status(500)
			.json({ message: "Error fetching user profile", error: error.message });
	}
};
