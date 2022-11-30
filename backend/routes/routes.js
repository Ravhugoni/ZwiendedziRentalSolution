const express = require('express')
const bodyParser = require('body-parser')
const router = express()
const methods = require('../methods')
const profile = require('../Controllers/profile')
const products = require('../Controllers/Products')
const company = require('../Controllers/company')
// const port = 3001
const port = process.env.PORT || 3001;
const login = require("../Controllers/login")
const numCars = require("../Controllers/numUsers")
const reg = require("../Controllers/register")
const bookings = require ("../Controllers/bookings")
require("../database/dotenv");
const cors = require('cors');
const http = require('http')

//const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require('dotenv');

dotenv.config();

//const app = express();

cloudinary.config({
    cloud_name: 'dhtppljex',
    api_key: '259573781321246',
    api_secret: '1O8o4GDLf82SMhjj8yL9kPJRrSE',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  return res.json({ message: "Hello World 🇵🇹 🙌" });
});

router.post("/newUpload", upload.single("image"), async (req, res) => {
  return res.json({ image: req.file.path });
});

var corsOptions = {
  origin:"*"
}

router.use(cors(corsOptions));

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

router.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Routes for users
router.get('/users', methods.getUsers)
router.get('/users/:id', methods.getUserById)
router.post('/users', methods.postUsers)
router.patch('/users/:id', methods.updateUser)
router.delete('/users/:id', methods.deleteUser)

//routes for login
router.post('/users/login', login.login)

//routes for registering
router.post('/users/register', reg.registerUser)

//routes for profile
router.get('/profile/users/:id', profile.getUserProfile)
router.get('/profile/usersByEmail', profile.getUserByEmail)
router.put('/profile/users/:id', profile.updateUserProfile)

//routes for bookings
router.post('/bookings', bookings.addBooking)
router.get('/bookings', bookings.getAllBookings)
router.get('/bookings/:id', bookings.getBookingById)
router.put('/bookings/:id', bookings.updateBooking)
router.delete('/bookings/:id', bookings.deleteBooking)
//Routes for Cars
router.get('/cars', products.getCars)
router.get('/cars/:id', products.getCarById)
router.post('/cars', products.postCar)
router.put('/cars/:id', products.updateCar)
router.delete('/cars/:id', products.deleteCar)

//route for number of users
router.get('/num/users', numCars.getAllUsers)
router.get('/num/usersByReg', numCars.getUsersBYReg)


//routes for company
router.post('/company', company.addCompany)
router.get('/company', company.getAllCompany)
router.get('/company/:id', company.getCompanyById)
router.put('/company/:id', company.updateCompany)
router.delete('/company/:id', company.deleteCompany)

//routes for cars
router.get('/products/cars', products.getCars)
router.post('/products/cars', products.postCar)
router.get('/products/carsByCat', products.getCarById)
router.put('/products/cars/:id', products.updateCar)
router.delete('/cars/:id', products.deleteCar)

//routes for the number of cars
// router.get('/num/users', numCars.getAllUsers)

router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })