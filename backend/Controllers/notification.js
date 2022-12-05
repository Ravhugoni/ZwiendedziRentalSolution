const { Module } = require('module');
const pool = require('../connection');

const addNotification = (req,res)=>{
  const {CreatedDate, Deleted, Message, Read, RecipientId, SenderId} = req.body;
  pool.query('INSERT INTO public."Notifications" ("CreatedDate", "Deleted", "Message", "Read", "RecipientId", "SenderId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
   [CreatedDate, Deleted, Message, Read, RecipientId, SenderId], (error, results) =>{

    if(error){
      throw error
    }
    res.status(201).send(`Notifications added with ID:`)
   })
}

//GET ALL NOTIFICATION
const getAllNotification = (req,res)=>{

  pool.query('SELECT * FROM public."Notifications" WHERE "Read" = $1',[false],(error ,results)=>{
  if(error){
      throw error
  }
  res.status(200).json(results.rows)
  })
}

//GET companies BY ID
const getNotificationById = (request, response) => {
  const NotificationID = parseInt(request.params.NotificationID)

  pool.query('SELECT * FROM public."Notifications", users where users.id = "Notifications"."Id" and users.id = $1',[id], (error,results)=>{
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
}

//PUT__UPDATE companies BY ID
const updateNotification = (req,res)=>{
  const {Message, address} = req.body;
  // const companyID = parseInt(req.params.companyID);
  const id = parseInt(req.params.id)

  pool.query('UPDATE public."Notifications" SET "Message"=$1 WHERE "Id"= $3',
  
  [Message, address, id],

  (error, results)=>{
      if(error){
          throw error
      }
      res.status(200).send(`Notifications modified with ID: ${id}`)
  }
  
  )
}

//DELETE NOTIFICATION BY ID
const deleteNotification = (req, res)=>{
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM public."Notifications" WHERE "Id" = $1', [id], (error,results)=>{
      if(error){
          throw error
      }
      res.status(200).send(`Notifications deleted with ID: ${id}`)
  })
}

module.exports = {
  addNotification,
  getAllNotification,
  getNotificationById,
  updateNotification,
  deleteNotification
}