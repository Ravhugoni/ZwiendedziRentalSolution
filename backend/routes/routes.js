const express = require('express')
const bodyParser = require('body-parser')
const router = express()
const methods = require('../methods')
const profile = require('../Controllers/profile')
const products = require('../Controllers/Products')
// const port = 3001
const port = process.env.PORT || 3001;
const login = require("../Controllers/login")
const numCars = require("../Controllers/numCars")
const reg = require("../Controllers/register")
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

router.use(cors());

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
router.put('/users/:id', methods.updateUser)
router.delete('/users/:id', methods.deleteUser)

//routes for login
router.post('/users/login', login.login)

//routes for registering
router.post('/users/register', reg.registerUser)

//routes for profile
router.get('/profile/users/:id', profile.getUserProfile)
router.put('/profile/users/:id', profile.updateUserProfile)

//Routes for Cars
router.get('/cars', products.getCars)
router.get('/cars/:id', products.getCarById)
router.post('/cars', products.postCar)
router.put('/cars/:id', products.updateCar)
router.delete('/cars/:id', products.deleteCar)

//route for number of products
router.get('/num', numCars.getNum)


router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })