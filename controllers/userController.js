const axios = require("axios");

const apiBaseUrl = process.env.API_BASE_URL;

exports.registerUser = async (req, res) => {
	const { name, email, password, avatar } = req.body;

	try {
		// Register the user
		const registerResponse = await axios.post(`${apiBaseUrl}/register`, {
			name,
			email,
			password,
			avatar,
		});

		if (registerResponse.status === 200) {
			const user = registerResponse.data;

			// Automatically login the user
			const loginResponse = await axios.post(`${apiBaseUrl}/login`, {
				email,
				password,
			});

			if (loginResponse.status === 200) {
				const loginUser = loginResponse.data;

				// Store user data securely (e.g., in a database, or temporarily in memory)
				// For demonstration, we're sending it back in the response
				return res.status(200).json({
					message: "User registration and login successful",
					user: loginUser,
				});
			}
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error registering user", error: error.message });
	}
};
