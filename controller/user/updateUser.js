import { pool } from "../../database/index.js";

const query = `
    UPDATE T_USER SET name = $1, email = $2 WHERE id = $3;
`;

const updateUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const userId = req.userId;

    //validate email string using regex
    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const dbRes = await pool.query(query, [name, email, userId]);

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
