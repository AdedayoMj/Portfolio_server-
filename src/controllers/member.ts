import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Membership from '../models/member';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { author, title,year} = req.body;

    const member = new Membership({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        year
    });

    return member
        .save()
        .then((newMember) => {
            logging.info(`New Bio info created`);

            return res.status(201).json({ member: newMember });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.memberID;
    logging.info(`Incoming read for information with id ${_id}`);

    Membership.findById(_id)
        .populate('author')
        .exec()
        .then((member) => {
            if (member) {
                return res.status(200).json({ member });
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

    Membership.find()
        .populate('author')
        .exec()
        .then((member) => {
            return res.status(200).json({
                count: member.length,
                member: member
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

    Membership.find(req.body)
        .populate('author')
        .exec()
        .then((memberID) => {
            return res.status(200).json({
                count: memberID.length,
                memberID: memberID
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

    const _id = req.params.memberID;

    Membership.findById(_id)
        .exec()
        .then((member) => {
            if (member) {
                member.set(req.body);
                member.save()
                    .then((savedMember) => {
                        logging.info(`Membership with id ${_id} updated`);

                        return res.status(201).json({
                            member: savedMember
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

const deleteMembership= (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.memberID;

    Membership.findByIdAndDelete(_id)
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
    deleteMembership
};