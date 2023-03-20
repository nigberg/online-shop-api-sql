require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');

const {PORT = 5000} = process.env;

const app = express();

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`The app is running on ${PORT} port`)});

    }catch(e){
        console.log(e);
    }
}


start();
