import { pool } from "../../database/index.js";

const query = `SELECT * FROM T_CHILDREN where user_id=($1)`

const getAllChildren = async (user_id) => {
    try{
        const userId = req.userId;
        const dbRes = await pool.query(query, [user_id])
    
        const data = dbRes.rows;
    
        res.status(200).json({
            status: "success",
            data: {
                data
            }
        })
    }catch(error){
        res.status(500).json({
            
            message: "Internal server error"
        })
    }


}

export default getAllChildren