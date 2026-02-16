const argon2 = require("argon2"); // Library untuk hashing password
const jwt = require("jsonwebtoken"); // Library untuk membuat dan memverifikasi JSON Web Token (JWT)
const { db } = require("../config/db"); // Koneksi database MySQL

// Register Controller
const register = async (req, res) => {
  try {
    // Mengambil data dari req.body
    const { name, email, password, role } = req.body;

    // Making sure no empty field
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All field required." });

    // Password has to be 8 or more characters
    if (password.length < 8)
      return res.status(400).json({ message: "Min. 8 characters password" });

    // Checking email registered or not
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0)
      return res.status(400).json({ message: "Email sudah terdaftar." });

    // Hashing password
    const hashedPassword = await argon2.hash(password);

    // Insert new user ke database
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
    );

    res.status(201).json({ message: "Register success." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ambil data user berdasarkan email
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0)
      return res.status(400).json({ message: "Email not found." });

    // Verifikasi password dengan hash di database
    const validPassword = await argon2.verify(user[0].password, password);

    if (!validPassword)
      return res.status(400).json({ message: "Wrong password." });

    const token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Login success.",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
