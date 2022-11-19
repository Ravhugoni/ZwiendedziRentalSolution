const Pool = require('pg').Pool
const pool = require("../connection")

// const pool = new Pool({
//   user: 'admin',
//   host: 'localhost',
//   database: 'car_rental',
//   password: 'admin12345',
//   port: 5432,
// })

const handleErr = (err, req, res, next) => {
    res.status(400).send({ error: err.message })
  }

const getNum = (request, response) => {
    const {category} = request.body;
    //const id = parseInt(request.params.id)

    pool.query('SELECT COUNT(id) FROM public.cars WHERE category = $1',[category],(error, results) => {
     
      response.status(200).json(results.rows) 
    }),handleErr
  }

  module.exports = {
    getNum
  }