const axios = require("axios");
const { generateToken, verifyToken } = require("../utils/jwt");

const apiBaseUrl = process.env.API_BASE_URL;
let users = [];

exports.registerUser = async (req, res) => {
	const { name, email, password, avatar } = req.body;

	try {
		const registrationData = { name, email, password };
		if (avatar) {
			registrationData.avatar = { url: avatar };
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

				users.push(loginUser);

				const token = generateToken(loginUser);

				return res.status(200).json({
					message: "User registration and login successful",
					user: loginUser,
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
		return res.status(500).json({
			message: "Error registering user",
			error: error.response ? error.response.data : error.message,
		});
	}
};

exports.getUserProfile = (req, res) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	const decoded = verifyToken(token);
	if (!decoded) {
		return res.status(401).json({ message: "Failed to authenticate token" });
	}

	const user = users.find((u) => u.id === decoded.id);
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.status(200).json({ user });
};
