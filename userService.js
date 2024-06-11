const jwt = require("jsonwebtoken");
const axios = require("axios");
const { addUser, getUser, deleteUser } = require("./userModel");
require("dotenv").config();

const registerUser = async (userData) => {
	// Assume userData contains all necessary fields
	const response = await axios.post(
		`${process.env.NOROFF_API_URL}/auth/create-api-key`,
		userData
	);
	const user = { ...response.data.data, ...userData };
	addUser(user);
	return user;
};

const loginUser = async (email, password) => {
	const user = getUser(email);
	if (!user) throw new Error("User not found");

	const response = await axios.post(
		`${process.env.NOROFF_API_URL}/auth/login`,
		{ email, password }
	);
	if (response.status === 200) {
		user.accessToken = response.data.data.accessToken;
	} else {
		throw new Error("Noroff API login failed");
	}

	const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	return { token, user };
};

const logoutUser = (email) => {
	deleteUser(email);
};

module.exports = { registerUser, loginUser, logoutUser };
