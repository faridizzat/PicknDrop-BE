import { pool } from "../../database/index.js";

const query = `
INSERT INTO T_CHILDREN (name, user_id) VALUES ($1, $2)`;

const createNewChildren = async (req, res) => {
  try {
    const name = req.body.name;
    const userId = req.userId;
    const dbRes = await pool.query(query, [name, userId]);
    res.status(201).json({
      message: "Children created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default createNewChildren;
