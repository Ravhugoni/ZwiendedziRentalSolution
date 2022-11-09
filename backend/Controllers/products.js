const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getCars = (request, response) => {
    pool.query('SELECT * FROM cars', (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }

  const getCarById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM cars WHERE id = $1', [id], (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }
  
  const postCar = (req, res) => {

    const { carName,carImage,model,numberPlate,make,price,companyID } = req.body

    pool.query('INSERT INTO public.cars("carName", "carImage", model, "numberPlate", make, price, "companyID") VALUES ($1, $2,$3,$4,$5,$6,$7)', [carName,carImage,model,numberPlate,make,price,companyID], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Car has been added successfully`)
    })
    
}
  
  const updateCar = (request, response) => {
    const id = parseInt(request.params.id);
    const { carName,carImage,model,numberPlate,make,price,companyID } = request.body
  
    pool.query('UPDATE public.cars SET "carName"=$1, "carImage"=$2, model=$3, "numberPlate"=$4, make=$5, price=$6, "companyID"=$7 WHERE id=$8',[carName ,carImage ,model ,numberPlate ,make ,price , companyID, id], (error, results) => {
        if (error) {
          throw error
        }
        //response.send(JSON.stringify(results));
        response.status(200).send(`User modified with ID: ${results.id}`)
      }
    )
  }

  
  const deleteCar = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public.cars WHERE id = $1', [id], (error, results) => {
     
      response.status(200).send(`User deleted with ID: ${id}`)
    }),handleErr
  }
  
  module.exports = {
    getCars,
    getCarById,
    postCar,
    updateCar,
    deleteCar
  }

  
