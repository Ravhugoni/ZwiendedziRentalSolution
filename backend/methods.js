const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


//GET USER BY ID
const getUserById = (request, response) =>{
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1',[id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}

//CREATE USER BY ID

const createUser = (request, response) => {
  const { firstName, lastName, contactNo, email, password, userType } = request.body

  pool.query('INSERT INTO public.users (firstName, lastName, contactNo, email, password, userType) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, lastName, contactNo, email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Employee added with ID: ${results.rows[0].id} : HAPPY DRIVING`)
  })
}


//PUT__UPDATE USER BY ID

const updateUser = (request,response)=>{
  const {firstName, lastName, contactNo, email, password, userType}=request.body
  const id = parseInt(request.params.id)

  pool.query('UPDATE public.users SET name = $1, email =$2 WHERE id= $3',
  [firstName, lastName, contactNo, email, password, userType],

  (error, results)=>{
      if(error){
          throw error
      }
      response.status(200).send(`Employee modified with ID: ${id}`)
  }
  
  )
}



//DELETE USER BY ID
const deleteUser = (request, response)=>{
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM public.users WHERE id = $1', [id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).send(`Empoyee deleted with ID: ${id}`)
  })
}
  
//EXPORTING CRUD FUNCTIONS IN A REST API

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }