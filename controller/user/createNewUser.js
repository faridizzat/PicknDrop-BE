import { pool } from "../../database/index.js";
import bcrypt from "bcrypt";

const query = `
INSERT INTO T_USER (name, email, password) VALUES ($1, $2, $3)
`;

export const createNewUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //   validate the request body is not empty
    if (!name || !password || !email) {
      return res.status(400).json({
        message: "name, password, email is required",
      });
    }

    //   validate email string using regex
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

    //   insert new user into database
    const dbRes = await pool.query(query, [name, email, hashedPassword]);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
