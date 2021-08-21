"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const fellowship_1 = __importDefault(require("../models/fellowship"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, year } = req.body;
    const fellow = new fellowship_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        year
    });
    return fellow
        .save()
        .then((newFellow) => {
        logging_1.default.info(`New Bio info created`);
        return res.status(201).json({ fellow: newFellow });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.fellowID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    fellowship_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((fellow) => {
        if (fellow) {
            return res.status(200).json({ fellow });
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
    fellowship_1.default.find()
        .populate('author')
        .exec()
        .then((fellow) => {
        return res.status(200).json({
            count: fellow.length,
            fellow: fellow
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
    fellowship_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((fellowID) => {
        return res.status(200).json({
            count: fellowID.length,
            fellowID: fellowID
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
    const _id = req.params.fellowID;
    fellowship_1.default.findById(_id)
        .exec()
        .then((fellow) => {
        if (fellow) {
            fellow.set(req.body);
            fellow.save()
                .then((savedFellow) => {
                logging_1.default.info(`Fellowship with id ${_id} updated`);
                return res.status(201).json({
                    fellow: savedFellow
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
const deleteFellowship = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.fellowID;
    fellowship_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'Fellowship deleted'
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
    deleteFellowship
};
//# sourceMappingURL=fellowship.js.map