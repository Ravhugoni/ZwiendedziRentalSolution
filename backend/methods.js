const pool = require('./connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
     
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

    const { firstName, lastName, contacNO, email,password, userType } = req.body

    pool.query('INSERT INTO public.users ("firstName", "lastName", "contactNo", email, password, "userType") VALUES ($1, $2, $3, $4, $5, $6)',  [firstName, lastName, contacNO, email,password, userType ], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
    
}
  
  const updateUser = (request, response) => {
    const id = request.params.id;
    const { firstname,lastname,email,phone} = request.body



    
  
    pool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id=$5 returning *',[firstname, lastname, email, phone, id], (error, results) => {
        
          response.status(200).send()
        //response.send(JSON.stringify(results));
        
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

