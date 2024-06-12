const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;
		if (!mongoUri) {
			throw new Error("MONGO_URI environment variable not set");
		}

		await mongoose.connect(mongoUri);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
