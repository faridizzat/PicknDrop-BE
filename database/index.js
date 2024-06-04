import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  //   host: process.env.PGHOST,
  //   user: process.env.PGUSER,
  //   password: process.env.PGPASSWORD,
  //   database: process.env.PGDATABASE,
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "pick-n-drop-app",
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
  } catch (error) {
    //   promise is rejected
    console.error(error);
    console.error("Database connection failed");
  }
}

export default databaseInit;
