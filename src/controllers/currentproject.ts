import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import CurrentProject from '../models/currentproject';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title,attribute} = req.body;

    const current = new CurrentProject({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        attribute
    });

    return current
        .save()
        .then((newCurrent) => {
            logging.info(`New Bio info created`);

            return res.status(201).json({ current: newCurrent });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.currentID;
    logging.info(`Incoming read for information with id ${_id}`);

    CurrentProject.findById(_id)
        .populate('author')
        .exec()
        .then((current) => {
            if (current) {
                return res.status(200).json({ current });
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

    CurrentProject.find()
        .populate('author')
        .exec()
        .then((current) => {
            return res.status(200).json({
                count: current.length,
                current: current
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

    CurrentProject.find(req.body)
        .populate('author')
        .exec()
        .then((currentID) => {
            return res.status(200).json({
                count: currentID.length,
                currentID: currentID
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

    CurrentProject.findById(_id)
        .exec()
        .then((current) => {
            if (current) {
                current.set(req.body);
                current.save()
                    .then((savedCurrent) => {
                        logging.info(`Article with id ${_id} updated`);

                        return res.status(201).json({
                            current: savedCurrent
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

const deleteProject = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.currentID;

    CurrentProject.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Project deleted'
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
    deleteProject
};