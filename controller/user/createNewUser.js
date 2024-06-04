import { pool } from "../../database/index.js";

const query = `
INSERT INTO T_USER (name, email, password) VALUES ($1, $2, $3)
`;

export const createNewUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name, email, password);

    const dbRes = await pool.query(query, [name, email, password]);
    console.log(dbRes);

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
