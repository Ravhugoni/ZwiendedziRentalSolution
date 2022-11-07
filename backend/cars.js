// const express = require('express');
// const app = express()
// const multer = require('multer');
// const path = require('path');

// app.use(express.static('public')); 
// app.use('/images', express.static('bin/images'));
// const port = 3000

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'admin',
//   host: 'localhost',
//   database: 'car_rental',
//   password: 'admin12345',
//   port: 5432,
// })

// // app.get('/', (req, res) => { 
// //     res.send('Hello People'); 
// // });
// app.get('/', (req, res) => { 
//     res.send('Not a accessbled Address app'); 
// });

// const handleErr = (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// }

// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'images', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//              + path.extname(file.originalname))
//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });


// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// })





// // For Single image uploads
// app.post('/uploadImage', imageUpload.single('images'), (req, res) => {

  
//   res.send(req.file)
   

//     const carImage = req.file.filename;
//     const carName = req.body.carName;
//     const model = req.body.model;
//     const numberPlate = req.body.numberPlate;
//     const make = req.body.make;
//     const price = req.body.price;
//     const companyID = req.body.companyID;
    

//  pool.query(`INSERT INTO Cars(carName,carImage,model,numberPlate,make,price,companyID) VALUES('${carName}','${carImage}','${model}','${numberPlate}','${make}','${price}','${companyID}')`, (err,result) => {
//    if(err) throw err
//    console.log("Image uploaded");
// //    res.send(req.file)
//  })

// },handleErr)



// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })
// // module.exports = {
// //   postCars
// // };
// module.exports = app;
const express = require('express');
const fileUpload = require('express-fileupload');
const router = express();
const port = 3000;

router.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

// Add this line to serve our index.html page
router.use(express.static('public'));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // If does not have image mime type prevent from uploading
    //if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);

    // All good
    res.sendStatus(200);
});

router.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});