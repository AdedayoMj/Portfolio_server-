"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const otherhonours_1 = __importDefault(require("../models/otherhonours"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, year } = req.body;
    const other = new otherhonours_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        year
    });
    return other
        .save()
        .then((newOther) => {
        logging_1.default.info(`New Other honours info created`);
        return res.status(201).json({ other: newOther });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.otherID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    otherhonours_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((other) => {
        if (other) {
            return res.status(200).json({ other });
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
    logging_1.default.info('Returning all Other page information ');
    otherhonours_1.default.find()
        .populate('author')
        .exec()
        .then((other) => {
        return res.status(200).json({
            count: other.length,
            other: other
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
    otherhonours_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((otherID) => {
        return res.status(200).json({
            count: otherID.length,
            otherID: otherID
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
    const _id = req.params.otherID;
    otherhonours_1.default.findById(_id)
        .exec()
        .then((other) => {
        if (other) {
            other.set(req.body);
            other.save()
                .then((savedOther) => {
                logging_1.default.info(`OtherHonour with id ${_id} updated`);
                return res.status(201).json({
                    other: savedOther
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
const deleteOtherHonour = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.otherID;
    otherhonours_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'OtherHonour deleted'
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
    deleteOtherHonour
};
//# sourceMappingURL=otherhonour.js.map