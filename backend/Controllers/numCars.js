const Pool = require('pg').Pool
const pool = require("../connection")


  const getAllCars = (req,res)=>{

    pool.query('SELECT COUNT(cars.id) AS numCars FROM public.cars;',(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

  const getAllByCat = (req,res)=>{

    //const {category} = req.body;

    pool.query("SELECT count(id), TO_CHAR(created_at, 'yyyy-mm'), category FROM public.cars GROUP BY TO_CHAR(created_at, 'yyyy-mm'), category ORDER BY TO_CHAR(created_at, 'yyyy-mm') ASC;",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

  const getNumByDate = (req,res)=>{

    pool.query("SELECT COUNT(*), TO_CHAR(created_at, 'yyyy-mm') FROM cars WHERE TO_CHAR(created_at, 'yyyy-mm') = '2022-12' GROUP BY TO_CHAR(created_at, 'yyyy-mm')",(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

 
  module.exports = {
    getAllCars,
    getAllByCat,
    getNumByDate
  }