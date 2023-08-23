require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const cron = require('node-cron');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose")

const authRoutes = require("./api/router/auth");
const profileRoutes = require("./api/router/profile");
const counterRoutes = require("./api/router/counter");
const adminRoutes = require("./api/router/admin")
const frontendDataRoutes = require("./api/router/frontendData")
const otpRoutes = require('./api/router/otp')
const transactionRoutes = require('./api/router/transaction')

// IMPORTS FOR CRONJOB
const {deleteExpiredOtp} = require('./api/controller/otp/deleteExpiredOtp');
const { updateCounter } = require('./api/controller/counter/updateCounter');
const { generateAvailableUrl } = require('./api/controller/generateAvailableUrl');

// Starting DB
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.k6gmigg.mongodb.net/?retryWrites=true&w=majority`,{
    // 'mongodb://127.0.0.1:27017/visitmetoday',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true
    }).then(()=>{
        console.log("DB CONNECTED");
    }).catch((err)=>{
        console.log(err)
        console.log("ERROR in connecting to the DATABASE");
    })

// mongoose.connect(process.env.DATABASE,{ // 27017 is the port Number
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     // useCreateIndex: true
//     }).then(()=>{
//         console.log("DB CONNECTED");
//     }).catch((err)=>{
//         console.log(err)
//         console.log("ERROR in connecting to the DATABASE");
//     });


// Middleware
app.use(cors({
    origin: true,
    credentials: true
}))

// To get the real ip address of the user even when our server is behind reverse proxies.
app.set('trust proxy', true);

// app.use(cors({
//     origin: '*',
//     credentials: true
// }))
// access control allow origin *


app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api',authRoutes);
app.use("/api",profileRoutes);
app.use("/api",counterRoutes);
app.use("/api",adminRoutes)
app.use("/api",frontendDataRoutes)
app.use('/api',otpRoutes)
app.use('/api',transactionRoutes)



// CRONJOB

// executed every 4 hour (0, 4, 8, 12, 16, 20)
const onDeleteExpiredOtp = cron.schedule('0 */4 * * *', () => {
    deleteExpiredOtp();
},{
    timezone: 'Asia/Kolkata'
})

// executed every 1 hour
const onUpdateCounter = cron.schedule('10 */1 * * *', () => {
    updateCounter();
},{
    timezone: 'Asia/Kolkata'
})

// executed every night at 2 AM
const onGenerateAvailableUrl = cron.schedule('0 2 * * *', () => {
    generateAvailableUrl();
},{
    timezone: 'Asia/Kolkata'
})


//port
const port = process.env.PORT_NUMBER

// Starting server
app.listen(port, (err)=>{
    console.log("Server running on port: "+port);
})
