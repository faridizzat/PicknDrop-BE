import { pool } from "../database/index.js";

const query = `
    CREATE TABLE IF NOT EXISTS T_ATTENDANCE ( 
        id SERIAL PRIMARY KEY,
        child_name VARCHAR(255) NOT NULL,
        child_id INTEGER REFERENCES T_CHILDREN(id) NOT NULL,
        user_id INTEGER REFERENCES T_USER(id) NOT NULL,
        attendance_date DATE NOT NULL,
        pickup_time TIME DEFAULT NULL ,
        dropoff_time TIME  DEFAULT NULL
    )
`;

export const createAttendanceTable = async (req, res) => {
  try {
    const result = await pool.query(query);
    console.log("T_ATTENDANCE is created");
  } catch (error) {
    console.error(error);
  }
};
