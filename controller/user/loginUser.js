import { pool } from "../../database/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

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

    //get user from database
    const dbRes = await pool.query("SELECT * FROM T_USER WHERE email = $1", [
      email,
    ]);

    if (dbRes.rowCount === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    //compare password
    const isValidPassword = await bcrypt.compare(
      password,
      dbRes.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    //generate token
    const token = jwt.sign(
      {
        id: dbRes.rows[0].id,
        email: dbRes.rows[0].email,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default loginUser;
