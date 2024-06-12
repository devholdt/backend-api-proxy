const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

exports.generateToken = (user) => {
	return jwt.sign({ id: user.id, email: user.email }, secretKey, {
		expiresIn: "1h",
	});
};

exports.verifyToken = (token) => {
	try {
		return jwt.verify(token, secretKey);
	} catch (error) {
		return null;
	}
};
