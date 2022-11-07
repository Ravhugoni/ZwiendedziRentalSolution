const express = require('express')
const bodyParser = require('body-parser')
const router = express()
const methods = require('../methods')
const profile = require('../Controllers/profile')
const products = require('../Controllers/products')

//const login = require('../Controllers/login')
//const register = require('../Controllers/Register')
//const multer = require('multer');

const port = 3001

router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

router.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
//Authentication
//const Registration_cnxt = require('./Controllers/Authentication/Register')

//context channeling for user
//router.post('/Auth/Registration', Registration_cnxt);

// Routes for users
router.get('/users', methods.getUsers)
router.get('/users/:id', methods.getUserById)
router.post('/users', methods.postUsers)
router.put('/users/:id', methods.updateUser)
router.delete('/users/:id', methods.deleteUser)

//routes for login
//router.post('/login/users', login.postUser)

//routes for registering

//routes for profile
router.get('/profile/users/:id', profile.getUserProfile)
router.put('/profile/users/:id', profile.updateUserProfile)

//routes for cars/products
router.post('/uploadImage', products.postCars)
router.get('/cars', products.getCars)



router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })