"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const currentproject_1 = __importDefault(require("../models/currentproject"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, attribute } = req.body;
    const current = new currentproject_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        attribute
    });
    return current
        .save()
        .then((newCurrent) => {
        logging_1.default.info(`New Bio info created`);
        return res.status(201).json({ current: newCurrent });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.currentID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    currentproject_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((current) => {
        if (current) {
            return res.status(200).json({ current });
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
    currentproject_1.default.find()
        .populate('author')
        .exec()
        .then((current) => {
        return res.status(200).json({
            count: current.length,
            current: current
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
    currentproject_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((currentID) => {
        return res.status(200).json({
            count: currentID.length,
            currentID: currentID
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
    const _id = req.params.awardID;
    currentproject_1.default.findById(_id)
        .exec()
        .then((current) => {
        if (current) {
            current.set(req.body);
            current.save()
                .then((savedCurrent) => {
                logging_1.default.info(`Article with id ${_id} updated`);
                return res.status(201).json({
                    current: savedCurrent
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
const deleteProject = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.currentID;
    currentproject_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'Project deleted'
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
    deleteProject
};
//# sourceMappingURL=currentproject.js.map