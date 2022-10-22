const express = require('express')
const { use } = require('./routes/traineeRoute')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const traineeRoutes = require('./routes/traineeRoute')
app.use(express.json())




app.use('/api/trainee', traineeRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
app.listen(process.env.PORT, () => {
    console.log('listening on port',process.env.PORT)
  })
})
.catch(err => console.log(err));



