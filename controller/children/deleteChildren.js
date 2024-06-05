import { pool } from "../../database/index.js";

const query = `DELETE FROM T_CHILDREN where user_id=($1) and id=($2)`

const deleteChildren = async (user_id) => {
    try{
        const userId = req.userId;
        const id = req.body.id
        const dbRes = await pool.query(query, [user_id, id])
    
        const data = dbRes.rows;
    
        res.status(200).json({
            message: "Children deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            
            message: "Internal server error"
        })
    }


}

export default deleteChildren