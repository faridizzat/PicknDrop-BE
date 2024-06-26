import pkg from "pg";
import { createUserTable } from "../model/user.js";
import { createChildrenTable } from "../model/children.js";
import { createAttendanceTable } from "../model/attendance.js";
import "dotenv/config";

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function databaseInit() {
  // try catch block
  try {
    //   promise is pending
    const dbName = await pool.query("SELECT current_database()");
    const dbRes = await pool.query("SELECT NOW()");
    const time = dbRes.rows[0].now;
    const name = dbName.rows[0].current_database;
    //   promise is fullfilled
    console.log(`Connected to ${name} at ${time}`);

    // create database tables
    createUserTable();
    createChildrenTable();
    createAttendanceTable();
  } catch (error) {
    //   promise is rejected
    console.error(error);
    console.error("Database connection failed");
  }
}
