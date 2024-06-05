import { pool } from "../../database/index.js";

const deleteChildren = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.body.id;

    console.log(id, userId);

    const idQuery = id.map((_, index) => `$${index + 2}`).join(", ");
    const query = `DELETE FROM T_CHILDREN where user_id=$1 and id IN (${idQuery});`;

    console.log(query);

    const dbRes = await pool.query(query, [userId, ...id]);

    res.status(200).json({
      message: "Children deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default deleteChildren;
