const { Module } = require('module');
const pool = require('../connection');

const addCompany = (req,res)=>{
  const {car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time} = req.body;
  pool.query('INSERT INTO public.bookings (car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
   [car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time], (error, results) =>{

    if(error){
      throw error
    }
    res.status(201).send(`Company added with ID:`)
   })
}
//GET ALL COMPANIES
const getAllCompany = (req,res)=>{

  pool.query('SELECT "companyID", "companyName", address FROM public.company;',(error ,results)=>{
  if(error){
      throw error
  }
  res.status(200).json(results.rows)
  })
}

//GET companies BY ID
const getCompanyById = (request, response) => {
  const companyID = parseInt(request.params.companyID)

  pool.query('SELECT * FROM bookings, users where users.id = bookings.id and users.id = $1',[id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}



//PUT__UPDATE companies BY ID

const updateCompany = (req,res)=>{
  const {companyName, address} = req.body;
  // const companyID = parseInt(req.params.companyID);
  const id = parseInt(req.params.id)

  pool.query('UPDATE public.company SET "companyName"=$1, address=$2 WHERE "companyID"= $3',
  
  [companyName, address, id],

  (error, results)=>{
      if(error){
          throw error
      }
      res.status(200).send(`Company modified with ID: ${id}`)
  }
  
  )
}

//DELETE BOOKING BY ID
const deleteCompany = (req, res)=>{
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM public.company WHERE "companyID" = $1', [id], (error,results)=>{
      if(error){
          throw error
      }
      res.status(200).send(`Company deleted with ID: ${id}`)
  })
}



module.exports = {
  addCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
}