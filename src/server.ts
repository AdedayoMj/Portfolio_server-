import http from 'http';
import express from 'express';
import cors from 'cors'
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';
import * as dotenv from 'dotenv';
import userRoutes from './routes/user';
import aboutRoutes from './routes/about'
import articleRoutes from './routes/article'
import awardRoutes from './routes/award'
import fellowRoutes from './routes/fellowship'
import memberRoutes from './routes/member'
import otherRoutes from './routes/otherhonour'
import currentRoutes from './routes/currentproject'
import sightRoutes from './routes/sightandsounds'

const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 1


const router = express();



throng({ master, worker, count: WORKERS })

// This will only be called once
function master() {
  console.log('Started master')

  process.on('beforeExit', () => {
    console.log('Master cleanup.')
  })
}

// This will be called four times
function worker(id: any, disconnect: () => void) {
  let exited = false

  console.log(`Started worker ${ id }`)
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)


// router.use('/uploads', express.static('uploads'))
dotenv.config();
/** Server Handling */
const httpServer = http.createServer(router);

// const allowedOrigins =['http://localhost:3000'];

// const options:cors.CorsOptions={
//     origin:allowedOrigins
// }

router.use(cors())

/** Connect to Firebase */
let serviceAccount = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

/** Connect to Mongo */

mongoose
    .connect(process.env.MONGODB_URI||config.mongo.url,  config.mongo.options)
    .then((result) => {
        logging.info('Mongo Connected');
    })
    .catch((error) => {
        logging.error(error);
    });


/** Log the request */
router.use((req, res, next) => {
     logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});


/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/api/users', userRoutes);
router.use('/api/about', aboutRoutes);
router.use('/api/article', articleRoutes);
router.use('/api/award', awardRoutes);
router.use('/api/member', memberRoutes);
router.use('/api/fellow', fellowRoutes);
router.use('/api/otherhonours', otherRoutes);
router.use('/api/current', currentRoutes);
router.use('/api/sighsound', sightRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(process.env.PORT|| 2121, () => logging.info(`Server is running ${config.server.host}:${process.env.PORT}`));

async function shutdown() {
    if (exited) return
    exited = true

    await new Promise(r => setTimeout(r, 300))  // simulate async cleanup work
    console.log(`Worker ${ id } cleanup done.`)
    disconnect()
  }
}
