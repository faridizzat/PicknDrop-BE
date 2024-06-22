import { pool } from "../../database/index.js";

const query = `DELETE FROM T_ATTENDANCE where id = $1;`;

const deleteAttendance = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);

    const dbRes = await pool.query(query, [id]);
    const data = dbRes.rows;

    res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default deleteAttendance;
