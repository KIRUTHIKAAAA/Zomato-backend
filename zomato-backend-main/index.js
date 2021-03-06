//Import all Model Schemas----------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// import {
//     foodModels,
//     imageModel,
//     menuModel,
//     orderModel,
//     restaurantModel,
//     reviewsModel,
//     userModel
// } from './database/allModels'




//Required packages------------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const mongoose = require('mongoose');
const passport = require('passport')

//GOOGLE AUTHENTICATION CONFIGURATION
// import googleAuthConfig from './config/google.config'
import googleAuthConfig from './config/google.config'
//private router authentication config 
import privateRouterConfig from './config/route.config'

//API
import Auth from './API/Auth'
import Restaurant from './API/Restaurants'
import Food from './API/Food'
import Menu from './API/Menu'
import Image from './API/Image'
import Order from './API/Orders'
import Review from './API/Reviews'
import User from './API/User'

//mongoDB Connection--------------------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>
// const mongoDB = process.env.MONGODB_URI;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection Established"));
import ConnectDB from './database/connection'

//passport configuration
googleAuthConfig(passport);
privateRouterConfig(passport);


const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());
// zomato.use(passport.session());

zomato.get("/", (req, res) => {

    return res.json({ "Welcome": `Top my Backend software for the ZOMATO-MASTER` });
});



zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review)
zomato.use("/user", User)

zomato.listen(process.env.port || 5000, () => {
    ConnectDB()
        .then(() => {
            console.log("Server is running !!!");
        })
        .catch((error) => {
            console.log("Server is running, but database connection failed...");
            console.log(error);
        });
});
