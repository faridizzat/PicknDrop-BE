import { pool } from "../../database/index.js";

const updateChildren = async (req, res) => {
  try {
    const at_home = req.body.status;
    const userId = req.userId;
    const id = req.body.id;

    const idArray = id;
    const idQuery = idArray.map((_, index) => `$${index + 3}`).join(", ");
    const query = `UPDATE T_CHILDREN SET at_home = $1 WHERE user_id = $2 AND id IN (${idQuery});`;

    const queryParams = [at_home, userId, ...idArray];

    const dbRes = await pool.query(query, queryParams);

    res.status(200).json({
      message: "Children updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default updateChildren;
