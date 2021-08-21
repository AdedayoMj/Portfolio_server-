import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Article from '../models/article';
import mongoose from 'mongoose';


const create = (( req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to create blog ...');
    
    let { writer,author, title,url,year,otherInfo} = req.body;

    const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        writer,
        url,
        year,
        otherInfo,
    });

    return article
        .save()
        .then((newArticle) => {
            logging.info(`New article info created`);

            return res.status(201).json({ article: newArticle });
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
        });
});

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.articleID;
    logging.info(`Incoming read for information with id ${_id}`);

    Article.findById(_id)
        .populate('author')
        .exec()
        .then((article) => {
            if (article) {
                return res.status(200).json({ article });
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

    Article.find()
        .populate('author')
        .exec()
        .then((article) => {
            return res.status(200).json({
                count: article.length,
                article: article
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

    Article.find(req.body)
        .populate('author')
        .exec()
        .then((articleID) => {
            return res.status(200).json({
                count: articleID.length,
                articleID: articleID
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

    const _id = req.params.articleID;

    Article.findById(_id)
        .exec()
        .then((article) => {
            if (article) {
                article.set(req.body);
                article.save()
                    .then((savedArticle) => {
                        logging.info(`Article with id ${_id} updated`);

                        return res.status(201).json({
                            article: savedArticle
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

const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
    logging.warn('Delete route called');

    const _id = req.params.articleID;

    Article.findByIdAndDelete(_id)
        .exec()
        .then(() => {
            return res.status(201).json({
                message: 'Article deleted'
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
    deleteArticle
};