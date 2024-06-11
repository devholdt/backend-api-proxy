// In-memory storage for simplicity. Use a database for production.
const users = [];

const addUser = (user) => {
	users.push(user);
};

const getUser = (username) => {
	return users.find((user) => user.username === username);
};

const getUserByEmail = (email) => {
	return users.find((user) => user.email === email);
};

const deleteUser = (username) => {
	const index = users.findIndex((user) => user.username === username);
	if (index !== -1) {
		users.splice(index, 1);
	}
};

module.exports = { addUser, getUser, getUserByEmail, deleteUser };
