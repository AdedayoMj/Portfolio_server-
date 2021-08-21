import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Awards from '../models/awards';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title,year} = req.body;

    const award = new Awards({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        year
    });

    return award
        .save()
        .then((newAwards) => {
            logging.info(`New Bio info created`);

            return res.status(201).json({ award: newAwards });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.awardID;
    logging.info(`Incoming read for information with id ${_id}`);

    Awards.findById(_id)
        .populate('author')
        .exec()
        .then((award) => {
            if (award) {
                return res.status(200).json({ award });
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

    Awards.find()
        .populate('author')
        .exec()
        .then((award) => {
            return res.status(200).json({
                count: award.length,
                award: award
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

    Awards.find(req.body)
        .populate('author')
        .exec()
        .then((awardID) => {
            return res.status(200).json({
                count: awardID.length,
                awardID: awardID
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

    const _id = req.params.awardID;

    Awards.findById(_id)
        .exec()
        .then((award) => {
            if (award) {
                award.set(req.body);
                award.save()
                    .then((savedAward) => {
                        logging.info(`Article with id ${_id} updated`);

                        return res.status(201).json({
                            award: savedAward
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

const deleteAward = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.awardID;

    Awards.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Award deleted'
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
    deleteAward
};