import { pool } from "../../database/index.js";
import date from "date-and-time";

const query = `SELECT * FROM T_ATTENDANCE where user_id=$1 and attendance_date=$2 and child_id= ANY($3);`;

const insertQuery = `INSERT INTO T_ATTENDANCE (child_id, child_name, user_id, attendance_date, pickup_time, dropoff_time)
SELECT id, name, $2, $3, NULL, NULL
FROM T_CHILDREN
WHERE id = ANY($1);`;

const createAttendance = async (req, res) => {
  try {
    const childId = req.body.childId;
    const attendanceDate = req.body.attendanceDate;
    const user_id = req.userId;

    const currentDate = new Date();
    const formattedDate = date.format(currentDate, "DD/MM/YYYY");

    //check if attendance already exist for today
    const dbRes = await pool.query(query, [user_id, attendanceDate, childId]);
    const data = dbRes.rows;

    if (data.length === 0) {
      await pool.query(insertQuery, [childId, user_id, attendanceDate]);

      res.status(200).json({
        status: "success",
        message: "Attendance created successfully",
      });
    } else {
      // If attendance already exists for today, send appropriate response
      res.status(200).json({
        status: "success",
        message: "Attendance already exists for today",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default createAttendance;
