
const express = require('express')

require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const usersRoutes = require('./routes/usersRoute')
const traineeRoutes = require('./routes/traineeRoute')
const corpTraineeRoutes = require('./routes/corporatetraineeRoute')
const adminRoutes = require('./routes/adminRoute')
const authRoutes = require('./routes/authRoute')
const instructorRoutes = require('./routes/instructorRoute')
const guestRoutes = require('./routes/guestRoute')
app.use(express.json())






mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
app.listen(process.env.PORT, () => {
    console.log('listening on port',process.env.PORT)
  })
})
.catch(err => console.log(err));

app.use('/api/trainee', traineeRoutes)

app.use('/api/corpTrainee', corpTraineeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/instructor',instructorRoutes)
app.use('/api/guest',guestRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/auth',authRoutes)


const courses = require('./models/courseModel').course
const schedule = require('node-schedule')
const checkDiscountsAtMidnight = schedule.scheduleJob('8 0 * * *', function () {
  courses.deleteDiscounts()
})