const axios = require("axios");

const apiBaseUrl = process.env.API_BASE_URL;

exports.registerUser = async (req, res) => {
	const { name, email, password, avatar } = req.body;

	try {
		// Register the user
		const registerResponse = await axios.post(`${apiBaseUrl}/auth/register`, {
			name,
			email,
			password,
			avatar: {
				url: avatar,
			},
		});

		if (registerResponse.status === 201) {
			const loginResponse = await axios.post(`${apiBaseUrl}/auth/login`, {
				email,
				password,
			});

			if (loginResponse.status === 200) {
				const loginUser = loginResponse.data;

				return res.status(200).json({
					message: "User registration and login successful",
					user: loginUser,
				});
			} else {
				return res.status(400).json({ message: "Login failed" });
			}
		} else {
			return res.status(400).json({ message: "Registration failed" });
		}
	} catch (error) {
		console.error(
			"Error registering user:",
			error.response ? error.response.data : error.message
		);
		return res
			.status(500)
			.json({ message: "Error registering user", error: error.message });
	}
};
