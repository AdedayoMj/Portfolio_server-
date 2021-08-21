
import multer = require('multer') ;
import multerS3 = require('multer-s3') ;
import aws =require('aws-sdk')
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import SightSound from '../models/sightandsounds';
import mongoose from 'mongoose';
import { AwsClient } from 'google-auth-library';
import ISightSound from '../interfaces/sightandsounds';





const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const path =process.cwd() +'./uploads/';
        cb(null, path)
    },
    
    filename: function (req: any, file: any, cb: any) {
        const fileName=file.originalname.toLowerCase().split(' ').join('-')
        cb(null,+ Date.now()+'-' +fileName)
    }
})

const fileFilter = (req: any,file: any,cb: any) => {
    if(!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)){
        cb(new Error("Only image files are allowed"),false);
    }
     
    cb(null, true);

     
}
const upload = multer({storage: storage,limits:{fileSize:1024*1024*5}, fileFilter : fileFilter});


const create = (upload.single('file'), 
( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to post picture ...');
    if(req.files==null){
        return res.status(400).json({
                        message: 'No file uploaded'
                    });
    }
    const url=req.protocol +"://" + req.get('host')
    let filename=req.file



    const sight = new SightSound({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        picture: url +'/uploads/' +filename
    });
    console.log(filename);

    return sight
        .save()
        .then((newSight) => {
            logging.info(`New Picture info created`);

            return res.status(201).json({ sight: newSight });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.sightID;
    logging.info(`Incoming read for information with id ${_id}`);

    SightSound.findById(_id)
        .populate('author')
        .exec()
        .then((sight) => {
            if (sight) {
                return res.status(200).json({ sight });
            } else {
                return res.status(404).json({
                    error: 'Information not found.'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                error: error.message
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Returning all About page information ');

    SightSound.find()
        .populate('author')
        .exec()
        .then((sight) => {
            return res.status(200).json({
                count: sight.length,
                sight: sight
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Query route called');

    SightSound.find(req.body)
        .populate('author')
        .exec()
        .then((sightID) => {
            return res.status(200).json({
                count: sightID.length,
                sightID: sightID
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Update route called');

    const _id = req.params.sightID;

    SightSound.findById(_id)
        .exec()
        .then((sight) => {
            if (sight) {
                sight.set(req.body);
                sight.save()
                    .then((savedSight) => {
                        logging.info(`Sight with id ${_id} updated`);

                        return res.status(201).json({
                            sight: savedSight
                        });
                    })
                    .catch((error) => {
                        logging.error(error.message);

                        return res.status(500).json({
                            message: error.message
                        });
                    });
            } else {
                return res.status(401).json({
                    message: 'NOT FOUND'
                });
            }
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

const deleteSightSound = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.sightID;

    SightSound.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'About deleted'
            });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteSightSound
};