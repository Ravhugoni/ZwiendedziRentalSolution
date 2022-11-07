const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

// app.get('/', (req, res) => { 
//     res.send('Hello People'); 
// });
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const router = express();

 router.use(express.static('public')); 
 router.use('/images', express.static('bin/images'));

 const getCars = (request, response) => {
  pool.query('SELECT * FROM cars', (error, results) => {
   
    response.status(200).json(results.rows)
  }),handleErr
}


const handleErr = (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});


const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})




// const cheyeza = (req, res, next) => {
//     req.user = {
//         name: "cheyeza",
//         lastname: "Mlondo"
//     }

//     next()
// }
// For Single image uploads
const postCars=('/', imageUpload.single('images'), (req, res) => {

  
  //res.send(req.file)
    //console.log("posted")

    const carImage = req.file.filename;
    const carName = req.body.carName;
    const model = req.body.model;
    const numberPlate = req.body.numberPlate;
    const make = req.body.make;
    const price = req.body.price;
    const companyID = req.body.companyID;
    

 pool.query(`INSERT INTO cars(carName,carImage,model,numberPlate,make,price,companyID) VALUES('${carName}','${carImage}','${model}','${numberPlate}','${make}','${price}','${companyID}')`, (err,result) => {
   if(err) throw err
   console.log("Image uploaded");
//    res.send(req.file)
return
 })
 return
},handleErr)




module.exports = {
  getCars,
  postCars
};