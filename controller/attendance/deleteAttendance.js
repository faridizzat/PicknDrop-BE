import { pool } from "../../database/index.js";

const query = `DELETE FROM T_ATTENDANCE where child_name=$1 and attendance_date=$2;`;

const deleteAttendance = async (req, res) => {
  try {
    const childName = req.body.childName;
    const attendanceDate = req.body.attendanceDate;

    const dbRes = await pool.query(query, [childName, attendanceDate]);
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
