
import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import About from '../models/about';
import mongoose from 'mongoose';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}
const upload = multer({storage: storage, fileFilter : fileFilter});

const create = (upload.array('picture',1),( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title, 
        content,
        resume, picture} = req.body;

    const about = new About({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        content,
        resume,
        picture
    });

    return about
        .save()
        .then((newAbout) => {
            logging.info(`New Bio info created`);

            return res.status(201).json({ about: newAbout });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.aboutID;
    logging.info(`Incoming read for information with id ${_id}`);

    About.findById(_id)
        .populate('author')
        .exec()
        .then((about) => {
            if (about) {
                return res.status(200).json({ about });
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

    About.find()
        .populate('author')
        .exec()
        .then((about) => {
            return res.status(200).json({
                count: about.length,
                about: about
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

    About.find(req.body)
        .populate('author')
        .exec()
        .then((aboutID) => {
            return res.status(200).json({
                count: aboutID.length,
                aboutID: aboutID
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

    const _id = req.params.aboutID;

    About.findById(_id)
        .exec()
        .then((about) => {
            if (about) {
                about.set(req.body);
                about.save()
                    .then((savedAbout) => {
                        logging.info(`About with id ${_id} updated`);

                        return res.status(201).json({
                            about: savedAbout
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

const deleteAboutInfo = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.aboutID;

    About.findByIdAndDelete(_id)
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
    deleteAboutInfo
};