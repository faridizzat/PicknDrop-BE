import { pool } from "../database/index.js";

const query = `
    CREATE TABLE IF NOT EXISTS T_USER ( 
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()

    )
`;

export const createUserTable = async (req, res) => {
  try {
    const result = await pool.query(query);
    console.log("T_USER is created");
  } catch (error) {
    console.error(error);
  }
};
