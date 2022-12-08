const { response } = require('express');
const { request } = require('http');
const { Module } = require('module');
const pool = require("../connection");

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getDocx = (request, response) => {
    pool.query('SELECT * FROM public.uploads ORDER BY id ASC ', (error, results) => {
        if(error){
            throw error
        }
      response.status(200).json(results.rows)
    })
  }

 
  const uploadDocx = (req, res) => {

    const { identity,licence } = req.body

    pool.query('INSERT INTO public.uploads("identity","licence" ) VALUES ($1, $2)', [identity,licence ], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send()
    })
    
}

  const getDocxById = (request, response)=>{
    const id = parseInt(request.params.id);

    pool.query('SELECT identity, licence FROM public.uploads WHERE id = $1', [id], (error,results)=>{
      if (error) {
        throw error
      }
      response.status(200).send(results.rows)
    })
  }
  
  const updateDocx = (request, response) => { 
    const id = parseInt(request.params.id);
    const { identity,licence } = request.body
  
    pool.query('UPDATE public.uploads SET "identity"=$1, "licence"=$2 WHERE id=$3',[identity, licence, id], (error, results) => {
        if (error) {
          throw error
        }
        //response.send(JSON.stringify(results));
        response.status(200).send()
      }
    )
  }

  
  module.exports = {
    getDocx,
    getDocxById,
    uploadDocx,
    updateDocx,
    
  }

  
