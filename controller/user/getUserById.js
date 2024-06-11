import { pool } from "../../database/index.js";
const query = `SELECT id, name, email FROM T_USER where id=$1;`;

const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const dbRes = await pool.query(query, [userId]);
    const data = dbRes.rows[0];
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default getUserById;
