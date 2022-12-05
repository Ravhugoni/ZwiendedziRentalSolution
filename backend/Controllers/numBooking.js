const Pool = require('pg').Pool
const pool = require("../connection")


const getTotalNumBooking = (req,res)=>{

    pool.query("SELECT COUNT(*) numbooking FROM booking;",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

  const getBookingBYReg = (req,res)=>{

    pool.query("SELECT COUNT(id) numbooking, TO_CHAR(created_at, 'yyyy-mm') as created_at FROM booking GROUP BY TO_CHAR(created_at, 'yyyy-mm') ORDER BY TO_CHAR(created_at, 'yyyy-mm') ASC;",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

module.exports = {
    getTotalNumBooking,
    getBookingBYReg,
}
