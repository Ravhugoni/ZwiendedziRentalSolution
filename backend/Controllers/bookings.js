const { Module } = require('module');

const pool = require("../connection")

const addBooking = (req,res)=>{
  const {comp_id, user_id, car_id, pickup_date, dropoff_date,bk_status} = req.body;
   pool.query('INSERT INTO public.booking(comp_id, user_id, car_id, pickup_date, dropoff_date, bk_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
   [comp_id, user_id, car_id, pickup_date, dropoff_date, bk_status], (error, results) =>{

    if(error){
      throw error
    }
    res.status(201).send(`Booking added with ID: HAPPY DRIVING`)
   })
}

//GET ALL BOOKINGS
const getAllBookings = (req,res)=>{

  pool.query('SELECT b.id,b.comp_id,b.user_id,b.car_id,b.pickup_date,b.dropoff_date,b.bk_status,u.firstname,u.lastname,u.email,u.phone,u.usertype,c."carName",c."carImage", c.model,c."numberPlate",c.price,p."companyID",c.category,c.status,c."fuelType",c."horsePower",c."speedPerSec",c."topSpeed",p."companyName",p.address FROM booking b, users u, "cars" c, company p WHERE b.user_id = u."id" AND b.car_id = c."id" AND b.comp_id = p."companyID" ORDER BY b.id ASC;',(error ,results)=>{
  if(error){
      throw error
  }
  res.status(200).json(results.rows)
  })
}

//GET BOOKINGS BY ID
const getBookingById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM bookings,users where users.id =bookings.id and users.id = $1',[id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}



//PUT__UPDATE BOOKING BY ID

const updateBooking = (req,res)=>{
  const {comp_id, user_id, pickup_date, dropoff_date, bk_status} = req.body;
  const id = parseInt(req.params.id)

  try{
    pool.query('UPDATE public.booking SET comp_id=$1, user_id=$2, pickup_date=$3, dropoff_date=$4, bk_status=$5 WHERE id=$6;',
    [comp_id, user_id, pickup_date, dropoff_date, bk_status, id],
      (error, results) => {
        if (error) {
          throw error
        }
      res.status(200).send()
      }
    )
  }
  catch(error)

  {
    console.log('didnt update')
  }

  
}



//DELETE BOOKING BY ID
const deleteBooking = (request, response)=>{
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM public.bookings WHERE id = $1', [id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).send(`Booking deleted with ID: ${id}`)
  })
}



module.exports = {
  addBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
}