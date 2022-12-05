const Pool = require('pg').Pool
const pool = require("../connection")


  const getAllCompany = (req,res)=>{

    pool.query('SELECT COUNT("companyID") AS numcompany FROM public.company;',(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

  const getCompanyBYReg = (req,res)=>{

    pool.query("SELECT count('companyID') as numcompany, TO_CHAR(created_at, 'YYYY-mm') AS created_at FROM public.company GROUP BY TO_CHAR(created_at, 'YYYY-mm') ORDER BY TO_CHAR(created_at, 'YYYY-mm') ASC;",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

 
  module.exports = {
    getAllCompany,
    getCompanyBYReg
  }

