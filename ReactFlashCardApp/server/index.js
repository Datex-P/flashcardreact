const mongoose =require("mongoose");
require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
const DataBase = require('./models/database')
app.use(cors())
app.use(express.json())
//const mongoose = require('mongoose');
// const token = require('jsonwebtoken')

app.get('/database/:_id',(req,res)=>{
  DataBase.findById(req.params._id,(err,d)=>{
    if(err){
      res.status(403).json({error:'wrong id'})
    }else{
      res.status(200).json(d)
    }
    
  })
})
app.put('/database/:_id',(req,res)=>{
  DataBase.where({_id:req.params._id}).update(req.body,(err,d)=>{
    if(err){
      res.status(403).json({error:'wrong id'})
    }else{
      res.status(200).json(d)
    }
    
  })
})
app.post('/database/:user',(req,res)=>{
  DataBase.create(req.body).then(d=>res.json(d))
})

// import mongoose = require("mongoose");

// const mongoose = require('mongoose')
// connect to mongo
const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true }).then((result)=>console.log('connected')).catch((err)=>console.log(err));
app.listen(4000, ()=>console.log('server is running'))