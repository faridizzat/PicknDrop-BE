import { pool } from "../../database/index.js";

const query = `SELECT child_name, child_id, attendance_date, pickup_time, dropoff_time FROM T_ATTENDANCE where user_id=$1 ORDER BY attendance_date;`;

const getAttendanceById = async (req, res) => {
  try {
    const userId = req.userId;

    const dbRes = await pool.query(query, [userId]);

    const data = dbRes.rows;

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

export default getAttendanceById;
