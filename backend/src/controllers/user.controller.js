const db = require("../config/db");

const getUsers = async (req, res) => {
  const [users] = await db.query("SELECT id, name, email, role FROM users");
  res.json(users);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  await db.query("UPDATE users SET name = ?, role = ? WHERE id = ?", [
    name,
    role,
    id,
  ]);

  res.json({ message: "User updated." });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM users WHERE id = ?", [id]);

  res.json({ message: "User deleted." });
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
