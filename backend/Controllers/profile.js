const pool = require('../connection');

  const getUserProfile= (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
  }
  


  const getUserByEmail= (request, response) => {
    const {email} = request.body
  
    pool.query('SELECT * FROM public.users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
  }

  
  const updateUserProfile = (request, response) => {
    const id = parseInt(request.params.id);
    const { firstname,lastname,email,phone } = request.body
  
    pool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id=$5',
    [firstname, lastname, email, phone, id],
    (error, results) => {
      if (error) {
        throw error
      }
        response.status(200).send()
        
      }
    )
  }

  
  
  
  module.exports = {
    getUserProfile,
    getUserByEmail,
    updateUserProfile
  }

  
