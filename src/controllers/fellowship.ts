import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Fellowship from '../models/fellowship';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title,year} = req.body;

    const fellow = new Fellowship({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        year
    });

    return fellow
        .save()
        .then((newFellow) => {
            logging.info(`New Bio info created`);

            return res.status(201).json({ fellow: newFellow });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.fellowID;
    logging.info(`Incoming read for information with id ${_id}`);

    Fellowship.findById(_id)
        .populate('author')
        .exec()
        .then((fellow) => {
            if (fellow) {
                return res.status(200).json({ fellow });
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

    Fellowship.find()
        .populate('author')
        .exec()
        .then((fellow) => {
            return res.status(200).json({
                count: fellow.length,
                fellow: fellow
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

    Fellowship.find(req.body)
        .populate('author')
        .exec()
        .then((fellowID) => {
            return res.status(200).json({
                count: fellowID.length,
                fellowID: fellowID
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

    const _id = req.params.fellowID;

    Fellowship.findById(_id)
        .exec()
        .then((fellow) => {
            if (fellow) {
                fellow.set(req.body);
                fellow.save()
                    .then((savedFellow) => {
                        logging.info(`Fellowship with id ${_id} updated`);

                        return res.status(201).json({
                            fellow: savedFellow
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

const deleteFellowship= (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.fellowID;

    Fellowship.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Fellowship deleted'
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
    deleteFellowship
};