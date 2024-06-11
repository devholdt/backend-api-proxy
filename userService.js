const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { addUser, getUserByEmail, deleteUser } = require("./userModel");
require("dotenv").config();

const registerUser = async (username, email, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = {
		username,
		email,
		password: hashedPassword,
		accessToken: "",
		apiKey: "",
	};

	// Creating API Key for the user
	const apiKeyResponse = await axios.post(
		`${process.env.API_URL}/auth/create-api-key`,
		{},
		{
			headers: {
				Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
			},
		}
	);
	user.apiKey = apiKeyResponse.data.data.key;

	addUser(user);
	return user;
};

const loginUser = async (email, password) => {
	const user = getUserByEmail(email);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new Error("Invalid email or password");
	}

	// Fetch Noroff API access token
	const response = await axios.post(`${process.env.API_URL}/auth/login`, {
		email,
		password,
	});

	console.log("SERVER RESPONSE - ", response);

	if (response.status === 200) {
		user.accessToken = response.data.data.accessToken;
	} else {
		throw new Error("Noroff API login failed");
	}

	// Generate JWT for session
	const token = jwt.sign(
		{ username: user.username, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);

	return { token, user };
};

const logoutUser = (username) => {
	deleteUser(username);
};

module.exports = { registerUser, loginUser, logoutUser };
