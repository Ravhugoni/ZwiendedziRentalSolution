const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const router = express();
const cloudinary = require('../clodinary')
const upload = require('../multer');
const bodyParser = require('body-parser');


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

router.use(bodyParser.urlencoded({
  extended: false
}))

router.use(bodyParser.json());

 router.use(express.static('public')); 
 router.use('/images', express.static('bin/images'));

//  const getCars = (request, response) => {
//   pool.query('SELECT * FROM cars', (error, results) => {


// const handleErr = (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// }


// // For Single image uploads
router.post('/upload-images', imageUpload.array('image'), async(req, res) => {

  const uploader = async (path) => await cloudinary.uploads(path,'Images');
 
  if (require.method === 'POST') {
    const urls = []
    const files = req.files;
    for (const file of files) {
      const {path} = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      files.unlinkSync(path)
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })
  } else {

    res.status(405).json({
      err:`${req.method} method not allowed`
    })
  }

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




module.exports = router;