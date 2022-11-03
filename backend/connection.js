const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'car_rental',
  password: 'admin12345',
  port: 5432,
})

// pool.query('SELECT "t"', function(err, rows, fields) {
//     if (err) {
//         console.log(err.message)
//         return
//     }
//     if (rows[0])
//         if (rows[0].test == "test") {
//             console.log("********************Server is ready********************")
//             console.log("")
//             console.log("System Log: ")
//         }
// })

console.log("You are now connected to the database")

module.exports = pool;