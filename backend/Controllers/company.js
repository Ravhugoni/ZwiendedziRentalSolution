const { Module } = require('module');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_rental',
  password: 'Danny@2016',
  port: 5432,
})

const addCompany = (req,res)=>{
  const {car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time} = req.body;
   pool.query('INSERT INTO public.bookings (car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
   [car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time], (error, results) =>{

    if(error){
      throw error
    }
    res.status(201).send(`Booking added with ID: HAPPY DRIVING`)
   })
}

//GET ALL companies
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
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM bookings,users where users.id =bookings.id and users.id = $1',[id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}



//PUT__UPDATE companies BY ID

const updateCompany = (req,res)=>{
  const {car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time} = req.body;
  const id = parseInt(req.params.id)

  pool.query('UPDATE public.bookings SET car_make = $1, car_model = $2, pick_up = $3, pickup_time = $4, drop_off = $5, dropoff_time = $6 WHERE id= $7',
  [car_make, car_model, pick_up, pickup_time, drop_off, dropoff_time, id],

  (error, results)=>{
      if(error){
          throw error
      }
      res.status(200).send(`Employee modified with ID: ${id}`)
  }
  
  )
}

//DELETE BOOKING BY ID
const deleteCompany = (request, response)=>{
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM public.bookings WHERE id = $1', [id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).send(`Booking deleted with ID: ${id}`)
  })
}



module.exports = {
  addCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
}