require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { RATE_LIMITER_CONFIGURATIONS } = require('./utils/constants');
const limiter = rateLimit(RATE_LIMITER_CONFIGURATIONS);
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const NotFoundError = require('./utils/errors/NotFoundError');
const path = require('path');

const {PORT = 5000} = process.env;

const app = express();
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/', router);
app.use((req, res, next) => {
    const err = new NotFoundError(`Route ${req.url} is not supported in this app`);
    next(err);
  });
app.use(centralizedErrorHandler);

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
