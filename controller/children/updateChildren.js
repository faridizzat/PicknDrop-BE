import { pool } from "../../database/index.js";

const query = `UPDATE T_CHILDREN SET at_home = $1 WHERE user_id = $2 AND id IN ($3,...);`

const updateChildren = async (user_id) => {
    try{
        const userId = req.userId;
        const id = req.body.id
        const dbRes = await pool.query(query, [user_id, id])
    
        const data = dbRes.rows;
    
        res.status(200).json({
            message: "Children updated successfully"
        })
    }catch(error){
        res.status(500).json({
            
            message: "Internal server error"
        })
    }


}

export default updateChildren