const pool = require("../connection");

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getCars = (request, response) => {
    pool.query('SELECT * FROM public.cars ORDER BY id ASC ', (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }

  const getCarById = (request, res) => {
    const {category} = request.body
  
    pool.query('SELECT * FROM public.cars WHERE category = $1', [category], (error, results) => {
    
      res.status(200).json(results.rows)
    }),handleErr
  }
  
  const postCar = (req, res) => {

    const { carName,carImage,model,numberPlate,make,price,companyID,category,status, fuelType,horsePower,speedPerSec,topSpeed } = req.body

    pool.query('INSERT INTO public.cars("carName", "carImage", model, "numberPlate", make, price, "companyID", category, status,"fuelType", "horsePower", "speedPerSec", "topSpeed") VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [carName,carImage,model,numberPlate,make,price,companyID,category,status, fuelType,horsePower,speedPerSec,topSpeed ], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send()
    })
    
}
  
  const updateCar = (request, response) => {
    const id = parseInt(request.params.id);
    const { carName,carImage,model,numberPlate,make,price,companyID,category,status,fuelType,horsePower,speedPerSec,topSpeed } = request.body
  
    pool.query('UPDATE public.cars SET "carName"=$1, "carImage"=$2, model=$3, "numberPlate"=$4, make=$5, price=$6, "companyID"=$7, category = $8, status = $9, "fuelType"=$10, "horsePower"=$11, "speedPerSec"=$12, "topSpeed"=$13 WHERE id=$14',[carName ,carImage ,model ,numberPlate ,make ,price , companyID,category,status,fuelType,horsePower,speedPerSec,topSpeed, id], (error, results) => {
        if (error) {
          throw error
        }
        //response.send(JSON.stringify(results));
        response.status(200).send()
      }
    )
  }

// const updateCar = (req, res) => {
//     //const id = parseInt(req.params.id);
//     let field;
//     let updateString="";

//     const { id,carName,carImage,model,numberPlate,make,price,companyID,category,status, fuelType,horsePower,speedPerSec,topSpeed } = req.body
//     if (req.body.field) {
//     pool.query(`UPDATE public.cars SET  ${req.body.field} = '${req.body.updateString}' WHERE id = ${req.body.id}`, (error, results,field) => {

//       if (error) {
//       throw error
//       }
//         //response.send(JSON.stringify(results));
//         res.status(200).send(`User modified with ID: ${id}`)

//     });
//     }
// }

  
  const deleteCar = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id);
  
    pool.query('DELETE FROM public.cars WHERE id = $1', [id], (error, results) => {
     
      response.status(200).send()
    }),handleErr
  }
  
  module.exports = {
    getCars,
    getCarById,
    postCar,
    updateCar,
    deleteCar
  }

  
