import { pool } from "../../database/index.js";

const query = `
INSERT INTO T_CHILDREN (name, user_id, img_path) VALUES ($1, $2, $3) RETURNING id, name, img_path`;

const createNewChildren = async (req, res) => {
  try {
    const name = req.body.name;
    const userId = req.userId;
    const imgPath = req.body.imgPath;
    const dbRes = await pool.query(query, [name, userId, imgPath]);
    const data = dbRes.rows;
    res.status(201).json({
      message: "Children created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default createNewChildren;
