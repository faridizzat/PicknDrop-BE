import { pool } from "../database/index.js";

const query = `
    CREATE TABLE IF NOT EXISTS T_CHILDREN ( 
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES T_USER(id) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        at_home BOOLEAN DEFAULT TRUE,
        img_path VARCHAR(255)
    )
`;

export const createChildrenTable = async (req, res) => {
  try {
    const result = await pool.query(query);
    console.log("T_CHILDREN is created");
  } catch (error) {
    console.error(error);
  }
};
