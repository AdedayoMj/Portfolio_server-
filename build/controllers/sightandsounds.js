"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const sightandsounds_1 = __importDefault(require("../models/sightandsounds"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to post picture ...');
    if (req.file == null) {
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }
    const url = req.protocol + "://" + req.get('host');
    let filename = req.file.filename;
    const sight = new sightandsounds_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        picture: url + '/uploads/' + filename
    });
    console.log(filename);
    return sight
        .save()
        .then((newSight) => {
        logging_1.default.info(`New Picture info created`);
        return res.status(201).json({ sight: newSight });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.sightID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    sightandsounds_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((sight) => {
        if (sight) {
            return res.status(200).json({ sight });
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
    sightandsounds_1.default.find()
        .populate('author')
        .exec()
        .then((sight) => {
        return res.status(200).json({
            count: sight.length,
            sight: sight
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
    sightandsounds_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((sightID) => {
        return res.status(200).json({
            count: sightID.length,
            sightID: sightID
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
    const _id = req.params.sightID;
    sightandsounds_1.default.findById(_id)
        .exec()
        .then((sight) => {
        if (sight) {
            sight.set(req.body);
            sight.save()
                .then((savedSight) => {
                logging_1.default.info(`Sight with id ${_id} updated`);
                return res.status(201).json({
                    sight: savedSight
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
const deleteSightSound = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.sightID;
    sightandsounds_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'About deleted'
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
    deleteSightSound
};
//# sourceMappingURL=sightandsounds.js.map