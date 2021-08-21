import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import OtherHonour from '../models/otherhonours';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title,year} = req.body;

    const other = new OtherHonour({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        year
    });

    return other
        .save()
        .then((newOther) => {
            logging.info(`New Other honours info created`);

            return res.status(201).json({ other: newOther });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.otherID;
    logging.info(`Incoming read for information with id ${_id}`);

    OtherHonour.findById(_id)
        .populate('author')
        .exec()
        .then((other) => {
            if (other) {
                return res.status(200).json({ other });
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
    logging.info('Returning all Other page information ');

    OtherHonour.find()
        .populate('author')
        .exec()
        .then((other) => {
            return res.status(200).json({
                count: other.length,
                other: other
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

    OtherHonour.find(req.body)
        .populate('author')
        .exec()
        .then((otherID) => {
            return res.status(200).json({
                count: otherID.length,
                otherID: otherID
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

    const _id = req.params.otherID;

    OtherHonour.findById(_id)
        .exec()
        .then((other) => {
            if (other) {
                other.set(req.body);
                other.save()
                    .then((savedOther) => {
                        logging.info(`OtherHonour with id ${_id} updated`);

                        return res.status(201).json({
                            other: savedOther
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

const deleteOtherHonour= (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.otherID;

    OtherHonour.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'OtherHonour deleted'
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
    deleteOtherHonour
};