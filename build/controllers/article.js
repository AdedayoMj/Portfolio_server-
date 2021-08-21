"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const article_1 = __importDefault(require("../models/article"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { writer, author, title, url, year, otherInfo } = req.body;
    const article = new article_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
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
        logging_1.default.info(`New article info created`);
        return res.status(201).json({ article: newArticle });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.articleID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    article_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((article) => {
        if (article) {
            return res.status(200).json({ article });
        }
        else {
            return res.status(404).json({
                error: 'Information not found.'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            error: error.message
        });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info('Returning all About page information ');
    article_1.default.find()
        .populate('author')
        .exec()
        .then((article) => {
        return res.status(200).json({
            count: article.length,
            article: article
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const query = (req, res, next) => {
    logging_1.default.info('Query route called');
    article_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((articleID) => {
        return res.status(200).json({
            count: articleID.length,
            articleID: articleID
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const update = (req, res, next) => {
    logging_1.default.info('Update route called');
    const _id = req.params.articleID;
    article_1.default.findById(_id)
        .exec()
        .then((article) => {
        if (article) {
            article.set(req.body);
            article.save()
                .then((savedArticle) => {
                logging_1.default.info(`Article with id ${_id} updated`);
                return res.status(201).json({
                    article: savedArticle
                });
            })
                .catch((error) => {
                logging_1.default.error(error.message);
                return res.status(500).json({
                    message: error.message
                });
            });
        }
        else {
            return res.status(401).json({
                message: 'NOT FOUND'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const deleteArticle = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.articleID;
    article_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'Article deleted'
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
exports.default = {
    create,
    read,
    readAll,
    query,
    update,
    deleteArticle
};
//# sourceMappingURL=article.js.map