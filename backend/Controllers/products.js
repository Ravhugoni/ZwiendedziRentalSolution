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




const cheyeza = (req, res, next) => {
    req.user = {
        name: "cheyeza",
        lastname: "Mlondo"
    }

    next()
}
// For Single image uploads
app.post('/uploadImage', cheyeza, imageUpload.single('image'), (req, res) => {

  

    console.log(req.user)

    const img = req.file.filename;
    

 mariadb.query(`INSERT INTO Cars(carName,carImage,model,numberPlate,make,price,companyID) VALUES('${carName}','${img}','${model}','${numberPlate}','${make}','${price}','${companyID}')`, (err,result) => {
   if(err) throw err
   console.log("Image uploaded");
//    res.send(req.file)
 })

},handleErr)




app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

module.exports = app;