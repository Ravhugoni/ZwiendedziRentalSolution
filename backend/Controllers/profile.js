//const db = require('../connection');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

  const getUserProfile= (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
  }
  

  
  const updateUserProfile = (request, response) => {
    const id = parseInt(request.params.id);
    const { firstname,lastname,email,phone,password,usertype } = request.body
  
    pool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4, password=$5, usertype=$6 WHERE id=$7',[firstname, lastname, email, phone, password, usertype, id], (error, results) => {
        if (error) {
          throw error
        }
        //response.send(JSON.stringify(results));
        response.status(200).send(`User modified with ID: ${results.id}`)
      }
    )
  }

  
  
  
  module.exports = {
    getUserProfile,
    updateUserProfile
  }

  
