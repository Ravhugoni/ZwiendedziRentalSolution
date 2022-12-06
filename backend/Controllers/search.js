const pool = require('../connection');

const getBookedCars= (request, response) => {
    const {pickup_date, dropoff_date} = request.body
  
    pool.query("SELECT c.*, b.bk_status FROM cars c, booking b WHERE c.id = b.car_id AND c.id IN (SELECT car_id from booking WHERE pickup_date >= $1 AND dropoff_date <= $2) AND b.bk_status <> 'Declined' AND b.bk_status <> 'Cancelled' AND b.bk_status <> 'Pending';", [pickup_date,dropoff_date], (error, results) => {
        
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
}

const getAvailableCars= (request, response) => {
    const {pickup_date, dropoff_date} = request.body
  
    pool.query("SELECT * FROM cars WHERE id NOT IN (SELECT c.id FROM cars c, booking b WHERE c.id = b.car_id AND c.id IN (SELECT car_id from booking WHERE pickup_date >= $1 AND dropoff_date <= $2) AND b.bk_status <> 'Declined' AND b.bk_status <> 'Cancelled' AND b.bk_status <> 'Pending');", [pickup_date, dropoff_date], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
}

const getAvailableCarsByCompany= (request, response) => {
    const {companyID, pickup_date, dropoff_date} = request.body
  
    pool.query(`SELECT * FROM cars WHERE id NOT IN (SELECT c.id FROM cars c, booking b WHERE c.id = b.car_id AND c.id IN (SELECT car_id from booking WHERE pickup_date >= $1 AND dropoff_date <= $2) AND b.bk_status <> 'Declined' AND b.bk_status <> 'Cancelled' AND b.bk_status <> 'Pending') AND cars."companyID" = $3`, [pickup_date, dropoff_date, companyID], (error, results) => {
        if (error) {
            throw error
          }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getBookedCars,
    getAvailableCars,
    getAvailableCarsByCompany,
}