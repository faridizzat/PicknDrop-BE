import { pool } from "../../database/index.js";

const updateQueryPickup = `UPDATE T_ATTENDANCE SET pickup_time=$1 WHERE child_id=$2 and date=$3;`;

const updateQueryDropoff = `UPDATE T_ATTENDANCE SET dropoff_time=$1 WHERE child_id=$2 and date=$3;`;

const updateAttendance = async (req, res) => {
  try {
    const childId = req.body.childId;
    const attendanceDate = req.body.attendanceDate;
    const user_id = req.userId;
    const time = req.body.time;
    const at_home = req.body.at_home;

    if (at_home) {
      await pool.query(updateQueryPickup, [time, childId, attendanceDate]);
    } else {
      await pool.query(updateQueryDropoff, [time, childId, attendanceDate]);
    }

    res.status(200).json({
      status: "success",
      message: "Attendance updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export default updateAttendance;
