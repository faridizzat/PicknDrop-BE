import { pool } from "../../database/index.js";
import bcrypt from "bcrypt";

const query = `
    UPDATE T_USER SET name = $1, email = $2, password = $3 WHERE id = $4
`;

const updateUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userId = req.userId;

    //validation if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    //validate email string using regex
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    //hash the password
    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const dbRes = await pool.query(query, [
      name,
      email,
      hashedPassword,
      userId,
    ]);

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default updateUser;
