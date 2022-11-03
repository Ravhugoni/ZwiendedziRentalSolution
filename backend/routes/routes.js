const express = require('express')
const bodyParser = require('body-parser')
const router = express()
const methods = require('../methods')
const profile = require('../Controllers/profile')
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

// Routes for users
router.get('/users', methods.getUsers)
router.get('/users/:id', methods.getUserById)
router.post('/users', methods.postUsers)
router.put('/users/:id', methods.updateUser)
router.delete('/users/:id', methods.deleteUser)

//routes for login


//routes for registering

//routes for profile
router.get('/profile/users/:id', profile.getUserProfile)
router.put('/profile/users/:id', profile.updateUserProfile)


router.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })