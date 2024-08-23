const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config();

console.log("before db")
mongoose.connect(process.env.MONGOURI).then(() => {
    console.log("Connetced to Mongo DB")
}).catch((err) => {
    console.log('error in connecting db', err.message)
})
console.log("after db")


const app = express()
app.use(express.json())
app.use(cookieParser())

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    exposedHeaders: 'Authorization',
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

app.get('/', (req, res) => {
    res.send('Hello World')
});


//Routes
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.route')
const employeeRegister = require('./routes/registerEmployee.route')
const bookingRoutes = require('./routes/booking.route');

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/booking', bookingRoutes);
//iska matlab k default route '/' k agy employeeRegister pr path define kro 
app.use('/', employeeRegister)