const users = [];

const addUser = (user) => {
	users.push(user);
};

const getUser = (email) => {
	return users.find((user) => user.email === email);
};

const deleteUser = (email) => {
	const index = users.findIndex((user) => user.email === email);
	if (index !== -1) {
		users.splice(index, 1);
	}
};

module.exports = { addUser, getUser, deleteUser };
