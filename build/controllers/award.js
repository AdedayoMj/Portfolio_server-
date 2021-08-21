"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const awards_1 = __importDefault(require("../models/awards"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, year } = req.body;
    const award = new awards_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        year
    });
    return award
        .save()
        .then((newAwards) => {
        logging_1.default.info(`New Bio info created`);
        return res.status(201).json({ award: newAwards });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.awardID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    awards_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((award) => {
        if (award) {
            return res.status(200).json({ award });
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
    awards_1.default.find()
        .populate('author')
        .exec()
        .then((award) => {
        return res.status(200).json({
            count: award.length,
            award: award
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
    awards_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((awardID) => {
        return res.status(200).json({
            count: awardID.length,
            awardID: awardID
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
    awards_1.default.findById(_id)
        .exec()
        .then((award) => {
        if (award) {
            award.set(req.body);
            award.save()
                .then((savedAward) => {
                logging_1.default.info(`Article with id ${_id} updated`);
                return res.status(201).json({
                    award: savedAward
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
const deleteAward = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.awardID;
    awards_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'Award deleted'
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
    deleteAward
};
//# sourceMappingURL=award.js.map