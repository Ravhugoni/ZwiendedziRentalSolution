const express = require('express')
const bodyParser = require('body-parser')
const router = express()
const methods = require('../methods')
const profile = require('../Controllers/profile')
// const port = 3001
const port = process.env.PORT || 3001;
const login = require("../Controllers/login")
const reg = require("../Controllers/register")
const bookings = require ("../Controllers/bookings")
require("../database/dotenv");
const cors = require('cors');

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

//routes for bookings
router.post('/bookings', bookings.addBooking)
router.get('/bookings', bookings.getAllBookings)
router.get('/bookings/:id', bookings.getBookingById)
router.put('/bookings/:id', bookings.updateBooking)
router.delete('/bookings/:id', bookings.deleteBooking)

router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })