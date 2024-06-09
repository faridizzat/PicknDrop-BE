import { pool } from "../../database/index.js";

const query = `SELECT id, name,  at_home, img_path FROM T_CHILDREN where user_id=$1 ORDER BY id;`;

const getAllChildren = async (req, res) => {
  try {
    const userId = req.userId;
    const dbRes = await pool.query(query, [userId]);

    const data = dbRes.rows;
    console.log(data);

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

export default getAllChildren;
