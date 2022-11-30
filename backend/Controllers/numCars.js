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

    const {category} = req.body;

    pool.query("SELECT COUNT(cars.id) AS numCars, TO_CHAR(created_at, 'YYYY-mm') AS created_at FROM public.cars WHERE LOWER(category) =$1 GROUP BY TO_CHAR(created_at, 'YYYY-mm');",[category],(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

//   const getUsersBYReg = (req,res)=>{

//     pool.query("SELECT count(id) as numcars, TO_CHAR(created_at, 'YYYY-mm') AS created_at FROM public.cars GROUP BY TO_CHAR(created_at, 'YYYY-mm') ORDER BY TO_CHAR(created_at, 'YYYY-mm') ASC;",(error ,results)=>{
//     if(error){
//         throw error
//     }
//     res.status(200).json(results.rows)
//     })
//   }

 
  module.exports = {
    getAllCars,
    getAllByCat
  }