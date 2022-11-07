const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

//const db = require('./connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
     
      response.status(200).json(results.rows)
    }),handleErr
  }
  
  const postUsers = (req, res) => {

    const { firstname, lastname,email, phone, password, usertype } = req.body

    pool.query('INSERT INTO users (firstname,lastname,email,phone,password,usertype) VALUES ($1, $2,$3,$4,$5,$6)', [firstname, lastname,email, phone, password, usertype], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}
  
  const updateUser = (request, response) => {
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

  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
     
      response.status(200).send(`User deleted with ID: ${id}`)
    }),handleErr
  }
  
  module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUser,
    deleteUser
  }

  