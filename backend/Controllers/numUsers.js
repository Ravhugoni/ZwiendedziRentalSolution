const Pool = require('pg').Pool
const pool = require("../connection")


  const getAllUsers = (req,res)=>{

    pool.query('SELECT COUNT(users.id) AS numUsers FROM public.users;',(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }


  const getUsersBYReg = (req,res)=>{

    pool.query("SELECT count(id) as numuser, TO_CHAR(created_at, 'YYYY-mm') AS created_at FROM public.users WHERE TO_CHAR(created_at, 'yyyy-mm') = '2022-12' GROUP BY TO_CHAR(created_at, 'YYYY-mm') ORDER BY TO_CHAR(created_at, 'YYYY-mm') ASC;",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

 
  module.exports = {
    getAllUsers,
    getUsersBYReg
  }